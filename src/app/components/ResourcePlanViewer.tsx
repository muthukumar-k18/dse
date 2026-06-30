import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { projectRepository } from '../../utils/projectRepository';
import type { Project } from '../../utils/projectRepository';

interface TeamMember {
  name: string;
  role: string;
  allocation: string;
  type: 'Full-Time' | 'Part-Time' | 'Contractor';
  skills: string[];
  cost: string;
  location: string;
}

interface ResourcePhase {
  phase: string;
  duration: string;
  headcount: number;
  focus: string;
}

const ResourcePlanViewer = () => {
  const navigate = useNavigate();
  const { projectId, stageId } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (projectId) {
      const foundProject = projectRepository.getProjectById(parseInt(projectId));
      if (foundProject) {
        setProject(foundProject);
      }
    }
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading resource plan...</p>
        </div>
      </div>
    );
  }

  // Generate team composition based on project
  const getTeamComposition = (): TeamMember[] => {
    const baseTeam: TeamMember[] = [
      {
        name: 'Sarah Chen',
        role: 'Migration Lead / Architect',
        allocation: '100%',
        type: 'Full-Time',
        skills: ['Architecture', 'Migration Strategy', 'Technical Leadership'],
        cost: 'XXX',
        location: 'San Francisco, USA'
      },
      {
        name: 'Michael Rodriguez',
        role: 'Senior Backend Engineer',
        allocation: '100%',
        type: 'Full-Time',
        skills: ['Java', 'Spring Boot', 'Microservices', 'API Design'],
        cost: 'XXX',
        location: 'Austin, USA'
      },
      {
        name: 'Priya Sharma',
        role: 'DevOps Engineer',
        allocation: '75%',
        type: 'Part-Time',
        skills: ['CI/CD', 'Docker', 'Kubernetes', 'Azure'],
        cost: 'XXX',
        location: 'Bangalore, India'
      },
      {
        name: 'David Kim',
        role: 'QA Lead',
        allocation: '100%',
        type: 'Full-Time',
        skills: ['Test Automation', 'Performance Testing', 'Selenium'],
        cost: 'XXX',
        location: 'Seoul, South Korea'
      },
      {
        name: 'Emily Watson',
        role: 'Business Analyst',
        allocation: '50%',
        type: 'Part-Time',
        skills: ['Requirements Analysis', 'Documentation', 'Stakeholder Management'],
        cost: 'XXX',
        location: 'London, UK'
      },
      {
        name: 'James Thompson',
        role: 'Database Specialist',
        allocation: '60%',
        type: 'Contractor',
        skills: ['PostgreSQL', 'Data Migration', 'Performance Tuning'],
        cost: 'XXX',
        location: 'Toronto, Canada'
      }
    ];

    // Add tech-specific roles
    if (project.sourceTech.includes('Java') && project.targetTech.includes('Java')) {
      baseTeam.push({
        name: 'Alex Martinez',
        role: 'Java Modernization Expert',
        allocation: '100%',
        type: 'Contractor',
        skills: ['Java 8-21 Migration', 'JVM Optimization', 'Legacy Modernization'],
        cost: 'XXX',
        location: 'Remote'
      });
    }

    if (project.sourceTech.includes('COBOL')) {
      baseTeam.push({
        name: 'Margaret Anderson',
        role: 'COBOL/Mainframe Specialist',
        allocation: '50%',
        type: 'Contractor',
        skills: ['COBOL', 'Mainframe Systems', 'Legacy Analysis'],
        cost: 'XXX',
        location: 'New York, USA'
      });
    }

    return baseTeam;
  };

  // Resource phases timeline
  const getResourcePhases = (): ResourcePhase[] => {
    return [
      {
        phase: 'Discovery & Planning',
        duration: '4 weeks',
        headcount: 5,
        focus: 'Requirements gathering, architecture design, risk assessment'
      },
      {
        phase: 'Development & Migration',
        duration: '12 weeks',
        headcount: 7,
        focus: 'Code migration, testing, integration, documentation'
      },
      {
        phase: 'Testing & Validation',
        duration: '6 weeks',
        headcount: 6,
        focus: 'System testing, performance testing, UAT, bug fixes'
      },
      {
        phase: 'Deployment & Cutover',
        duration: '2 weeks',
        headcount: 8,
        focus: 'Production deployment, data migration, go-live support'
      },
      {
        phase: 'Hypercare & Stabilization',
        duration: '4 weeks',
        headcount: 4,
        focus: 'Production monitoring, issue resolution, optimization'
      }
    ];
  };

  const teamMembers = getTeamComposition();
  const resourcePhases = getResourcePhases();

  // Calculate totals
  const totalFullTime = teamMembers.filter(m => m.type === 'Full-Time').length;
  const totalPartTime = teamMembers.filter(m => m.type === 'Part-Time').length;
  const totalContractors = teamMembers.filter(m => m.type === 'Contractor').length;
  const totalHeadcount = teamMembers.length;

  // Calculate budget
  const calculateBudget = () => {
    let total = 0;
    teamMembers.forEach(member => {
      if (member.cost.includes('k/year')) {
        const yearly = parseInt(member.cost.replace(/[^0-9]/g, '')) * 1000;
        const allocation = parseInt(member.allocation) / 100;
        total += (yearly / 2) * allocation; // 6 months project
      } else if (member.cost.includes('/hour')) {
        const hourly = parseInt(member.cost.replace(/[^0-9]/g, ''));
        const allocation = parseInt(member.allocation) / 100;
        total += hourly * 40 * 26 * allocation; // 40 hrs/week * 26 weeks
      }
    });
    return Math.round(total / 1000); // in thousands
  };

  const totalBudget = calculateBudget();

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
                <h1 className="text-2xl font-bold">Resource Plan</h1>
                <p className="text-sm text-white/50">Team composition, allocation, and budget planning</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium">
                📥 Export Plan
              </button>
              <button className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm font-medium">
                🔗 Share
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
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-white/50">Module:</span>
                  <span className="font-semibold">{project.module}</span>
                </div>
                <span className="text-white/30">•</span>
                <div className="flex items-center gap-2">
                  <span className="text-white/50">Priority:</span>
                  <span className={`font-semibold ${
                    project.priority === 'High' ? 'text-red-400' :
                    project.priority === 'Medium' ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>{project.priority}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/40 mb-1">Project Progress</p>
              <p className="text-3xl font-bold text-cyan-400">{project.progress}%</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <span className="text-xl">👥</span>
              </div>
              <div>
                <p className="text-xs text-white/40">Total Headcount</p>
                <p className="text-2xl font-bold">{totalHeadcount}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50 mt-3">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>{totalFullTime} FTE</span>
              <span className="w-2 h-2 bg-yellow-500 rounded-full ml-2"></span>
              <span>{totalPartTime} PT</span>
              <span className="w-2 h-2 bg-purple-500 rounded-full ml-2"></span>
              <span>{totalContractors} Contractors</span>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-xl">💰</span>
              </div>
              <div>
                <p className="text-xs text-white/40">Budget Estimate</p>
                <p className="text-2xl font-bold">XXX</p>
              </div>
            </div>
            <p className="text-xs text-white/50 mt-3">6-month project duration</p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <span className="text-xl">📅</span>
              </div>
              <div>
                <p className="text-xs text-white/40">Timeline</p>
                <p className="text-2xl font-bold">28 weeks</p>
              </div>
            </div>
            <p className="text-xs text-white/50 mt-3">5 phases planned</p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <span className="text-xl">🌍</span>
              </div>
              <div>
                <p className="text-xs text-white/40">Locations</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
            <p className="text-xs text-white/50 mt-3">Global distributed team</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Team & Phases */}
          <div className="lg:col-span-2 space-y-6">
            {/* Team Composition */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                  👥
                </div>
                <div>
                  <h2 className="text-xl font-bold">Team Composition</h2>
                  <p className="text-sm text-white/50">{totalHeadcount} team members across {resourcePhases.length} phases</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-lg p-3 hover:bg-white/[0.05] transition-colors">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm mb-0.5 truncate">{member.name}</h3>
                        <p className="text-xs text-white/60 truncate">{member.role}</p>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded flex-shrink-0 ${
                        member.type === 'Full-Time' ? 'bg-green-500/20 text-green-400' :
                        member.type === 'Part-Time' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {member.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="text-white/40">📊</span>
                        <span className="text-cyan-400 font-medium">{member.allocation}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-white/40">📍</span>
                        <span className="text-white/50 truncate">{member.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resource Phases Timeline */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl">
                  📊
                </div>
                <div>
                  <h2 className="text-xl font-bold">Resource Phasing</h2>
                  <p className="text-sm text-white/50">Team allocation across project timeline</p>
                </div>
              </div>

              <div className="space-y-4">
                {resourcePhases.map((phase, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm">
                            {idx + 1}
                          </div>
                          <h3 className="font-semibold text-base">{phase.phase}</h3>
                        </div>
                        <p className="text-sm text-white/60 mb-3 ml-11">{phase.focus}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-xs text-white/40 mb-1">Duration</p>
                        <p className="font-semibold text-cyan-400">{phase.duration}</p>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-3 ml-11">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-white/40 mb-1">Team Size</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: phase.headcount }).map((_, i) => (
                              <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs">
                                👤
                              </div>
                            ))}
                            <span className="ml-2 text-sm font-semibold">{phase.headcount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline Visualization */}
              <div className="mt-6 bg-white/[0.03] border border-white/10 rounded-xl p-4">
                <p className="text-sm font-semibold text-white/80 mb-4">Resource Timeline (28 weeks)</p>
                <div className="space-y-2">
                  {resourcePhases.map((phase, idx) => {
                    const totalWeeks = 28;
                    const phaseWeeks = parseInt(phase.duration.split(' ')[0]);
                    const widthPercent = (phaseWeeks / totalWeeks) * 100;
                    
                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="text-xs text-white/50 w-8">{idx + 1}</span>
                        <div className="flex-1 h-8 bg-white/[0.05] rounded-lg overflow-hidden relative">
                          <div 
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-xs font-semibold"
                            style={{ width: `${widthPercent}%` }}
                          >
                            {phase.duration}
                          </div>
                        </div>
                        <span className="text-xs text-white/40 w-12 text-right">{phase.headcount} ppl</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RACI Matrix */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                  📋
                </div>
                <div>
                  <h2 className="text-xl font-bold">RACI Matrix</h2>
                  <p className="text-sm text-white/50">Responsibility assignment matrix</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white/70 font-semibold">Activity</th>
                      <th className="text-center py-3 px-4 text-white/70 font-semibold">Lead</th>
                      <th className="text-center py-3 px-4 text-white/70 font-semibold">Backend</th>
                      <th className="text-center py-3 px-4 text-white/70 font-semibold">DevOps</th>
                      <th className="text-center py-3 px-4 text-white/70 font-semibold">QA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Architecture Design</td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold">R</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-semibold">C</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-semibold">C</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-semibold">I</span></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Code Migration</td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold">A</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold">R</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-semibold">C</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-semibold">I</span></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">CI/CD Setup</td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold">A</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-semibold">C</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold">R</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-semibold">I</span></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Testing Strategy</td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold">A</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-semibold">C</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-semibold">C</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold">R</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Production Deployment</td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold">A</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold">R</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold">R</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-semibold">C</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center gap-6 text-xs text-white/50">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded font-semibold">R</span>
                  <span>Responsible</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded font-semibold">A</span>
                  <span>Accountable</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded font-semibold">C</span>
                  <span>Consulted</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded font-semibold">I</span>
                  <span>Informed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Skill Requirements */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl">
                  🎯
                </div>
                <div>
                  <h3 className="text-lg font-bold">Required Skills</h3>
                  <p className="text-xs text-white/50">Core competencies</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { skill: 'Java/Spring Boot', level: 90 },
                  { skill: 'Cloud (Azure)', level: 75 },
                  { skill: 'Database Design', level: 80 },
                  { skill: 'DevOps/CI-CD', level: 70 },
                  { skill: 'Testing/QA', level: 85 },
                  { skill: 'API Design', level: 80 }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/70">{item.skill}</span>
                      <span className="text-xs text-cyan-400 font-semibold">{item.level}%</span>
                    </div>
                    <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Training Plan */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-xl">
                  📚
                </div>
                <div>
                  <h3 className="text-lg font-bold">Training Needs</h3>
                  <p className="text-xs text-white/50">Upskilling plan</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-sm">📖</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold mb-1">Java 21 Features</p>
                      <p className="text-xs text-white/50">2-day workshop</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Week 1</span>
                    <span className="text-xs text-white/40">All developers</span>
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-sm">📖</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold mb-1">Kubernetes Deep Dive</p>
                      <p className="text-xs text-white/50">3-day training</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-400 rounded">Week 2</span>
                    <span className="text-xs text-white/40">DevOps team</span>
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-sm">📖</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold mb-1">Performance Testing</p>
                      <p className="text-xs text-white/50">1-day workshop</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Week 3</span>
                    <span className="text-xs text-white/40">QA team</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Areas */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-xl">
                  ⚠️
                </div>
                <div>
                  <h3 className="text-lg font-bold">Resource Risks</h3>
                  <p className="text-xs text-white/50">Potential constraints</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-sm mt-0.5">🔴</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-red-400 mb-1">Key Person Dependency</p>
                      <p className="text-xs text-white/60">Migration Lead is single point of failure</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-sm mt-0.5">🟡</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-yellow-400 mb-1">Skill Gap</p>
                      <p className="text-xs text-white/60">Limited Java 21 experience in team</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-sm mt-0.5">🟠</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-orange-400 mb-1">Timezone Challenges</p>
                      <p className="text-xs text-white/60">6 locations across different timezones</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Breakdown */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl">
                  💵
                </div>
                <div>
                  <h3 className="text-lg font-bold">Budget Breakdown</h3>
                  <p className="text-xs text-white/50">Cost allocation</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-sm text-white/70">Full-Time Staff</span>
                  <span className="text-sm font-semibold text-green-400">XXX</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-sm text-white/70">Contractors</span>
                  <span className="text-sm font-semibold text-green-400">XXX</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-sm text-white/70">Training & Tools</span>
                  <span className="text-sm font-semibold text-green-400">XXX</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-sm text-white/70">Contingency (15%)</span>
                  <span className="text-sm font-semibold text-green-400">XXX</span>
                </div>
                <div className="flex items-center justify-between py-3 pt-4">
                  <span className="text-base font-semibold">Total Budget</span>
                  <span className="text-xl font-bold text-cyan-400">XXX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcePlanViewer;