import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import dseIcon from 'figma:asset/ac36418389efbbd4594c3c5c157a4e642d9e0ea9.png';
import { projectRepository } from '../utils/projectRepository';

const RemediationScreen = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (projectId) {
      const projectData = projectRepository.getProjectById(Number(projectId));
      setProject(projectData);
    }
  }, [projectId]);

  // Single REM ID with multiple remediation steps
  const remInfo = {
    remId: project?.remId || 'REM-2024-789',
    title: 'Java 8 to Java 17 & Spring Boot 2.x to 3.x Migration',
    description: 'Complete migration package including framework upgrades, API updates, and test modernization',
    assignee: 'John K',
    priority: 'HIGH',
    totalFiles: 324,
    totalEstimate: '15 hours',
    projectName: project?.name || 'Payment Gateway'
  };

  const [remediationSteps, setRemediationSteps] = useState([
    {
      id: 1,
      stepId: '7.3.1',
      title: 'JDK 8 to JDK 17 Upgrade',
      description: 'Migrate deprecated APIs, update syntax, and modernize code to Java 17 standards',
      status: 'pending',
      filesAffected: 47,
      estimatedTime: null,
      confidence: null,
      autonomyLevel: 3, // 1-5: Low (1-3) asks for permission, High (4-5) runs automatically
      selectedAgent: 'JDK Migration Agent v2.1',
      originalAgent: 'JDK Migration Agent v2.1', // Track original selection
      agentIcon: '☕',
      availableAgents: [
        { name: 'JDK Migration Agent v2.1', icon: '☕', confidence: 98, speed: 'Fast' },
        { name: 'Java Modernizer Pro v3.0', icon: '☕', confidence: 95, speed: 'Medium' },
        { name: 'Oracle JDK Upgrader v4.2', icon: '☕', confidence: 92, speed: 'Fast' },
        { name: 'OpenJDK Migration Tool v2.8', icon: '☕', confidence: 90, speed: 'Medium' },
        { name: 'Java Evolution Agent v1.5', icon: '☕', confidence: 88, speed: 'Slow' }
      ]
    },
    {
      id: 2,
      stepId: '7.3.2',
      title: 'Spring Boot 2.x to 3.x Vertical Upgrade',
      description: 'Update Spring Boot dependencies, configurations, and deprecated methods',
      status: 'pending',
      filesAffected: 32,
      estimatedTime: null,
      confidence: null,
      autonomyLevel: 3,
      selectedAgent: 'Spring Boot Migration Agent v2.3',
      originalAgent: 'Spring Boot Migration Agent v2.3',
      agentIcon: '🍃',
      availableAgents: [
        { name: 'Spring Boot Migration Agent v2.3', icon: '🍃', confidence: 94, speed: 'Fast' },
        { name: 'Spring Modernizer v4.1', icon: '🍃', confidence: 91, speed: 'Medium' },
        { name: 'Boot Upgrade Assistant v2.0', icon: '🍃', confidence: 89, speed: 'Slow' },
        { name: 'Spring Framework Transformer v3.5', icon: '🍃', confidence: 87, speed: 'Medium' },
        { name: 'Spring Evolution Pro v2.2', icon: '🍃', confidence: 85, speed: 'Fast' },
        { name: 'Spring Cloud Migrator v1.9', icon: '🍃', confidence: 83, speed: 'Medium' }
      ]
    },
    {
      id: 3,
      stepId: '7.3.3',
      title: 'QA/Regression Testing Preparation',
      description: 'Set up comprehensive testing framework with unit tests, integration tests, and regression test automation',
      status: 'pending',
      filesAffected: 127,
      estimatedTime: null,
      confidence: null,
      autonomyLevel: 3,
      selectedAgent: 'Test Automation Specialist v2.3',
      originalAgent: 'Test Automation Specialist v2.3',
      agentIcon: '🧪',
      availableAgents: [
        { name: 'Test Automation Specialist v2.3', icon: '🧪', confidence: 96, speed: 'Fast' },
        { name: 'QA Framework Builder v3.1', icon: '🧪', confidence: 93, speed: 'Medium' },
        { name: 'Regression Test Generator v2.5', icon: '🧪', confidence: 91, speed: 'Fast' },
        { name: 'Integration Test Pro v4.0', icon: '🧪', confidence: 89, speed: 'Medium' },
        { name: 'Test Suite Orchestrator v1.8', icon: '🧪', confidence: 87, speed: 'Slow' }
      ]
    }
  ]);

  const [showAgentSelector, setShowAgentSelector] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);
  const [permissionRequest, setPermissionRequest] = useState(null); // For in-screen permission modal

  const handleRunAgent = (stepId, resumeFrom = 0) => {
    const currentStep = remediationSteps.find(s => s.id === stepId);
    const isLowAutonomy = currentStep.autonomyLevel < 4;
    
    setRemediationSteps(steps =>
      steps.map(step =>
        step.id === stepId ? { ...step, status: 'running', progress: resumeFrom } : step
      )
    );

    let progress = resumeFrom;
    const interval = setInterval(() => {
      progress += 10;
      
      // If low autonomy, ask for permission at 30%, 60%, and 90%
      if (isLowAutonomy && (progress === 30 || progress === 60 || progress === 90)) {
        clearInterval(interval);
        
        // Realistic permission prompts based on stage
        const permissionsByStep = {
          1: { // JDK Migration
            30: {
              action: 'Read Access to Java Source Files',
              details: 'Agent needs to scan and analyze 47 Java files in /src/main/java/',
              risk: 'Low',
              icon: '📁'
            },
            60: {
              action: 'Write Permission to Modify Source Code',
              details: 'Agent will update deprecated API calls and syntax in 47 files',
              risk: 'Medium',
              icon: '✏️'
            },
            90: {
              action: 'Execute Compilation & Unit Tests',
              details: 'Agent needs to compile modified code and run test suite for validation',
              risk: 'Low',
              icon: '⚙️'
            }
          },
          2: { // Spring Boot Migration
            30: {
              action: 'Read Access to Configuration Files',
              details: 'Agent needs to read application.yml, pom.xml, and Spring configs',
              risk: 'Low',
              icon: '📋'
            },
            60: {
              action: 'Modify Dependencies & Application Properties',
              details: 'Agent will update Spring Boot version, dependencies, and configurations',
              risk: 'High',
              icon: '🔧'
            },
            90: {
              action: 'Network Access for Dependency Resolution',
              details: 'Agent needs to download and verify new Spring Boot 3.x dependencies',
              risk: 'Medium',
              icon: '🌐'
            }
          },
          3: { // QA/Regression Testing Preparation
            30: {
              action: 'Read Access to Test Directory',
              details: 'Agent needs to scan 127 test files in /src/test/java/',
              risk: 'Low',
              icon: '📂'
            },
            60: {
              action: 'Write Permission to Update Test Classes',
              details: 'Agent will set up comprehensive testing framework with unit tests, integration tests, and regression test automation',
              risk: 'Medium',
              icon: '✍️'
            },
            90: {
              action: 'Execute Test Suite',
              details: 'Agent needs to run full test suite to verify migration success',
              risk: 'Low',
              icon: '🧪'
            }
          },
          4: { // Namespace Migration
            30: {
              action: 'Scan All Project Files',
              details: 'Agent needs to search for javax.* imports across 156 files',
              risk: 'Low',
              icon: '🔍'
            },
            60: {
              action: 'Bulk Write to Replace Namespaces',
              details: 'Agent will replace all javax.* imports with jakarta.* equivalents',
              risk: 'High',
              icon: '📝'
            },
            90: {
              action: 'Validate & Update Build Configuration',
              details: 'Agent needs to update Maven/Gradle build files for Jakarta EE',
              risk: 'Medium',
              icon: '⚡'
            }
          }
        };

        const stepPermissions = permissionsByStep[currentStep.id] || permissionsByStep[1];
        const permissionData = stepPermissions[progress];
        
        setPermissionRequest({
          stepId: stepId,
          progress: progress,
          action: permissionData.action,
          details: permissionData.details,
          risk: permissionData.risk,
          icon: permissionData.icon,
          resumeFrom: progress
        });
        return;
      }
      
      setRemediationSteps(steps =>
        steps.map(step =>
          step.id === stepId ? { ...step, progress } : step
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Generate random time (under 15 minutes)
          const randomMinutes = Math.floor(Math.random() * 12) + 3; // 3-14 minutes
          const timeString = `< ${randomMinutes} min`;
          
          // Generate random confidence (85-99%)
          const randomConfidence = Math.floor(Math.random() * 15) + 85;
          
          setRemediationSteps(steps =>
            steps.map(step =>
              step.id === stepId 
                ? { 
                    ...step, 
                    status: 'ready-for-review',
                    estimatedTime: timeString,
                    confidence: randomConfidence
                  } 
                : step
            )
          );
        }, 500);
      }
    }, 800); // Increased from 400ms to 800ms for slower execution
  };

  const handleSelectAgent = (stepId, agent) => {
    setRemediationSteps(steps =>
      steps.map(step =>
        step.id === stepId
          ? { 
              ...step, 
              selectedAgent: agent.name, 
              agentIcon: agent.icon,
              confidence: agent.confidence 
            }
          : step
      )
    );
    setShowAgentSelector(null);
  };

  const handleAutonomyChange = (stepId, value) => {
    setRemediationSteps(steps =>
      steps.map(step =>
        step.id === stepId ? { ...step, autonomyLevel: value } : step
      )
    );
  };

  const handleOpenVSCode = (step) => {
    // Try to open VS Code using the vscode:// protocol
    // This works if VS Code is installed on the user's machine
    const projectPath = `/projects/${projectId}/remediation/${step.stepId}`;
    const vscodeUri = `vscode://file${projectPath}`;
    
    // Attempt to open VS Code
    window.location.href = vscodeUri;
    
    // Show fallback instructions
    setTimeout(() => {
      const fallbackMessage = `
🔍 Opening VS Code for Human-in-the-Loop Validation

Step: ${step.title}
Files to review: ${step.filesAffected}
Estimated review time: 15-20 minutes

If VS Code didn't open automatically:
1. Open VS Code manually
2. Navigate to: ${projectPath}
3. Review the modified files
4. Make any necessary adjustments

Alternatively, you can:
- Open in VS Code Web: https://vscode.dev
- Download modified files for offline review
      `;
      
      console.log(fallbackMessage);
      alert(fallbackMessage);
    }, 1000);
  };

  const handleSendToCodeReview = () => {
    const allReady = remediationSteps.every(step => step.status === 'ready-for-review');
    if (allReady) {
      // Mark Remediation stage (7.3) as complete and move to Dev Deployment (8.1)
      const completedStages = JSON.parse(localStorage.getItem(`completedStages_${projectId}`) || '[]');
      if (!completedStages.includes('7.3')) {
        completedStages.push('7.3');
      }
      localStorage.setItem(`completedStages_${projectId}`, JSON.stringify(completedStages));
      
      // Set Dev Deployment (8.1) as the new active stage
      localStorage.setItem(`activeStage_${projectId}`, '8.1');
      
      // Update project progress to reflect completion of Remediation
      if (project) {
        projectRepository.updateProject(Number(projectId), {
          progress: 57 // Dev Deployment percentage
        });
      }
      
      // Show success message
      alert('✅ All remediation steps sent to Code Review successfully!\n\nReview URL: https://github.com/project/pull/789\nReviewers notified: 3 team members\n\n🎯 Moving to Dev Deployment stage...');
      
      // Navigate back to project pipeline
      navigate(`/project-pipeline/${projectId}`);
    } else {
      alert('⚠️ Please complete all remediation steps before sending to code review.');
    }
  };

  const allStepsReady = remediationSteps.every(step => step.status === 'ready-for-review');
  const completedSteps = remediationSteps.filter(step => step.status === 'ready-for-review').length;
  const runningSteps = remediationSteps.filter(step => step.status === 'running').length;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with REM ID */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-xl border-b border-orange-500/30">
        <div className="max-w-[2000px] mx-auto px-8 py-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(`/project-pipeline/${projectId}`)}
                className="p-2.5 hover:bg-white/10 rounded-xl transition-all border border-white/10"
              >
                ← Back
              </button>
              
              {/* DSE 2.0 Icon - Navigate to Landing */}
              <button
                onClick={() => navigate('/')}
                className="group relative transition-all hover:scale-105"
              >
                <img 
                  src={dseIcon} 
                  alt="DSE 2.0" 
                  className="h-10 object-contain"
                />
              </button>
              
              <div className="h-10 w-px bg-white/20"></div>
              
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent flex items-center gap-3">
                  <span className="text-4xl">🔧</span>
                  Remediation Mission Control
                </h1>
                <p className="text-sm text-white/50 mt-1">Digital Software Engineer 2.0 • {remInfo.projectName} • Stage 7.3</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
              <div className="px-5 py-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-center">
                <div className="text-xs text-amber-400/70 mb-1">Total Steps</div>
                <div className="text-2xl font-bold text-amber-400">{remediationSteps.length}</div>
              </div>
              <div className="px-5 py-3 bg-purple-500/10 border border-purple-500/30 rounded-xl text-center">
                <div className="text-xs text-purple-400/70 mb-1">Completed</div>
                <div className="text-2xl font-bold text-purple-400">{completedSteps}</div>
              </div>
              <div className="px-5 py-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-center">
                <div className="text-xs text-blue-400/70 mb-1">Running</div>
                <div className="text-2xl font-bold text-blue-400">{runningSteps}</div>
              </div>
            </div>
          </div>

          {/* REM ID Banner */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-purple-900/40 backdrop-blur-xl border-2 border-purple-400/40 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-50"></div>
                    <div className="relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl border-2 border-purple-300/50">
                      <div className="text-xs text-white/80 font-semibold mb-1">REM ID</div>
                      <div className="text-3xl font-black text-white tracking-wide">
                        {remInfo.remId}
                      </div>
                    </div>
                  </div>
                  <div className="h-16 w-px bg-white/20"></div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1.5">{remInfo.title}</h2>
                    <p className="text-sm text-white/60 max-w-2xl">{remInfo.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <div className="text-white/50 mb-1">Assignee</div>
                    <div className="font-bold text-blue-400">{remInfo.assignee}</div>
                  </div>
                  <div className="h-10 w-px bg-white/20"></div>
                  <div>
                    <div className="text-white/50 mb-1">Priority</div>
                    <div className="font-bold text-red-400">{remInfo.priority}</div>
                  </div>
                  <div className="h-10 w-px bg-white/20"></div>
                  <div>
                    <div className="text-white/50 mb-1">Total Files</div>
                    <div className="font-bold text-amber-400">{remInfo.totalFiles}</div>
                  </div>
                  <div className="h-10 w-px bg-white/20"></div>
                  <div>
                    <div className="text-white/50 mb-1">Est. Time</div>
                    <div className="font-bold text-green-400">{remInfo.totalEstimate}</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-5">
                <div className="flex justify-between text-xs text-white/60 mb-2">
                  <span>Overall Remediation Progress</span>
                  <span className="font-bold text-white/80">{Math.round((completedSteps / remediationSteps.length) * 100)}% Complete</span>
                </div>
                <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/10">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-600 transition-all duration-500 relative"
                    style={{ width: `${(completedSteps / remediationSteps.length) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Remediation Steps */}
      <main className="max-w-[2000px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 gap-5">
          {remediationSteps.map((step, index) => {
            const isExpanded = expandedStep === step.id;
            
            return (
              <div key={step.id} className="relative group">
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl blur-xl transition-all ${
                  step.status === 'ready-for-review' ? 'bg-purple-500/20' :
                  step.status === 'running' ? 'bg-blue-500/20' :
                  'bg-amber-500/10'
                }`}></div>

                {/* Main Card */}
                <div className={`relative bg-black/70 backdrop-blur-xl border-2 rounded-2xl overflow-hidden transition-all ${
                  step.status === 'ready-for-review' ? 'border-purple-500/40' :
                  step.status === 'running' ? 'border-blue-500/40' :
                  'border-white/10 hover:border-amber-500/30'
                }`}>
                  
                  {/* Status Stripe */}
                  <div className={`h-1.5 ${
                    step.status === 'ready-for-review' ? 'bg-gradient-to-r from-purple-500 to-violet-500' :
                    step.status === 'running' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                    'bg-gradient-to-r from-gray-600 to-gray-500'
                  }`}></div>

                  <div className="p-6">
                    <div className="flex items-start gap-6">
                      
                      {/* Step Badge */}
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black border-2 shadow-xl ${
                          step.status === 'ready-for-review' ? 'bg-gradient-to-br from-purple-500 to-violet-600 border-purple-300 text-white' :
                          step.status === 'running' ? 'bg-gradient-to-br from-blue-500 to-cyan-600 border-blue-300 text-white animate-pulse' :
                          'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600 text-white/70'
                        }`}>
                          {step.status === 'ready-for-review' ? '✓' : index + 1}
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="flex-1">
                        <div className="grid grid-cols-12 gap-6">
                          
                          {/* Left: Step Info */}
                          <div className="col-span-5">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="px-3 py-1.5 bg-black/50 border border-white/20 rounded-lg font-mono text-xs text-amber-400 font-bold">
                                {step.stepId}
                              </div>
                              <div className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 ${
                                step.status === 'ready-for-review' ? 'bg-purple-500/20 border-purple-400/50 text-purple-300' :
                                step.status === 'running' ? 'bg-blue-500/20 border-blue-400/50 text-blue-300' :
                                'bg-gray-500/20 border-gray-400/50 text-gray-300'
                              }`}>
                                {step.status === 'ready-for-review' ? '✓ READY FOR REVIEW' :
                                 step.status === 'running' ? `⚡ RUNNING ${step.progress}%` :
                                 '⏳ PENDING'}
                              </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2 leading-tight">{step.title}</h3>
                            <p className="text-sm text-white/60 leading-relaxed mb-4">{step.description}</p>
                            
                            {/* Metrics Row */}
                            <div className="grid grid-cols-3 gap-3">
                              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-2.5 text-center">
                                <div className="text-xs text-white/50 mb-1">Files</div>
                                <div className="text-lg font-bold text-white">{step.filesAffected}</div>
                              </div>
                              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-2.5 text-center">
                                <div className="text-xs text-white/50 mb-1">Time</div>
                                <div className="text-lg font-bold text-blue-400">{step.estimatedTime || '-'}</div>
                              </div>
                              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-2.5 text-center">
                                <div className="text-xs text-white/50 mb-1">Confidence</div>
                                <div className={`text-lg font-bold ${
                                  step.confidence 
                                    ? (step.confidence >= 95 ? 'text-green-400' : 'text-yellow-400')
                                    : 'text-white/40'
                                }`}>{step.confidence ? `${step.confidence}%` : '-'}</div>
                              </div>
                            </div>
                          </div>

                          {/* Center: Agent Selection */}
                          <div className="col-span-4 relative">
                            <div className="bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4 h-full">
                              <div className="flex items-center justify-between mb-3">
                                <div className="text-sm font-bold text-blue-300 flex items-center gap-2">
                                  🤖 AI Agent
                                </div>
                                {step.status === 'pending' && (
                                  <button
                                    onClick={() => setShowAgentSelector(showAgentSelector === step.id ? null : step.id)}
                                    className="text-xs px-2.5 py-1 bg-blue-400/20 hover:bg-blue-400/30 border border-blue-400/40 rounded-lg text-blue-300 font-semibold transition-all"
                                  >
                                    {showAgentSelector === step.id ? 'Close' : 'Change'}
                                  </button>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400/20 to-cyan-400/20 border border-blue-400/40 flex items-center justify-center text-3xl">
                                  {step.agentIcon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-bold text-white truncate">{step.selectedAgent}</div>
                                  <div className="text-xs text-white/50">Confidence: {step.confidence}%</div>
                                </div>
                              </div>

                              {/* Running Progress */}
                              {step.status === 'running' && (
                                <div className="mt-3 pt-3 border-t border-blue-500/30">
                                  <div className="flex justify-between text-xs text-blue-300 mb-2">
                                    <span>Processing...</span>
                                    <span className="font-bold">{step.progress}%</span>
                                  </div>
                                  <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                                      style={{ width: `${step.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}

                              {/* Autonomy Slider - Only show when pending */}
                              {step.status === 'pending' && (
                                <div className="mt-4 pt-4 border-t border-blue-500/30 relative">
                                  {/* Agent Dropdown - Positioned above Autonomy Level */}
                                  {showAgentSelector === step.id && (
                                    <div className="absolute bottom-full left-0 right-0 mb-2 bg-black/95 backdrop-blur-xl border-2 border-blue-500/40 rounded-xl overflow-hidden shadow-2xl z-[999]">
                                      <div className="p-2 bg-blue-500/10 border-b border-blue-500/30">
                                        <div className="text-xs font-semibold text-blue-300">Select AI Agent</div>
                                      </div>
                                      {step.availableAgents.map((agent, idx) => (
                                        <button
                                          key={idx}
                                          onClick={() => handleSelectAgent(step.id, agent)}
                                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-500/10 transition-all border-b border-white/5 last:border-0"
                                        >
                                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400/20 to-cyan-400/20 border border-blue-400/40 flex items-center justify-center text-2xl">
                                            {agent.icon}
                                          </div>
                                          <div className="flex-1 text-left">
                                            <div className="text-sm font-semibold text-white flex items-center gap-2">
                                              <span>{agent.name}</span>
                                              {step.originalAgent !== agent.name && (
                                                <span className="text-[10px] px-2 py-0.5 bg-red-500/20 border border-red-500/50 rounded text-red-300 font-bold">
                                                  Approval Needed to Change
                                                </span>
                                              )}
                                            </div>
                                            <div className="text-xs text-white/50">Confidence: {agent.confidence}% • Speed: {agent.speed}</div>
                                          </div>
                                          {step.selectedAgent === agent.name && (
                                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
                                          )}
                                        </button>
                                      ))}
                                      
                                      {/* Proceed to Re-Analysis Link */}
                                      <div className="p-3 bg-gradient-to-r from-purple-500/10 to-violet-500/10 border-t border-purple-500/30">
                                        <button
                                          onClick={() => navigate(`/project-pipeline/${projectId}`)}
                                          className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 rounded-lg font-bold text-white text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
                                        >
                                          <span>🔄</span>
                                          <span>Proceed to Re-Analysis</span>
                                        </button>
                                      </div>
                                    </div>
                                  )}

                                  <div className="flex justify-between items-center mb-3">
                                    <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                                      🎚️ Autonomy Level
                                    </div>
                                    <div className={`text-sm px-3 py-1 rounded-lg font-bold ${
                                      step.autonomyLevel < 4 
                                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40' 
                                        : 'bg-green-500/20 text-green-300 border border-green-500/40'
                                    }`}>
                                      Level {step.autonomyLevel}
                                    </div>
                                  </div>
                                  
                                  {/* Level Dots */}
                                  <div className="flex justify-between items-center mb-2">
                                    {[1, 2, 3, 4, 5].map((level) => (
                                      <button
                                        key={level}
                                        onClick={() => handleAutonomyChange(step.id, level)}
                                        className={`relative w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center font-bold text-sm ${
                                          step.autonomyLevel >= level
                                            ? level < 4
                                              ? 'bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/50'
                                              : 'bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/50'
                                            : 'bg-black/40 border-white/20 text-white/30 hover:border-white/40'
                                        }`}
                                      >
                                        {level}
                                        {step.autonomyLevel >= level && (
                                          <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
                                        )}
                                      </button>
                                    ))}
                                  </div>
                                  
                                  {/* Labels */}
                                  <div className="flex justify-between text-[10px] text-white/40 mt-2">
                                    <span>Supervised</span>
                                    <span>Autonomous</span>
                                  </div>
                                  
                                  {/* Description */}
                                  <div className={`mt-3 p-2 rounded-lg text-[10px] leading-relaxed border ${
                                    step.autonomyLevel < 4
                                      ? 'bg-orange-500/10 border-orange-500/30 text-orange-200'
                                      : 'bg-green-500/10 border-green-500/30 text-green-200'
                                  }`}>
                                    {step.autonomyLevel === 1 && '🔒 Asks permission at every step'}
                                    {step.autonomyLevel === 2 && '🔒 Asks permission for major changes'}
                                    {step.autonomyLevel === 3 && '🔒 Asks permission for critical actions'}
                                    {step.autonomyLevel === 4 && '⚡ Runs autonomously, minimal supervision'}
                                    {step.autonomyLevel === 5 && '⚡ Fully autonomous, no interruptions'}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right: Actions */}
                          <div className="col-span-3">
                            <div className="space-y-3">
                              
                              {/* Run Agent Button */}
                              {step.status === 'pending' && (
                                <button
                                  onClick={() => handleRunAgent(step.id)}
                                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold text-white hover:scale-105 transition-all shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
                                >
                                  <span className="text-xl">▶️</span>
                                  <span>Run Agent</span>
                                </button>
                              )}

                              {/* Running State */}
                              {step.status === 'running' && (
                                <div className="w-full py-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50 rounded-xl flex flex-col items-center justify-center">
                                  <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-3"></div>
                                  <div className="text-sm font-bold text-blue-400">Agent Running...</div>
                                  <div className="text-xs text-white/50 mt-1">{step.progress}%</div>
                                </div>
                              )}

                              {/* Ready for Review State */}
                              {step.status === 'ready-for-review' && (
                                <>
                                  <div className="w-full py-4 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border-2 border-purple-500/50 rounded-xl flex flex-col items-center justify-center">
                                    <div className="text-4xl mb-2">✓</div>
                                    <div className="text-sm font-bold text-purple-300">Agent Complete</div>
                                  </div>
                                  
                                  {/* Open in VS Code Button */}
                                  <button
                                    onClick={() => handleOpenVSCode(step)}
                                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold text-white hover:scale-105 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                                  >
                                    <span className="text-xl">💻</span>
                                    <span>Open in VS Code</span>
                                  </button>
                                </>
                              )}

                              {/* Expand Details */}
                              <button
                                onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                                className="w-full py-2.5 bg-white/5 border border-white/20 rounded-lg font-semibold text-sm text-white/60 hover:bg-white/10 hover:text-white transition-all"
                              >
                                {isExpanded ? '▲ Hide Details' : '▼ View Details'}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Details Section */}
                        {isExpanded && (
                          <div className="mt-6 pt-6 border-t border-white/10">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-4">
                                <div className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2">
                                  <span>📋</span> Scope
                                </div>
                                <div className="space-y-2 text-sm text-white/70">
                                  <div>• Files to modify: <span className="text-white font-semibold">{step.filesAffected}</span></div>
                                  <div>• Estimated effort: <span className="text-white font-semibold">{step.estimatedTime}</span></div>
                                  <div>• Complexity: <span className="text-yellow-400 font-semibold">Medium</span></div>
                                </div>
                              </div>

                              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4">
                                <div className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2">
                                  <span>🤖</span> Agent Info
                                </div>
                                <div className="space-y-2 text-sm text-white/70">
                                  <div>• Agent: <span className="text-white font-semibold">{step.selectedAgent}</span></div>
                                  <div>• Success Rate: <span className="text-green-400 font-semibold">94.7%</span></div>
                                  <div>• Avg Runtime: <span className="text-white font-semibold">45 min</span></div>
                                </div>
                              </div>

                              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
                                <div className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
                                  <span>✓</span> Validation
                                </div>
                                <div className="space-y-2 text-sm text-white/70">
                                  <div>• Auto-tests: <span className="text-white font-semibold">Enabled</span></div>
                                  <div>• Code review: <span className="text-white font-semibold">Required</span></div>
                                  <div>• Rollback: <span className="text-white font-semibold">Available</span></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-8">
          <div className="relative">
            <div className={`absolute inset-0 rounded-2xl blur-xl transition-all ${
              allStepsReady ? 'bg-purple-500/50' : 'bg-gray-500/20'
            }`}></div>
            <div className="relative bg-black/90 backdrop-blur-xl border-2 border-purple-500/40 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-xs text-white/50 mb-2">Remediation Pipeline Status</div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                      {completedSteps}/{remediationSteps.length} Steps Complete
                    </div>
                  </div>
                  <div className="h-14 w-px bg-white/20"></div>
                  <div className="flex-1 max-w-lg">
                    <div className="flex justify-between text-xs text-white/60 mb-2">
                      <span>Progress</span>
                      <span className="font-bold">{Math.round((completedSteps / remediationSteps.length) * 100)}%</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 via-purple-500 to-violet-500 transition-all duration-500"
                        style={{ width: `${(completedSteps / remediationSteps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleSendToCodeReview}
                  disabled={!allStepsReady}
                  className={`px-10 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-3 ${
                    allStepsReady
                      ? 'bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600 hover:scale-105 shadow-2xl shadow-purple-500/50 text-white'
                      : 'bg-gray-500/20 text-gray-500 cursor-not-allowed border border-gray-500/30'
                  }`}
                >
                  <span className="text-2xl">📤</span>
                  <span>Send to Code Review</span>
                </button>
              </div>
              {!allStepsReady && (
                <div className="mt-4 text-xs text-amber-400/70 text-center">
                  ⚠️ Complete all remediation steps and validate in VS Code before sending to code review
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Permission Request Modal */}
      {permissionRequest && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="pointer-events-auto relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/50 to-amber-500/50 rounded-2xl blur-2xl"></div>
            
            {/* Compact Popup */}
            <div className="relative bg-gradient-to-br from-black via-gray-900 to-black border-3 border-orange-400/60 rounded-2xl p-5 w-96 shadow-2xl">
              {/* Top Bar */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-orange-400/30">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-xl">
                  ⚠️
                </div>
                <div className="flex-1">
                  <div className="text-sm font-black text-orange-400 tracking-wide">PERMISSION REQUIRED</div>
                  <div className="text-xs text-white/50">Agent requesting approval</div>
                </div>
                <button
                  onClick={() => {
                    setRemediationSteps(steps => 
                      steps.map(step => 
                        step.id === permissionRequest.stepId ? { ...step, status: 'pending', progress: 0 } : step
                      )
                    );
                    setPermissionRequest(null);
                  }}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center text-white/50 hover:text-white"
                >
                  ✖
                </button>
              </div>

              {/* Content */}
              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-2">
                  <div className="text-blue-400 mt-0.5">📋</div>
                  <div className="flex-1">
                    <div className="text-xs text-white/40 mb-0.5">Step</div>
                    <div className="text-sm font-bold text-white">{remediationSteps.find(s => s.id === permissionRequest.stepId)?.title}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="text-cyan-400 mt-0.5">⚡</div>
                  <div className="flex-1">
                    <div className="text-xs text-white/40 mb-0.5">Progress</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-black/60 rounded-full overflow-hidden border border-blue-500/30">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                          style={{ width: `${permissionRequest.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-blue-400">{permissionRequest.progress}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{permissionRequest.icon}</span>
                    <div className="text-xs text-orange-300 font-bold">PERMISSION REQUEST</div>
                  </div>
                  <div className="text-sm font-bold text-white mb-1">{permissionRequest.action}</div>
                  <div className="text-xs text-white/70 leading-relaxed">{permissionRequest.details}</div>
                </div>

                <div className="flex items-center justify-between px-3 py-2 bg-gray-500/10 border border-gray-500/30 rounded-lg">
                  <div className="text-xs text-gray-400">Risk Level</div>
                  <div className={`text-xs font-bold px-2 py-1 rounded ${
                    permissionRequest.risk === 'Low' ? 'bg-green-500/20 text-green-300 border border-green-500/40' :
                    permissionRequest.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40' :
                    'bg-red-500/20 text-red-300 border border-red-500/40'
                  }`}>
                    {permissionRequest.risk}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setRemediationSteps(steps => 
                      steps.map(step => 
                        step.id === permissionRequest.stepId ? { ...step, status: 'pending', progress: 0 } : step
                      )
                    );
                    setPermissionRequest(null);
                  }}
                  className="flex-1 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-xl font-bold text-red-300 transition-all"
                >
                  ❌ Deny
                </button>
                <button
                  onClick={() => {
                    const request = permissionRequest;
                    setPermissionRequest(null);
                    handleRunAgent(request.stepId, request.resumeFrom);
                  }}
                  className="flex-1 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 shadow-xl shadow-green-500/30 rounded-xl font-bold text-white transition-all"
                >
                  ✓ Allow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemediationScreen;