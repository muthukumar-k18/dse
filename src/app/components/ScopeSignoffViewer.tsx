import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { projectRepository } from '../../utils/projectRepository';
import type { Project } from '../../utils/projectRepository';

interface SignoffParty {
  role: 'AAF Owner' | 'Business Owner' | 'Vendor Owner';
  name: string;
  title: string;
  organization: string;
  signedOff: boolean;
  signedDate?: string;
  signature?: string;
  ipAddress?: string;
}

const ScopeSignoffViewer = () => {
  const navigate = useNavigate();
  const { projectId, stageId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [signoffParties, setSignoffParties] = useState<SignoffParty[]>([]);
  const [showSignoffModal, setShowSignoffModal] = useState(false);
  const [selectedParty, setSelectedParty] = useState<SignoffParty | null>(null);
  const [signatureName, setSignatureName] = useState('');
  const [documentView, setDocumentView] = useState<'overview' | 'full'>('overview');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Scope Document Content (from previous stage)
  const scopeDocument = {
    documentId: 'SCOPE-2026-001',
    version: '1.0',
    preparedDate: '2026-02-19',
    effectiveDate: '2026-03-15',
    projectCode: project?.tunaId || 'TUNA-001',
    
    executiveSummary: `This document defines the scope of work for the ${project?.name || 'Digital Transformation'} project. The objective is to migrate and modernize legacy systems to a cloud-based infrastructure while ensuring business continuity and minimizing operational disruption.`,
    
    objectives: [
      'Migrate critical business applications to cloud infrastructure',
      'Modernize legacy systems to align with current technology standards',
      'Ensure zero data loss during migration process',
      'Maintain 99.9% uptime during transition period',
      'Complete migration within 40-week timeline'
    ],
    
    scopeInclusions: [
      {
        id: 'SI-001',
        title: 'Infrastructure Migration',
        description: 'Migration of all production workloads from on-premises data centers to Azure cloud infrastructure',
        deliverables: ['Cloud infrastructure setup', 'Network configuration', 'Security implementation', 'Data migration completed'],
        timeline: '12 weeks',
        resources: '2 Cloud Architects, 3 DevOps Engineers'
      },
      {
        id: 'SI-002',
        title: 'Application Modernization',
        description: 'Refactor legacy applications to microservices architecture with containerization',
        deliverables: ['Refactored application modules', 'API integrations', 'Container orchestration', 'CI/CD pipeline'],
        timeline: '16 weeks',
        resources: '4 Full-stack Developers, 2 Solution Architects'
      },
      {
        id: 'SI-003',
        title: 'Data Migration & Integration',
        description: 'Migrate databases and establish real-time data synchronization between systems',
        deliverables: ['Database migration', 'Data validation', 'ETL processes', 'Integration testing'],
        timeline: '10 weeks',
        resources: '2 Data Engineers, 1 Database Administrator'
      },
      {
        id: 'SI-004',
        title: 'Testing & Quality Assurance',
        description: 'Comprehensive testing including functional, performance, security, and UAT',
        deliverables: ['Test plans', 'Test execution', 'Bug tracking', 'QA sign-off', 'Performance reports'],
        timeline: '8 weeks',
        resources: '3 QA Engineers, 1 Test Manager'
      },
      {
        id: 'SI-005',
        title: 'Training & Change Management',
        description: 'End-user training, documentation, and change management activities',
        deliverables: ['Training materials', 'User guides', 'Video tutorials', 'Change management plan'],
        timeline: '6 weeks',
        resources: '2 Training Specialists, 1 Change Manager'
      }
    ],
    
    scopeExclusions: [
      'Third-party integrations not listed in the integration matrix',
      'Legacy systems scheduled for decommissioning post-migration',
      'Custom development requests outside defined scope',
      'Hardware procurement and physical infrastructure',
      'Ongoing maintenance and support beyond 3-month hypercare period'
    ],
    
    assumptions: [
      'Business stakeholders will be available for timely reviews and approvals',
      'Required access to source systems and environments will be provided',
      'Test data will be made available by business teams',
      'No major organizational changes during project execution',
      'Required budget and resources will remain allocated throughout project'
    ],
    
    constraints: [
      'Project must be completed within 40-week timeline',
      'Budget ceiling of $2.5M cannot be exceeded',
      'Migration must occur during approved maintenance windows',
      'Compliance with SOC2 and GDPR requirements mandatory',
      'No changes to core business processes during migration'
    ],
    
    timeline: {
      totalDuration: '40 weeks',
      startDate: '2026-03-15',
      endDate: '2026-12-15',
      milestones: [
        { phase: 'Discovery & Planning', duration: '4 weeks', endDate: '2026-04-12' },
        { phase: 'Design & Architecture', duration: '6 weeks', endDate: '2026-05-24' },
        { phase: 'Development & Migration', duration: '16 weeks', endDate: '2026-09-13' },
        { phase: 'Testing & UAT', duration: '8 weeks', endDate: '2026-11-08' },
        { phase: 'Deployment & Go-Live', duration: '6 weeks', endDate: '2026-12-15' }
      ]
    },
    
    budget: {
      total: '$2,500,000',
      breakdown: [
        { category: 'Personnel', amount: '$1,500,000' },
        { category: 'Infrastructure', amount: '$600,000' },
        { category: 'Software Licenses', amount: '$200,000' },
        { category: 'Training', amount: '$100,000' },
        { category: 'Contingency (10%)', amount: '$100,000' }
      ]
    },
    
    successCriteria: [
      'All applications successfully migrated with zero data loss',
      'System performance meets or exceeds baseline metrics',
      'User acceptance testing passed with 95% satisfaction rating',
      'No critical defects in production for 30 days post go-live',
      'Project delivered within approved timeline and budget'
    ]
  };

  useEffect(() => {
    if (projectId) {
      const foundProject = projectRepository.getProjectById(parseInt(projectId));
      if (foundProject) {
        setProject(foundProject);
      }
    }

    // Load signoff parties from localStorage
    const storageKey = `scope_signoff_${projectId}_${stageId}`;
    const storedSignoffs = localStorage.getItem(storageKey);
    if (storedSignoffs) {
      setSignoffParties(JSON.parse(storedSignoffs));
    } else {
      // Initialize with default parties
      const defaultParties: SignoffParty[] = [
        {
          role: 'AAF Owner',
          name: 'Jennifer Martinez',
          title: 'Senior Program Manager',
          organization: 'AFF Technology Services',
          signedOff: false
        },
        {
          role: 'Business Owner',
          name: 'Robert Chen',
          title: 'VP of Business Operations',
          organization: 'Business Division',
          signedOff: false
        },
        {
          role: 'Vendor Owner',
          name: 'Samantha Williams',
          title: 'Delivery Lead',
          organization: 'TechPartner Solutions Inc.',
          signedOff: false
        }
      ];
      setSignoffParties(defaultParties);
      localStorage.setItem(storageKey, JSON.stringify(defaultParties));
    }
  }, [projectId, stageId]);

  const handleSignoff = () => {
    if (!selectedParty || !signatureName.trim() || !acceptedTerms) {
      alert('Please enter your name and accept the terms to sign off');
      return;
    }

    const updatedParties = signoffParties.map(party => {
      if (party.role === selectedParty.role) {
        return {
          ...party,
          signedOff: true,
          signedDate: new Date().toISOString(),
          signature: signatureName,
          ipAddress: '192.168.1.xxx' // Simulated
        };
      }
      return party;
    });

    setSignoffParties(updatedParties);

    // Save to localStorage
    const storageKey = `scope_signoff_${projectId}_${stageId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedParties));

    setShowSignoffModal(false);
    setSignatureName('');
    setAcceptedTerms(false);
    setSelectedParty(null);
  };

  const allSignedOff = signoffParties.every(party => party.signedOff);

  const handleComplete = () => {
    if (allSignedOff) {
      // Mark activity as completed
      const activitiesKey = `activities_${projectId}_${stageId}`;
      const savedActivities = localStorage.getItem(activitiesKey);
      if (savedActivities) {
        const activities = JSON.parse(savedActivities);
        const updatedActivities = activities.map(activity => {
          if (activity.name === 'Scope Sign-off') {
            return { ...activity, status: 'Completed' };
          }
          return activity;
        });
        localStorage.setItem(activitiesKey, JSON.stringify(updatedActivities));
      }
      
      navigate(`/stage-details/${projectId}/${stageId}`);
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading document...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white">
      {/* Formal Header */}
      <div className="border-b border-white/20 bg-gradient-to-r from-slate-900 to-gray-900 sticky top-0 z-10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-8 py-6">
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
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10"
              >
                ←
              </button>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold">Scope Document Sign-off</h1>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs font-mono border border-cyan-500/30">
                    {scopeDocument.documentId}
                  </span>
                </div>
                <p className="text-sm text-white/50">Formal approval required from all authorized parties</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {allSignedOff ? (
                <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 rounded-lg border border-green-500/30">
                  <span className="text-xl">✓</span>
                  <span className="font-bold">Fully Executed</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-5 py-2.5 bg-amber-500/20 text-amber-300 rounded-lg border border-amber-500/30">
                  <span className="text-xl">⏳</span>
                  <span className="font-semibold">Pending {signoffParties.filter(p => !p.signedOff).length} Signature(s)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Document Panel - Takes up 2 columns */}
          <div className="lg:col-span-2">
            {/* Document Header */}
            <div className="bg-white/[0.02] border-2 border-white/10 rounded-2xl overflow-hidden">
              {/* Document Title Bar */}
              <div className="bg-gradient-to-r from-slate-800 to-gray-800 px-8 py-6 border-b border-white/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Project Scope Document</h2>
                    <p className="text-white/60 text-lg">{project.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/40 mb-1">Document Version</p>
                    <p className="text-2xl font-bold text-cyan-400">{scopeDocument.version}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-xs text-white/40 mb-1">Document ID</p>
                    <p className="font-mono text-sm text-cyan-300">{scopeDocument.documentId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Prepared Date</p>
                    <p className="text-sm">{new Date(scopeDocument.preparedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Effective Date</p>
                    <p className="text-sm">{new Date(scopeDocument.effectiveDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>

              {/* View Toggle */}
              <div className="bg-slate-900/50 px-8 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDocumentView('overview')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      documentView === 'overview'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    📊 Overview
                  </button>
                  <button
                    onClick={() => setDocumentView('full')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      documentView === 'full'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    📄 Full Document
                  </button>
                </div>
              </div>

              {/* Document Content */}
              <div className="p-8 max-h-[800px] overflow-y-auto">
                {documentView === 'overview' ? (
                  <div className="space-y-8">
                    {/* Executive Summary */}
                    <section>
                      <h3 className="text-xl font-bold mb-3 text-cyan-400 flex items-center gap-2">
                        <span className="text-2xl">📋</span>
                        <span>Executive Summary</span>
                      </h3>
                      <p className="text-white/80 leading-relaxed bg-white/[0.02] border border-white/10 rounded-lg p-5">
                        {scopeDocument.executiveSummary}
                      </p>
                    </section>

                    {/* Key Objectives */}
                    <section>
                      <h3 className="text-xl font-bold mb-3 text-cyan-400 flex items-center gap-2">
                        <span className="text-2xl">🎯</span>
                        <span>Project Objectives</span>
                      </h3>
                      <div className="space-y-2">
                        {scopeDocument.objectives.map((obj, idx) => (
                          <div key={idx} className="flex items-start gap-3 bg-white/[0.02] border border-white/10 rounded-lg p-4">
                            <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <p className="text-white/80">{obj}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Scope Inclusions */}
                    <section>
                      <h3 className="text-xl font-bold mb-3 text-cyan-400 flex items-center gap-2">
                        <span className="text-2xl">✅</span>
                        <span>Scope Inclusions</span>
                      </h3>
                      <div className="space-y-4">
                        {scopeDocument.scopeInclusions.map((item) => (
                          <div key={item.id} className="bg-gradient-to-br from-slate-900 to-gray-900 border border-white/10 rounded-xl p-5">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-mono text-cyan-400">{item.id}</span>
                                </div>
                                <h4 className="font-bold text-lg">{item.title}</h4>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-white/40">Duration</p>
                                <p className="font-semibold text-cyan-400">{item.timeline}</p>
                              </div>
                            </div>
                            <p className="text-sm text-white/70 mb-3">{item.description}</p>
                            <div className="border-t border-white/10 pt-3">
                              <p className="text-xs text-white/40 mb-2">Deliverables:</p>
                              <div className="flex flex-wrap gap-2">
                                {item.deliverables.map((del, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded text-xs border border-cyan-500/20">
                                    {del}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Timeline Summary */}
                    <section>
                      <h3 className="text-xl font-bold mb-3 text-cyan-400 flex items-center gap-2">
                        <span className="text-2xl">📅</span>
                        <span>Project Timeline</span>
                      </h3>
                      <div className="bg-gradient-to-r from-slate-900 to-gray-900 border border-white/10 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-xs text-white/40 mb-1">Start Date</p>
                            <p className="font-bold text-lg">{new Date(scopeDocument.timeline.startDate).toLocaleDateString()}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-white/40 mb-1">Duration</p>
                            <p className="font-bold text-lg text-cyan-400">{scopeDocument.timeline.totalDuration}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-white/40 mb-1">End Date</p>
                            <p className="font-bold text-lg">{new Date(scopeDocument.timeline.endDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {scopeDocument.timeline.milestones.map((milestone, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white/[0.02] border border-white/10 rounded-lg p-3">
                              <span className="text-sm font-medium">{milestone.phase}</span>
                              <div className="flex items-center gap-4">
                                <span className="text-sm text-cyan-400">{milestone.duration}</span>
                                <span className="text-xs text-white/40">→ {milestone.endDate}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>
                ) : (
                  <div className="space-y-8 text-sm">
                    {/* Full Document View */}
                    <section>
                      <h3 className="text-lg font-bold mb-3 text-cyan-400">1. Executive Summary</h3>
                      <p className="text-white/70 leading-relaxed">{scopeDocument.executiveSummary}</p>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold mb-3 text-cyan-400">2. Project Objectives</h3>
                      <ul className="space-y-2">
                        {scopeDocument.objectives.map((obj, idx) => (
                          <li key={idx} className="text-white/70 flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold mb-3 text-cyan-400">3. Scope Inclusions</h3>
                      {scopeDocument.scopeInclusions.map((item, idx) => (
                        <div key={item.id} className="mb-5">
                          <h4 className="font-semibold mb-2">3.{idx + 1} {item.title}</h4>
                          <p className="text-white/70 mb-2">{item.description}</p>
                          <p className="text-xs text-white/50">Timeline: {item.timeline} | Resources: {item.resources}</p>
                        </div>
                      ))}
                    </section>

                    <section>
                      <h3 className="text-lg font-bold mb-3 text-cyan-400">4. Scope Exclusions</h3>
                      <ul className="space-y-2">
                        {scopeDocument.scopeExclusions.map((excl, idx) => (
                          <li key={idx} className="text-white/70 flex items-start gap-2">
                            <span className="text-red-400 mt-1">✗</span>
                            <span>{excl}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold mb-3 text-cyan-400">5. Assumptions</h3>
                      <ul className="space-y-2">
                        {scopeDocument.assumptions.map((assumption, idx) => (
                          <li key={idx} className="text-white/70 flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            <span>{assumption}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold mb-3 text-cyan-400">6. Constraints</h3>
                      <ul className="space-y-2">
                        {scopeDocument.constraints.map((constraint, idx) => (
                          <li key={idx} className="text-white/70 flex items-start gap-2">
                            <span className="text-amber-400 mt-1">⚠</span>
                            <span>{constraint}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold mb-3 text-cyan-400">7. Budget</h3>
                      <p className="text-white/70 mb-3">Total Project Budget: <span className="font-bold text-lg text-cyan-400">{scopeDocument.budget.total}</span></p>
                      <div className="space-y-2">
                        {scopeDocument.budget.breakdown.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white/[0.02] border border-white/10 rounded p-2">
                            <span className="text-white/70">{item.category}</span>
                            <span className="font-semibold">{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold mb-3 text-cyan-400">8. Success Criteria</h3>
                      <ul className="space-y-2">
                        {scopeDocument.successCriteria.map((criteria, idx) => (
                          <li key={idx} className="text-white/70 flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Signature Panel - Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              {/* Signature Status */}
              <div className="bg-white/[0.02] border-2 border-white/10 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                  <span className="text-2xl">✍️</span>
                  <span>Digital Signatures</span>
                </h3>

                <div className="space-y-5 mb-6">
                  {signoffParties.map((party, index) => (
                    <div
                      key={party.role}
                      className={`border-2 rounded-xl p-5 transition-all ${
                        party.signedOff
                          ? 'bg-green-900/20 border-green-500/40 shadow-lg shadow-green-500/10'
                          : 'bg-white/[0.02] border-white/20 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              party.signedOff ? 'bg-green-500 text-white' : 'bg-white/10 text-white/40'
                            }`}>
                              {party.signedOff ? '✓' : index + 1}
                            </div>
                            <div>
                              <h4 className="font-bold text-sm">{party.role}</h4>
                            </div>
                          </div>
                          <div className="pl-10">
                            <p className="text-sm font-semibold text-white/90">{party.name}</p>
                            <p className="text-xs text-white/50">{party.title}</p>
                            <p className="text-xs text-white/40">{party.organization}</p>
                          </div>
                        </div>
                      </div>

                      {party.signedOff ? (
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-3">
                          <div className="mb-3 pb-3 border-b border-green-500/30">
                            <p className="text-2xl font-bold text-green-400 mb-1" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                              {party.signature}
                            </p>
                          </div>
                          <div className="space-y-1 text-xs">
                            <p className="text-green-400 font-semibold">✓ Digitally signed</p>
                            <p className="text-white/50">
                              {new Date(party.signedDate!).toLocaleDateString('en-US', { 
                                month: 'long', 
                                day: 'numeric', 
                                year: 'numeric', 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                            <p className="text-white/30 font-mono">IP: {party.ipAddress}</p>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedParty(party);
                            setShowSignoffModal(true);
                          }}
                          className="w-full mt-3 px-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all font-medium text-sm shadow-lg hover:shadow-cyan-500/30"
                        >
                          Sign Document
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-white/60">Signature Progress</p>
                    <p className="text-xs text-cyan-400 font-bold">
                      {signoffParties.filter(p => p.signedOff).length} of {signoffParties.length}
                    </p>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-green-500 transition-all duration-700"
                      style={{ width: `${(signoffParties.filter(p => p.signedOff).length / signoffParties.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Complete Button */}
                <button
                  onClick={handleComplete}
                  disabled={!allSignedOff}
                  className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                    allSignedOff
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-2xl shadow-green-500/30'
                      : 'bg-white/5 text-white/30 cursor-not-allowed'
                  }`}
                >
                  {allSignedOff ? '✓ Complete Sign-off' : '⏳ Awaiting All Signatures'}
                </button>
              </div>

              {/* Document Info */}
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
                <h4 className="font-bold mb-3 text-sm">Document Information</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/40">Status:</span>
                    <span className={`font-semibold ${allSignedOff ? 'text-green-400' : 'text-amber-400'}`}>
                      {allSignedOff ? 'Fully Executed' : 'Pending Signatures'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Version:</span>
                    <span className="font-mono">{scopeDocument.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Last Modified:</span>
                    <span>{new Date(scopeDocument.preparedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Signature Modal */}
      {showSignoffModal && selectedParty && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={() => setShowSignoffModal(false)}>
          <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 border-2 border-white/20 rounded-2xl p-8 max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Digital Signature</h2>
              <button
                onClick={() => setShowSignoffModal(false)}
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            {/* Party Info */}
            <div className="bg-cyan-900/20 border-2 border-cyan-500/30 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center text-3xl">
                  ✍️
                </div>
                <div>
                  <h3 className="font-bold text-lg">{selectedParty.role}</h3>
                  <p className="text-sm text-white/70">{selectedParty.name}</p>
                  <p className="text-xs text-white/50">{selectedParty.title}</p>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-sm text-white/80 leading-relaxed">
                  By signing this document, you confirm that you have reviewed the complete scope document, understand all
                  terms and conditions, and approve the proposed project scope, timeline, and budget as outlined. Your
                  digital signature represents your legal agreement and commitment to this project.
                </p>
              </div>
            </div>

            {/* Signature Input */}
            <div className="mb-6">
              <label className="text-sm font-semibold mb-3 block flex items-center gap-2">
                <span>Enter your full legal name *</span>
              </label>
              <input
                type="text"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                placeholder="e.g., John David Smith"
                className="w-full bg-white/5 border-2 border-white/20 rounded-lg px-5 py-4 focus:outline-none focus:border-cyan-500 text-lg font-medium"
                autoFocus
              />
              {signatureName && (
                <div className="mt-4 bg-white/5 border border-white/20 rounded-lg p-5">
                  <p className="text-xs text-white/40 mb-2">Signature preview:</p>
                  <p className="text-3xl text-cyan-400" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                    {signatureName}
                  </p>
                </div>
              )}
            </div>

            {/* Terms Acceptance */}
            <div className="mb-6 bg-white/[0.02] border border-white/10 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5"
                />
                <span className="text-sm text-white/70 leading-relaxed">
                  I acknowledge that I have read, understood, and agree to the terms outlined in this scope document. 
                  I understand that my digital signature has the same legal effect as a handwritten signature.
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSignoff}
                disabled={!signatureName.trim() || !acceptedTerms}
                className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all ${
                  signatureName.trim() && acceptedTerms
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600 shadow-xl shadow-cyan-500/30'
                    : 'bg-white/5 text-white/30 cursor-not-allowed'
                }`}
              >
                ✓ Sign & Submit
              </button>
              <button
                onClick={() => {
                  setShowSignoffModal(false);
                  setSignatureName('');
                  setAcceptedTerms(false);
                }}
                className="px-6 py-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors font-medium"
              >
                Cancel
              </button>
            </div>

            {/* Timestamp Info */}
            <p className="text-xs text-white/30 text-center mt-4">
              Signature will be timestamped: {new Date().toLocaleString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScopeSignoffViewer;