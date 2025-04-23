import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { BrainCircuit, CheckCircle, Trophy } from 'lucide-react';
import Button from '../components/UI/Button';
import jsPDF from 'jspdf';

const getResultMessage = (name: string, percentage: number): string => {
  if (percentage >= 90) {
    return `Outstanding work, ${name}! You're a top scorer!`;
  }
  if (percentage >= 70) {
    return `Great job, ${name}! You did really well!`;
  }
  if (percentage >= 50) {
    return `Good effort, ${name}! Keep practicing to improve even more!`;
  }
  return `Great effort, ${name}! Let's aim higher next time!`;
};

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };
  const { username } = (location.state as { score: number; totalQuestions: number; username: string }) || { username: 'User' };

  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  const generateCertificate = () => {
    const doc = new jsPDF();

    // Border
    doc.setDrawColor(255, 215, 0); // Soft gold
    doc.setLineWidth(2);
    doc.rect(5, 5, 200, 287, 'D');

    // Title
    doc.setFont('Georgia', 'bold');
    doc.setFontSize(36);
    doc.setTextColor(0, 0, 0);
    doc.text('Certificate of Achievement', 105, 30, { align: 'center' });

    // Subtitle
    doc.setFont('Georgia', 'italic');
    doc.setFontSize(20);
    doc.text('This certifies that', 105, 45, { align: 'center' });

    // Recipient Name
    doc.setFont('Great Vibes', 'normal');
    doc.setFontSize(48);
    doc.text(username, 105, 75, { align: 'center' });

    // Message
    doc.setFont('Georgia', 'normal');
    doc.setFontSize(16);
    doc.text(`has successfully completed the LLM Assessment with a score of ${score} out of ${totalQuestions}, achieving a ${percentage.toFixed(2)}%.`, 105, 100, { align: 'center' });

    // Date & Signature
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 260);
    doc.text('Authorized Signature', 180, 260, { align: 'right' });
    doc.line(120, 257, 190, 257);

    // Footer
    doc.setFontSize(14);
    doc.text('HackingFlix', 105, 280, { align: 'center' });

    // Download the certificate
    doc.save('certificate.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-transparent py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <img src="/logo.png" alt="HackingFlix Logo" className="h-8" />
          </div>
          <nav className="space-x-6 text-gray-300">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Assessment Results</h2>
              <p className="mt-2 text-gray-300">Congratulations! You have completed the assessment.</p>
              <p className="mt-2 text-gray-300">{getResultMessage(username, percentage)}</p>
            </div>

            <div className="mt-8">
              <p className="text-xl text-gray-300">Your Score: {score} / {totalQuestions}</p>
              <p className="text-xl text-gray-300">Percentage: {percentage.toFixed(2)}%</p>
            </div>

            <div className="mt-8 flex flex-col items-center">
              <Button onClick={() => navigate('/')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
                Back to Home
              </Button>
              <Button onClick={generateCertificate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Download Certificate
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-gray-700 pt-8 text-gray-400 text-sm text-center">
            <p>© 2025 HackingFlix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResultsPage;
