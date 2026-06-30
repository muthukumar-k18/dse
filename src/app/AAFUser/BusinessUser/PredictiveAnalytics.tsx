import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const PredictiveAnalytics = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    applicationName: '',
    agenticTooling: 'ghcp',
    horizon: 12
  });

  const agenticOptions = [
    { id: 'ghcp', name: 'GHCP Agents', icon: '🤖', color: 'from-blue-500 to-cyan-500' },
    { id: 'custom', name: 'Custom Agents', icon: '⚙️', color: 'from-purple-500 to-violet-500' },
    { id: 'factory', name: 'Factory.AI', icon: '🏭', color: 'from-orange-500 to-amber-500' },
    { id: 'openai', name: 'OpenAI Agents', icon: '✨', color: 'from-green-500 to-emerald-500' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.applicationName.trim()) {
      alert('Please enter an application name or repository');
      return;
    }
    // Navigate to report with query params
    navigate(`/business-user/predictive-analytics-report?app=${encodeURIComponent(formData.applicationName)}&tooling=${formData.agenticTooling}&horizon=${formData.horizon}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <span className="text-xl">⚡</span>
          </div>
          <div>
            <span className="text-xl font-semibold">DSE 2.0</span>
            <span className="text-white/30 mx-2">|</span>
            <span className="text-white/50">Predictive Analytics</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/business-user"
            className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            ← Back to Portal
          </Link>
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-semibold">
              JM
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">John Mitchell</p>
              <p className="text-xs text-white/40">Business User</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 py-16">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 mb-6 shadow-xl shadow-pink-500/20">
            <span className="text-4xl">📊</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Predictive Analytics
          </h1>
          <p className="text-xl text-white/50">
            AI-powered insights to forecast future changes and trends
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl p-8 space-y-8">
          
          {/* Application Name Input */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-3">
              Application Name or Repository
            </label>
            <input
              type="text"
              value={formData.applicationName}
              onChange={(e) => setFormData({ ...formData, applicationName: e.target.value })}
              placeholder="e.g., CustomerPortal, PaymentService, github.com/org/repo"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
            />
            <p className="text-xs text-white/40 mt-2">
              Enter your application name or GitHub repository URL
            </p>
          </div>

          {/* Agentic Tooling Options */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-4">
              Agentic Tooling
            </label>
            <div className="grid grid-cols-2 gap-4">
              {agenticOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => setFormData({ ...formData, agenticTooling: option.id })}
                  className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    formData.agenticTooling === option.id
                      ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/30 shadow-lg'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center text-xl shadow-lg`}>
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{option.name}</p>
                      {formData.agenticTooling === option.id && (
                        <p className="text-xs text-cyan-400 mt-1">✓ Selected</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prediction Horizon Slider */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-white/70">
                Prediction Horizon
              </label>
              <div className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg">
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {formData.horizon}
                </span>
                <span className="text-sm text-white/60 ml-2">months</span>
              </div>
            </div>
            
            <input
              type="range"
              min="6"
              max="36"
              step="6"
              value={formData.horizon}
              onChange={(e) => setFormData({ ...formData, horizon: parseInt(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, rgb(34 211 238) 0%, rgb(34 211 238) ${((formData.horizon - 6) / 30) * 100}%, rgba(255,255,255,0.1) ${((formData.horizon - 6) / 30) * 100}%, rgba(255,255,255,0.1) 100%)`
              }}
            />
            
            <div className="flex items-center justify-between mt-3 text-xs text-white/40">
              <span>6 months</span>
              <span>12 months</span>
              <span>18 months</span>
              <span>24 months</span>
              <span>30 months</span>
              <span>36 months</span>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <p className="text-sm font-medium text-white/90 mb-1">How it works</p>
                <p className="text-xs text-white/60 leading-relaxed">
                  Our AI analyzes your application's codebase, commit history, dependencies, and industry trends to predict future changes, risks, and opportunities. The selected agentic tooling will provide tailored insights based on your technology stack.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02]"
          >
            Generate Predictive Report
          </button>
        </form>
      </main>

      {/* Custom Slider Styles */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(to bottom right, rgb(34 211 238), rgb(59 130 246));
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(34, 211, 238, 0.4);
          border: 2px solid white;
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(to bottom right, rgb(34 211 238), rgb(59 130 246));
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(34, 211, 238, 0.4);
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default PredictiveAnalytics;
