import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import dseIcon from 'figma:asset/ac36418389efbbd4594c3c5c157a4e642d9e0ea9.png';
import { projectRepository } from '../utils/projectRepository';

const FinaliseAgents = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [backlogConfirmed, setBacklogConfirmed] = useState(false);
  const [allPatterns, setAllPatterns] = useState([]);
  const [project, setProject] = useState(null);

  // Load matched patterns data from previous page
  useEffect(() => {
    const storedData = localStorage.getItem(`agent-match-results-${projectId}`);
    if (storedData) {
      const matchResults = JSON.parse(storedData);
      setAllPatterns(matchResults.patterns);
    } else {
      // Fallback to empty array if no data found
      setAllPatterns([]);
    }
  }, [projectId]);

  // Load project data from projectRepository
  useEffect(() => {
    if (projectId) {
      const projectData = projectRepository.getProjectById(Number(projectId));
      setProject(projectData);
    }
  }, [projectId]);

  // Simulated data from previous page - in real app this would come from state/context
  const allPatternsHardcoded = [
    {
      id: 'pattern-1',
      name: 'JDK 8 to JDK 17 Migration',
      icon: '☕',
      color: 'from-orange-500 to-red-500',
      description: 'Upgrade Java runtime from version 8 to 17 with modern features',
      suggestedAgent: 'JDK Migration Agent v3.2',
      agentVersion: 'v3.2.1',
      totalSteps: 5,
      matchedSteps: 5,
      matchPercentage: 100,
      estimatedEffort: '48 hours'
    },
    {
      id: 'pattern-2',
      name: 'Spring Framework 4.x to Spring Boot 3.x',
      icon: '🍃',
      color: 'from-green-500 to-emerald-500',
      description: 'Modernize Spring Framework to latest Boot version with native support',
      suggestedAgent: 'Spring Boot Migrator Pro',
      agentVersion: 'v2.5.0',
      totalSteps: 5,
      matchedSteps: 5,
      matchPercentage: 100,
      estimatedEffort: '64 hours'
    },
    {
      id: 'pattern-3',
      name: 'QA/Regression Testing Preparation',
      icon: '🧪',
      color: 'from-blue-500 to-cyan-500',
      description: 'Automated testing framework setup with comprehensive test coverage',
      suggestedAgent: 'Test Automation Specialist',
      agentVersion: 'v2.3.1',
      totalSteps: 4,
      matchedSteps: 4,
      matchPercentage: 100,
      estimatedEffort: '40 hours'
    },
    {
      id: 'pattern-4',
      name: 'RESTful API Modernization',
      icon: '🔌',
      color: 'from-purple-500 to-pink-500',
      description: 'Upgrade API endpoints to OpenAPI 3.0 with async support',
      suggestedAgent: null,
      agentVersion: null,
      totalSteps: 3,
      matchedSteps: 0,
      matchPercentage: 0,
      estimatedEffort: '28 hours'
    }
  ];

  const selectedPatterns = allPatterns.filter(p => p.matchPercentage === 100);
  const unsupportedPatterns = allPatterns.filter(p => p.matchPercentage < 100);

  const totalSelectedEffort = selectedPatterns.reduce((sum, p) => sum + parseInt(p.estimatedEffort), 0);
  const totalUnsupportedEffort = unsupportedPatterns.reduce((sum, p) => sum + parseInt(p.estimatedEffort), 0);

  const handleMoveToBacklog = () => {
    // Store unsupported patterns in backlog (localStorage for now, DB in production)
    const backlogData = {
      projectId,
      patterns: unsupportedPatterns,
      movedAt: new Date().toISOString(),
      reason: 'Agentic capability not supported'
    };
    
    localStorage.setItem(`backlog-${projectId}`, JSON.stringify(backlogData));
    setBacklogConfirmed(true);
    
    // Show confirmation message
    setTimeout(() => {
      setBacklogConfirmed(false);
    }, 3000);
  };

  const handleProceedToRemediation = () => {
    // Store selected patterns data in localStorage (would be DB in production)
    const selectedPatternsData = {
      projectId,
      patterns: selectedPatterns,
      totalEffort: totalSelectedEffort,
      selectedAt: new Date().toISOString(),
      status: 'ready_for_remediation'
    };
    
    localStorage.setItem(`selected-patterns-${projectId}`, JSON.stringify(selectedPatternsData));
    
    // Update Re-Analysis stage progress to 100%
    const reAnalysisProgress = {
      stageId: '7.2',
      percentage: 100,
      completedAt: new Date().toISOString(),
      selectedPatterns: selectedPatterns.map(p => p.id),
      unsupportedPatterns: unsupportedPatterns.map(p => p.id)
    };
    
    localStorage.setItem(`reanalysis-${projectId}`, JSON.stringify(reAnalysisProgress));
    
    // Navigate back to the circular pipeline first
    navigate(`/project-pipeline/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0118] via-[#1a0a2e] to-[#0a0118] text-white">
      {/* Top Navigation Bar */}
      <div className="bg-gradient-to-r from-black/80 via-green-900/20 to-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Back Button */}
              <button 
                onClick={() => navigate(`/map-agents-to-steps/${projectId}`)}
                className="p-2.5 hover:bg-white/10 rounded-xl transition-all border border-white/10"
              >
                <span className="text-xl">←</span>
              </button>

              {/* DSE 2.0 Icon */}
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
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                  Finalise Agents
                </h1>
                <p className="text-xs text-white/50">Step 3 of 3 • Agent Selection & Approval</p>
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
        {/* Header */}
        <div className="mb-8">
          {project && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg font-bold text-sm shadow-lg shadow-red-500/30">
                REM ID: {project.remId}
              </span>
            </div>
          )}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-3xl shadow-lg shadow-green-500/30">
              ✅
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                Agent Selection Summary
              </h2>
              <p className="text-white/60">
                {selectedPatterns.length} patterns ready for automated migration • {unsupportedPatterns.length} require manual intervention
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400">{selectedPatterns.length}</div>
              <div className="text-xs text-white/50">Patterns Selected</div>
            </div>
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-400">{unsupportedPatterns.length}</div>
              <div className="text-xs text-white/50">Unsupported</div>
            </div>
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-cyan-400">{totalSelectedEffort}h</div>
              <div className="text-xs text-white/50">Automated Effort</div>
            </div>
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-400">
                {Math.round((selectedPatterns.length / allPatterns.length) * 100)}%
              </div>
              <div className="text-xs text-white/50">Coverage Rate</div>
            </div>
          </div>
        </div>

        {/* Selected Patterns - 100% Match */}
        {selectedPatterns.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-xl">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-green-400">
                Ready for Automated Migration ({selectedPatterns.length})
              </h3>
            </div>
            <div className="space-y-3">
              {selectedPatterns.map((pattern) => (
                <div
                  key={pattern.id}
                  className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/40 rounded-xl p-6 hover:border-green-400/60 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${pattern.color} flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>
                      {pattern.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-xl font-bold text-white">{pattern.name}</h4>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-500/40">
                              ✓ 100% Match
                            </span>
                          </div>
                          <p className="text-sm text-white/60 mb-3">{pattern.description}</p>
                        </div>
                      </div>

                      {/* Agent Info */}
                      <div className="bg-black/30 rounded-lg p-4 mb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">🤖</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-green-300">{pattern.suggestedAgent}</span>
                                <span className="px-2 py-0.5 rounded text-xs bg-green-500/30 text-green-200">
                                  {pattern.agentVersion}
                                </span>
                              </div>
                              <p className="text-xs text-white/50">All capabilities matched</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-400">
                              {pattern.matchedSteps}/{pattern.totalSteps} Steps
                            </div>
                            <div className="text-xs text-white/50">{pattern.estimatedEffort}</div>
                          </div>
                        </div>
                      </div>

                      {/* Success Indicators */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-green-400">
                          <span>✓</span>
                          <span>Full automation supported</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-400">
                          <span>✓</span>
                          <span>All steps validated</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-400">
                          <span>✓</span>
                          <span>Ready for remediation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unsupported Patterns */}
        {unsupportedPatterns.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-xl">
                  ⚠️
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-red-400">
                    Agentic Capability Not Supported ({unsupportedPatterns.length})
                  </h3>
                  <p className="text-white/60 text-sm">
                    These patterns require manual intervention or additional agent capabilities
                  </p>
                </div>
              </div>
              <button
                onClick={handleMoveToBacklog}
                disabled={backlogConfirmed}
                className={`px-6 py-3 rounded-lg font-bold transition-all shadow-lg flex items-center gap-2 ${
                  backlogConfirmed
                    ? 'bg-green-500/20 text-green-300 border-2 border-green-500/50'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-orange-500/30'
                }`}
              >
                {backlogConfirmed ? (
                  <>
                    <span>✓</span>
                    <span>Moved to Backlog</span>
                  </>
                ) : (
                  <>
                    <span>📋</span>
                    <span>Move to Backlog</span>
                  </>
                )}
              </button>
            </div>
            <div className="space-y-3">
              {unsupportedPatterns.map((pattern) => (
                <div
                  key={pattern.id}
                  className="bg-gradient-to-br from-red-500/5 to-orange-500/5 border-2 border-red-500/30 rounded-xl p-6 hover:border-red-400/40 transition-all opacity-60"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${pattern.color} flex items-center justify-center text-3xl shadow-lg flex-shrink-0 opacity-50`}>
                      {pattern.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-xl font-bold text-white/80">{pattern.name}</h4>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                              ✗ {pattern.matchPercentage}% Match
                            </span>
                          </div>
                          <p className="text-sm text-white/50 mb-3">{pattern.description}</p>
                        </div>
                      </div>

                      {/* Agent Info */}
                      <div className="bg-black/20 rounded-lg p-4 mb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl opacity-50">🤖</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-red-300">{pattern.suggestedAgent}</span>
                                <span className="px-2 py-0.5 rounded text-xs bg-red-500/30 text-red-200">
                                  {pattern.agentVersion}
                                </span>
                              </div>
                              <p className="text-xs text-white/40">Partial capability match</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-red-400">
                              {pattern.matchedSteps}/{pattern.totalSteps} Steps
                            </div>
                            <div className="text-xs text-white/50">{pattern.estimatedEffort}</div>
                          </div>
                        </div>
                      </div>

                      {/* Warning Indicators */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-red-400">
                          <span>✗</span>
                          <span>Manual intervention required</span>
                        </div>
                        <div className="flex items-center gap-2 text-orange-400">
                          <span>⚠️</span>
                          <span>{pattern.totalSteps - pattern.matchedSteps} steps unmatched</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-black/80 via-green-900/20 to-black/80 backdrop-blur-xl border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-white/60">
                {selectedPatterns.length} patterns selected • {totalSelectedEffort}h automated effort
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(`/map-agents-to-steps/${projectId}`)}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg font-semibold text-white transition-all border border-white/20"
            >
              Back to Matching
            </button>
            <button 
              onClick={handleProceedToRemediation}
              disabled={selectedPatterns.length === 0}
              className={`px-6 py-2.5 rounded-lg font-bold text-white transition-all shadow-lg flex items-center gap-2 ${
                selectedPatterns.length === 0
                  ? 'bg-gray-500/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-green-500/30'
              }`}
            >
              <span>Proceed to Remediation with Selected Agents</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinaliseAgents;