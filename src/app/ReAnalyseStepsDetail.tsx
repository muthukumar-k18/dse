import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import dseIcon from 'figma:asset/ac36418389efbbd4594c3c5c157a4e642d9e0ea9.png';
import { projectRepository } from '../utils/projectRepository';

const ReAnalyseStepsDetail = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [expandedPattern, setExpandedPattern] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (projectId) {
      const projectData = projectRepository.getProjectById(Number(projectId));
      setProject(projectData);
    }
  }, [projectId]);

  const patterns = [
    {
      id: 'pattern-1',
      name: 'JDK 8 to JDK 17 Migration',
      complexity: 'High',
      icon: '☕',
      color: 'from-orange-500 to-red-500',
      description: 'Upgrade Java runtime from version 8 to 17 with modern features',
      impact: 'Critical',
      estimatedEffort: '48 hours',
      steps: [
        {
          id: 'step-1.1',
          name: 'Analyze deprecated APIs and replacements',
          description: 'Scan codebase for deprecated JDK 8 APIs and identify JDK 17 alternatives',
          automationLevel: 'High',
          estimatedTime: '6 hours',
          dependencies: []
        },
        {
          id: 'step-1.2',
          name: 'Update module system for JPMS compatibility',
          description: 'Refactor code to support Java Platform Module System (Project Jigsaw)',
          automationLevel: 'Medium',
          estimatedTime: '12 hours',
          dependencies: ['step-1.1']
        },
        {
          id: 'step-1.3',
          name: 'Replace removed/deprecated features',
          description: 'Update CORBA, Java EE modules, and other removed features',
          automationLevel: 'Medium',
          estimatedTime: '14 hours',
          dependencies: ['step-1.1']
        },
        {
          id: 'step-1.4',
          name: 'Update third-party libraries',
          description: 'Upgrade dependencies to JDK 17 compatible versions',
          automationLevel: 'High',
          estimatedTime: '8 hours',
          dependencies: ['step-1.3']
        },
        {
          id: 'step-1.5',
          name: 'Performance optimization and testing',
          description: 'Leverage JDK 17 performance improvements and validate',
          automationLevel: 'Low',
          estimatedTime: '8 hours',
          dependencies: ['step-1.4']
        }
      ]
    },
    {
      id: 'pattern-2',
      name: 'Spring Framework 4.x to Spring Boot 3.x',
      complexity: 'High',
      icon: '🍃',
      color: 'from-green-500 to-emerald-500',
      description: 'Modernize Spring Framework to latest Boot version with native support',
      impact: 'Critical',
      estimatedEffort: '64 hours',
      steps: [
        {
          id: 'step-2.1',
          name: 'Convert XML config to Java-based configuration',
          description: 'Migrate all XML bean definitions to @Configuration classes',
          automationLevel: 'High',
          estimatedTime: '10 hours',
          dependencies: []
        },
        {
          id: 'step-2.2',
          name: 'Migrate to Spring Boot autoconfiguration',
          description: 'Replace manual configurations with Spring Boot starters',
          automationLevel: 'Medium',
          estimatedTime: '16 hours',
          dependencies: ['step-2.1']
        },
        {
          id: 'step-2.3',
          name: 'Update Spring Security to 6.x',
          description: 'Refactor security configurations for latest version',
          automationLevel: 'Low',
          estimatedTime: '12 hours',
          dependencies: ['step-2.2']
        },
        {
          id: 'step-2.4',
          name: 'Migrate to Spring Data JPA 3.x',
          description: 'Update repository interfaces and query methods',
          automationLevel: 'High',
          estimatedTime: '14 hours',
          dependencies: ['step-2.2']
        },
        {
          id: 'step-2.5',
          name: 'Enable native compilation support',
          description: 'Configure GraalVM native image generation',
          automationLevel: 'Low',
          estimatedTime: '12 hours',
          dependencies: ['step-2.3', 'step-2.4']
        }
      ]
    },
    {
      id: 'pattern-3',
      name: 'QA/Regression Testing Preparation',
      complexity: 'Medium',
      icon: '🧪',
      color: 'from-blue-500 to-cyan-500',
      description: 'Automated testing framework setup with comprehensive test coverage',
      impact: 'High',
      estimatedEffort: '40 hours',
      steps: [
        {
          id: 'step-3.1',
          name: 'Set up JUnit 5 testing framework',
          description: 'Configure JUnit Jupiter for unit and integration testing',
          automationLevel: 'High',
          estimatedTime: '6 hours',
          dependencies: []
        },
        {
          id: 'step-3.2',
          name: 'Create unit test templates',
          description: 'Generate test templates for all service and repository classes',
          automationLevel: 'High',
          estimatedTime: '12 hours',
          dependencies: ['step-3.1']
        },
        {
          id: 'step-3.3',
          name: 'Implement integration test suite',
          description: 'Build end-to-end integration tests for critical workflows',
          automationLevel: 'Medium',
          estimatedTime: '14 hours',
          dependencies: ['step-3.2']
        },
        {
          id: 'step-3.4',
          name: 'Configure regression testing automation',
          description: 'Set up automated regression test execution pipeline',
          automationLevel: 'Medium',
          estimatedTime: '8 hours',
          dependencies: ['step-3.3']
        }
      ]
    },
    {
      id: 'pattern-4',
      name: 'RESTful API Modernization',
      complexity: 'Medium',
      icon: '🔌',
      color: 'from-purple-500 to-pink-500',
      description: 'Upgrade API endpoints to OpenAPI 3.0 with async support',
      impact: 'Medium',
      estimatedEffort: '28 hours',
      steps: [
        {
          id: 'step-4.1',
          name: 'Generate OpenAPI 3.0 specifications',
          description: 'Document all REST endpoints with OpenAPI annotations',
          automationLevel: 'High',
          estimatedTime: '8 hours',
          dependencies: []
        },
        {
          id: 'step-4.2',
          name: 'Implement reactive endpoints with WebFlux',
          description: 'Convert blocking endpoints to reactive patterns',
          automationLevel: 'Medium',
          estimatedTime: '12 hours',
          dependencies: ['step-4.1']
        },
        {
          id: 'step-4.3',
          name: 'Add versioning and deprecation strategy',
          description: 'Implement API versioning mechanism',
          automationLevel: 'Low',
          estimatedTime: '8 hours',
          dependencies: ['step-4.2']
        }
      ]
    }
  ];

  const togglePattern = (patternId) => {
    setExpandedPattern(expandedPattern === patternId ? null : patternId);
  };

  const totalPatterns = patterns.length;
  const totalSteps = patterns.reduce((sum, pattern) => sum + pattern.steps.length, 0);
  const totalEffort = patterns.reduce((sum, pattern) => {
    const hours = parseInt(pattern.estimatedEffort);
    return sum + hours;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0118] via-[#1a0a2e] to-[#0a0118] text-white">
      {/* Top Navigation Bar */}
      <div className="bg-gradient-to-r from-black/80 via-yellow-900/20 to-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Back Button */}
              <button 
                onClick={() => navigate(`/re-analysis-screen/${projectId}`)}
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
                <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
                  Re-analyse the Steps
                </h1>
                <p className="text-xs text-white/50">Step 1 of 3 • Pattern Analysis & Execution Steps</p>
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
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center text-3xl shadow-lg shadow-yellow-500/30">
              🔍
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
                Identified Migration Patterns
              </h2>
              <p className="text-white/60">
                {totalPatterns} patterns identified with {totalSteps} execution steps • Estimated {totalEffort} hours
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-yellow-400">{totalPatterns}</div>
              <div className="text-xs text-white/50">Patterns Found</div>
            </div>
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-400">{totalSteps}</div>
              <div className="text-xs text-white/50">Total Steps</div>
            </div>
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-orange-400">{totalEffort}h</div>
              <div className="text-xs text-white/50">Estimated Effort</div>
            </div>
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-400">78%</div>
              <div className="text-xs text-white/50">Automation Level</div>
            </div>
          </div>
        </div>

        {/* Patterns List */}
        <div className="space-y-4">
          {patterns.map((pattern, index) => (
            <div
              key={pattern.id}
              className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
            >
              {/* Pattern Header */}
              <button
                onClick={() => togglePattern(pattern.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-white/[0.02] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${pattern.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {pattern.icon}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-white">{pattern.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        pattern.complexity === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        pattern.complexity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {pattern.complexity}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        pattern.impact === 'Critical' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                        pattern.impact === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {pattern.impact} Impact
                      </span>
                    </div>
                    <p className="text-sm text-white/60">{pattern.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-white/40">
                      <span>🎯 {pattern.steps.length} steps</span>
                      <span>⏱️ {pattern.estimatedEffort}</span>
                    </div>
                  </div>
                </div>
                <div className={`text-2xl transition-transform duration-300 ${
                  expandedPattern === pattern.id ? 'rotate-180' : ''
                }`}>
                  ▼
                </div>
              </button>

              {/* Execution Steps */}
              {expandedPattern === pattern.id && (
                <div className="px-6 pb-6 animate-[fadeIn_0.3s_ease-in-out]">
                  <div className="border-t border-white/10 pt-4">
                    <div className="space-y-3">
                      {pattern.steps.map((step, stepIndex) => (
                        <div
                          key={step.id}
                          className="bg-white/[0.02] border border-white/10 rounded-xl p-4 hover:bg-white/[0.04] transition-all"
                        >
                          <div className="flex items-start gap-4">
                            {/* Step Number */}
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {stepIndex + 1}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-white">{step.name}</h4>
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                                    step.automationLevel === 'High' ? 'bg-green-500/20 text-green-400' :
                                    step.automationLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-red-500/20 text-red-400'
                                  }`}>
                                    🤖 {step.automationLevel} Auto
                                  </span>
                                  <span className="px-2 py-1 rounded-lg text-xs font-bold bg-blue-500/20 text-blue-400">
                                    ⏱️ {step.estimatedTime}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-white/60 mb-2">{step.description}</p>
                              {step.dependencies.length > 0 && (
                                <div className="flex items-center gap-2 text-xs text-white/40">
                                  <span>📋 Dependencies:</span>
                                  <span>{step.dependencies.join(', ')}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-black/80 via-yellow-900/20 to-black/80 backdrop-blur-xl border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-white/60">{totalPatterns} patterns analyzed • {totalSteps} steps identified</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(`/re-analysis-screen/${projectId}`)}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg font-semibold text-white transition-all border border-white/20"
            >
              Back to Overview
            </button>
            <button 
              onClick={() => navigate(`/map-agents-to-steps/${projectId}`)}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 rounded-lg font-bold text-white transition-all shadow-lg shadow-purple-500/30 flex items-center gap-2"
            >
              Next: Map Agents to Steps →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
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

export default ReAnalyseStepsDetail;