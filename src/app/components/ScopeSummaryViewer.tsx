import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { projectRepository } from '../../utils/projectRepository';
import type { Project } from '../../utils/projectRepository';

const ScopeSummaryViewer = () => {
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
          <p className="text-white/50">Loading project details...</p>
        </div>
      </div>
    );
  }

  // Generate migration details based on project data
  const getMigrationDetails = () => {
    const baseDetails = {
      objective: `Migrate ${project.module} from ${project.sourceTech} to ${project.targetTech}`,
      components: [] as any[],
      successCriteria: [
        'Zero data loss during migration',
        'Maximum 2 hours downtime during cutover',
        '99.9% uptime post-migration',
        '50% improvement in response times'
      ],
      timeline: {
        duration: '6 months',
        start: project.createdDate,
        target: new Date(new Date(project.createdDate).getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      repositories: {
        source: {
          name: project.module.toLowerCase().replace(/\s+/g, '-'),
          path: `company/${project.module.toLowerCase().replace(/\s+/g, '-')}`,
          branch: 'main',
          lastCommit: '2 days ago',
          commits: 248,
          branches: 12,
          size: '3.2 GB'
        },
        target: {
          name: `${project.module.toLowerCase().replace(/\s+/g, '-')}-modernized`,
          path: `company/${project.module.toLowerCase().replace(/\s+/g, '-')}-modernized`,
          branch: 'develop',
          lastCommit: '5 hours ago',
          commits: 87,
          branches: 5,
          size: '856 MB'
        }
      }
    };

    // Customize components based on tech stack
    if (project.sourceTech.includes('Java') || project.targetTech.includes('Java')) {
      baseDetails.components = [
        { icon: '⚙️', title: 'Backend Services', description: 'Core business logic and APIs' },
        { icon: '🗄️', title: 'Database Layer', description: 'PostgreSQL with optimized schemas' },
        { icon: '🔐', title: 'Security', description: 'OAuth 2.0 and JWT implementation' },
        { icon: '📦', title: 'Dependencies', description: 'Updated libraries and frameworks' }
      ];
    } else if (project.sourceTech.includes('Spring Boot')) {
      baseDetails.components = [
        { icon: '⚙️', title: 'Spring Framework', description: 'Spring Boot 3.x with Jakarta EE' },
        { icon: '🗄️', title: 'Persistence Layer', description: 'JPA/Hibernate upgrades' },
        { icon: '🎨', title: 'REST APIs', description: 'OpenAPI 3.0 documentation' },
        { icon: '🔐', title: 'Spring Security', description: 'Latest security patterns' }
      ];
    } else if (project.sourceTech.includes('COBOL')) {
      baseDetails.components = [
        { icon: '⚙️', title: 'Java Wrapper Layer', description: 'Modern API wrapper for COBOL' },
        { icon: '🗄️', title: 'Data Bridge', description: 'Mainframe to Java data mapping' },
        { icon: '🔄', title: 'Transaction Manager', description: 'Distributed transaction handling' },
        { icon: '📊', title: 'Monitoring', description: 'Real-time performance metrics' }
      ];
    } else {
      baseDetails.components = [
        { icon: '⚙️', title: 'Backend Services', description: '15 APIs, 8 background jobs' },
        { icon: '🗄️', title: 'Database Layer', description: 'Schema migration and optimization' },
        { icon: '🎨', title: 'API Layer', description: 'RESTful and GraphQL endpoints' },
        { icon: '🔐', title: 'Authentication', description: 'Modern auth implementation' }
      ];
    }

    return baseDetails;
  };

  const details = getMigrationDetails();

  // Generate AI prompt based on project details
  const generateAIPrompt = () => {
    return `Context: Generate a comprehensive Scope Document for migrating ${project.module} from ${project.sourceTech} to ${project.targetTech}.

Project: ${project.name}
TUNA ID: ${project.tunaId}
Team: ${project.team}
Priority: ${project.priority}

Source System:
- Technology: ${project.sourceTech}
- Module: ${project.module}
- Repository: github.com/${details.repositories.source.path}
- Status: ${project.status}

Target System:
- Technology: ${project.targetTech}
- Repository: github.com/${details.repositories.target.path}
- Architecture: Modern microservices-based

Requirements:
- Zero data loss during migration
- Maximum 2 hours downtime
- 50% performance improvement
- Timeline: ${details.timeline.duration}
- Maintain business continuity

Output: Create a detailed scope document including:
1. Project objectives and business drivers
2. Technical architecture (current and target state)
3. Migration strategy and approach
4. Risk assessment and mitigation plans
5. Resource requirements and team composition
6. Detailed timeline with key milestones
7. Success metrics and acceptance criteria
8. Rollback and contingency plans`;
  };

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
                <h1 className="text-2xl font-bold">Scope Summary Details</h1>
                <p className="text-sm text-white/50">Project scope analysis and repository information</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium">
                📥 Download PDF
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scope from Ticket */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                  🎫
                </div>
                <div>
                  <h2 className="text-xl font-bold">Scope of Migration from TUNA Ticket</h2>
                  <p className="text-sm text-white/50">Extracted from {project.tunaId}</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Ticket Information */}
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-lg mb-1">{project.name}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded">{project.tunaId}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-white/50">Created: {new Date(project.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      project.status === 'In Progress' ? 'bg-orange-500/20 text-orange-400' :
                      project.status === 'Review' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="border-t border-white/10 pt-3 mt-3">
                    <p className="text-sm text-white/70 leading-relaxed mb-2">
                      <strong className="text-white">Description:</strong> {project.description}
                    </p>
                    <p className="text-sm text-white/70 leading-relaxed">
                      <strong className="text-white">Objective:</strong> {details.objective}
                    </p>
                  </div>
                  
                  {/* Tech Stack Info */}
                  <div className="border-t border-white/10 pt-3 mt-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-white/40 mb-1">Source Technology</p>
                        <p className="text-sm font-semibold text-red-400">{project.sourceTech}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/40 mb-1">Target Technology</p>
                        <p className="text-sm font-semibold text-green-400">{project.targetTech}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/40 mb-1">Team</p>
                        <p className="text-sm font-semibold">{project.team}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/40 mb-1">Priority</p>
                        <p className={`text-sm font-semibold ${
                          project.priority === 'High' ? 'text-red-400' :
                          project.priority === 'Medium' ? 'text-yellow-400' :
                          'text-green-400'
                        }`}>{project.priority}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Components */}
                <div>
                  <h3 className="text-sm font-semibold text-white/80 mb-3">Key Components to Migrate</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {details.components.map((component, idx) => (
                      <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{component.icon}</span>
                          <span className="text-sm font-semibold">{component.title}</span>
                        </div>
                        <p className="text-xs text-white/50">{component.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Success Criteria */}
                <div>
                  <h3 className="text-sm font-semibold text-white/80 mb-3">Success Criteria</h3>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 space-y-2">
                    {details.successCriteria.map((criteria, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <p className="text-sm text-white/70">{criteria}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-sm font-semibold text-white/80 mb-3">Project Timeline</h3>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/70">Duration:</span>
                      <span className="text-sm font-semibold">{details.timeline.duration}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/70">Start Date:</span>
                      <span className="text-sm font-semibold">{new Date(details.timeline.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/70">Target Completion:</span>
                      <span className="text-sm font-semibold">{new Date(details.timeline.target).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Current Progress:</span>
                      <span className="text-sm font-semibold text-cyan-400">{project.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Prompt Section */}
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                  ✨
                </div>
                <div>
                  <h2 className="text-xl font-bold">AI Prompt for Scope Document Creation</h2>
                  <p className="text-sm text-white/50">Ready-to-use prompt for document generation</p>
                </div>
              </div>

              <div className="bg-black/40 border border-purple-500/20 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide">Prompt Template</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(generateAIPrompt());
                      // Show a temporary success message
                      const btn = document.activeElement as HTMLButtonElement;
                      const originalText = btn.innerHTML;
                      btn.innerHTML = '✓ Copied!';
                      setTimeout(() => {
                        btn.innerHTML = originalText;
                      }, 2000);
                    }}
                    className="text-xs px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded hover:bg-purple-500/30 transition-colors"
                  >
                    📋 Copy
                  </button>
                </div>
                <div className="text-sm text-white/80 leading-relaxed space-y-3 font-mono whitespace-pre-line">
                  {generateAIPrompt()}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-purple-300/70">
                <span>💡</span>
                <span>Use this prompt with GHCP Agent, Devin, or Custom Agents for automated document generation</span>
              </div>
            </div>
          </div>

          {/* Right Column - GitHub Info */}
          <div className="space-y-6">
            {/* GitHub Repository Information */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 shadow-2xl sticky top-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-2xl">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold">GitHub Repositories</h2>
                  <p className="text-xs text-white/50">Access verified</p>
                </div>
              </div>

              {/* Source Repository */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-white/70 uppercase tracking-wide">Source Repository</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📁</span>
                      <div>
                        <p className="font-semibold text-sm">{details.repositories.source.name}</p>
                        <p className="text-xs text-white/40 font-mono">{details.repositories.source.path}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Private</span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Branch:</span>
                      <span className="font-mono text-white/70">{details.repositories.source.branch}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Last Commit:</span>
                      <span className="text-white/70">{details.repositories.source.lastCommit}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Access:</span>
                      <span className="text-green-400 font-medium">Read/Write ✓</span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-3">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-white/50">Repository Stats</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white/[0.03] rounded p-2 text-center">
                        <p className="text-xs font-semibold">{details.repositories.source.commits}</p>
                        <p className="text-[10px] text-white/40">Commits</p>
                      </div>
                      <div className="bg-white/[0.03] rounded p-2 text-center">
                        <p className="text-xs font-semibold">{details.repositories.source.branches}</p>
                        <p className="text-[10px] text-white/40">Branches</p>
                      </div>
                      <div className="bg-white/[0.03] rounded p-2 text-center">
                        <p className="text-xs font-semibold">{details.repositories.source.size}</p>
                        <p className="text-[10px] text-white/40">Size</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Target Repository */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-white/70 uppercase tracking-wide">Target Repository</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📁</span>
                      <div>
                        <p className="font-semibold text-sm">{details.repositories.target.name}</p>
                        <p className="text-xs text-white/40 font-mono">{details.repositories.target.path}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Private</span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Branch:</span>
                      <span className="font-mono text-white/70">{details.repositories.target.branch}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Last Commit:</span>
                      <span className="text-white/70">{details.repositories.target.lastCommit}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Access:</span>
                      <span className="text-green-400 font-medium">Read/Write ✓</span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-3">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-white/50">Repository Stats</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white/[0.03] rounded p-2 text-center">
                        <p className="text-xs font-semibold">{details.repositories.target.commits}</p>
                        <p className="text-[10px] text-white/40">Commits</p>
                      </div>
                      <div className="bg-white/[0.03] rounded p-2 text-center">
                        <p className="text-xs font-semibold">{details.repositories.target.branches}</p>
                        <p className="text-[10px] text-white/40">Branches</p>
                      </div>
                      <div className="bg-white/[0.03] rounded p-2 text-center">
                        <p className="text-xs font-semibold">{details.repositories.target.size}</p>
                        <p className="text-[10px] text-white/40">Size</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Access Status Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <span className="text-xl">✅</span>
                <span className="text-sm font-medium text-green-400">All Repository Access Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScopeSummaryViewer;