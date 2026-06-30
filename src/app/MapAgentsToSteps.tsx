import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import dseIcon from 'figma:asset/ac36418389efbbd4594c3c5c157a4e642d9e0ea9.png';
import { projectRepository } from '../utils/projectRepository';

const MapAgentsToSteps = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [expandedPattern, setExpandedPattern] = useState(null);
  const [isMatching, setIsMatching] = useState(false);
  const [matchingComplete, setMatchingComplete] = useState(false);
  const [matchingProgress, setMatchingProgress] = useState(0);
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
      suggestedAgent: 'JDK Migration Agent v3.2',
      agentCapabilities: ['Java Analysis', 'API Migration', 'Dependency Management', 'Code Refactoring', 'Module System', 'Performance Analysis', 'Testing'],
      agentVersion: 'v3.2.1',
      agentType: 'Specialized',
      steps: [
        {
          id: 'step-1.1',
          name: 'Analyze deprecated APIs and replacements',
          description: 'Scan codebase for deprecated JDK 8 APIs and identify JDK 17 alternatives',
          automationLevel: 'High',
          estimatedTime: '6 hours',
          capabilities: ['Java Analysis', 'API Migration'],
          matchStatus: null
        },
        {
          id: 'step-1.2',
          name: 'Update module system for JPMS compatibility',
          description: 'Refactor code to support Java Platform Module System (Project Jigsaw)',
          automationLevel: 'Medium',
          estimatedTime: '12 hours',
          capabilities: ['Code Refactoring', 'Module System'],
          matchStatus: null
        },
        {
          id: 'step-1.3',
          name: 'Replace removed/deprecated features',
          description: 'Update CORBA, Java EE modules, and other removed features',
          automationLevel: 'Medium',
          estimatedTime: '14 hours',
          capabilities: ['API Migration', 'Code Refactoring'],
          matchStatus: null
        },
        {
          id: 'step-1.4',
          name: 'Update third-party libraries',
          description: 'Upgrade dependencies to JDK 17 compatible versions',
          automationLevel: 'High',
          estimatedTime: '8 hours',
          capabilities: ['Dependency Management'],
          matchStatus: null
        },
        {
          id: 'step-1.5',
          name: 'Performance optimization and testing',
          description: 'Leverage JDK 17 performance improvements and validate',
          automationLevel: 'Low',
          estimatedTime: '8 hours',
          capabilities: ['Performance Analysis', 'Testing'],
          matchStatus: null
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
      suggestedAgent: 'Spring Boot Migrator Pro',
      agentCapabilities: ['Spring Framework', 'Configuration Migration', 'Dependency Management', 'Security Updates', 'Database Migration', 'Native Compilation', 'Performance Analysis'],
      agentVersion: 'v2.5.0',
      agentType: 'Specialized',
      steps: [
        {
          id: 'step-2.1',
          name: 'Convert XML config to Java-based configuration',
          description: 'Migrate all XML bean definitions to @Configuration classes',
          automationLevel: 'High',
          estimatedTime: '10 hours',
          capabilities: ['Configuration Migration', 'Spring Framework'],
          matchStatus: null
        },
        {
          id: 'step-2.2',
          name: 'Migrate to Spring Boot autoconfiguration',
          description: 'Replace manual configurations with Spring Boot starters',
          automationLevel: 'Medium',
          estimatedTime: '16 hours',
          capabilities: ['Spring Framework', 'Dependency Management'],
          matchStatus: null
        },
        {
          id: 'step-2.3',
          name: 'Update Spring Security to 6.x',
          description: 'Refactor security configurations for latest version',
          automationLevel: 'Low',
          estimatedTime: '12 hours',
          capabilities: ['Security Updates', 'Spring Framework'],
          matchStatus: null
        },
        {
          id: 'step-2.4',
          name: 'Migrate to Spring Data JPA 3.x',
          description: 'Update repository interfaces and query methods',
          automationLevel: 'High',
          estimatedTime: '14 hours',
          capabilities: ['Spring Framework', 'Database Migration'],
          matchStatus: null
        },
        {
          id: 'step-2.5',
          name: 'Enable native compilation support',
          description: 'Configure GraalVM native image generation',
          automationLevel: 'Low',
          estimatedTime: '12 hours',
          capabilities: ['Native Compilation', 'Performance Analysis'],
          matchStatus: null
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
      suggestedAgent: 'Test Automation Specialist',
      agentCapabilities: ['JUnit 5', 'Test Generation', 'Integration Testing', 'Regression Testing', 'Test Coverage Analysis'],
      agentVersion: 'v2.3.1',
      agentType: 'Specialized',
      steps: [
        {
          id: 'step-3.1',
          name: 'Set up JUnit 5 testing framework',
          description: 'Configure JUnit Jupiter for unit and integration testing',
          automationLevel: 'High',
          estimatedTime: '6 hours',
          capabilities: ['JUnit 5', 'Test Generation'],
          matchStatus: null
        },
        {
          id: 'step-3.2',
          name: 'Create unit test templates',
          description: 'Generate test templates for all service and repository classes',
          automationLevel: 'High',
          estimatedTime: '12 hours',
          capabilities: ['Test Generation', 'Test Coverage Analysis'],
          matchStatus: null
        },
        {
          id: 'step-3.3',
          name: 'Implement integration test suite',
          description: 'Build end-to-end integration tests for critical workflows',
          automationLevel: 'Medium',
          estimatedTime: '14 hours',
          capabilities: ['Integration Testing', 'Test Generation'],
          matchStatus: null
        },
        {
          id: 'step-3.4',
          name: 'Configure regression testing automation',
          description: 'Set up automated regression test execution pipeline',
          automationLevel: 'Medium',
          estimatedTime: '8 hours',
          capabilities: ['Regression Testing', 'Test Coverage Analysis'],
          matchStatus: null
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
      suggestedAgent: null, // No agent available
      agentCapabilities: [],
      agentVersion: null,
      agentType: null,
      steps: [
        {
          id: 'step-4.1',
          name: 'Generate OpenAPI 3.0 specifications',
          description: 'Document all REST endpoints with OpenAPI annotations',
          automationLevel: 'High',
          estimatedTime: '8 hours',
          capabilities: ['API Analysis', 'OpenAPI Generation'],
          matchStatus: null
        },
        {
          id: 'step-4.2',
          name: 'Implement reactive endpoints with WebFlux',
          description: 'Convert blocking endpoints to reactive patterns',
          automationLevel: 'Medium',
          estimatedTime: '12 hours',
          capabilities: ['Reactive Programming', 'API Analysis'],
          matchStatus: null
        },
        {
          id: 'step-4.3',
          name: 'Add versioning and deprecation strategy',
          description: 'Implement API versioning mechanism',
          automationLevel: 'Low',
          estimatedTime: '8 hours',
          capabilities: ['API Versioning'],
          matchStatus: null
        }
      ]
    }
  ];

  const [patternsData, setPatternsData] = useState(patterns);

  const togglePattern = (patternId) => {
    setExpandedPattern(expandedPattern === patternId ? null : patternId);
  };

  const handleMatchAgents = () => {
    setIsMatching(true);
    setMatchingProgress(0);

    // Simulate matching process with progress
    const totalSteps = patternsData.reduce((sum, p) => sum + p.steps.length, 0);
    let currentStep = 0;

    const matchInterval = setInterval(() => {
      currentStep++;
      setMatchingProgress((currentStep / totalSteps) * 100);

      if (currentStep >= totalSteps) {
        clearInterval(matchInterval);
        
        // Update all patterns with match results
        const updatedPatterns = patternsData.map(pattern => ({
          ...pattern,
          steps: pattern.steps.map(step => {
            // Check if agent capabilities match step requirements
            const requiredCapabilities = step.capabilities;
            const agentCapabilities = pattern.agentCapabilities;
            
            const matchedCapabilities = requiredCapabilities.filter(cap => 
              agentCapabilities.some(agentCap => 
                agentCap.toLowerCase().includes(cap.toLowerCase()) || 
                cap.toLowerCase().includes(agentCap.toLowerCase())
              )
            );
            
            const matchPercentage = (matchedCapabilities.length / requiredCapabilities.length) * 100;
            
            return {
              ...step,
              matchStatus: {
                isCapable: matchPercentage >= 70,
                matchPercentage: Math.round(matchPercentage),
                matchedCapabilities,
                missingCapabilities: requiredCapabilities.filter(cap => !matchedCapabilities.includes(cap))
              }
            };
          })
        }));

        setPatternsData(updatedPatterns);
        setIsMatching(false);
        setMatchingComplete(true);
      }
    }, 150);
  };

  const totalPatterns = patternsData.length;
  const totalSteps = patternsData.reduce((sum, pattern) => sum + pattern.steps.length, 0);
  const totalAgents = new Set(patternsData.map(p => p.suggestedAgent)).size;
  const matchedSteps = matchingComplete 
    ? patternsData.reduce((sum, pattern) => 
        sum + pattern.steps.filter(s => s.matchStatus?.isCapable).length, 0)
    : 0;

  const handleFinaliseAgents = () => {
    // Store the matched patterns data to be used in the next page
    const matchResultsData = {
      projectId,
      timestamp: new Date().toISOString(),
      patterns: patternsData.map(pattern => {
        const matchedStepsCount = pattern.steps.filter(s => s.matchStatus?.isCapable).length;
        const matchPercentage = Math.round((matchedStepsCount / pattern.steps.length) * 100);
        
        return {
          id: pattern.id,
          name: pattern.name,
          icon: pattern.icon,
          color: pattern.color,
          description: pattern.description,
          suggestedAgent: pattern.suggestedAgent,
          agentVersion: pattern.agentVersion,
          agentType: pattern.agentType,
          totalSteps: pattern.steps.length,
          matchedSteps: matchedStepsCount,
          matchPercentage: matchPercentage,
          estimatedEffort: pattern.steps.reduce((sum, step) => sum + parseInt(step.estimatedTime), 0) + ' hours',
          agentCapabilities: pattern.agentCapabilities,
          steps: pattern.steps.map(step => ({
            id: step.id,
            name: step.name,
            description: step.description,
            automationLevel: step.automationLevel,
            estimatedTime: step.estimatedTime,
            matchStatus: step.matchStatus
          }))
        };
      })
    };
    
    localStorage.setItem(`agent-match-results-${projectId}`, JSON.stringify(matchResultsData));
    
    // Navigate to finalise agents page
    navigate(`/finalise-agents/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0118] via-[#1a0a2e] to-[#0a0118] text-white">
      {/* Top Navigation Bar */}
      <div className="bg-gradient-to-r from-black/80 via-purple-900/20 to-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Back Button */}
              <button 
                onClick={() => navigate(`/re-analyse-steps-detail/${projectId}`)}
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
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                  Map Agents to Steps
                </h1>
                <p className="text-xs text-white/50">Step 2 of 3 • Agent Capability Matching</p>
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
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-3xl shadow-lg shadow-purple-500/30">
              🤖
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                Suggested Agents & Capability Matching
              </h2>
              <p className="text-white/60">
                {totalAgents} agents recommended for {totalPatterns} patterns • {totalSteps} steps to validate
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-400">{totalAgents}</div>
              <div className="text-xs text-white/50">AI Agents</div>
            </div>
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-violet-400">{totalSteps}</div>
              <div className="text-xs text-white/50">Total Steps</div>
            </div>
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-pink-400">
                {matchingComplete ? `${matchedSteps}/${totalSteps}` : '—'}
              </div>
              <div className="text-xs text-white/50">Steps Matched</div>
            </div>
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-cyan-400">
                {matchingComplete ? `${Math.round((matchedSteps/totalSteps)*100)}%` : '—'}
              </div>
              <div className="text-xs text-white/50">Match Rate</div>
            </div>
          </div>
        </div>

        {/* Matching Progress */}
        {isMatching && (
          <div className="mb-6 bg-white/[0.02] border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center animate-spin">
                <div className="w-8 h-8 rounded-full border-4 border-white/20 border-t-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">Matching Agents to Steps...</h3>
                <p className="text-sm text-white/60">Analyzing agent capabilities against step requirements</p>
              </div>
              <div className="text-2xl font-bold text-purple-400">{Math.round(matchingProgress)}%</div>
            </div>
            <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-300 rounded-full"
                style={{ width: `${matchingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Patterns with Agents List */}
        <div className="space-y-4">
          {patternsData.map((pattern, index) => (
            <div
              key={pattern.id}
              className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
            >
              {/* Pattern Header with Agent */}
              <button
                onClick={() => togglePattern(pattern.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-white/[0.02] transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${pattern.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {pattern.icon}
                  </div>
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{pattern.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        pattern.complexity === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        pattern.complexity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {pattern.complexity}
                      </span>
                    </div>
                    
                    {/* Agent Information */}
                    {pattern.suggestedAgent ? (
                      <div className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30 rounded-lg p-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">🤖</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-purple-300">{pattern.suggestedAgent}</span>
                              <span className="px-2 py-0.5 rounded text-xs bg-purple-500/30 text-purple-200">
                                {pattern.agentVersion}
                              </span>
                              <span className="px-2 py-0.5 rounded text-xs bg-violet-500/30 text-violet-200">
                                {pattern.agentType}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {pattern.agentCapabilities.map((cap, idx) => (
                                <span key={idx} className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-white/70">
                                  {cap}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-gray-500/20 to-gray-600/20 border border-gray-500/30 rounded-lg p-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">⚠️</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-gray-300">No Agent Available</span>
                              <span className="px-2 py-0.5 rounded text-xs bg-red-500/30 text-red-200">
                                Manual Review Required
                              </span>
                            </div>
                            <p className="text-xs text-gray-400">This pattern requires custom implementation or manual migration</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span>🎯 {pattern.steps.length} steps</span>
                      {matchingComplete && (
                        <span className={`font-bold ${
                          pattern.steps.filter(s => s.matchStatus?.isCapable).length === pattern.steps.length
                            ? 'text-green-400'
                            : 'text-yellow-400'
                        }`}>
                          ✓ {pattern.steps.filter(s => s.matchStatus?.isCapable).length}/{pattern.steps.length} steps matched
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`text-2xl transition-transform duration-300 ${
                  expandedPattern === pattern.id ? 'rotate-180' : ''
                }`}>
                  ▼
                </div>
              </button>

              {/* Steps with Match Results */}
              {expandedPattern === pattern.id && (
                <div className="px-6 pb-6 animate-[fadeIn_0.3s_ease-in-out]">
                  <div className="border-t border-white/10 pt-4">
                    <div className="space-y-3">
                      {pattern.steps.map((step, stepIndex) => (
                        <div
                          key={step.id}
                          className={`bg-white/[0.02] border rounded-xl p-4 transition-all ${
                            step.matchStatus?.isCapable 
                              ? 'border-green-500/30 bg-green-500/5' 
                              : step.matchStatus?.isCapable === false
                              ? 'border-red-500/30 bg-red-500/5'
                              : 'border-white/10'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            {/* Step Number */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                              step.matchStatus?.isCapable 
                                ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                                : step.matchStatus?.isCapable === false
                                ? 'bg-gradient-to-br from-red-500 to-orange-500'
                                : 'bg-gradient-to-br from-purple-500 to-violet-500'
                            }`}>
                              {stepIndex + 1}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-white">{step.name}</h4>
                                <div className="flex items-center gap-2">
                                  {step.matchStatus && (
                                    <span className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 ${
                                      step.matchStatus.isCapable 
                                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                                    }`}>
                                      {step.matchStatus.isCapable ? '✓ Capable' : '✗ Limited'}
                                      <span className="text-xs">({step.matchStatus.matchPercentage}%)</span>
                                    </span>
                                  )}
                                  <span className="px-2 py-1 rounded-lg text-xs font-bold bg-blue-500/20 text-blue-400">
                                    ⏱️ {step.estimatedTime}
                                  </span>
                                </div>
                              </div>
                              
                              <p className="text-sm text-white/60 mb-3">{step.description}</p>
                              
                              {/* Required Capabilities */}
                              <div className="mb-2">
                                <p className="text-xs text-white/40 mb-1">Required Capabilities:</p>
                                <div className="flex flex-wrap gap-1">
                                  {step.capabilities.map((cap, idx) => {
                                    const isMatched = step.matchStatus?.matchedCapabilities.includes(cap);
                                    return (
                                      <span 
                                        key={idx} 
                                        className={`px-2 py-1 rounded text-xs font-semibold ${
                                          isMatched 
                                            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                            : step.matchStatus
                                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                            : 'bg-white/10 text-white/70'
                                        }`}
                                      >
                                        {isMatched && '✓ '}{cap}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Missing Capabilities Warning */}
                              {step.matchStatus && step.matchStatus.missingCapabilities.length > 0 && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 mt-2">
                                  <p className="text-xs text-red-300">
                                    ⚠️ Missing: {step.matchStatus.missingCapabilities.join(', ')}
                                  </p>
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
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-black/80 via-purple-900/20 to-black/80 backdrop-blur-xl border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                matchingComplete ? 'bg-green-500' : 'bg-purple-500 animate-pulse'
              }`} />
              <span className="text-sm text-white/60">
                {matchingComplete 
                  ? `${matchedSteps}/${totalSteps} steps matched successfully` 
                  : `${totalAgents} agents ready for matching`}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(`/re-analyse-steps-detail/${projectId}`)}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg font-semibold text-white transition-all border border-white/20"
            >
              Back to Steps
            </button>
            {!matchingComplete ? (
              <button 
                onClick={handleMatchAgents}
                disabled={isMatching}
                className={`px-6 py-2.5 rounded-lg font-bold text-white transition-all shadow-lg flex items-center gap-2 ${
                  isMatching
                    ? 'bg-purple-500/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 shadow-purple-500/30'
                }`}
              >
                {isMatching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Matching...
                  </>
                ) : (
                  <>
                    🎯 Match Agents to Steps
                  </>
                )}
              </button>
            ) : (
              <button 
                onClick={handleFinaliseAgents}
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg font-bold text-white transition-all shadow-lg shadow-green-500/30 flex items-center gap-2"
              >
                Finalise Agents →
              </button>
            )}
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

export default MapAgentsToSteps;