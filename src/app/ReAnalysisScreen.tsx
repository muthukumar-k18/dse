import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import dseIcon from 'figma:asset/ac36418389efbbd4594c3c5c157a4e642d9e0ea9.png';
import { projectRepository } from '../utils/projectRepository';

const ReAnalysisScreen = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [selectedTab, setSelectedTab] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (projectId) {
      const projectData = projectRepository.getProjectById(Number(projectId));
      setProject(projectData);
    }
  }, [projectId]);

  const tabs = [
    {
      id: 're-analyse-steps',
      name: 'Re-analyse the Steps',
      icon: '🔍',
      color: 'from-yellow-500 to-amber-500',
      description: 'Deep analysis of migration steps, code complexity, and technical dependencies',
      status: 'pending',
      details: {
        codeAnalysis: 'Static and dynamic code analysis in progress',
        complexityScore: '78/100 (Medium-High complexity)',
        dependencies: ['Spring Framework 5.3', 'Hibernate 5.4', 'JDK 11'],
        technicalDebt: '142 issues identified',
        migrationSteps: '23 steps identified',
        estimatedEffort: '320 person-hours'
      }
    },
    {
      id: 'map-agents',
      name: 'Map Agents to Steps',
      icon: '🤖',
      color: 'from-purple-500 to-violet-500',
      description: 'Assign AI agents to specific migration tasks and automation workflows',
      status: 'pending',
      details: {
        availableAgents: ['Code Analyzer Agent', 'JDK Migration Agent', 'Spring Boot Migrator', 'Database Transformer', 'Test Generator', 'Documentation Agent'],
        mappingStrategy: 'Skill-based assignment',
        automationLevel: '65% automated, 35% human-assisted',
        parallelization: '8 agents can run in parallel',
        agentCapabilities: 'Multi-language support, AI-driven refactoring',
        estimatedTime: 'Reduced from 320 to 112 hours with agents'
      }
    },
    {
      id: 'finalise-agents',
      name: 'Finalise Agents',
      icon: '✅',
      color: 'from-teal-500 to-cyan-500',
      description: 'Review agent assignments, set autonomy levels, and approve execution plan',
      status: 'pending',
      details: {
        agentsSelected: '6 agents configured',
        autonomyLevels: 'Level 1-5 scale (configurable per agent)',
        approvalWorkflow: 'Human approval required for Level 4-5',
        executionPlan: 'Sequential with parallel optimization',
        monitoring: 'Real-time progress tracking enabled',
        rollbackStrategy: 'Automatic rollback on critical failures'
      }
    }
  ];

  const handleTabClick = (tab) => {
    setSelectedTab(selectedTab?.id === tab.id ? null : tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0118] via-[#1a0a2e] to-[#0a0118] text-white">
      {/* Top Navigation Bar */}
      <div className="bg-gradient-to-r from-black/80 via-yellow-900/20 to-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Back Button */}
              <button 
                onClick={() => navigate(`/project-pipeline/${projectId}`)}
                className="p-2.5 hover:bg-white/10 rounded-xl transition-all border border-white/10"
              >
                <span className="text-xl">←</span>
              </button>

              {/* DSE 2.0 Icon - Navigate to Landing */}
              <button
                onClick={() => navigate('/')}
                className="group relative transition-all hover:scale-105"
              >
                <img 
                  src={dseIcon} 
                  alt="DSE 2.0" 
                  className="h-10 w-auto drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(239,68,68,0.8)] transition-all"
                />
              </button>

              {/* Title */}
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
                  Re-Analysis & Agent Mapping
                </h1>
                <p className="text-xs text-white/50">Stage 7.2 • Migration Intelligence</p>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-white">Pramod Nair</p>
                <p className="text-xs text-white/50">Migration Expert</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-sm font-bold shadow-lg shadow-orange-500/30">
                PN
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12 pb-32">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="text-6xl mb-4">🔍</div>
          </div>
          {project && (
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg font-bold text-sm shadow-lg shadow-red-500/30">
                REM ID: {project.remId}
              </span>
            </div>
          )}
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
            Deep Dive Re-Analysis
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Analyze migration complexity, map AI agents to tasks, and finalize automation strategy
          </p>
        </div>

        {/* Circular Tabs - 3 circles in a row */}
        <div className="flex justify-center gap-16 max-w-5xl mx-auto mb-16">
          {tabs.map((tab, index) => (
            <div key={tab.id} className="flex flex-col items-center">
              {/* Circular Button */}
              <button
                onClick={() => handleTabClick(tab)}
                className={`relative group transition-all duration-500 ${
                  selectedTab?.id === tab.id ? 'scale-110' : 'scale-100 hover:scale-105'
                }`}
              >
                {/* Glow Effect */}
                {selectedTab?.id === tab.id && (
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${tab.color} opacity-30 blur-2xl animate-pulse`} />
                )}
                
                {/* Main Circle */}
                <div className={`relative w-52 h-52 rounded-full bg-gradient-to-br ${tab.color} flex flex-col items-center justify-center shadow-2xl border-4 transition-all duration-500 ${
                  selectedTab?.id === tab.id 
                    ? 'border-white shadow-[0_0_40px_rgba(255,255,255,0.4)]' 
                    : 'border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.3)]'
                }`}>
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-200 flex items-center justify-center text-black font-bold text-lg border-2 border-white shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="text-6xl mb-3">{tab.icon}</div>
                  
                  {/* Name */}
                  <div className="text-center px-4">
                    <p className="font-bold text-lg leading-tight">{tab.name}</p>
                  </div>

                  {/* Status Badge */}
                  <div className={`absolute -bottom-3 px-4 py-1.5 rounded-full text-xs font-bold ${
                    tab.status === 'completed' ? 'bg-green-500 text-white' :
                    tab.status === 'in-progress' ? 'bg-orange-500 text-white' :
                    'bg-white/20 text-white/80'
                  } backdrop-blur-sm border border-white/30 shadow-lg`}>
                    {tab.status === 'completed' ? '✓ Completed' : 
                     tab.status === 'in-progress' ? '⚡ In Progress' : 
                     '○ Pending'}
                  </div>
                </div>
              </button>

              {/* Description */}
              <p className="text-center text-sm text-white/50 mt-8 max-w-xs">
                {tab.description}
              </p>
            </div>
          ))}
        </div>

        {/* Connecting Lines Between Circles */}
        <div className="flex justify-center gap-16 max-w-5xl mx-auto mb-8 -mt-12">
          <div className="w-52" />
          <div className="flex items-center justify-center">
            <div className="h-0.5 w-16 bg-gradient-to-r from-yellow-500 to-purple-500" />
          </div>
          <div className="w-52" />
          <div className="flex items-center justify-center">
            <div className="h-0.5 w-16 bg-gradient-to-r from-purple-500 to-teal-500" />
          </div>
          <div className="w-52" />
        </div>

        {/* Details Panel - Shows when a tab is selected */}
        {selectedTab && (
          <div className="max-w-5xl mx-auto mt-8 animate-[fadeIn_0.3s_ease-in-out]">
            <div className={`bg-gradient-to-br ${selectedTab.color} p-1 rounded-2xl shadow-2xl`}>
              <div className="bg-[#0a0118] rounded-xl p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${selectedTab.color} flex items-center justify-center text-3xl shadow-lg`}>
                      {selectedTab.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedTab.name}</h3>
                      <p className="text-white/60">{selectedTab.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTab(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedTab.details).map(([key, value]) => (
                    <div key={key} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-xs text-white/40 uppercase mb-2 font-semibold tracking-wider">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <div className="text-white">
                        {Array.isArray(value) ? (
                          <ul className="space-y-1">
                            {value.map((item, idx) => (
                              <li key={idx} className="text-sm flex items-center gap-2">
                                <span className="text-amber-400">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm font-semibold">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button 
                    onClick={() => {
                      if (selectedTab.id === 're-analyse-steps') {
                        navigate(`/re-analyse-steps-detail/${projectId}`);
                      }
                    }}
                    className={`flex-1 py-3 bg-gradient-to-r ${selectedTab.color} hover:opacity-90 rounded-lg font-bold text-white transition-all shadow-lg`}
                  >
                    {selectedTab.id === 're-analyse-steps' ? 'View Patterns & Steps' : `Start ${selectedTab.name}`}
                  </button>
                  <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-white transition-all border border-white/20">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Re-Analysis Progress</h3>
              <span className="text-sm text-white/50">0 of 3 steps completed</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-500 via-purple-500 to-teal-500 rounded-full transition-all duration-500" style={{ width: '0%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-black/80 via-yellow-900/20 to-black/80 backdrop-blur-xl border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-sm text-white/60">0 of 3 steps configured</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(`/project-pipeline/${projectId}`)}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg font-semibold text-white transition-all border border-white/20"
            >
              Save & Exit
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg font-bold text-white transition-all shadow-lg shadow-green-500/30">
              Complete Re-Analysis →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
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

export default ReAnalysisScreen;