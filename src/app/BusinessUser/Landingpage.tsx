import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';

const BusinessUserLanding = () => {
  const [hoveredOption, setHoveredOption] = useState(null);
  const [hoveredTask, setHoveredTask] = useState(null);
  const navigate = useNavigate();

  // Analysis Category
  const analysisOptions = [
    {
      id: 'analytics',
      title: 'Predictive Analytics',
      description: 'AI-powered insights, forecasts, and recommendations',
      icon: '📊',
      color: 'from-pink-500 to-rose-500',
      accentColor: 'pink',
    },
    {
      id: 'assess',
      title: 'Application Assessment',
      description: 'Comprehensive migration readiness analysis',
      icon: '🔍',
      color: 'from-cyan-500 to-blue-500',
      accentColor: 'cyan',
    },
    {
      id: 'budget',
      title: 'Spend & Budget',
      description: 'Track spending and optimize investments',
      icon: '💰',
      color: 'from-green-500 to-emerald-500',
      accentColor: 'green',
    },
  ];

  // Business User Tasks
  const businessTasks = [
    {
      id: 'approval',
      title: 'Approval & Collaboration',
      description: 'Review approvals and collaborate',
      icon: '✅',
      color: 'from-orange-500 to-amber-500',
      count: 5,
    },
    {
      id: 'rem',
      title: 'Create New REM',
      description: 'Submit transformation request',
      icon: '📝',
      color: 'from-purple-500 to-violet-500',
      count: null,
    },
    {
      id: 'docs',
      title: 'Process Documentation',
      description: 'Guides and templates',
      icon: '📚',
      color: 'from-blue-500 to-indigo-500',
      count: 24,
    },
  ];

  const handleOptionClick = (optionId) => {
    if (optionId === 'assess') {
      navigate('/business-user/assess-application');
    } else if (optionId === 'budget') {
      navigate('/business-user/spend-budget');
    } else if (optionId === 'analytics') {
      navigate('/business-user/predictive-analytics');
    } else {
      console.log(`Navigating to: ${optionId}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.05) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255,255,255,.05) 2px, transparent 2px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Radial Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-[650px] h-[650px] bg-pink-600/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header with Logo */}
      <header className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black/80 backdrop-blur-2xl">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-all hover:scale-105">
          {/* DSE Logo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 via-orange-500 to-red-600 flex items-center justify-center shadow-2xl border-2 border-white/20 group-hover:scale-110 transition-transform">
              <div className="text-2xl font-black text-white drop-shadow-lg">S</div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent tracking-tight">
                DSE
              </span>
              <span className="text-2xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                2.0
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-[10px] text-white/50 tracking-widest uppercase font-semibold">Business Portal</span>
            </div>
          </div>
        </Link>
        
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 bg-white/5 rounded-xl hover:bg-white/10 transition-all hover:scale-110 border border-white/10">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/70"></span>
          </button>
          <button className="p-2.5 bg-white/5 rounded-xl hover:bg-white/10 transition-all hover:scale-110 border border-white/10">
            <span className="text-xl">⚙️</span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-white/20">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-sm shadow-2xl border-2 border-white/20">
                JM
              </div>
            </div>
            <div>
              <p className="text-sm font-bold">John Mitchell</p>
              <p className="text-[10px] text-white/50">Business User</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-[1600px] mx-auto px-8 py-10">
        {/* Hero Welcome Section */}
        <div className="mb-14">
          <div className="text-center mb-10">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/30 rounded-full backdrop-blur-sm shadow-lg">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-xs text-green-300 font-semibold">System Status: All Services Operational</span>
              </div>
            </div>
            <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-white via-gray-100 to-white/90 bg-clip-text text-transparent leading-tight">
              Welcome back, John 👋
            </h1>
            <p className="text-lg text-white/60 font-light">
              Your digital transformation command center
            </p>
          </div>
        </div>

        {/* Analysis & Insights */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl border-2 border-white/30 transform rotate-3 group-hover:rotate-6 transition-transform">
                  <span className="text-4xl transform -rotate-3">📈</span>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-1">
                  Analysis & Insights
                </h2>
                <p className="text-sm text-white/60 font-light">Data-driven decision making tools</p>
              </div>
            </div>
          </div>

          {/* Modern Square Cards with Creative Effects */}
          <div className="grid grid-cols-3 gap-6">
            {analysisOptions.map((option, idx) => (
              <div
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                onMouseEnter={() => setHoveredOption(option.id)}
                onMouseLeave={() => setHoveredOption(null)}
                className="group relative cursor-pointer"
                style={{ 
                  animationDelay: `${idx * 150}ms`,
                  animation: 'fadeInUp 0.8s ease-out forwards',
                  opacity: 0
                }}
              >
                {/* Outer Glow Layer */}
                <div className={`absolute -inset-2 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-40 blur-2xl transition-all duration-700 rounded-3xl`}></div>
                
                {/* Main Card */}
                <div className="relative h-[280px]">
                  {/* Glassmorphic Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-white/[0.15] via-white/[0.08] to-white/[0.02] 
                    border-2 border-white/20 group-hover:border-white/50 transition-all duration-500 backdrop-blur-2xl
                    rounded-2xl group-hover:scale-[1.03] shadow-2xl group-hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]
                    overflow-hidden`}>
                    
                    {/* Animated gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Corner decorative elements */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${option.color} opacity-20 blur-2xl rounded-full transform translate-x-6 -translate-y-6`}></div>
                    <div className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br ${option.color} opacity-20 blur-2xl rounded-full transform -translate-x-6 translate-y-6`}></div>
                  </div>

                  {/* Content Container */}
                  <div className="relative h-full flex flex-col p-6">
                    {/* Large Floating Icon */}
                    <div className="mb-6 group-hover:-translate-y-1 transition-all duration-500">
                      <div className="relative inline-block">
                        <div className={`absolute inset-0 bg-gradient-to-br ${option.color} rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500 scale-110`}></div>
                        <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-2xl 
                          border-3 border-white/30 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}>
                          <span className="text-5xl">{option.icon}</span>
                        </div>
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-black mb-2 group-hover:text-white transition-colors leading-tight">
                        {option.title}
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed group-hover:text-white/95 transition-colors">
                        {option.description}
                      </p>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10 group-hover:border-white/30 transition-colors">
                      <span className="text-xs text-white/50 font-medium group-hover:text-white/80 transition-colors">Explore →</span>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center 
                        opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 shadow-xl border-2 border-white/20`}>
                        <span className="text-2xl font-bold">→</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover light effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`}
                    style={{
                      background: `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15), transparent 50%)`
                    }}>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business User Tasks */}
        <div className="mb-14">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl border-2 border-white/30 transform -rotate-3 group-hover:-rotate-6 transition-transform">
                  <span className="text-4xl transform rotate-3">📋</span>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-1">
                  Business User Tasks
                </h2>
                <p className="text-sm text-white/60 font-light">Manage your workflow and collaboration</p>
              </div>
            </div>
          </div>

          {/* Task Cards Grid */}
          <div className="grid grid-cols-3 gap-6">
            {businessTasks.map((task, idx) => (
              <div
                key={task.id}
                onClick={() => handleOptionClick(task.id)}
                onMouseEnter={() => setHoveredTask(task.id)}
                onMouseLeave={() => setHoveredTask(null)}
                className="group relative cursor-pointer"
                style={{ 
                  animationDelay: `${idx * 150}ms`,
                  animation: 'fadeInUp 0.8s ease-out forwards',
                  opacity: 0
                }}
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-2 bg-gradient-to-br ${task.color} opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500 rounded-2xl`}></div>
                
                {/* Card Container */}
                <div className="relative">
                  <div className={`bg-gradient-to-br from-white/[0.15] via-white/[0.08] to-white/[0.02] 
                    border-2 border-white/20 group-hover:border-white/50 rounded-2xl transition-all duration-500 backdrop-blur-2xl
                    group-hover:scale-105 shadow-2xl overflow-hidden`}>
                    
                    {/* Content */}
                    <div className="relative p-6">
                      {/* Icon with count badge */}
                      <div className="relative mb-6 inline-block">
                        <div className={`absolute inset-0 bg-gradient-to-br ${task.color} rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500`}></div>
                        <div className={`relative w-18 h-18 rounded-xl bg-gradient-to-br ${task.color} flex items-center justify-center shadow-2xl 
                          border-3 border-white/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                          <span className="text-4xl">{task.icon}</span>
                        </div>
                        
                        {/* Count Badge */}
                        {task.count && (
                          <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${task.color} 
                            flex items-center justify-center border-2 border-white shadow-2xl animate-pulse`}>
                            <span className="text-sm font-black">{task.count}</span>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-black mb-2 group-hover:text-white transition-colors leading-tight">
                        {task.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-white/70 leading-relaxed group-hover:text-white/95 transition-colors mb-4">
                        {task.description}
                      </p>

                      {/* Action Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10 group-hover:border-white/30 transition-colors">
                        <span className="text-xs text-white/50 font-medium group-hover:text-white/80 transition-colors">
                          {task.count ? `${task.count} items` : 'Get started'}
                        </span>
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${task.color} flex items-center justify-center 
                          opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all duration-300 shadow-xl border-2 border-white/20`}>
                          <span className="text-xl font-bold">→</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${task.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-24 px-10 py-8 border-t border-white/10 bg-black/80 backdrop-blur-2xl">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          <p className="text-sm text-white/50">© 2024 DSE 2.0 - Digital Software Engineering Platform</p>
          <div className="flex items-center gap-10 text-sm text-white/50">
            <button className="hover:text-white transition-colors hover:underline">Help Center</button>
            <button className="hover:text-white transition-colors hover:underline">Contact Support</button>
            <button className="hover:text-white transition-colors hover:underline">Privacy Policy</button>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BusinessUserLanding;