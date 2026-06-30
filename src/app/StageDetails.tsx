import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { projectRepository } from '../utils/projectRepository';
import devinLogo from 'figma:asset/2cf6808ab62023d3c8f53c9256a2d749b029890a.png';
import copilotLogo from 'figma:asset/105bbd5ef82f7e9c35413389367da61238f8efba.png';
import customAgentsData from '../data/customAgents.json';

const StageDetails = () => {
  const navigate = useNavigate();
  const { projectId, stageId } = useParams();
  const [project, setProject] = useState(null);
  const [stage, setStage] = useState(null);
  const [activities, setActivities] = useState([]);
  const [editingStakeholder, setEditingStakeholder] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '', location: '', division: '' });
  
  // Add new states for team member management
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [currentActivityId, setCurrentActivityId] = useState(null);
  const [newPersonForm, setNewPersonForm] = useState({ 
    name: '', 
    email: '', 
    role: '', 
    location: '', 
    division: '',
    skills: ''
  });
  const [availableTeamMembers, setAvailableTeamMembers] = useState([]);
  
  const [showDocumentGenerationModal, setShowDocumentGenerationModal] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({ stage: '', progress: 0 });
  const [currentGeneratingActivity, setCurrentGeneratingActivity] = useState(null);
  const [createdDocuments, setCreatedDocuments] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadingActivity, setUploadingActivity] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Custom Agents Modal
  const [showCustomAgentModal, setShowCustomAgentModal] = useState(false);
  const [customAgentActivity, setCustomAgentActivity] = useState(null);
  const [selectedCustomAgent, setSelectedCustomAgent] = useState(null);
  
  // Repository Access Checking
  const [checkingRepositoryAccess, setCheckingRepositoryAccess] = useState(null); // Stores activity id being checked

  const initialStages = {
    '3.1': {
      id: '3.1',
      name: 'Initiation and Scoping',
      icon: '🎯',
      color: 'from-blue-500 to-cyan-500',
      percentage: 0,
      description: 'Define project scope, objectives, and initial assessment',
      activities: [
        { 
          id: 1, 
          name: 'Stakeholder Identification', 
          status: 'Pending', 
          assignee: 'PN', 
          date: '2026-02-15', 
          notes: 'Identified all key stakeholders including business owners, technical leads, and finance team.',
          type: 'stakeholder',
          stakeholders: [
            { name: 'John Smith', email: 'john.smith@company.com', division: 'Business Operations', role: 'Business Owner', location: 'New York, USA' },
            { name: 'Sarah Chen', email: 'sarah.chen@company.com', division: 'Technology', role: 'Tech Lead', location: 'San Francisco, USA' },
            { name: 'Michael Brown', email: 'michael.brown@company.com', division: 'Finance', role: 'Finance Manager', location: 'London, UK' },
          ]
        },
        { 
          id: 1.5, 
          name: 'Scope Summary and Access Check', 
          status: 'Pending', 
          assignee: 'PN', 
          date: '2026-02-16', 
          notes: 'Verify repository access and generate scope summary document.',
          type: 'document-creation',
          selectedMethod: null,
          documentType: 'Scope Summary',
          repositoryAccess: false  // Keep this for the pre-generation check
        },
        { 
          id: 2, 
          name: 'Scope Document Creation', 
          status: 'Pending', 
          assignee: 'PN', 
          date: '2026-02-17', 
          notes: 'Created comprehensive scope document outlining migration boundaries, objectives, and success criteria.',
          type: 'document-creation',
          selectedMethod: null,
          documentType: 'Scope Document'
        },
        { 
          id: 3, 
          name: 'Technical Assessment', 
          status: 'Pending', 
          assignee: 'Tech Lead', 
          date: '2026-02-18', 
          notes: 'Completed assessment of source and target environments. Documented technical constraints and requirements.',
          type: 'document-creation',
          selectedMethod: null,
          documentType: 'Technical Assessment Report'
        },
        { 
          id: 4, 
          name: 'Resource Planning', 
          status: 'Pending', 
          assignee: 'PM', 
          date: '2026-02-19', 
          notes: 'Initial resource plan created with team composition and skill requirements.',
          type: 'document-creation',
          selectedMethod: null,
          documentType: 'Resource Plan'
        },
        { 
          id: 5, 
          name: 'Risk Identification', 
          status: 'Pending', 
          assignee: 'PN', 
          date: '2026-02-20', 
          notes: 'Identified potential risks and created mitigation strategies.',
          type: 'document-creation',
          selectedMethod: null,
          documentType: 'Risk Assessment Report'
        },
      ],
      deliverables: [
        { name: 'Scope Summary Assimilation Report', status: 'pending', id: 'scope-assimilation' },
        { name: 'Project Scope Document', status: 'pending', id: 'scope-doc' },
        { name: 'Technical Assessment Report', status: 'pending', id: 'tech-assessment' },
        { name: 'Resource Plan', status: 'pending', id: 'resource-plan' },
        { name: 'Risk Register', status: 'pending', id: 'risk-register' },
        { name: 'Stakeholder Matrix', status: 'pending', id: 'stakeholder-matrix' }
      ],
    },
    '4.2': {
      id: '4.2',
      name: 'Scope Sign-off',
      icon: '✍️',
      color: 'from-cyan-500 to-teal-500',
      percentage: 7,
      description: 'Review and approve project scope with all stakeholders',
      activities: [
        { 
          id: 1, 
          name: 'Scope Sign-off', 
          status: 'Pending', 
          assignee: 'All Stakeholders', 
          date: '2026-02-20', 
          notes: 'Business User, AFF Lead, and Vendor Lead must review and sign off on the project scope and timeline.',
          type: 'document-creation',
          selectedMethod: null,
          documentType: 'Scope Sign-off'
        },
      ],
      deliverables: [
        { name: 'Signed Scope Document', status: 'pending', id: 'signed-scope' },
        { name: 'Stakeholder Approval Records', status: 'pending', id: 'approval-records' },
      ],
    },
  };

  useEffect(() => {
    if (projectId && stageId) {
      const foundProject = projectRepository.getAllProjects().find(p => p.id === parseInt(projectId));
      if (foundProject) {
        setProject(foundProject);
      }
      
      if (initialStages[stageId]) {
        setStage(initialStages[stageId]);
        
        // Load persisted activity states from localStorage
        const savedActivities = localStorage.getItem(`activities_${projectId}_${stageId}`);
        
        if (savedActivities) {
          const parsed = JSON.parse(savedActivities);
          
          // AGGRESSIVE DEDUPLICATION: Remove all duplicates immediately
          // Also filter out any activities with missing names or invalid IDs
          const validActivityIds = initialStages[stageId].activities.map(a => a.id);
          const deduplicatedParsed = parsed
            .filter(activity => activity.name && activity.name.trim() !== '') // Must have a name
            .filter(activity => validActivityIds.includes(activity.id)) // Must be a valid activity ID
            .filter((activity, index, self) =>
              index === self.findIndex((a) => a.id === activity.id) // Must be unique
            );
          
          // Check if we need to update activity 1.5 from access-check to document-creation
          const scopeSummaryActivity = deduplicatedParsed.find(a => a.id === 1.5);
          if (scopeSummaryActivity && scopeSummaryActivity.type === 'access-check') {
            // Update it to the new document-creation type
            const updatedActivity = initialStages[stageId].activities.find(a => a.id === 1.5);
            if (updatedActivity) {
              const index = deduplicatedParsed.findIndex(a => a.id === 1.5);
              deduplicatedParsed[index] = {
                ...updatedActivity,
                status: scopeSummaryActivity.status,
                repositoryAccess: scopeSummaryActivity.repositoryAccess || false
              };
            }
          }
          
          if (deduplicatedParsed.length < initialStages[stageId].activities.length) {
            // Regular merge: keep saved activities, add new ones from initialStages
            const newActivities = [...deduplicatedParsed];
            initialStages[stageId].activities.forEach(initialActivity => {
              const exists = deduplicatedParsed.find(a => a.id === initialActivity.id);
              if (!exists) {
                newActivities.push(initialActivity);
              }
            });
            // Sort by id to maintain order
            newActivities.sort((a, b) => a.id - b.id);
            
            // Remove duplicates and invalid activities - AGAIN for safety
            const uniqueActivities = newActivities
              .filter(activity => activity.name && activity.name.trim() !== '')
              .filter(activity => validActivityIds.includes(activity.id))
              .filter((activity, index, self) =>
                index === self.findIndex((a) => a.id === activity.id)
              );
            
            setActivities(uniqueActivities);
          } else {
            // Remove duplicates and invalid activities - AGAIN for safety
            const uniqueActivities = deduplicatedParsed
              .filter(activity => activity.name && activity.name.trim() !== '')
              .filter(activity => validActivityIds.includes(activity.id))
              .filter((activity, index, self) =>
                index === self.findIndex((a) => a.id === activity.id)
              );
            
            setActivities(uniqueActivities);
          }
        } else {
          // No saved data, use initial
          setActivities(initialStages[stageId].activities);
        }
      }

      // Load persisted created documents from localStorage
      const savedDocuments = localStorage.getItem(`createdDocuments_${projectId}_${stageId}`);
      if (savedDocuments) {
        setCreatedDocuments(JSON.parse(savedDocuments));
      }
    }
  }, [projectId, stageId]);

  const handleMarkComplete = (activityId) => {
    setActivities(prevActivities => 
      prevActivities.map(activity => 
        activity.id === activityId 
          ? { ...activity, status: 'Completed' }
          : activity
      )
    );
  };

  const handleMarkIncomplete = (activityId) => {
    setActivities(prevActivities => 
      prevActivities.map(activity => {
        if (activity.id === activityId) {
          // Get the initial activity state from initialStages to restore defaults
          const initialActivity = Object.values(initialStages)
            .flatMap(stage => stage.activities)
            .find(act => act.id === activityId);
          
          // Reset to initial state - create a fresh copy to avoid reference issues
          // This completely resets the activity to its non-initiated state
          return {
            ...initialActivity,
            status: 'Pending',
            selectedMethod: null,  // Explicitly set to null to clear selection
            customAgentIcon: undefined,
            customAgentName: undefined,
            // Explicitly reset repository access for Scope Summary
            repositoryAccess: initialActivity?.repositoryAccess ?? false
          };
        }
        return activity;
      })
    );

    // Remove any created documents for this activity
    setCreatedDocuments(prevDocuments => 
      prevDocuments.filter(doc => doc.activityId !== activityId)
    );
  };

  // Persist activities when they change
  useEffect(() => {
    if (projectId && stageId && activities.length > 0) {
      // Get valid activity IDs from initial definition
      const validActivityIds = initialStages[stageId]?.activities.map(a => a.id) || [];
      
      // Remove duplicates and invalid activities before saving
      const uniqueActivities = activities
        .filter(activity => activity.name && activity.name.trim() !== '') // Must have a name
        .filter(activity => validActivityIds.includes(activity.id)) // Must be valid
        .filter((activity, index, self) =>
          index === self.findIndex((a) => a.id === activity.id) // Must be unique
        );
      localStorage.setItem(`activities_${projectId}_${stageId}`, JSON.stringify(uniqueActivities));
    }
  }, [activities, projectId, stageId]);

  // Persist created documents when they change
  useEffect(() => {
    if (projectId && stageId && createdDocuments.length > 0) {
      localStorage.setItem(`createdDocuments_${projectId}_${stageId}`, JSON.stringify(createdDocuments));
    }
  }, [createdDocuments, projectId, stageId]);

  // Check if all activities are completed and mark stage as complete
  useEffect(() => {
    if (projectId && stageId && activities.length > 0) {
      const completedCount = activities.filter(a => a.status === 'Completed').length;
      const totalCount = activities.length;
      
      if (completedCount === totalCount) {
        // Mark this stage as complete in localStorage
        const completedStagesKey = `completedStages_${projectId}`;
        const completedStages = JSON.parse(localStorage.getItem(completedStagesKey) || '[]');
        
        if (!completedStages.includes(stageId)) {
          completedStages.push(stageId);
          localStorage.setItem(completedStagesKey, JSON.stringify(completedStages));
          
          // Set the next stage as active
          const stageOrder = ['3.1', '4.2', '4.3', '5.3', '6.1', '7.1', '7.2', '7.3', '8.1', '8.2', '8.3', '8.4', '9.2', '10.2', '11.0'];
          const currentIndex = stageOrder.indexOf(stageId);
          if (currentIndex !== -1 && currentIndex < stageOrder.length - 1) {
            const nextStage = stageOrder[currentIndex + 1];
            localStorage.setItem(`activeStage_${projectId}`, nextStage);
          }
        }
      }
    }
  }, [activities, projectId, stageId]);

  const handleEditStakeholder = (activityId, stakeholderIndex, stakeholder) => {
    setEditingStakeholder({ activityId, stakeholderIndex });
    setEditForm({
      name: stakeholder.name,
      email: stakeholder.email,
      role: stakeholder.role,
      location: stakeholder.location,
      division: stakeholder.division
    });
    setShowEditModal(true);
  };

  const handleSaveStakeholder = () => {
    if (editingStakeholder) {
      setActivities(prevActivities =>
        prevActivities.map(activity =>
          activity.id === editingStakeholder.activityId && activity.stakeholders
            ? {
                ...activity,
                stakeholders: activity.stakeholders.map((s, idx) =>
                  idx === editingStakeholder.stakeholderIndex ? editForm : s
                )
              }
            : activity
        )
      );
    }
    setShowEditModal(false);
    setEditingStakeholder(null);
  };

  const simulateDocumentGeneration = async (activity, method, customAgent = null) => {
    setShowDocumentGenerationModal(true);
    
    // Store custom agent info in the activity for display
    const activityWithAgent = customAgent 
      ? { ...activity, selectedMethod: method, customAgentIcon: customAgent.icon }
      : { ...activity, selectedMethod: method };
    
    setCurrentGeneratingActivity(activityWithAgent);
    setGenerationProgress({ stage: 'Initializing AI Agent...', progress: 0 });

    const stages = [
      { text: 'Initializing AI Agent...', duration: 1000 },
      { text: 'Analyzing project requirements...', duration: 1500 },
      { text: 'Gathering stakeholder information...', duration: 1200 },
      { text: 'Performing scope discovery...', duration: 2000 },
      { text: 'Identifying technical constraints...', duration: 1500 },
      { text: 'Generating document structure...', duration: 1000 },
      { text: 'Populating content sections...', duration: 1500 },
      { text: 'Formatting and finalizing PDF...', duration: 1000 },
      { text: 'Document generated successfully!', duration: 500 }
    ];

    for (let i = 0; i < stages.length; i++) {
      setGenerationProgress({ stage: stages[i].text, progress: ((i + 1) / stages.length) * 100 });
      await new Promise(resolve => setTimeout(resolve, stages[i].duration));
    }

    // Create the document
    const newDocument = {
      id: `doc-${Date.now()}`,
      name: activity.documentType,
      activityId: activity.id,
      method: method,
      createdAt: new Date().toISOString(),
      type: 'pdf',
      customAgent: customAgent  // Store custom agent info
    };

    setCreatedDocuments(prev => [...prev, newDocument]);

    // Mark activity as completed and store custom agent info
    setActivities(prevActivities => 
      prevActivities.map(act => 
        act.id === activity.id 
          ? { 
              ...act, 
              status: 'Completed', 
              selectedMethod: method,
              customAgentIcon: customAgent?.icon,
              customAgentName: customAgent?.name
            }
          : act
      )
    );

    setTimeout(() => {
      setShowDocumentGenerationModal(false);
      setCurrentGeneratingActivity(null);
      setGenerationProgress({ stage: '', progress: 0 });
    }, 500);
  };

  const handleDocumentMethod = (activity, method) => {
    if (method === 'Manual') {
      setUploadingActivity(activity);
      setShowUploadModal(true);
    } else if (method === 'Custom Agents') {
      // Show custom agent selection modal
      setCustomAgentActivity(activity);
      setShowCustomAgentModal(true);
    } else {
      simulateDocumentGeneration(activity, method);
    }
  };

  const handleRepositoryAccessCheck = async (activityId) => {
    setCheckingRepositoryAccess(activityId);
    
    // Simulate checking repositories
    const checkStages = [
      { delay: 800 },
      { delay: 600 },
      { delay: 700 },
      { delay: 500 }
    ];
    
    for (const stage of checkStages) {
      await new Promise(resolve => setTimeout(resolve, stage.delay));
    }
    
    // Mark as verified
    setActivities(prevActivities =>
      prevActivities.map(act =>
        act.id === activityId
          ? { ...act, repositoryAccess: true }
          : act
      )
    );
    
    setCheckingRepositoryAccess(null);
  };

  const handleCustomAgentSelect = (agent) => {
    setSelectedCustomAgent(agent);
  };

  const handleConfirmCustomAgent = () => {
    if (selectedCustomAgent && customAgentActivity) {
      const methodName = `Custom Agents: ${selectedCustomAgent.name}`;
      setShowCustomAgentModal(false);
      
      // Start document generation with selected custom agent
      simulateDocumentGeneration(customAgentActivity, methodName, selectedCustomAgent);
      
      // Reset selection
      setSelectedCustomAgent(null);
      setCustomAgentActivity(null);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadDocument = () => {
    if (selectedFile && uploadingActivity) {
      const newDocument = {
        id: `doc-${Date.now()}`,
        name: uploadingActivity.documentType,
        activityId: uploadingActivity.id,
        method: 'Manual',
        createdAt: new Date().toISOString(),
        type: 'pdf',
        fileName: selectedFile.name
      };

      setCreatedDocuments(prev => [...prev, newDocument]);

      // Mark activity as completed
      setActivities(prevActivities => 
        prevActivities.map(act => 
          act.id === uploadingActivity.id 
            ? { ...act, status: 'Completed', selectedMethod: 'Manual' }
            : act
        )
      );

      setShowUploadModal(false);
      setUploadingActivity(null);
      setSelectedFile(null);
    }
  };

  const handleResetStageData = () => {
    if (window.confirm('⚠️ This will reset ALL stage data and remove duplicates. Are you sure?')) {
      // Clear all localStorage for this stage
      localStorage.removeItem(`activities_${projectId}_${stageId}`);
      localStorage.removeItem(`createdDocuments_${projectId}_${stageId}`);
      localStorage.removeItem(`stageCompletion_${projectId}_${stageId}`);
      
      // Reload the page to reinitialize with fresh data
      window.location.reload();
    }
  };

  const handleViewDocument = (documentName) => {
    // Navigate to special viewer for Scope Summary
    if (documentName === 'Scope Summary') {
      navigate(`/scope-summary-viewer/${projectId}/${stageId}`);
    } else if (documentName === 'Resource Plan') {
      navigate(`/resource-plan-viewer/${projectId}/${stageId}`);
    } else if (documentName === 'Risk Register' || documentName === 'Risk Identification' || documentName === 'Risk Assessment Report') {
      navigate(`/risk-register-viewer/${projectId}/${stageId}`);
    } else if (documentName === 'Scope Sign-off') {
      navigate(`/scope-signoff-viewer/${projectId}/${stageId}`);
    } else if (documentName === 'Technical Assessment Report' || documentName === 'Technical Assessment') {
      navigate(`/technical-assessment-viewer/${projectId}/${stageId}`);
    } else {
      // Navigate to standard document viewer
      navigate(`/document-viewer/${projectId}/${stageId}/${encodeURIComponent(documentName)}`);
    }
  };

  if (!project || !stage) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading stage details...</p>
        </div>
      </div>
    );
  }

  const completedTasks = activities.filter(a => a.status === 'Completed').length;
  const totalTasks = activities.length;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Update deliverables status based on created documents
  const updatedDeliverables = stage.deliverables.map(deliverable => {
    // Match "Project Scope Document" with "Scope Document" from activities
    let hasDocument = false;
    if (deliverable.name === 'Project Scope Document') {
      hasDocument = createdDocuments.some(doc => doc.name === 'Scope Document');
    } else {
      hasDocument = createdDocuments.some(doc => doc.name === deliverable.name);
    }
    return { ...deliverable, status: hasDocument ? 'completed' : 'pending' };
  });

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

      {/* Generation Progress Modal */}
      {showDocumentGenerationModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/30 rounded-2xl p-8 w-full max-w-lg shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                {currentGeneratingActivity?.selectedMethod === 'GHCP Agent' ? (
                  <img src={copilotLogo} alt="GHCP Agent" className="w-12 h-12 object-contain" />
                ) : currentGeneratingActivity?.selectedMethod === 'Devin' ? (
                  <img src={devinLogo} alt="Devin" className="w-12 h-12 object-contain" />
                ) : currentGeneratingActivity?.selectedMethod?.startsWith('Custom Agents:') ? (
                  <span className="text-5xl">{currentGeneratingActivity?.customAgentIcon || '🤖'}</span>
                ) : currentGeneratingActivity?.selectedMethod === 'Custom Agents' ? (
                  <span className="text-5xl">🤖</span>
                ) : (
                  <span className="text-4xl">📄</span>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2">{currentGeneratingActivity?.selectedMethod}</h3>
              <p className="text-white/60">Generating {currentGeneratingActivity?.documentType}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/70">{generationProgress.stage}</span>
                <span className="text-sm font-mono text-orange-400">{Math.round(generationProgress.progress)}%</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300"
                  style={{ width: `${generationProgress.progress}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>AI Agent Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <span>Secure Connection Established</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span>Document Generation in Progress</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Upload Document</h3>
              <button 
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadingActivity(null);
                  setSelectedFile(null);
                }}
                className="text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <p className="text-white/60 mb-6">Upload your {uploadingActivity?.documentType}</p>

            <div className="mb-6">
              <label className="block w-full">
                <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-orange-500/50 transition-all cursor-pointer bg-white/[0.02]">
                  <div className="text-4xl mb-3">📄</div>
                  <p className="text-sm font-medium mb-1">
                    {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-white/40">PDF, DOC, DOCX (max 10MB)</p>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                  />
                </div>
              </label>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadingActivity(null);
                  setSelectedFile(null);
                }}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadDocument}
                disabled={!selectedFile}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFile 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg hover:shadow-orange-500/30' 
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                Upload Document
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
                <p className="text-white/60 text-sm">Choose an approved agent for {customAgentActivity?.documentType}</p>
              </div>
              <button 
                onClick={() => {
                  setShowCustomAgentModal(false);
                  setCustomAgentActivity(null);
                  setSelectedCustomAgent(null);
                }}
                className="text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Available Agents */}
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
                      <div className="mt-3 flex flex-wrap gap-2">
                        {agent.capabilities.map((capability, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-white/5 rounded text-white/50">
                            • {capability}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {!customAgentsData[customAgentActivity?.documentType] && (
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

      {/* Edit Stakeholder Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Edit Stakeholder</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/60 mb-2">Email ID</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/60 mb-2">Role</label>
                <input
                  type="text"
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/60 mb-2">Division</label>
                <input
                  type="text"
                  value={editForm.division}
                  onChange={(e) => setEditForm({ ...editForm, division: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/60 mb-2">Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStakeholder}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigate(`/project-pipeline/${projectId}`)}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <span>←</span>
            <span>Back to Pipeline</span>
          </button>
          
          <button
            onClick={handleResetStageData}
            className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-lg text-sm transition-colors"
            title="Clear stage data and remove duplicates"
          >
            🔄 Reset Stage Data
          </button>
        </div>
        
        {/* Compact Migration ID Banner */}
        <div className="bg-gradient-to-r from-orange-900/40 via-red-900/40 to-orange-900/40 border border-orange-500/30 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-orange-400/80 uppercase font-semibold mb-1">Migration Project ID</p>
                  <h2 className="text-3xl font-bold text-white mb-2">{project.tunaId || '12'}</h2>
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
            
            {/* Compact Persona Display */}
            <div className="text-center">
              <p className="text-[10px] text-white/50 uppercase tracking-wider mb-2">Current Owner / Persona</p>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl font-bold mb-2 shadow-xl shadow-orange-500/30">
                PN
              </div>
              <p className="text-sm font-bold text-white">Persona Name</p>
              <p className="text-xs text-white/50">Migration Expert</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-6">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stage.color} flex items-center justify-center text-4xl shadow-xl`}>
            {stage.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-orange-500/20 text-orange-400">
                Stage {stage.id}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400">
                {stage.percentage}% Pipeline Progress
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{stage.name}</h1>
            <p className="text-white/60">{stage.description}</p>
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
          <p className="text-2xl font-bold text-purple-400">3</p>
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
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all">
            + Add Activity
          </button>
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

            // Check if document is created for this activity
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
                                onClick={() => handleEditStakeholder(activity.id, idx, stakeholder)}
                                className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded transition-colors flex-shrink-0 ml-2"
                              >
                                Edit
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Risk Identification Content */}
                    {activity.name === 'Risk Identification' && (
                      <div className="mt-4">
                        <div className="bg-white/[0.02] border border-white/10 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-lg">
                                ⚠️
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-white">Risk Register</p>
                                <p className="text-xs text-white/50">10 risks identified • 4 critical/high</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => navigate(`/risk-register-viewer/${projectId}/${stageId}`)}
                              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-xs font-medium"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Scope Summary Assimilation Content */}
                    {activity.type === 'assimilation' && activity.checklist && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-white/80 mb-3">Assimilation Checklist</p>
                        <div className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-xl p-4">
                          <div className="space-y-3">
                            {activity.checklist.map((item, idx) => {
                              const isCompleted = item.completed;
                              return (
                                <div 
                                  key={item.id}
                                  className={`flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                                    isCompleted 
                                      ? 'bg-green-500/10 border border-green-500/30' 
                                      : 'bg-white/[0.03] border border-white/10 hover:border-cyan-500/30'
                                  }`}
                                  onClick={() => {
                                    setActivities(prevActivities =>
                                      prevActivities.map(act =>
                                        act.id === activity.id && act.checklist
                                          ? {
                                              ...act,
                                              checklist: act.checklist.map(checkItem =>
                                                checkItem.id === item.id
                                                  ? { ...checkItem, completed: !checkItem.completed }
                                                  : checkItem
                                              )
                                            }
                                          : act
                                      )
                                    );
                                  }}
                                >
                                  <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-all ${
                                    isCompleted 
                                      ? 'bg-green-500 text-white' 
                                      : 'bg-white/10 border border-white/20'
                                  }`}>
                                    {isCompleted ? '✓' : idx + 1}
                                  </div>
                                  <div className="flex-1">
                                    <p className={`text-sm font-medium transition-all ${
                                      isCompleted ? 'text-green-400 line-through' : 'text-white'
                                    }`}>
                                      {item.label}
                                    </p>
                                    {isCompleted && (
                                      <p className="text-xs text-green-400/60 mt-1">✓ Completed</p>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          
                          {/* Summary Status */}
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                                  {activity.checklist.filter(item => item.completed).length}/{activity.checklist.length}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Assimilation Progress</p>
                                  <p className="text-xs text-white/50">
                                    {activity.checklist.filter(item => item.completed).length === activity.checklist.length 
                                      ? 'All checks complete - Ready for Scope Document' 
                                      : 'Complete all checks to proceed'}
                                  </p>
                                </div>
                              </div>
                              {activity.checklist.filter(item => item.completed).length === activity.checklist.length && (
                                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center gap-2">
                                  <span>✓</span>
                                  <span>Generate Report</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Document Creation Content */}
                    {activity.type === 'document-creation' && (
                      <div className="mt-4">
                        {!hasDocument ? (
                          <>
                            {/* Special handling for Scope Sign-off - direct button */}
                            {activity.documentType === 'Scope Sign-off' ? (
                              <div className="bg-gradient-to-br from-cyan-900/30 to-teal-900/30 border-2 border-cyan-500/30 rounded-xl p-6">
                                <div className="flex items-center gap-4 mb-5">
                                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-3xl">
                                    ✍️
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-bold text-lg mb-1">Digital Signature Required</h4>
                                    <p className="text-sm text-white/70">
                                      AAF Owner, Business Owner, and Vendor Owner must review and sign the scope document
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => navigate(`/scope-signoff-viewer/${projectId}/${stageId}`)}
                                  className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl hover:from-cyan-600 hover:to-teal-600 transition-all font-bold text-lg shadow-xl shadow-cyan-500/30"
                                >
                                  Open Sign-off Document →
                                </button>
                              </div>
                            ) : activity.documentType === 'Scope Summary' ? (
                              <>
                                {/* Repository Access Check for Scope Summary */}
                                <div className="mb-4">
                                  <p className="text-sm font-semibold text-white/80 mb-3">Repository Access Verification</p>
                                  <div 
                                    className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                                      checkingRepositoryAccess === activity.id
                                        ? 'bg-blue-500/10 border border-blue-500/30 cursor-wait'
                                        : activity.repositoryAccess 
                                        ? 'bg-green-500/10 border border-green-500/30' 
                                        : 'bg-white/[0.03] border border-white/10 hover:border-purple-500/30 cursor-pointer'
                                    }`}
                                    onClick={() => {
                                      if (!activity.repositoryAccess && checkingRepositoryAccess !== activity.id) {
                                        handleRepositoryAccessCheck(activity.id);
                                      }
                                    }}
                                  >
                                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 ${
                                      checkingRepositoryAccess === activity.id
                                        ? 'bg-blue-500/20'
                                        : activity.repositoryAccess 
                                        ? 'bg-green-500/20' 
                                        : 'bg-purple-500/10'
                                    }`}>
                                      {checkingRepositoryAccess === activity.id ? (
                                        <div className="animate-spin text-2xl">🔄</div>
                                      ) : activity.repositoryAccess ? (
                                        '✅'
                                      ) : (
                                        '🔐'
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-semibold mb-1">
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
                                    {activity.repositoryAccess && (
                                      <div className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-xs font-medium flex items-center gap-1.5">
                                        🚩 <span>Flagged</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
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
                                    onClick={() => handleDocumentMethod(activity, 'Devin')}
                                    className="p-4 bg-white/[0.03] border border-white/10 rounded-lg hover:border-orange-500/50 hover:bg-orange-500/10 transition-all text-center group"
                                  >
                                    <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                      <img src={devinLogo} alt="Devin" className="w-8 h-8 object-contain" />
                                    </div>
                                    <p className="text-sm font-medium mb-1">Devin</p>
                                    <p className="text-xs text-white/40">Automated assistant</p>
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
                            ) : (
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
                                    onClick={() => handleDocumentMethod(activity, 'Devin')}
                                    className="p-4 bg-white/[0.03] border border-white/10 rounded-lg hover:border-orange-500/50 hover:bg-orange-500/10 transition-all text-center group"
                                  >
                                    <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                      <img src={devinLogo} alt="Devin" className="w-8 h-8 object-contain" />
                                    </div>
                                    <p className="text-sm font-medium mb-1">Devin</p>
                                    <p className="text-xs text-white/40">Automated assistant</p>
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
                        ) : (
                          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                {activity.selectedMethod === 'GHCP Agent' ? (
                                  <img src={copilotLogo} alt="GHCP Agent" className="w-8 h-8 object-contain" />
                                ) : activity.selectedMethod === 'Devin' ? (
                                  <img src={devinLogo} alt="Devin" className="w-8 h-8 object-contain" />
                                ) : activity.selectedMethod?.startsWith('Custom Agents:') ? (
                                  <span className="text-2xl">{activity.customAgentIcon || '🤖'}</span>
                                ) : activity.selectedMethod === 'Custom Agents' ? (
                                  <span className="text-2xl">🤖</span>
                                ) : (
                                  <span className="text-2xl">📄</span>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-green-400">{activity.documentType} Created</p>
                                <p className="text-xs text-white/50">Generated via {activity.selectedMethod}</p>
                              </div>
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => handleViewDocument(activity.documentType)}
                                  className="text-xs px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                                >
                                  View Details
                                </button>
                                <button 
                                  onClick={() => {
                                    const link = `${window.location.origin}/document-viewer/${projectId}/${stageId}/${encodeURIComponent(activity.documentType)}`;
                                    navigator.clipboard.writeText(link);
                                    alert(`Collaboration link copied to clipboard!\n\n${link}`);
                                  }}
                                  className="text-xs px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors flex items-center gap-1"
                                >
                                  <span>🔗</span>
                                  <span>Collaboration Link</span>
                                </button>
                                <button 
                                  onClick={() => {
                                    alert(`Downloading ${activity.documentType}...`);
                                  }}
                                  className="text-xs px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors flex items-center gap-1"
                                >
                                  <span>⬇</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {activity.status === 'Completed' ? (
                      <button 
                        onClick={() => handleMarkIncomplete(activity.id)}
                        className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-medium hover:bg-orange-500/30 transition-all flex items-center gap-2 justify-center"
                      >
                        <span>↺</span>
                        <span>Mark Incomplete</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleMarkComplete(activity.id)}
                        className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-all"
                      >
                        Mark Complete
                      </button>
                    )}
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Complete Section Button */}
      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Stage Completion</h3>
            <p className="text-sm text-white/60">
              {completedTasks === totalTasks 
                ? 'All tasks completed! Ready to move to the next stage.' 
                : `Complete all tasks (${completedTasks}/${totalTasks}) to proceed to the next stage.`
              }
            </p>
          </div>
          <button
            onClick={() => {
              // Mark this stage as complete
              const completedStagesKey = `completedStages_${projectId}`;
              const completedStages = JSON.parse(localStorage.getItem(completedStagesKey) || '[]');
              
              if (!completedStages.includes(stageId)) {
                completedStages.push(stageId);
                localStorage.setItem(completedStagesKey, JSON.stringify(completedStages));
              }
              
              // Set the next stage as active
              const stageOrder = ['3.1', '4.2', '4.3', '5.3', '6.1', '7.1', '7.2', '7.3', '8.1', '8.2', '8.3', '8.4', '9.2', '10.2', '11.0'];
              const currentIndex = stageOrder.indexOf(stageId);
              if (currentIndex !== -1 && currentIndex < stageOrder.length - 1) {
                const nextStage = stageOrder[currentIndex + 1];
                localStorage.setItem(`activeStage_${projectId}`, nextStage);
              }
              
              // Navigate back to pipeline
              navigate(`/project-pipeline/${projectId}`);
            }}
            disabled={completedTasks !== totalTasks}
            className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all flex items-center gap-3 ${
              completedTasks === totalTasks
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:shadow-green-500/30 cursor-pointer'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            <span>Complete Section & Move to Next Stage</span>
            <span className="text-2xl">→</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span>💬</span>
          <span>Stage Comments & Notes</span>
        </h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-sm font-bold flex-shrink-0">
              PN
            </div>
            <div className="flex-1">
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">Persona</span>
                  <span className="text-xs text-white/40">2 days ago</span>
                </div>
                <p className="text-sm text-white/70">
                  Scope document has been reviewed by all stakeholders. Minor adjustments needed in the resource allocation section. Will update by EOD tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold flex-shrink-0">
            TL
          </div>
          <div className="flex-1">
            <textarea 
              placeholder="Add a comment or note..."
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all">
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageDetails;