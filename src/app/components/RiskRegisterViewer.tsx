import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { projectRepository } from '../../utils/projectRepository';
import type { Project } from '../../utils/projectRepository';

interface Risk {
  id: string;
  title: string;
  description: string;
  category: 'Technical' | 'Resource' | 'Schedule' | 'Budget' | 'Operational' | 'Security' | 'AI';
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
  probability: 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low';
  status: 'Open' | 'Mitigating' | 'Closed' | 'Accepted';
  owner: string;
  mitigation: string;
  contingency: string;
  identifiedDate: string;
  targetResolution?: string;
  acknowledged?: boolean;
  acknowledgedBy?: string;
  acknowledgedDate?: string;
}

const RiskRegisterViewer = () => {
  const navigate = useNavigate();
  const { projectId, stageId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [showAddRiskModal, setShowAddRiskModal] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [showMitigationModal, setShowMitigationModal] = useState<Risk | null>(null);

  // New risk form state
  const [newRisk, setNewRisk] = useState<Partial<Risk>>({
    title: '',
    description: '',
    category: 'Technical',
    impact: 'Medium',
    probability: 'Medium',
    status: 'Open',
    owner: '',
    mitigation: '',
    contingency: '',
    identifiedDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (projectId) {
      const foundProject = projectRepository.getProjectById(parseInt(projectId));
      if (foundProject) {
        setProject(foundProject);
      }
    }

    // Load risks from localStorage
    const storageKey = `risks_${projectId}_${stageId}`;
    const storedRisks = localStorage.getItem(storageKey);
    if (storedRisks) {
      setRisks(JSON.parse(storedRisks));
    } else {
      // Initialize with default risks
      const defaultRisks = getDefaultRisks();
      setRisks(defaultRisks);
      localStorage.setItem(storageKey, JSON.stringify(defaultRisks));
    }
  }, [projectId, stageId]);

  const getDefaultRisks = (): Risk[] => {
    return [
      {
        id: 'R001',
        title: 'Technology Compatibility Issues',
        description: 'Legacy code may not be compatible with target technology stack, requiring extensive refactoring or architectural changes.',
        category: 'Technical',
        impact: 'High',
        probability: 'High',
        status: 'Open',
        owner: 'Technical Lead',
        mitigation: 'Conduct comprehensive compatibility assessment in discovery phase. Create proof-of-concept for critical components. Engage vendor support early.',
        contingency: 'Allocate additional 3 weeks for refactoring. Budget for external consultants if needed.',
        identifiedDate: '2026-02-15',
        targetResolution: '2026-03-30'
      },
      {
        id: 'R002',
        title: 'Key Resource Unavailability',
        description: 'Critical team members may leave or become unavailable during migration, causing knowledge loss and delays.',
        category: 'Resource',
        impact: 'Critical',
        probability: 'Medium',
        status: 'Mitigating',
        owner: 'Project Manager',
        mitigation: 'Implement knowledge sharing sessions. Maintain comprehensive documentation. Cross-train team members on critical areas.',
        contingency: 'Maintain list of qualified contractors. Budget for 2 backup resources.',
        identifiedDate: '2026-02-15',
        targetResolution: '2026-03-01'
      },
      {
        id: 'R003',
        title: 'Data Migration Complexity',
        description: 'Data structure differences and volume may cause migration failures, data loss, or performance degradation.',
        category: 'Technical',
        impact: 'Critical',
        probability: 'High',
        status: 'Open',
        owner: 'Database Lead',
        mitigation: 'Develop comprehensive data migration scripts with validation. Perform multiple test migrations. Implement rollback procedures.',
        contingency: 'Schedule additional downtime window. Prepare rollback to source system if needed.',
        identifiedDate: '2026-02-18',
        targetResolution: '2026-04-15'
      },
      {
        id: 'R004',
        title: 'Schedule Overrun',
        description: 'Underestimated complexity may lead to timeline delays, impacting business objectives and budget.',
        category: 'Schedule',
        impact: 'High',
        probability: 'Medium',
        status: 'Open',
        owner: 'Project Manager',
        mitigation: 'Build 20% buffer into schedule. Conduct weekly progress reviews. Implement early warning system for delays.',
        contingency: 'Prioritize must-have features. Consider phased rollout approach.',
        identifiedDate: '2026-02-15',
        targetResolution: '2026-03-15'
      },
      {
        id: 'R005',
        title: 'Performance Degradation',
        description: 'Migrated system may not meet performance benchmarks, affecting user experience and business operations.',
        category: 'Technical',
        impact: 'High',
        probability: 'Medium',
        status: 'Open',
        owner: 'Technical Architect',
        mitigation: 'Establish baseline performance metrics. Conduct load testing throughout development. Implement performance monitoring.',
        contingency: 'Performance optimization sprint planned. Infrastructure scaling budget allocated.',
        identifiedDate: '2026-02-20',
        targetResolution: '2026-05-01'
      },
      {
        id: 'R006',
        title: 'Security Vulnerabilities',
        description: 'New technology stack may introduce security gaps or expose existing vulnerabilities during migration.',
        category: 'Security',
        impact: 'Critical',
        probability: 'Low',
        status: 'Open',
        owner: 'Security Lead',
        mitigation: 'Conduct security audit pre and post-migration. Implement automated security scanning. Follow secure coding practices.',
        contingency: 'Engage external security consultants. Budget for penetration testing.',
        identifiedDate: '2026-02-22',
        targetResolution: '2026-04-30'
      },
      {
        id: 'R007',
        title: 'Stakeholder Resistance',
        description: 'Business stakeholders may resist changes in workflows, UI/UX, or processes, hindering adoption.',
        category: 'Operational',
        impact: 'Medium',
        probability: 'Medium',
        status: 'Mitigating',
        owner: 'Business Analyst',
        mitigation: 'Early and frequent stakeholder engagement. Conduct change impact analysis. Provide comprehensive training.',
        contingency: 'Extended support period. Additional training sessions allocated.',
        identifiedDate: '2026-02-16',
        targetResolution: '2026-03-20'
      },
      {
        id: 'R008',
        title: 'Budget Overrun',
        description: 'Unforeseen complexities or scope changes may exceed allocated budget.',
        category: 'Budget',
        impact: 'High',
        probability: 'Medium',
        status: 'Open',
        owner: 'Project Manager',
        mitigation: 'Strict change control process. Weekly budget tracking. Regular financial reviews with stakeholders.',
        contingency: '15% contingency reserve allocated. Scope reduction plan prepared.',
        identifiedDate: '2026-02-15',
        targetResolution: '2026-03-10'
      },
      {
        id: 'R009',
        title: 'Third-Party Integration Failures',
        description: 'External system integrations may fail or behave unexpectedly in new environment.',
        category: 'Technical',
        impact: 'High',
        probability: 'Medium',
        status: 'Open',
        owner: 'Integration Lead',
        mitigation: 'Early integration testing with vendors. Maintain fallback to legacy integrations. Document all API contracts.',
        contingency: 'Parallel run period for critical integrations. Vendor escalation process established.',
        identifiedDate: '2026-02-25',
        targetResolution: '2026-05-15'
      },
      {
        id: 'R010',
        title: 'Inadequate Testing Coverage',
        description: 'Insufficient testing may result in critical bugs reaching production, causing outages or data issues.',
        category: 'Technical',
        impact: 'Critical',
        probability: 'Low',
        status: 'Mitigating',
        owner: 'QA Lead',
        mitigation: 'Comprehensive test strategy with automation. Dedicated UAT period. Production-like test environment.',
        contingency: 'Extended testing phase. Additional QA resources if needed.',
        identifiedDate: '2026-02-18',
        targetResolution: '2026-04-01'
      },
      {
        id: 'R011',
        title: 'AI Model Accuracy and Reliability Issues',
        description: 'AI-generated code or recommendations may contain errors, introduce bugs, or fail to meet business requirements, requiring extensive review and corrections.',
        category: 'AI',
        impact: 'High',
        probability: 'Medium',
        status: 'Open',
        owner: 'AI/ML Lead',
        mitigation: 'Implement comprehensive code review processes for AI-generated code. Establish validation frameworks and test suites. Set quality thresholds and human oversight requirements.',
        contingency: 'Maintain experienced developers for code verification. Budget for manual corrections and refactoring.',
        identifiedDate: '2026-02-20',
        targetResolution: '2026-04-15'
      },
      {
        id: 'R012',
        title: 'AI Tool Integration and Compatibility',
        description: 'AI coding agents may not integrate well with existing development tools, workflows, or technology stack, causing friction and inefficiencies.',
        category: 'AI',
        impact: 'Medium',
        probability: 'High',
        status: 'Open',
        owner: 'Technical Architect',
        mitigation: 'Conduct pilot testing with AI tools before full deployment. Establish integration guidelines and best practices. Provide team training on AI tool usage.',
        contingency: 'Alternative AI tools identified. Hybrid approach combining multiple AI tools.',
        identifiedDate: '2026-02-22',
        targetResolution: '2026-03-30'
      }
    ];
  };

  const handleAddRisk = () => {
    if (!newRisk.title || !newRisk.description || !newRisk.owner || !newRisk.mitigation) {
      alert('Please fill in all required fields');
      return;
    }

    const riskToAdd: Risk = {
      id: `R${String(risks.length + 1).padStart(3, '0')}`,
      title: newRisk.title!,
      description: newRisk.description!,
      category: newRisk.category!,
      impact: newRisk.impact!,
      probability: newRisk.probability!,
      status: newRisk.status!,
      owner: newRisk.owner!,
      mitigation: newRisk.mitigation!,
      contingency: newRisk.contingency || '',
      identifiedDate: newRisk.identifiedDate!,
      targetResolution: newRisk.targetResolution
    };

    const updatedRisks = [...risks, riskToAdd];
    setRisks(updatedRisks);

    // Save to localStorage
    const storageKey = `risks_${projectId}_${stageId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedRisks));

    // Reset form
    setNewRisk({
      title: '',
      description: '',
      category: 'Technical',
      impact: 'Medium',
      probability: 'Medium',
      status: 'Open',
      owner: '',
      mitigation: '',
      contingency: '',
      identifiedDate: new Date().toISOString().split('T')[0]
    });

    setShowAddRiskModal(false);
  };

  const handleAcknowledgeRisk = (riskId: string) => {
    const updatedRisks = risks.map(risk => {
      if (risk.id === riskId) {
        return {
          ...risk,
          acknowledged: true,
          acknowledgedBy: 'PN (Migration Expert)',
          acknowledgedDate: new Date().toISOString()
        };
      }
      return risk;
    });

    setRisks(updatedRisks);

    // Save to localStorage
    const storageKey = `risks_${projectId}_${stageId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedRisks));

    // Update selected risk if it's the one being acknowledged
    if (selectedRisk && selectedRisk.id === riskId) {
      const acknowledgedRisk = updatedRisks.find(r => r.id === riskId);
      if (acknowledgedRisk) {
        setSelectedRisk(acknowledgedRisk);
      }
    }
  };

  const handleCloseRisk = (riskId: string) => {
    const updatedRisks = risks.map(risk => {
      if (risk.id === riskId) {
        return {
          ...risk,
          status: 'Closed' as const
        };
      }
      return risk;
    });

    setRisks(updatedRisks);

    // Save to localStorage
    const storageKey = `risks_${projectId}_${stageId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedRisks));

    // Update selected risk if it's the one being closed
    if (selectedRisk && selectedRisk.id === riskId) {
      const closedRisk = updatedRisks.find(r => r.id === riskId);
      if (closedRisk) {
        setSelectedRisk(closedRisk);
      }
    }
  };

  const getRiskScore = (impact: string, probability: string): number => {
    const impactScore = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
    const probScore = { 'Very High': 5, 'High': 4, 'Medium': 3, 'Low': 2, 'Very Low': 1 };
    return (impactScore[impact] || 2) * (probScore[probability] || 3);
  };

  const getRiskLevel = (score: number): { level: string; color: string } => {
    if (score >= 12) return { level: 'Extreme', color: 'bg-red-500' };
    if (score >= 8) return { level: 'High', color: 'bg-orange-500' };
    if (score >= 4) return { level: 'Medium', color: 'bg-yellow-500' };
    return { level: 'Low', color: 'bg-green-500' };
  };

  const filteredRisks = risks.filter(risk => {
    const categoryMatch = filterCategory === 'All' || risk.category === filterCategory;
    const statusMatch = filterStatus === 'All' || risk.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  const riskStats = {
    total: risks.length,
    open: risks.filter(r => r.status === 'Open').length,
    mitigating: risks.filter(r => r.status === 'Mitigating').length,
    closed: risks.filter(r => r.status === 'Closed').length,
    critical: risks.filter(r => r.impact === 'Critical').length,
    high: risks.filter(r => r.impact === 'High').length
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading risk register...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  // Navigate back to the correct screen based on stage ID
                  if (stageId === '3.1') {
                    navigate(`/initiation-screen/${projectId}`);
                  } else if (stageId === '7.2') {
                    navigate(`/re-analysis-screen/${projectId}`);
                  } else if (stageId === '7.3') {
                    navigate(`/remediation-screen/${projectId}`);
                  } else {
                    navigate(`/stage-details/${projectId}/${stageId}`);
                  }
                }}
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-lg"
              >
                ←
              </button>
              <div>
                <h1 className="text-2xl font-bold">Risk Register</h1>
                <p className="text-sm text-white/50">Risk identification, assessment, and mitigation planning</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAddRiskModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <span className="text-lg">+</span>
                Add New Risk
              </button>
              <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium">
                📥 Export Register
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Project Context Banner */}
        <div className="bg-gradient-to-r from-orange-900/40 via-red-900/40 to-orange-900/40 border border-orange-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs px-2 py-1 bg-orange-500/30 text-orange-300 rounded font-mono">{project.tunaId}</span>
                <span className="text-xs px-2 py-1 bg-purple-500/30 text-purple-300 rounded">{project.team}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
              <p className="text-white/70 mb-3">{project.description}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/40 mb-1">Project Progress</p>
              <p className="text-3xl font-bold text-cyan-400">{project.progress}%</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/40 mb-1">Total Risks</p>
            <p className="text-2xl font-bold">{riskStats.total}</p>
          </div>
          <div className="bg-white/[0.02] border border-orange-500/30 rounded-xl p-4">
            <p className="text-xs text-white/40 mb-1">Open</p>
            <p className="text-2xl font-bold text-orange-400">{riskStats.open}</p>
          </div>
          <div className="bg-white/[0.02] border border-blue-500/30 rounded-xl p-4">
            <p className="text-xs text-white/40 mb-1">Mitigating</p>
            <p className="text-2xl font-bold text-blue-400">{riskStats.mitigating}</p>
          </div>
          <div className="bg-white/[0.02] border border-green-500/30 rounded-xl p-4">
            <p className="text-xs text-white/40 mb-1">Closed</p>
            <p className="text-2xl font-bold text-green-400">{riskStats.closed}</p>
          </div>
          <div className="bg-white/[0.02] border border-red-500/30 rounded-xl p-4">
            <p className="text-xs text-white/40 mb-1">Critical</p>
            <p className="text-2xl font-bold text-red-400">{riskStats.critical}</p>
          </div>
          <div className="bg-white/[0.02] border border-yellow-500/30 rounded-xl p-4">
            <p className="text-xs text-white/40 mb-1">High</p>
            <p className="text-2xl font-bold text-yellow-400">{riskStats.high}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <label className="text-xs text-white/50 mb-2 block">Category</label>
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
              >
                <option value="All">All Categories</option>
                <option value="Technical">Technical</option>
                <option value="Resource">Resource</option>
                <option value="Schedule">Schedule</option>
                <option value="Budget">Budget</option>
                <option value="Operational">Operational</option>
                <option value="Security">Security</option>
                <option value="AI">AI</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-white/50 mb-2 block">Status</label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
              >
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="Mitigating">Mitigating</option>
                <option value="Closed">Closed</option>
                <option value="Accepted">Accepted</option>
              </select>
            </div>
            <div className="ml-auto text-sm text-white/50">
              Showing {filteredRisks.length} of {risks.length} risks
            </div>
          </div>
        </div>

        {/* Risk List */}
        <div className="space-y-4">
          {filteredRisks.map((risk) => {
            const score = getRiskScore(risk.impact, risk.probability);
            const riskLevel = getRiskLevel(score);

            return (
              <div 
                key={risk.id} 
                className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 shadow-2xl hover:border-white/20 transition-all cursor-pointer"
                onClick={() => setSelectedRisk(risk)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl ${riskLevel.color} flex items-center justify-center text-white font-bold`}>
                      {risk.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{risk.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${
                          risk.status === 'Open' ? 'bg-orange-500/20 text-orange-400' :
                          risk.status === 'Mitigating' ? 'bg-blue-500/20 text-blue-400' :
                          risk.status === 'Closed' ? 'bg-green-500/20 text-green-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {risk.status}
                        </span>
                      </div>
                      <p className="text-sm text-white/70 mb-3">{risk.description}</p>
                      
                      <div className="flex items-center gap-4 flex-wrap text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-white/40">Category:</span>
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">{risk.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white/40">Impact:</span>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            risk.impact === 'Critical' ? 'bg-red-500/20 text-red-400' :
                            risk.impact === 'High' ? 'bg-orange-500/20 text-orange-400' :
                            risk.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {risk.impact}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white/40">Probability:</span>
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs font-semibold">{risk.probability}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white/40">Risk Score:</span>
                          <span className={`px-2 py-1 ${riskLevel.color} text-white rounded text-xs font-bold`}>{score} - {riskLevel.level}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white/40">Owner:</span>
                          <span className="text-white/90 font-medium">{risk.owner}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-green-400 mb-1">🛡️ Mitigation Strategy</p>
                    <p className="text-sm text-white/70">{risk.mitigation}</p>
                  </div>
                  {risk.contingency && (
                    <div>
                      <p className="text-xs font-semibold text-orange-400 mb-1">⚠️ Contingency Plan</p>
                      <p className="text-sm text-white/70">{risk.contingency}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-white/50 space-y-1">
                      <div>Identified: {new Date(risk.identifiedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                      {risk.targetResolution && (
                        <div>Target Resolution: {new Date(risk.targetResolution).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Mitigation Plan Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMitigationModal(risk);
                        }}
                        className="px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-xs font-medium flex items-center gap-1.5"
                      >
                        <span>📋</span>
                        <span>Mitigation Plan</span>
                      </button>

                      {/* Close Risk Button */}
                      {risk.status !== 'Closed' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCloseRisk(risk.id);
                          }}
                          className="px-3 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors text-xs font-medium flex items-center gap-1.5"
                        >
                          <span>✓</span>
                          <span>Close Risk</span>
                        </button>
                      ) : (
                        <div className="px-3 py-2 bg-green-500/20 text-green-400 rounded-lg text-xs font-medium flex items-center gap-1.5">
                          <span>✓</span>
                          <span>Closed</span>
                        </div>
                      )}

                      {/* Acknowledge Button */}
                      {!risk.acknowledged ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAcknowledgeRisk(risk.id);
                          }}
                          className="px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-xs font-medium flex items-center gap-1.5"
                        >
                          <span>👁</span>
                          <span>Acknowledge</span>
                        </button>
                      ) : (
                        <div className="px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-medium flex items-center gap-1.5" title={`Acknowledged by ${risk.acknowledgedBy} on ${new Date(risk.acknowledgedDate!).toLocaleDateString()}`}>
                          <span>✓</span>
                          <span>Acknowledged</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRisks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-xl text-white/50">No risks found matching your filters</p>
          </div>
        )}
      </div>

      {/* Add Risk Modal */}
      {showAddRiskModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Add New Risk</h2>
              <button 
                onClick={() => setShowAddRiskModal(false)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Risk Title *</label>
                <input
                  type="text"
                  value={newRisk.title}
                  onChange={(e) => setNewRisk({ ...newRisk, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                  placeholder="Enter risk title..."
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Description *</label>
                <textarea
                  value={newRisk.description}
                  onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 min-h-[100px]"
                  placeholder="Describe the risk in detail..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Category *</label>
                  <select
                    value={newRisk.category}
                    onChange={(e) => setNewRisk({ ...newRisk, category: e.target.value as any })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Resource">Resource</option>
                    <option value="Schedule">Schedule</option>
                    <option value="Budget">Budget</option>
                    <option value="Operational">Operational</option>
                    <option value="Security">Security</option>
                    <option value="AI">AI</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Impact *</label>
                  <select
                    value={newRisk.impact}
                    onChange={(e) => setNewRisk({ ...newRisk, impact: e.target.value as any })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Probability *</label>
                  <select
                    value={newRisk.probability}
                    onChange={(e) => setNewRisk({ ...newRisk, probability: e.target.value as any })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                  >
                    <option value="Very High">Very High</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    <option value="Very Low">Very Low</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Status *</label>
                  <select
                    value={newRisk.status}
                    onChange={(e) => setNewRisk({ ...newRisk, status: e.target.value as any })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                  >
                    <option value="Open">Open</option>
                    <option value="Mitigating">Mitigating</option>
                    <option value="Closed">Closed</option>
                    <option value="Accepted">Accepted</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Risk Owner *</label>
                <input
                  type="text"
                  value={newRisk.owner}
                  onChange={(e) => setNewRisk({ ...newRisk, owner: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                  placeholder="e.g., Technical Lead, Project Manager..."
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Mitigation Strategy *</label>
                <textarea
                  value={newRisk.mitigation}
                  onChange={(e) => setNewRisk({ ...newRisk, mitigation: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 min-h-[80px]"
                  placeholder="How will you mitigate this risk..."
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Contingency Plan</label>
                <textarea
                  value={newRisk.contingency}
                  onChange={(e) => setNewRisk({ ...newRisk, contingency: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 min-h-[80px]"
                  placeholder="Backup plan if mitigation fails..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Identified Date *</label>
                  <input
                    type="date"
                    value={newRisk.identifiedDate}
                    onChange={(e) => setNewRisk({ ...newRisk, identifiedDate: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Target Resolution</label>
                  <input
                    type="date"
                    value={newRisk.targetResolution}
                    onChange={(e) => setNewRisk({ ...newRisk, targetResolution: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <button
                onClick={handleAddRisk}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors font-semibold"
              >
                Add Risk
              </button>
              <button
                onClick={() => setShowAddRiskModal(false)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Risk Detail Modal */}
      {selectedRisk && !showAddRiskModal && !showMitigationModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedRisk(null)}>
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl ${getRiskLevel(getRiskScore(selectedRisk.impact, selectedRisk.probability)).color} flex items-center justify-center text-white font-bold text-xl`}>
                  {selectedRisk.id}
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedRisk.title}</h2>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      selectedRisk.status === 'Open' ? 'bg-orange-500/20 text-orange-400' :
                      selectedRisk.status === 'Mitigating' ? 'bg-blue-500/20 text-blue-400' :
                      selectedRisk.status === 'Closed' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {selectedRisk.status}
                    </span>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">{selectedRisk.category}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedRisk(null)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-white/50 mb-2">Description</p>
                <p className="text-white/80">{selectedRisk.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-white/50 mb-2">Impact</p>
                  <span className={`inline-block px-3 py-1 rounded font-semibold ${
                    selectedRisk.impact === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    selectedRisk.impact === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    selectedRisk.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {selectedRisk.impact}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/50 mb-2">Probability</p>
                  <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded font-semibold">{selectedRisk.probability}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white/50 mb-2">Risk Score</p>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 ${getRiskLevel(getRiskScore(selectedRisk.impact, selectedRisk.probability)).color} text-white rounded-lg font-bold text-lg`}>
                    {getRiskScore(selectedRisk.impact, selectedRisk.probability)} - {getRiskLevel(getRiskScore(selectedRisk.impact, selectedRisk.probability)).level}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white/50 mb-2">Risk Owner</p>
                <p className="text-white/90">{selectedRisk.owner}</p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="text-sm font-semibold text-green-400 mb-3">🛡️ Mitigation Strategy</p>
                <p className="text-white/80">{selectedRisk.mitigation}</p>
              </div>

              {selectedRisk.contingency && (
                <div className="border-t border-white/10 pt-6">
                  <p className="text-sm font-semibold text-orange-400 mb-3">⚠️ Contingency Plan</p>
                  <p className="text-white/80">{selectedRisk.contingency}</p>
                </div>
              )}

              <div className="border-t border-white/10 pt-6 flex items-center justify-between text-sm">
                <div>
                  <p className="text-white/50 mb-1">Identified Date</p>
                  <p className="text-white/90">{new Date(selectedRisk.identifiedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                {selectedRisk.targetResolution && (
                  <div className="text-right">
                    <p className="text-white/50 mb-1">Target Resolution</p>
                    <p className="text-white/90">{new Date(selectedRisk.targetResolution).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                )}
              </div>
              
              {/* Acknowledgment Section */}
              <div className="border-t border-white/10 pt-6">
                {selectedRisk.acknowledged ? (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">✓</span>
                      <h3 className="text-lg font-bold text-green-400">Risk Acknowledged</h3>
                    </div>
                    <p className="text-sm text-white/70 mb-1">This risk has been reviewed and acknowledged</p>
                    <div className="text-sm text-white/50">
                      <p>Acknowledged by: <span className="text-white/90 font-medium">{selectedRisk.acknowledgedBy}</span></p>
                      <p>Date: <span className="text-white/90">{new Date(selectedRisk.acknowledgedDate!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span></p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAcknowledgeRisk(selectedRisk.id)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all font-semibold text-lg shadow-2xl shadow-green-500/30 flex items-center justify-center gap-3"
                  >
                    <span className="text-2xl">✓</span>
                    <span>Acknowledge This Risk</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mitigation Plan Modal */}
      {showMitigationModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowMitigationModal(null)}>
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl ${getRiskLevel(getRiskScore(showMitigationModal.impact, showMitigationModal.probability)).color} flex items-center justify-center text-white font-bold text-lg`} >
                  {showMitigationModal.id}
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Mitigation Plan</h2>
                  <p className="text-sm text-white/50">{showMitigationModal.title}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMitigationModal(null)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Risk Overview */}
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-6 flex-wrap">
                  <div>
                    <p className="text-xs text-white/40 mb-1">Risk Owner</p>
                    <p className="text-sm font-semibold text-white">{showMitigationModal.owner}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Impact</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      showMitigationModal.impact === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      showMitigationModal.impact === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      showMitigationModal.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {showMitigationModal.impact}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Probability</p>
                    <span className="inline-block px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs font-semibold">{showMitigationModal.probability}</span>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Risk Score</p>
                    <span className={`inline-block px-2 py-1 ${getRiskLevel(getRiskScore(showMitigationModal.impact, showMitigationModal.probability)).color} text-white rounded text-xs font-bold`}>
                      {getRiskScore(showMitigationModal.impact, showMitigationModal.probability)} - {getRiskLevel(getRiskScore(showMitigationModal.impact, showMitigationModal.probability)).level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mitigation Strategy */}
              <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-2xl">
                    🛡️
                  </div>
                  <h3 className="text-lg font-bold text-green-400">Mitigation Strategy</h3>
                </div>
                <p className="text-white/90 leading-relaxed">{showMitigationModal.mitigation}</p>
              </div>

              {/* Contingency Plan */}
              {showMitigationModal.contingency && (
                <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-2xl">
                      ⚠️
                    </div>
                    <h3 className="text-lg font-bold text-orange-400">Contingency Plan</h3>
                  </div>
                  <p className="text-white/90 leading-relaxed">{showMitigationModal.contingency}</p>
                </div>
              )}

              {/* Timeline */}
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/40 mb-1">Identified Date</p>
                    <p className="text-white/90 font-semibold">{new Date(showMitigationModal.identifiedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  {showMitigationModal.targetResolution && (
                    <div>
                      <p className="text-white/40 mb-1">Target Resolution</p>
                      <p className="text-white/90 font-semibold">{new Date(showMitigationModal.targetResolution).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => {
                    handleCloseRisk(showMitigationModal.id);
                    setShowMitigationModal(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-colors font-semibold flex items-center justify-center gap-2"
                  disabled={showMitigationModal.status === 'Closed'}
                >
                  <span>✓</span>
                  <span>{showMitigationModal.status === 'Closed' ? 'Risk Already Closed' : 'Close This Risk'}</span>
                </button>
                <button
                  onClick={() => setShowMitigationModal(null)}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskRegisterViewer;