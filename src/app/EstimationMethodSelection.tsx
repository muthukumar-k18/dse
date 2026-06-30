import React from 'react';
import { useNavigate, useParams } from 'react-router';

const EstimationMethodSelection = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const estimationMethods = [
    {
      id: 'lego',
      name: 'Lego-based Estimation',
      icon: '🧱',
      description: 'Break down migration into modular lego blocks with T-shirt sizing (Simple: 3, Medium: 5, Complex: 10 legos)',
      color: 'from-blue-500 to-cyan-500',
      features: [
        'T-Shirt Sizing (Simple, Medium, Complex)',
        'Configurable effort per lego',
        'Pattern-based breakdown',
        'Custom effort addition'
      ]
    },
    {
      id: 'story-point',
      name: 'Story Point-based Estimation',
      icon: '📊',
      description: 'Agile story point estimation using fibonacci sequence for relative sizing and velocity tracking',
      color: 'from-purple-500 to-violet-500',
      features: [
        'Fibonacci sequence (1, 2, 3, 5, 8, 13, 21)',
        'Velocity-based calculation',
        'Sprint planning integration',
        'Uncertainty factors'
      ]
    },
    {
      id: 'custom',
      name: 'Custom Estimation',
      icon: '✨',
      description: 'Flexible custom estimation approach with user-defined parameters and calculation methods',
      color: 'from-orange-500 to-amber-500',
      features: [
        'User-defined metrics',
        'Flexible calculation formulas',
        'Custom categories',
        'Freeform effort input'
      ]
    }
  ];

  const handleMethodSelect = (methodId) => {
    if (methodId === 'lego') {
      navigate(`/bottom-up-estimation/${projectId}/lego`);
    } else if (methodId === 'story-point') {
      navigate(`/bottom-up-estimation/${projectId}/story-point`);
    } else if (methodId === 'custom') {
      navigate(`/bottom-up-estimation/${projectId}/custom`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(`/project-pipeline/${projectId}`)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                ← Back to Pipeline
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  Bottom-Up Estimation
                </h1>
                <p className="text-sm text-white/50">Select your estimation methodology</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-sm text-teal-400 mb-4">
            Step 1 of 2
          </div>
          <h2 className="text-4xl font-bold mb-4">Choose Your Estimation Method</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Select the estimation approach that best fits your migration project's complexity and team preferences
          </p>
        </div>

        {/* Method Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {estimationMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className="group text-left"
            >
              <div className="relative h-full">
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
                
                {/* Card */}
                <div className="relative h-full bg-white/[0.02] border border-white/10 group-hover:border-white/30 rounded-2xl p-8 transition-all duration-300 group-hover:scale-105">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                    {method.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3">{method.name}</h3>

                  {/* Description */}
                  <p className="text-white/60 mb-6 leading-relaxed">
                    {method.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {method.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-white/50">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${method.color}`}></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${method.color} text-white font-semibold opacity-0 group-hover:opacity-100 transition-all`}>
                    <span>Select Method</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-2xl flex-shrink-0">
              💡
            </div>
            <div>
              <h4 className="font-bold mb-2">Not sure which method to choose?</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                <strong className="text-white">Lego-based:</strong> Best for structured migrations with clear component breakdown.<br />
                <strong className="text-white">Story Points:</strong> Ideal for agile teams familiar with sprint-based planning.<br />
                <strong className="text-white">Custom:</strong> Perfect when you need flexibility or have unique project requirements.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EstimationMethodSelection;
