import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-transparent py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <img src="/logo.png" alt="HackingFlix Logo" className="h-8" />
          </div>
          <nav className="space-x-6 text-gray-300">
            <a href="/" className="hover:text-white">Home</a>
            <a href="/about" className="hover:text-white">About</a>
            <a href="/contact" className="text-white">Contact</a>
          </nav>
        </div>
      </header>

      <main className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
            Contact Us
          </h1>
          <div className="mt-12">
            <p className="text-xl text-gray-300">
              HackingFlix
            </p>
            <p className="text-xl text-gray-300">
              123 Main Street, Anytown, CA 91234
            </p>
            <p className="mt-4 text-xl text-gray-300">
              Phone: (123) 456-7890
            </p>
            <p className="text-xl text-gray-300">
              Email: support@hackingflix.com
            </p>
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

export default ContactPage;
