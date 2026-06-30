import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { projectRepository } from '../utils/projectRepository';

const ProjectPipeline = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  // Helper function to get Re-Analysis progress from localStorage
  const getReAnalysisProgress = () => {
    if (projectId) {
      const reAnalysisData = localStorage.getItem(`reanalysis-${projectId}`);
      if (reAnalysisData) {
        const data = JSON.parse(reAnalysisData);
        return data.percentage || 42;
      }
    }
    return 42; // Default percentage
  };

  const stages = [
    { 
      id: '3.1', 
      name: 'Initiation and Scoping', 
      icon: '🎯', 
      color: 'from-blue-500 to-cyan-500', 
      percentage: 0,
      summary: 'Project scope defined with key stakeholders. Migration objectives documented including timeline, resources, and success criteria. Technical assessment completed for source and target environments.'
    },
    { 
      id: '4.2', 
      name: 'Scope Sign-off', 
      icon: '✍️', 
      color: 'from-cyan-500 to-teal-500', 
      percentage: 7,
      summary: 'Scope document reviewed and approved by all stakeholders. Change control process established. Migration boundaries and exclusions clearly defined and documented.'
    },
    { 
      id: '4.3', 
      name: 'Bottom Up Estimation', 
      icon: '📊', 
      color: 'from-teal-500 to-emerald-500', 
      percentage: 14,
      summary: 'Detailed estimation completed using bottom-up approach. Work breakdown structure created. Resource requirements and timeline calculated based on technical complexity analysis.'
    },
    { 
      id: '5.3', 
      name: 'Estimation Sign-off', 
      icon: '✅', 
      color: 'from-emerald-500 to-green-500', 
      percentage: 21,
      summary: 'Estimation reviewed and approved by project governance. Budget allocated and timeline confirmed. Resource assignments finalized and team onboarding initiated.'
    },
    { 
      id: '6.1', 
      name: 'Finance Approval', 
      icon: '💰', 
      color: 'from-green-500 to-lime-500', 
      percentage: 28,
      summary: 'Financial approval obtained from finance department. Purchase orders created. Budget tracking mechanisms established. Cost baseline documented for project monitoring.'
    },
    { 
      id: '7.1', 
      name: 'Initiation', 
      icon: '🚀', 
      color: 'from-lime-500 to-yellow-500', 
      percentage: 35,
      summary: 'Migration team assembled and project kickoff completed. Development environments provisioned. Source code repositories cloned and initial technical setup verified.'
    },
    { 
      id: '7.2', 
      name: 'Re-Analysis', 
      icon: '🔍', 
      color: 'from-yellow-500 to-amber-500', 
      percentage: getReAnalysisProgress(),
      summary: 'Deep dive analysis of existing codebase completed. Dependencies mapped and documented. Technical debt identified. Migration strategy refined based on findings.'
    },
    { 
      id: '7.3', 
      name: 'Remediation', 
      icon: '🔧', 
      color: 'from-amber-500 to-orange-500', 
      percentage: 50,
      summary: 'Code remediation completed addressing identified issues. Technical debt resolved. Code refactoring performed to align with target platform best practices.'
    },
    { 
      id: '8.1', 
      name: 'Dev Deployment', 
      icon: '💻', 
      color: 'from-orange-500 to-red-500', 
      percentage: 57,
      summary: 'Migrated code deployed to development environment. Initial smoke tests passed. Development team validation completed. Integration with dependent systems verified.'
    },
    { 
      id: '8.2', 
      name: 'QA Deployment', 
      icon: '🧪', 
      color: 'from-red-500 to-pink-500', 
      percentage: 64,
      summary: 'Application deployed to QA environment. Test data migration completed. QA team access provisioned. Test execution environment fully configured and validated.'
    },
    { 
      id: '8.3', 
      name: 'Regression Testing', 
      icon: '🔄', 
      color: 'from-pink-500 to-purple-500', 
      percentage: 71,
      summary: 'Comprehensive regression test suite executed. All critical and high priority test cases passed. Defects logged, triaged, and resolved. Test reports generated and reviewed.'
    },
    { 
      id: '8.4', 
      name: 'NFT Testing', 
      icon: '⚡', 
      color: 'from-purple-500 to-violet-500', 
      percentage: 78,
      summary: 'Non-functional testing completed including performance, security, and scalability tests. Load testing results validated against requirements. Performance benchmarks met.'
    },
    { 
      id: '9.2', 
      name: 'Pre-Prod', 
      icon: '🎪', 
      color: 'from-violet-500 to-indigo-500', 
      percentage: 85,
      summary: 'Pre-production deployment completed. Production-like environment validation successful. Final integration testing performed. UAT sign-off obtained from business stakeholders.'
    },
    { 
      id: '10.2', 
      name: 'Checks', 
      icon: '✔️', 
      color: 'from-indigo-500 to-blue-500', 
      percentage: 92,
      summary: 'Pre-production checklist completed. Security scan passed. Compliance validation successful. Production readiness review conducted. Go-live approval obtained.'
    },
    { 
      id: '11.0', 
      name: 'Go-Live', 
      icon: '🎉', 
      color: 'from-blue-500 to-cyan-500', 
      percentage: 100,
      summary: 'Production deployment successful. Post-deployment verification completed. Monitoring and alerting configured. Hypercare support initiated. Project closure documentation finalized.'
    },
  ];

  useEffect(() => {
    if (projectId) {
      const foundProject = projectRepository.getProjectById(parseInt(projectId));
      if (foundProject) {
        setProject(foundProject);
        
        // Check for active stage from localStorage (set when stage is completed)
        const activeStageId = localStorage.getItem(`activeStage_${projectId}`);
        const completedStages = JSON.parse(localStorage.getItem(`completedStages_${projectId}`) || '[]');
        
        if (activeStageId) {
          // Find the index of the active stage
          const activeIndex = stages.findIndex(s => s.id === activeStageId);
          if (activeIndex !== -1) {
            setCurrentStageIndex(activeIndex);
          }
        } else {
          // Fallback to progress-based calculation
          const stageIndex = Math.floor((foundProject.progress / 100) * stages.length);
          setCurrentStageIndex(Math.min(stageIndex, stages.length - 1));
        }
      }
    }
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading project...</p>
        </div>
      </div>
    );
  }

  const currentStage = stages[currentStageIndex];
  const isCompleted = currentStageIndex === stages.length - 1 && project.progress === 100;

  const getElapsedTime = () => {
    const startDate = new Date(project.createdDate);
    const now = new Date();
    const diffMs = now - startDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''}, ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
    } else {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
    }
  };

  const handleStageClick = (stage) => {
    // Special handling for Bottom Up Estimation stage
    if (stage.id === '4.3') {
      navigate(`/estimation-method-selection/${projectId}`);
    } else if (stage.id === '5.3') {
      // Special handling for Estimation Sign-off stage
      navigate(`/estimation-signoff/${projectId}`);
    } else if (stage.id === '7.3') {
      // Special handling for Remediation stage
      navigate(`/remediation-screen/${projectId}`);
    } else if (stage.id === '3.1') {
      // Special handling for Initiation and Scoping stage
      navigate(`/initiation-screen/${projectId}`);
    } else if (stage.id === '7.2') {
      // Special handling for Re-Analysis stage
      navigate(`/re-analysis-screen/${projectId}`);
    } else {
      // Navigate to stage details for all other stages
      navigate(`/stage-details/${projectId}/${stage.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* DSE 2.0 Logo Header */}
      <div className="mb-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <span className="text-2xl text-red-500">◈</span>
          <span className="text-xl font-bold">DSE 2.0</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/aaf-migration-expert')}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </button>
          <div className="w-px h-6 bg-white/10" />
          <div>
            <h1 className="text-2xl font-semibold">{project.name}</h1>
            <p className="text-sm text-white/50">{project.remId} • {project.module}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-white/50">Overall Progress</p>
            <p className="text-2xl font-bold text-orange-400">{project.progress}%</p>
          </div>
          <div className={`px-4 py-2 rounded-lg ${
            project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
            project.status === 'In Progress' ? 'bg-orange-500/20 text-orange-400' :
            'bg-white/10 text-white/70'
          }`}>
            {project.status}
          </div>
        </div>
      </div>

      {/* Project Info Cards */}
      <div className="grid grid-cols-6 gap-4 mb-8">
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl font-bold mb-2 shadow-lg shadow-orange-500/30">
            PN
          </div>
          <p className="text-xs text-white/70 font-medium">Persona</p>
          <p className="text-xs text-white/40">Current Owner</p>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-white/40 uppercase mb-2">Elapsed Time</p>
          <p className="text-lg font-semibold text-cyan-400">{getElapsedTime()}</p>
          <p className="text-xs text-white/40 mt-1">Since: {new Date(project.createdDate).toLocaleDateString()}</p>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-white/40 uppercase mb-2">Priority</p>
          <p className={`text-lg font-semibold ${
            project.priority === 'High' ? 'text-red-400' :
            project.priority === 'Medium' ? 'text-yellow-400' :
            'text-green-400'
          }`}>{project.priority}</p>
        </div>
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-white/40 uppercase mb-2">Team</p>
          <p className="text-lg font-semibold">{project.team}</p>
        </div>
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-white/40 uppercase mb-2">Source Tech</p>
          <p className="text-sm font-semibold text-white/70">{project.sourceTech}</p>
        </div>
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-white/40 uppercase mb-2">Target Tech</p>
          <p className="text-sm font-semibold text-orange-400">{project.targetTech}</p>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg font-bold text-sm">
            REM ID: {project.remId}
          </span>
        </div>
        <h2 className="text-3xl font-bold mb-2">{project.name}</h2>
        <p className="text-white/50">Track your migration progress through each stage</p>
      </div>

      {/* Circular Pipeline Visualization */}
      <div className="relative max-w-5xl mx-auto mb-12" style={{ height: '700px' }}>
        {/* Connecting Lines from Center to Orbital Stages */}
        <svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          width="600"
          height="600"
          style={{ zIndex: 1 }}
        >
          {stages.map((stage, index) => {
            const angle = (index / stages.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 280;
            const x = Math.cos(angle) * radius + 300;
            const y = Math.sin(angle) * radius + 300;
            
            const isPassed = index < currentStageIndex;
            const isCurrent = index === currentStageIndex;
            
            return (
              <line
                key={`line-${stage.id}`}
                x1="300"
                y1="300"
                x2={x}
                y2={y}
                stroke={
                  isPassed ? 'rgba(34, 197, 94, 0.3)' :
                  isCurrent ? 'rgba(249, 115, 22, 0.5)' :
                  'rgba(255, 255, 255, 0.05)'
                }
                strokeWidth={isCurrent ? '2' : '1'}
                strokeDasharray={isCurrent ? '0' : '5,5'}
              />
            );
          })}
        </svg>

        {/* Center Circle - Current Stage */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            {/* Pulsing rings */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-orange-500/30 animate-ping"
                style={{
                  width: `${200 + i * 40}px`,
                  height: `${200 + i * 40}px`,
                  top: `${-i * 20}px`,
                  left: `${-i * 20}px`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '3s',
                }}
              />
            ))}
            
            {/* Main center card */}
            <div className={`relative w-48 h-48 rounded-full bg-gradient-to-br ${currentStage.color} flex flex-col items-center justify-center shadow-2xl shadow-orange-500/50 border-4 border-orange-500`}>
              <div className="text-5xl mb-2">{currentStage.icon}</div>
              <div className="text-xs font-mono px-3 py-1 rounded-full bg-black/30 mb-2">
                {currentStage.id}
              </div>
              <div className="text-center px-4">
                <p className="font-bold text-sm leading-tight">{currentStage.name}</p>
                <p className="text-2xl font-bold mt-2">{currentStage.percentage}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orbital Stages */}
        {stages.map((stage, index) => {
          const angle = (index / stages.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 280;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          const isPassed = index < currentStageIndex;
          const isCurrent = index === currentStageIndex;
          const isFuture = index > currentStageIndex;

          return (
            <div
              key={stage.id}
              className="absolute cursor-pointer group"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
              onClick={() => handleStageClick(stage)}
            >
              {/* Stage Node */}
              <div
                className={`relative transition-all duration-300 ${
                  isCurrent ? 'scale-125' : 'scale-100'
                } group-hover:scale-125`}
              >
                <div
                  className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-300 ${
                    isPassed
                      ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-green-500 shadow-lg shadow-green-500/40 group-hover:shadow-green-500/60 group-hover:border-green-400'
                      : isCurrent
                      ? `bg-gradient-to-br ${stage.color.replace('from-', 'from-').replace('to-', 'to-')}/30 border-orange-500 shadow-xl shadow-orange-500/60`
                      : 'bg-white/[0.05] border-white/20 group-hover:bg-white/[0.15] group-hover:border-white/50 group-hover:shadow-lg group-hover:shadow-white/30'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl animate-pulse" />
                  )}
                  
                  {/* Hover glow effect for all stages */}
                  <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 blur-lg transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  
                  <div className="relative text-center">
                    <div className="text-2xl mb-1">{isPassed ? '✓' : stage.icon}</div>
                    <div
                      className={`text-[10px] font-mono transition-colors duration-300 ${
                        isPassed ? 'text-green-400' : isCurrent ? 'text-orange-400' : 'text-white/40 group-hover:text-white/80'
                      }`}
                    >
                      {stage.id}
                    </div>
                  </div>

                  {isPassed && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  {isCurrent && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full animate-ping" />
                  )}
                </div>

                {/* Stage label */}
                <div
                  className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap transition-all duration-300 ${
                    isCurrent ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                  }`}
                >
                  <p
                    className={`text-xs font-medium transition-colors duration-300 ${
                      isPassed ? 'text-green-400' : isCurrent ? 'text-orange-400' : 'text-white/40 group-hover:text-white/80'
                    }`}
                  >
                    {stage.name}
                  </p>
                  {/* Additional info on hover */}
                  <p className="text-[10px] text-white/0 group-hover:text-white/60 transition-all duration-300 mt-1">
                    {stage.percentage}% Complete
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Progress Ring */}
        <svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          width="600"
          height="600"
          style={{ zIndex: 0 }}
        >
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <circle
            cx="300"
            cy="300"
            r="280"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <circle
            cx="300"
            cy="300"
            r="280"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${(project.progress / 100) * (2 * Math.PI * 280)} ${2 * Math.PI * 280}`}
            transform="rotate(-90 300 300)"
            style={{ filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.5))' }}
          />
        </svg>
      </div>

      {/* Current Stage Info */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8 mb-8">
        <div className="flex items-start gap-6">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentStage.color} flex items-center justify-center text-4xl shadow-xl`}>
            {currentStage.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-orange-500/20 text-orange-400">
                Stage {currentStage.id}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/60">
                {currentStageIndex + 1} of {stages.length}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-3">{currentStage.name}</h3>
            <div className="flex items-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <span>📊</span>
                <span>Progress: {currentStage.percentage}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>Status: {isCompleted ? 'Completed' : 'In Progress'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-white/50 mb-2">
            <span>Overall Pipeline Progress</span>
            <span>{project.progress}% Complete</span>
          </div>
          <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full transition-all duration-500 relative overflow-hidden"
              style={{ width: `${project.progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Completion Message */}
      {isCompleted && (
        <div className="max-w-4xl mx-auto text-center p-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4 text-4xl">
            🎉
          </div>
          <h3 className="text-2xl font-bold text-green-400 mb-2">Migration Completed!</h3>
          <p className="text-white/70 mb-6">
            Congratulations! This project has successfully completed all pipeline stages.
          </p>
          <button
            onClick={() => navigate('/aaf-migration-expert')}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-medium"
          >
            Return to Dashboard
          </button>
        </div>
      )}

      {/* Stage Timeline Summary */}
      <div className="max-w-4xl mx-auto mt-12 bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-8">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <span>📋</span>
          <span>Pipeline Completion Summary</span>
          <span className="text-xs text-white/40 ml-auto">💡 Click any stage to view details</span>
        </h3>
        <div className="space-y-2">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              onClick={() => handleStageClick(stage)}
              className={`flex items-center gap-4 p-3 rounded-lg transition-all cursor-pointer ${
                index < currentStageIndex
                  ? 'bg-green-500/10 border border-green-500/20 hover:bg-green-500/20'
                  : index === currentStageIndex
                  ? 'bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20'
                  : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.05]'
              }`}
            >
              <span className="text-2xl">{index < currentStageIndex ? '✓' : stage.icon}</span>
              <div className="flex-1">
                <p className={`font-medium text-sm ${
                  index < currentStageIndex ? 'text-green-400' :
                  index === currentStageIndex ? 'text-orange-400' :
                  'text-white/50'
                }`}>
                  {stage.id} - {stage.name}
                </p>
              </div>
              <span className="text-xs text-white/40">{stage.percentage}%</span>
              <span className="text-xs text-orange-400">→ View</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Blockers */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-xl flex-shrink-0">
            ⚠️
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-red-400">Current Blockers</h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">Active</span>
            </div>
            <p className="text-sm text-white/70 mb-2">
              Waiting for Finance Approval - Budget allocation pending from CFO office. Expected resolution in 2-3 business days.
            </p>
            <div className="flex items-center gap-4 text-xs text-white/50">
              <span>⏰ Blocked since: 2 days ago</span>
              <span>• Assigned to: Finance Team</span>
            </div>
          </div>
          <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm font-medium text-red-400 transition-colors">
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectPipeline;