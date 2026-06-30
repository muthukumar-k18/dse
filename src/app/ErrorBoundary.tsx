import React from 'react';
import { useNavigate } from 'react-router';

const ErrorBoundary = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0118] flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-gradient-to-br from-red-900/20 to-purple-900/20 border border-red-500/30 rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h1>
        <p className="text-white/60 mb-6">
          We couldn't find the page you're looking for.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 rounded-lg font-bold text-white transition-all"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorBoundary;
