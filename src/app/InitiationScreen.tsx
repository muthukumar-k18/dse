import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { projectRepository } from '../utils/projectRepository';
import dseAgentLogo from 'figma:asset/730a8cd473c4c4efdb2c8cc25201e605372613c3.png';
import copilotLogo from 'figma:asset/105bbd5ef82f7e9c35413389367da61238f8efba.png';
import customAgentsData from '../data/customAgents.json';

const InitiationScreen = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const location = useLocation();
  const [project, setProject] = useState(null);
  const [activities, setActivities] = useState([]);
  const [checkingRepositoryAccess, setCheckingRepositoryAccess] = useState(null);
  const [createdDocuments, setCreatedDocuments] = useState([]);
  const [generatingDocument, setGeneratingDocument] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadingActivity, setUploadingActivity] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCustomAgentModal, setShowCustomAgentModal] = useState(false);
  const [customAgentActivity, setCustomAgentActivity] = useState(null);
  const [selectedCustomAgent, setSelectedCustomAgent] = useState(null);

  const [expandedActivities, setExpandedActivities] = useState({});

  // Function to load activities and documents
  const loadActivitiesAndDocuments = () => {
    console.log('🔄 Loading activities and documents for projectId:', projectId);
    
    // Load activities for stage 3.1
    const activitiesKey = `activities_${projectId}_3.1`;
    const savedActivities = localStorage.getItem(activitiesKey);
    
    if (savedActivities) {
      const parsedActivities = JSON.parse(savedActivities);
      console.log('📋 Loaded activities:', parsedActivities);
      setActivities(parsedActivities);
    } else {
      const defaultActivities = [
        { 
          id: 1, 
          name: 'Stakeholder Identification', 
          status: 'Pending', 
          assignee: 'Pramod Nair', 
          date: '2026-02-15', 
          notes: 'Identify all key stakeholders including business owners, technical leads, and finance team.',
          type: 'stakeholder',
          stakeholders: [
            { name: 'John Smith', email: 'john.smith@company.com', division: 'Business Operations', role: 'Business Owner', location: 'New York, USA' },
            { name: 'Sarah Chen', email: 'sarah.chen@company.com', division: 'Technology', role: 'Tech Lead', location: 'San Francisco, USA' },
            { name: 'Michael Brown', email: 'michael.brown@company.com', division: 'Finance', role: 'Finance Manager', location: 'London, UK' },
          ]
        },
        { 
          id: 2, 
          name: 'Scope Summary and Access Check', 
          status: 'Pending', 
          assignee: 'Pramod Nair', 
          date: '2026-02-16', 
          notes: 'Verify repository access and generate scope summary document.',
          type: 'document-creation',
          documentType: 'Scope Summary',
          repositoryAccess: false,
          selectedMethod: null
        },
        { 
          id: 3, 
          name: 'Scope Documentation Creation', 
          status: 'Pending', 
          assignee: 'Business Analyst', 
          date: '2026-02-17', 
          notes: 'Define project scope including objectives, deliverables, timelines, and success criteria.',
          type: 'document-creation',
          documentType: 'Project Scope',
          selectedMethod: null
        },
        { 
          id: 3.5, 
          name: 'Technical Assessment', 
          status: 'Pending', 
          assignee: 'Tech Lead', 
          date: '2026-02-18', 
          notes: 'Comprehensive technical assessment of source and target environments, architecture, security, and infrastructure.',
          type: 'document-creation',
          documentType: 'Technical Assessment',
          selectedMethod: null
        },
        { 
          id: 4, 
          name: 'Resource Plan', 
          status: 'Pending', 
          assignee: 'Resource Manager', 
          date: '2026-02-18', 
          notes: 'Plan resources, roles, and allocation for the project duration.',
          type: 'document-creation',
          documentType: 'Resource Plan',
          selectedMethod: null
        },
        { 
          id: 5, 
          name: 'Risk Register', 
          status: 'Pending', 
          assignee: 'Risk Manager', 
          date: '2026-02-19', 
          notes: 'Identify and document potential risks with mitigation strategies.',
          type: 'document-creation',
          documentType: 'Risk Register',
          selectedMethod: null
        },
        { 
          id: 6, 
          name: 'Scope Sign-off Documentation', 
          status: 'Pending', 
          assignee: 'Project Sponsor', 
          date: '2026-02-20', 
          notes: 'Final approval and sign-off from all stakeholders.',
          type: 'document-creation',
          documentType: 'Scope Sign-off',
          selectedMethod: null
        }
      ];
      setActivities(defaultActivities);
      localStorage.setItem(activitiesKey, JSON.stringify(defaultActivities));
    }

    // Load created documents
    const documentsKey = `createdDocuments_${projectId}_3.1`;
    const savedDocuments = localStorage.getItem(documentsKey);
    if (savedDocuments) {
      const parsedDocuments = JSON.parse(savedDocuments);
      console.log('📄 Loaded documents:', parsedDocuments);
      setCreatedDocuments(parsedDocuments);
    } else {
      console.log('📄 No documents found');
      setCreatedDocuments([]);
    }
  };

  useEffect(() => {
    // Load project
    if (projectId) {
      const foundProject = projectRepository.getProjectById(parseInt(projectId));
      if (foundProject) {
        setProject(foundProject);
      }
    }

    loadActivitiesAndDocuments();
  }, [projectId]);

  // Reload activities and documents when returning from another screen
  useEffect(() => {
    console.log('🔄 Location changed - reloading activities and documents');
    loadActivitiesAndDocuments();
  }, [location.key, location.pathname]); // Triggers when navigation occurs

  const handleCheckRepositoryAccess = async (activityId) => {
    setCheckingRepositoryAccess(activityId);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const updatedActivities = activities.map(act => 
      act.id === activityId ? { ...act, repositoryAccess: true } : act
    );
    setActivities(updatedActivities);
    
    const activitiesKey = `activities_${projectId}_3.1`;
    localStorage.setItem(activitiesKey, JSON.stringify(updatedActivities));
    
    setCheckingRepositoryAccess(null);
  };

  const handleDocumentMethod = async (activity, method) => {
    if (method === 'Manual') {
      setUploadingActivity(activity);
      setShowUploadModal(true);
    } else if (method === 'Custom Agents') {
      setCustomAgentActivity(activity);
      setShowCustomAgentModal(true);
    } else {
      // Navigate to agentic conversation page for AI agents
      navigate(`/agentic-conversation/${projectId}`, {
        state: {
          activityId: activity.id,
          activityName: activity.name,
          documentType: activity.documentType,
          method: method,
          returnPath: `/initiation-screen/${projectId}`,
          stageId: '3.1'
        }
      });
    }
  };

  const simulateDocumentGeneration = async (activity, method, customAgent = null) => {
    const stages = [
      { stage: 'Initializing agent swarm...', substage: 'Connecting to DSE 2.0 multi-agent system', progress: 10, delay: 1000 },
      { stage: 'Analyzing requirements...', substage: 'Agent 1: Parsing project scope and objectives', progress: 20, delay: 1500 },
      { stage: 'Repository analysis...', substage: 'Agent 2: Scanning codebase structure and dependencies', progress: 30, delay: 2000 },
      { stage: 'Document structure planning...', substage: 'Agent 3: Creating document outline and sections', progress: 45, delay: 1800 },
      { stage: 'Content generation...', substage: 'Agent 4: Generating detailed content based on analysis', progress: 60, delay: 2500 },
      { stage: 'Cross-validation...', substage: 'Agent 5: Verifying accuracy and completeness', progress: 75, delay: 1500 },
      { stage: 'Formatting and styling...', substage: 'Agent 6: Applying professional document formatting', progress: 85, delay: 1200 },
      { stage: 'Quality assurance...', substage: 'Agent 7: Final review and compliance check', progress: 95, delay: 1000 },
      { stage: 'Complete!', substage: 'Document successfully generated and ready for review', progress: 100, delay: 500 }
    ];

    setGeneratingDocument({
      activityId: activity.id,
      method: method,
      progress: 0,
      stage: 'Starting...',
      substage: 'Preparing agent inference pipeline...',
      customAgent: customAgent
    });

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, stage.delay));
      setGeneratingDocument(prev => ({
        ...prev,
        progress: stage.progress,
        stage: stage.stage,
        substage: stage.substage
      }));
    }

    const updatedActivities = activities.map(act =>
      act.id === activity.id ? { ...act, status: 'Completed', selectedMethod: method } : act
    );
    setActivities(updatedActivities);
    
    const activitiesKey = `activities_${projectId}_3.1`;
    localStorage.setItem(activitiesKey, JSON.stringify(updatedActivities));

    const newDocument = {
      id: Date.now(),
      activityId: activity.id,
      name: activity.documentType,
      method: method,
      createdAt: new Date().toISOString(),
      type: 'pdf',
      customAgent: customAgent
    };
    const updatedDocuments = [...createdDocuments, newDocument];
    setCreatedDocuments(updatedDocuments);
    
    const documentsKey = `createdDocuments_${projectId}_3.1`;
    localStorage.setItem(documentsKey, JSON.stringify(updatedDocuments));

    await new Promise(resolve => setTimeout(resolve, 1000));
    setGeneratingDocument(null);
  };

  const handleUploadDocument = () => {
    if (!selectedFile || !uploadingActivity) return;

    const updatedActivities = activities.map(act =>
      act.id === uploadingActivity.id ? { ...act, status: 'Completed', selectedMethod: 'Manual' } : act
    );
    setActivities(updatedActivities);
    
    const activitiesKey = `activities_${projectId}_3.1`;
    localStorage.setItem(activitiesKey, JSON.stringify(updatedActivities));

    const newDocument = {
      id: Date.now(),
      activityId: uploadingActivity.id,
      name: uploadingActivity.documentType,
      method: 'Manual',
      fileName: selectedFile.name,
      createdAt: new Date().toISOString(),
      type: 'uploaded'
    };
    const updatedDocuments = [...createdDocuments, newDocument];
    setCreatedDocuments(updatedDocuments);
    
    const documentsKey = `createdDocuments_${projectId}_3.1`;
    localStorage.setItem(documentsKey, JSON.stringify(updatedDocuments));

    setShowUploadModal(false);
    setUploadingActivity(null);
    setSelectedFile(null);
  };

  const handleCustomAgentSelect = (agent) => {
    setSelectedCustomAgent(agent);
  };

  const handleConfirmCustomAgent = async () => {
    if (selectedCustomAgent && customAgentActivity) {
      const methodName = `Custom Agents: ${selectedCustomAgent.name}`;
      setShowCustomAgentModal(false);
      
      await simulateDocumentGeneration(customAgentActivity, methodName, selectedCustomAgent);
      
      setCustomAgentActivity(null);
      setSelectedCustomAgent(null);
    }
  };

  const handleViewDetails = (activity) => {
    const stageId = '3.1';
    
    switch (activity.documentType) {
      case 'Scope Summary':
        navigate(`/scope-summary-viewer/${projectId}/${stageId}`);
        break;
      case 'Project Scope':
        navigate(`/document-viewer/${projectId}/${stageId}/project-scope`);
        break;
      case 'Technical Assessment':
        navigate(`/technical-assessment-viewer/${projectId}/${stageId}`);
        break;
      case 'Resource Plan':
        navigate(`/resource-plan-viewer/${projectId}/${stageId}`);
        break;
      case 'Risk Register':
        navigate(`/risk-register-viewer/${projectId}/${stageId}`);
        break;
      case 'Scope Sign-off':
        navigate(`/scope-signoff-viewer/${projectId}/${stageId}`);
        break;
      default:
        navigate(`/document-viewer/${projectId}/${stageId}/general`);
    }
  };

  const handleDeleteStakeholder = (activityId, stakeholderIndex) => {
    const updatedActivities = activities.map(act => {
      if (act.id === activityId && act.stakeholders) {
        const newStakeholders = [...act.stakeholders];
        newStakeholders.splice(stakeholderIndex, 1);
        return { ...act, stakeholders: newStakeholders };
      }
      return act;
    });
    setActivities(updatedActivities);
    
    const activitiesKey = `activities_${projectId}_3.1`;
    localStorage.setItem(activitiesKey, JSON.stringify(updatedActivities));
  };

  const handleRerunActivity = (activity) => {
    // Reset activity to pending and clear selected method
    const updatedActivities = activities.map(act =>
      act.id === activity.id 
        ? { 
            ...act, 
            status: 'Pending', 
            selectedMethod: null,
            repositoryAccess: activity.documentType === 'Scope Summary' ? false : act.repositoryAccess
          } 
        : act
    );
    setActivities(updatedActivities);
    
    const activitiesKey = `activities_${projectId}_3.1`;
    localStorage.setItem(activitiesKey, JSON.stringify(updatedActivities));

    // Remove associated documents
    const updatedDocuments = createdDocuments.filter(doc => doc.activityId !== activity.id);
    setCreatedDocuments(updatedDocuments);
    
    const documentsKey = `createdDocuments_${projectId}_3.1`;
    localStorage.setItem(documentsKey, JSON.stringify(updatedDocuments));
  };

  const toggleAgentSelection = (activityId) => {
    setExpandedActivities(prev => ({
      ...prev,
      [activityId]: !prev[activityId]
    }));
  };

  const handleMarkStakeholderDone = (activityId) => {
    const updatedActivities = activities.map(act =>
      act.id === activityId ? { ...act, status: 'Completed' } : act
    );
    setActivities(updatedActivities);
    
    const activitiesKey = `activities_${projectId}_3.1`;
    localStorage.setItem(activitiesKey, JSON.stringify(updatedActivities));
  };

  const handleMarkAsComplete = (activity) => {
    // Mark activity as complete
    const updatedActivities = activities.map(act =>
      act.id === activity.id ? { ...act, status: 'Completed', selectedMethod: 'Manual Completion' } : act
    );
    setActivities(updatedActivities);
    
    const activitiesKey = `activities_${projectId}_3.1`;
    localStorage.setItem(activitiesKey, JSON.stringify(updatedActivities));

    // Create a document artifact for document-creation type activities
    if (activity.type === 'document-creation' && activity.documentType) {
      const newDocument = {
        id: Date.now(),
        activityId: activity.id,
        name: activity.documentType,
        method: 'Manual Completion',
        createdAt: new Date().toISOString(),
        type: 'pdf'
      };
      const updatedDocuments = [...createdDocuments, newDocument];
      setCreatedDocuments(updatedDocuments);
      
      const documentsKey = `createdDocuments_${projectId}_3.1`;
      localStorage.setItem(documentsKey, JSON.stringify(updatedDocuments));
    }
  };

  const completedTasks = activities.filter(act => act.status === 'Completed').length;
  const totalTasks = activities.length;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const allTasksCompleted = completedTasks === totalTasks && totalTasks > 0;

  const handleCompleteStage = () => {
    if (!allTasksCompleted) return;
    
    // Mark current stage (3.1) as completed
    const completedStages = JSON.parse(localStorage.getItem(`completedStages_${projectId}`) || '[]');
    if (!completedStages.includes('3.1')) {
      completedStages.push('3.1');
      localStorage.setItem(`completedStages_${projectId}`, JSON.stringify(completedStages));
    }
    
    // Set next stage (4.2) as active
    localStorage.setItem(`activeStage_${projectId}`, '4.2');
    
    // Navigate back to pipeline
    navigate(`/project-pipeline/${projectId}`);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => navigate(`/project-pipeline/${projectId}`)}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-4"
        >
          <span>←</span>
          <span>Back to Pipeline</span>
        </button>
        
        {/* Compact Migration ID Banner */}
        <div className="bg-gradient-to-r from-orange-900/40 via-red-900/40 to-orange-900/40 border border-orange-500/30 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-orange-400/80 uppercase font-bold mb-2 tracking-wider">REM ID</p>
                  <h2 className="text-5xl font-black text-white mb-3 tracking-tight bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">{project.tunaId}</h2>
                  <p className="text-base text-white/90 mb-2">{project.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-md bg-orange-900/60 border border-orange-700/50 text-white/90">
                      {project.module}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-md border ${
                      project.priority === 'High' ? 'bg-red-900/60 border-red-700/50 text-red-300' :
                      project.priority === 'Medium' ? 'bg-yellow-900/60 border-yellow-700/50 text-yellow-300' :
                      'bg-green-900/60 border-green-700/50 text-green-300'
                    }`}>
                      {project.priority} Priority
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-[10px] text-white/50 uppercase tracking-wider mb-2">Current Owner</p>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl font-bold mb-2 shadow-xl shadow-orange-500/30">
                PN
              </div>
              <p className="text-sm font-bold text-white">{project.owner}</p>
              <p className="text-xs text-white/50">Migration Expert</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-4xl shadow-xl">
            🎯
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-orange-500/20 text-orange-400">
                Stage 3.1
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400">
                0% Pipeline Progress
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Initiation and Scoping</h1>
            <p className="text-white/60">Define project scope, objectives, and initial assessment</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/50 mb-1">Stage Completion</p>
            <p className="text-3xl font-bold text-orange-400">{Math.round(completionPercentage)}%</p>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-white/40 uppercase mb-2">Tasks Completed</p>
          <p className="text-2xl font-bold text-green-400">{completedTasks}/{totalTasks}</p>
          <div className="mt-2 w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-white/40 uppercase mb-2">Hours Spent</p>
          <p className="text-2xl font-bold text-cyan-400">24h</p>
        </div>
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-white/40 uppercase mb-2">Team Size</p>
          <p className="text-2xl font-bold text-purple-400">5</p>
        </div>
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-white/40 uppercase mb-2">Completion</p>
          <p className="text-2xl font-bold text-orange-400">{Math.round(completionPercentage)}%</p>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span>📋</span>
            <span>Stage Activities</span>
          </h2>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => {
            const getActivityStatusClass = () => {
              if (activity.status === 'Completed') return 'bg-green-500/5 border-green-500/20';
              if (activity.status === 'In Progress') return 'bg-orange-500/5 border-orange-500/20';
              return 'bg-white/[0.02] border-white/10';
            };

            const getIconBgClass = () => {
              if (activity.status === 'Completed') return 'bg-green-500/20';
              if (activity.status === 'In Progress') return 'bg-orange-500/20';
              return 'bg-white/10';
            };

            const getStatusBadgeClass = () => {
              if (activity.status === 'Completed') return 'bg-green-500/20 text-green-400';
              if (activity.status === 'In Progress') return 'bg-orange-500/20 text-orange-400';
              return 'bg-white/10 text-white/50';
            };

            const hasDocument = createdDocuments.some(doc => doc.activityId === activity.id);

            return (
              <div key={activity.id} className={`rounded-xl border transition-all duration-500 ${getActivityStatusClass()}`}>
                <div className="p-4 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0 transition-all duration-300 ${getIconBgClass()}`}>
                    {activity.status === 'Completed' ? '✓' : activity.status === 'In Progress' ? '⏳' : '○'}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{activity.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${getStatusBadgeClass()}`}>
                        {activity.status}
                      </span>
                      {activity.selectedMethod && (
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                          via {activity.selectedMethod}
                        </span>
                      )}
                      <div className="flex-1"></div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMarkAsComplete(activity)}
                          className="px-3 py-1.5 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
                        >
                          <span>✓</span>
                          <span>Mark as Complete</span>
                        </button>
                        <button
                          onClick={() => handleRerunActivity(activity)}
                          className="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
                        >
                          <span>🔄</span>
                          <span>Re-run</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-white/50 mb-2">
                      <span className="flex items-center gap-2">
                        <span>👤</span>
                        <span>{activity.assignee}</span>
                      </span>
                      {activity.date && (
                        <span className="flex items-center gap-2">
                          <span>📅</span>
                          <span>{activity.date}</span>
                        </span>
                      )}
                    </div>
                    
                    {activity.notes && (
                      <p className="text-sm text-white/60 leading-relaxed mb-3">
                        {activity.notes}
                      </p>
                    )}

                    {/* Stakeholder Identification Content */}
                    {activity.type === 'stakeholder' && activity.stakeholders && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-semibold text-white/80">Identified Stakeholders</p>
                          <button className="text-xs px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors flex items-center gap-2">
                            <span>+</span>
                            <span>Add Persona</span>
                          </button>
                        </div>
                        <div className="flex items-center gap-4 flex-wrap">
                          {activity.stakeholders.map((stakeholder, idx) => (
                            <div key={idx} className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg hover:bg-white/[0.05] transition-all">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white flex-shrink-0">
                                👤
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium text-sm text-white">{stakeholder.name}</p>
                                <p className="text-xs text-white/50">{stakeholder.division} • {stakeholder.role}</p>
                              </div>
                              <button 
                                onClick={() => handleDeleteStakeholder(activity.id, idx)}
                                className="text-xs px-3 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded transition-colors flex-shrink-0 ml-2 flex items-center gap-1.5"
                              >
                                <span>🗑️</span>
                                <span>Delete</span>
                              </button>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => handleMarkStakeholderDone(activity.id)}
                          className="mt-3 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-green-500/40 transition-all"
                        >
                          Mark as Done
                        </button>
                      </div>
                    )}

                    {/* Repository Access Check - for Scope Summary */}
                    {activity.documentType === 'Scope Summary' && activity.status === 'Pending' && (
                      <>
                        <div 
                          onClick={() => !activity.repositoryAccess && handleCheckRepositoryAccess(activity.id)}
                          className={`bg-white/[0.02] border border-white/10 rounded-xl p-4 mb-4 transition-all ${
                            !activity.repositoryAccess ? 'cursor-pointer hover:border-orange-500/30 hover:bg-orange-500/5' : ''
                          } ${checkingRepositoryAccess === activity.id ? 'animate-pulse' : ''}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                                checkingRepositoryAccess === activity.id 
                                  ? 'bg-orange-500/20 animate-spin' 
                                  : activity.repositoryAccess 
                                  ? 'bg-green-500/20' 
                                  : 'bg-orange-500/20'
                              }`}>
                                {checkingRepositoryAccess === activity.id ? '⏳' : activity.repositoryAccess ? '✓' : '🔐'}
                              </div>
                              <div>
                                <p className={`font-semibold transition-colors ${
                                  activity.repositoryAccess ? 'text-green-400' : 'text-orange-400'
                                }`}>
                                  {checkingRepositoryAccess === activity.id 
                                    ? 'Checking Repository Access...' 
                                    : activity.repositoryAccess 
                                    ? 'Repository Access Verified' 
                                    : 'Click to Verify Repository Access'}
                                </p>
                                <p className="text-sm text-white/60">
                                  {checkingRepositoryAccess === activity.id 
                                    ? 'Verifying credentials and permissions...' 
                                    : activity.repositoryAccess 
                                    ? 'Access confirmed. Ready to generate scope summary.' 
                                    : 'Verify access to project repositories before generating document.'}
                                </p>
                              </div>
                            </div>
                            {activity.repositoryAccess && (
                              <div className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-xs font-medium flex items-center gap-1.5">
                                ✓ <span>Ready</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Only show creation methods if no document has been created yet */}
                        {activity.repositoryAccess && !hasDocument && (
                          <>
                            <p className="text-sm font-semibold text-white/80 mb-3">Select Creation Method</p>
                            <div className="grid grid-cols-4 gap-3">
                              <button 
                                onClick={() => handleDocumentMethod(activity, 'GHCP Agent')}
                                className="p-4 bg-white/[0.03] border border-white/10 rounded-lg hover:border-orange-500/50 hover:bg-orange-500/10 transition-all text-center group"
                              >
                                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                  <img src={copilotLogo} alt="GHCP Agent" className="w-8 h-8 object-contain" />
                                </div>
                                <p className="text-sm font-medium mb-1">GHCP Agent</p>
                                <p className="text-xs text-white/40">AI-powered creation</p>
                              </button>
                              <button 
                                onClick={() => handleDocumentMethod(activity, 'DSE 2.0 Agents')}
                                className="p-4 bg-white/[0.03] border border-white/10 rounded-lg hover:border-orange-500/50 hover:bg-orange-500/10 transition-all text-center group"
                              >
                                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                  <img src={dseAgentLogo} alt="DSE 2.0 Agents" className="w-8 h-8 object-contain" />
                                </div>
                                <p className="text-sm font-medium mb-1">DSE 2.0 Agents</p>
                                <p className="text-xs text-white/40">Multi-agent system</p>
                              </button>
                              <button 
                                onClick={() => handleDocumentMethod(activity, 'Custom Agents')}
                                className="p-4 bg-white/[0.03] border border-white/10 rounded-lg hover:border-orange-500/50 hover:bg-orange-500/10 transition-all text-center group"
                              >
                                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-2xl">
                                  🤖
                                </div>
                                <p className="text-sm font-medium mb-1">Custom Agents</p>
                                <p className="text-xs text-white/40">Your AI agents</p>
                              </button>
                              <button 
                                onClick={() => handleDocumentMethod(activity, 'Manual')}
                                className="p-4 bg-white/[0.03] border border-white/10 rounded-lg hover:border-orange-500/50 hover:bg-orange-500/10 transition-all text-center group"
                              >
                                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl">
                                  ✍️
                                </div>
                                <p className="text-sm font-medium mb-1">Manual</p>
                                <p className="text-xs text-white/40">Upload document</p>
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* Other activities - show method selection if pending */}
                    {activity.documentType !== 'Scope Summary' && activity.status === 'Pending' && !hasDocument && (
                      <>
                        {!expandedActivities[activity.id] ? (
                          <button
                            onClick={() => toggleAgentSelection(activity.id)}
                            className="mt-3 px-4 py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition-all flex items-center gap-2 text-sm font-medium"
                          >
                            <span>🤖</span>
                            <span>Choose Creation Method</span>
                            <span className="ml-auto">▼</span>
                          </button>
                        ) : (
                          <>
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-sm font-semibold text-white/80">Select Creation Method</p>
                              <button
                                onClick={() => toggleAgentSelection(activity.id)}
                                className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors flex items-center gap-1.5"
                              >
                                <span>▲</span>
                                <span>Minimize</span>
                              </button>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                              <button 
                                onClick={() => handleDocumentMethod(activity, 'GHCP Agent')}
                                className="p-4 bg-white/[0.03] border border-white/10 rounded-lg hover:border-orange-500/50 hover:bg-orange-500/10 transition-all text-center group"
                              >
                                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                  <img src={copilotLogo} alt="GHCP Agent" className="w-8 h-8 object-contain" />
                                </div>
                                <p className="text-sm font-medium mb-1">GHCP Agent</p>
                                <p className="text-xs text-white/40">AI-powered creation</p>
                              </button>
                              <button 
                                onClick={() => handleDocumentMethod(activity, 'DSE 2.0 Agents')}
                                className="p-4 bg-white/[0.03] border border-white/10 rounded-lg hover:border-orange-500/50 hover:bg-orange-500/10 transition-all text-center group"
                              >
                                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                  <img src={dseAgentLogo} alt="DSE 2.0 Agents" className="w-8 h-8 object-contain" />
                                </div>
                                <p className="text-sm font-medium mb-1">DSE 2.0 Agents</p>
                                <p className="text-xs text-white/40">Multi-agent system</p>
                              </button>
                              <button 
                                onClick={() => handleDocumentMethod(activity, 'Custom Agents')}
                                className="p-4 bg-white/[0.03] border border-white/10 rounded-lg hover:border-orange-500/50 hover:bg-orange-500/10 transition-all text-center group"
                              >
                                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-2xl">
                                  🤖
                                </div>
                                <p className="text-sm font-medium mb-1">Custom Agents</p>
                                <p className="text-xs text-white/40">Your AI agents</p>
                              </button>
                              <button 
                                onClick={() => handleDocumentMethod(activity, 'Manual')}
                                className="p-4 bg-white/[0.03] border border-white/10 rounded-lg hover:border-orange-500/50 hover:bg-orange-500/10 transition-all text-center group"
                              >
                                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl">
                                  ✍️
                                </div>
                                <p className="text-sm font-medium mb-1">Manual</p>
                                <p className="text-xs text-white/40">Upload document</p>
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* Show View Details button if completed */}
                    {activity.status === 'Completed' && hasDocument && activity.type !== 'stakeholder' && (
                      <button
                        onClick={() => handleViewDetails(activity)}
                        className="mt-3 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Complete Stage Button */}
      <div className="flex justify-center">
        <button
          onClick={handleCompleteStage}
          disabled={!allTasksCompleted}
          className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all flex items-center gap-3 ${
            allTasksCompleted 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-2xl hover:shadow-green-500/40 cursor-pointer' 
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
        >
          <span>✓</span>
          <span>Complete Stage</span>
          {!allTasksCompleted && (
            <span className="text-xs">({completedTasks}/{totalTasks} completed)</span>
          )}
        </button>
      </div>

      {/* Document Generation Modal */}
      {generatingDocument && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl p-8 w-full max-w-lg shadow-2xl">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                {generatingDocument.method === 'GHCP Agent' ? (
                  <img src={copilotLogo} alt="GHCP Agent" className="w-16 h-16 object-contain" />
                ) : generatingDocument.method === 'DSE 2.0 Agents' ? (
                  <img src={dseAgentLogo} alt="DSE 2.0 Agents" className="w-16 h-16 object-contain" />
                ) : generatingDocument.customAgent ? (
                  <span className="text-6xl">{generatingDocument.customAgent.icon}</span>
                ) : (
                  <span className="text-6xl">🤖</span>
                )}
              </div>
              
              <h3 className="text-2xl font-bold mb-2">
                {generatingDocument.method.startsWith('Custom Agents:') 
                  ? generatingDocument.customAgent?.name 
                  : generatingDocument.method} Working
              </h3>
              <p className="text-lg text-white/80 mb-2">{generatingDocument.stage}</p>
              <p className="text-sm text-cyan-400/70 mb-6">{generatingDocument.substage}</p>
              
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 rounded-full"
                  style={{ width: `${generatingDocument.progress}%` }}
                />
              </div>
              <p className="text-sm text-cyan-400 font-semibold">{generatingDocument.progress}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && uploadingActivity && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/30 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Upload Document</h3>
            <p className="text-white/60 mb-6">Upload {uploadingActivity.documentType}</p>
            
            <div className="mb-6">
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-sm"
                accept=".pdf,.doc,.docx"
              />
              {selectedFile && (
                <p className="text-sm text-green-400 mt-2">✓ {selectedFile.name}</p>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleUploadDocument}
                disabled={!selectedFile}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFile 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg hover:shadow-orange-500/30' 
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                Upload
              </button>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadingActivity(null);
                  setSelectedFile(null);
                }}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Agent Selection Modal */}
      {showCustomAgentModal && customAgentActivity && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-green-500/30 rounded-2xl p-8 w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-1">Select Custom Agent</h3>
                <p className="text-white/60 text-sm">Choose an agent for {customAgentActivity?.documentType}</p>
              </div>
              <button 
                onClick={() => {
                  setShowCustomAgentModal(false);
                  setCustomAgentActivity(null);
                  setSelectedCustomAgent(null);
                }}
                className="text-white/50 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3 mb-6">
              {customAgentsData[customAgentActivity?.documentType]?.map((agent) => (
                <div 
                  key={agent.id}
                  onClick={() => handleCustomAgentSelect(agent)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedCustomAgent?.id === agent.id 
                      ? 'border-green-500 bg-green-500/10' 
                      : 'border-white/10 bg-white/[0.02] hover:border-green-500/50 hover:bg-green-500/5'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-3xl flex-shrink-0">
                      {agent.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-lg mb-1">{agent.name}</h4>
                          <p className="text-sm text-white/60">{agent.description}</p>
                        </div>
                        {selectedCustomAgent?.id === agent.id && (
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 mt-3">
                        <div className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-medium">
                          {agent.specialization}
                        </div>
                        <div className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-xs font-medium">
                          ⏱️ {agent.estimatedTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )) || (
                <div className="text-center py-8 text-white/40">
                  <p className="text-4xl mb-3">🤖</p>
                  <p>No custom agents configured for this document type</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCustomAgentModal(false);
                  setCustomAgentActivity(null);
                  setSelectedCustomAgent(null);
                }}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCustomAgent}
                disabled={!selectedCustomAgent}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                  selectedCustomAgent 
                    ? 'bg-gradient-to-r from-green-500 to-teal-500 hover:shadow-lg hover:shadow-green-500/30' 
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                Confirm Agent Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InitiationScreen;