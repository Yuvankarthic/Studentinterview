# Student Assessment System Backend

This is the Python backend for the Student Assessment System, which integrates with OpenAI's GPT for question generation, scores student responses, and implements video monitoring via OpenCV.

## Setup

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file from `.env.example` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. Run the application:
   ```
   python app.py
   ```

The server will start on http://localhost:5000.

## API Endpoints

- `GET /api/questions` - Get sample questions
- `POST /api/generate-question` - Generate a new question using GPT
- `POST /api/check-answer` - Check and score a student's answer
- `POST /api/process-video` - Process video frame to detect student presence
- `GET /api/session/<session_id>` - Get session statistics

## Notes

- This backend requires an OpenAI API key for GPT integration
- Video monitoring uses OpenCV for face detection to track student presence