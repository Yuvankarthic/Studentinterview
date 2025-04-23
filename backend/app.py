from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import cv2
import numpy as np
import base64
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Gemini client
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Select the Gemini Pro model
model = genai.GenerativeModel('gemini-1.5-pro-latest')

# Example questions database
questions = [
    {
        "id": 1,
        "question": "What is the capital of France?",
        "answer": "Paris"
    },
    {
        "id": 2,
        "question": "Who wrote 'Romeo and Juliet'?",
        "answer": "William Shakespeare"
    }
]

# Store user sessions
sessions = {}

@app.route('/api/questions', methods=['GET'])
def get_questions():
    return jsonify({"questions": questions})

@app.route('/api/generate-question', methods=['POST'])
def generate_question():
    try:
        data = request.json
        subject = data.get('subject', 'general knowledge')
        difficulty = data.get('difficulty', 'medium')

        # Generate a question using Gemini
        prompt = f"Generate a {difficulty} difficulty question about {subject} with a clear, concise answer."
        print(f"Prompt: {prompt}")
        response = model.generate_content(prompt)
        print(f"Response: {response}")
        question_content = response.text
        print(f"Question Content: {question_content}")

        # Parse the question and answer (this is simplified, might need more robust parsing)
        parts = question_content.split("Answer:")
        if len(parts) > 1:
            question = parts[0].replace("Question:", "").strip()
            answer = parts[1].strip()
        else:
            question = question_content.replace("Question:", "").strip()
            prompt = f"What is the answer to this question: {question}"
            response = model.generate_content(prompt)
            answer = response.text.strip()

        return jsonify({
            "question": question,
            "answer": answer
        })

    except Exception as e:
        return jsonify({"error": str(e)}, 500)

@app.route('/api/check-answer', methods=['POST'])
def check_answer():
    data = request.json
    student_answer = data.get('answer', '').strip().lower()
    correct_answer = data.get('correct_answer', '').strip().lower()
    session_id = data.get('session_id')
    
    # Initialize session if it doesn't exist
    if session_id not in sessions:
        sessions[session_id] = {
            "correct": 0,
            "wrong": 0,
            "skipped": 0,
            "total_score": 0
        }
    
    # Evaluate answer
    if not student_answer:
        sessions[session_id]["skipped"] += 1
        result = "skipped"
        score = 0
    elif student_answer == correct_answer:
        sessions[session_id]["correct"] += 1
        sessions[session_id]["total_score"] += 1
        result = "correct"
        score = 1
    else:
        sessions[session_id]["wrong"] += 1
        sessions[session_id]["total_score"] -= 1
        result = "wrong"
        score = -1
    
    return jsonify({
        "result": result,
        "score": score,
        "session_stats": sessions[session_id]
    })

@app.route('/api/process-video', methods=['POST'])
def process_video():
    try:
        data = request.json
        image_data = data.get('image')
        
        # Decode base64 image
        encoded_data = image_data.split(',')[1] if ',' in image_data else image_data
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        img = cv2.imdecode(nparr, cv2.COLOR_BGR2GRAY)
        
        # Example processing: detect faces
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)
        
        # Check if student is present
        student_present = len(faces) > 0
        
        # Return result
        return jsonify({
            "student_present": student_present,
            "faces_detected": len(faces)
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def index():
    return "Backend is running!"

@app.route('/api/session/<session_id>', methods=['GET'])
def get_session(session_id):
    if session_id in sessions:
        return jsonify(sessions[session_id])
    return jsonify({"error": "Session not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
