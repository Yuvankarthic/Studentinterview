# Student Assessment System

A comprehensive student assessment platform that uses GPT to generate questions, scores student responses, and monitors students via video using OpenCV.

## Features

- AI-powered question generation using OpenAI's GPT
- Intelligent scoring system (+1 for correct answers, 0 for skipped, -1 for wrong)
- Real-time student monitoring with OpenCV 
- Interactive user interface built with React and TypeScript
- Session management to track assessment progress
- Comprehensive score visualization

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Python, Flask
- **AI Integration**: OpenAI GPT API
- **Video Processing**: OpenCV
- **API Communication**: Axios
- **UI Components**: Custom components with animations

## Project Structure

- `/src`: React frontend application
  - `/components`: Reusable UI components
  - `/pages`: Application pages
  - `/services`: API integration
  - `/hooks`: Custom React hooks
  - `/types`: TypeScript type definitions
- `/backend`: Python backend application
  - `app.py`: Main Flask application
  - `requirements.txt`: Python dependencies

## Getting Started

### Prerequisites

- Node.js
- Python 3.8+
- OpenAI API key

### Setup

1. Clone the repository
2. Install frontend dependencies:
   ```
   npm install
   ```
3. Install backend dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```
4. Create a `.env` file in the backend directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Running the Application

1. Start the backend:
   ```
   npm run backend
   ```
2. In a separate terminal, start the frontend:
   ```
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Navigate to the home page
2. Click "Start Assessment" to begin
3. Answer the questions within the time limit
4. The webcam will automatically monitor your presence
5. View your score and progress in the sidebar
6. After completing all questions, review your final results

## License

This project is licensed under the MIT License.