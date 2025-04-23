import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import Button from '../components/UI/Button';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-transparent py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <img src="/logo.png" alt="HackingFlix Logo" className="h-8" />
          </div>
          <nav className="space-x-6 text-gray-300">
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </nav>
          <div>
            <Button variant="outline" size="sm" className="text-green-500 hover:text-white border-green-500 hover:bg-green-500 transition">
              Login
            </Button>
          </div>
        </div>
      </header>

      <main className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl animate-pulse">
            HackingFlix Assessment Platform
          </h1>
          <p className="mt-6 text-xl text-gray-300 animate-fade-in">
            AI-powered assessment platform with real-time monitoring, scoring, and intelligent question generation.
          </p>
          <div className="mt-12 flex items-center justify-center space-x-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/assessment')}
              className="bg-green-500 hover:bg-green-600 shadow-lg transform transition hover:scale-105 focus:scale-105"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-gray-300 hover:text-white border-gray-300 hover:bg-gray-700 transition"
            >
              Try a Demo
            </Button>
          </div>

          <div className="mt-24">
            <h2 className="text-3xl font-bold text-white text-center">🎯 Use Cases</h2>
            <p className="mt-2 text-xl text-gray-300 text-center">Who is HackingFlix built for?</p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 rounded-xl shadow-md p-6 hover:bg-gray-700 transition-colors duration-200">
                <p className="text-4xl text-green-500">🎓</p>
                <h3 className="text-xl font-bold mt-4">Students</h3>
                <p className="text-gray-300 mt-2">Ace exams with targeted practice and skill enhancement.</p>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-md p-6 hover:bg-gray-700 transition-colors duration-200">
                <p className="text-4xl text-purple-500">🏫</p>
                <h3 className="text-xl font-bold mt-4">Institutions</h3>
                <p className="text-gray-300 mt-2">Conduct secure and insightful exams with ease.</p>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-md p-6 hover:bg-gray-700 transition-colors duration-200">
                <p className="text-4xl text-blue-500">🧑‍🏫</p>
                <h3 className="text-xl font-bold mt-4">Trainers</h3>
                <p className="text-gray-300 mt-2">Create mock tests and skill-building exercises for effective training.</p>
              </div>
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

export default HomePage;

// Tailwind CSS animation classes
// animate-pulse: makes the text pulse
// animate-fade-in: Add this to tailwind config
// @keyframes fade-in {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }
// .animate-fade-in {
//   animation: fade-in 1s ease-in-out forwards;
// }
