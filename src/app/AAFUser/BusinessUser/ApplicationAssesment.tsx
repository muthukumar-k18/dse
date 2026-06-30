import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const AssessYourApplication = () => {
  const navigate = useNavigate();
  const [repositories, setRepositories] = useState([{ id: 1, url: '' }]);
  const [appId, setAppId] = useState('');
  const [selectedAssessments, setSelectedAssessments] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [expandedTile, setExpandedTile] = useState(null);
  const [showScorePopup, setShowScorePopup] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);

  const agents = [
    { id: 'devin', name: 'Devin', description: 'Autonomous AI software engineer', icon: '🤖', gradient: 'from-purple-500 to-pink-500', multiplier: 1.7 },
    { id: 'factory', name: 'Factory.AI', description: 'Enterprise-grade code analysis', icon: '🏭', gradient: 'from-blue-500 to-cyan-500', multiplier: 1.45 },
    { id: 'copilot', name: 'GitHub Co-Pilot', description: 'AI pair programmer', icon: '✈️', gradient: 'from-green-500 to-emerald-500', multiplier: 1.3 },
    { id: 'wega', name: 'Custom WEGA Agents', description: 'WEGA-inspired autonomous agents', icon: '🧠', gradient: 'from-orange-500 to-red-500', multiplier: 1.0 },
  ];

  const processingSteps = [
    { label: 'Connecting to repository...', duration: 3000 },
    { label: 'Cloning codebase...', duration: 4000 },
    { label: 'Initializing AI agents...', duration: 3000 },
    { label: 'Scanning file structure...', duration: 2000 },
    { label: 'Analyzing dependencies...', duration: 4000 },
    { label: 'Running security scans...', duration: 5000 },
    { label: 'Evaluating code quality...', duration: 4000 },
    { label: 'Generating insights...', duration: 3000 },
    { label: 'Compiling report...', duration: 2000 },
  ];

  const assessments = [
    { id: 'portfolio', title: 'Portfolio Assessment', description: 'Analyze your application landscape', icon: '🎯', cost: 40, color: 'from-purple-500/20 to-violet-500/20', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
    { id: 'techdebt', title: 'Technical Debt', description: 'Quantify and prioritize debt', icon: '💳', cost: 35, color: 'from-red-500/20 to-orange-500/20', border: 'border-red-500/30', glow: 'shadow-red-500/20' },
    { id: 'cloud', title: 'Cloud Readiness', description: 'Evaluate cloud migration suitability', icon: '☁️', cost: 35, color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
    { id: 'security', title: 'Security Scan', description: 'Comprehensive vulnerability detection', icon: '🛡️', cost: 45, color: 'from-emerald-500/20 to-green-500/20', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
    { id: 'performance', title: 'Performance Analysis', description: 'Identify bottlenecks', icon: '⚡', cost: 35, color: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-500/30', glow: 'shadow-yellow-500/20' },
    { id: 'quality', title: 'Code Quality', description: 'Deep analysis with scoring', icon: '✨', cost: 30, color: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-500/30', glow: 'shadow-pink-500/20' },
    { id: 'architecture', title: 'Architecture Review', description: 'Best practices alignment', icon: '🏗️', cost: 40, color: 'from-indigo-500/20 to-purple-500/20', border: 'border-indigo-500/30', glow: 'shadow-indigo-500/20' },
    { id: 'dependency', title: 'Dependency Analysis', description: 'License compliance check', icon: '🔗', cost: 20, color: 'from-teal-500/20 to-cyan-500/20', border: 'border-teal-500/30', glow: 'shadow-teal-500/20' },
    { id: 'migration', title: 'Migration Scoring', description: 'Complexity estimation', icon: '📊', cost: 20, color: 'from-amber-500/20 to-yellow-500/20', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
  ];

  // Simulated report data (keeping existing reportData structure)
  const reportData = {
    summary: {
      applicationName: "Core Banking Service",
      appId: appId || "APP-12345",
      scanDate: new Date().toLocaleDateString(),
      totalFiles: 1247,
      totalLines: 89432,
      languages: { Java: 78, XML: 12, Properties: 6, YAML: 4 },
      currentVersion: "Java 17",
      targetVersion: "Java 21",
      overallScore: 72,
      migrationReadiness: "Ready with Minor Changes"
    },
    assessments: {
      portfolio: {
        title: "Portfolio Assessment", icon: "🎯", score: 85, status: "Healthy",
        scoreRationale: "High score due to well-structured microservices architecture, clear module boundaries, and minimal legacy components. Deductions for 3 modules requiring modernization.",
        findings: [
          { type: "info", message: "Application follows microservices architecture" },
          { type: "info", message: "Well-structured module dependencies" },
          { type: "warning", message: "3 legacy modules identified for modernization" },
          { type: "success", message: "All APIs documented with OpenAPI specs" }
        ],
        details: { modules: 12, services: 8, apis: 45, databases: 3, messageQueues: 2, cacheInstances: 4 },
        recommendations: [
          "Consider consolidating 3 legacy modules into modern microservices",
          "Implement API versioning strategy for external consumers",
          "Add circuit breakers for inter-service communication"
        ]
      },
      techdebt: {
        title: "Technical Debt", icon: "💳", score: 68, status: "Moderate",
        scoreRationale: "Moderate score reflects accumulated debt from deprecated API usage (23 files), 12% code duplication, and 18 complex methods. Test coverage at 67% needs improvement.",
        totalDebt: "47 developer days",
        findings: [
          { type: "critical", message: "Deprecated API usage in 23 files" },
          { type: "warning", message: "Code duplication detected: 12%" },
          { type: "warning", message: "Complex methods exceeding threshold: 18" },
          { type: "info", message: "Test coverage at 67%" },
          { type: "warning", message: "Inconsistent error handling patterns" }
        ],
        details: { critical: 8, major: 24, minor: 156, codeSmells: 234, duplicatedBlocks: 47, technicalDebtRatio: "8.2%" },
        recommendations: [
          "Prioritize replacing deprecated APIs before Java 21 migration",
          "Refactor 18 complex methods to improve maintainability",
          "Implement consistent error handling strategy",
          "Increase test coverage to minimum 80%"
        ]
      },
      cloud: {
        title: "Cloud Readiness", icon: "☁️", score: 78, status: "Ready",
        scoreRationale: "Good cloud readiness with stateless design and 12-factor compliance. Score reduced due to local file system usage in 2 modules and missing health endpoints in some services.",
        findings: [
          { type: "success", message: "Stateless design confirmed" },
          { type: "success", message: "12-factor app principles followed" },
          { type: "warning", message: "Local file system usage detected in 2 modules" },
          { type: "info", message: "Container-ready with minor modifications" },
          { type: "warning", message: "Missing health endpoints in 3 services" }
        ],
        details: { statelessServices: "8/8", configExternalized: "Yes", loggingCentralized: "Partial", healthEndpoints: "5/8", containerized: "No" },
        recommendations: [
          "Migrate local file storage to S3 or equivalent cloud storage",
          "Add /health and /ready endpoints to all services",
          "Implement centralized logging with correlation IDs",
          "Create Dockerfile and Kubernetes manifests"
        ]
      },
      security: {
        title: "Security Scan", icon: "🛡️", score: 71, status: "Attention Needed",
        scoreRationale: "Security concerns include 2 critical CVEs in dependencies, 5 outdated security patches, and missing input validation in 8 endpoints. No SQL injection vulnerabilities is positive.",
        findings: [
          { type: "critical", message: "2 high-severity vulnerabilities in dependencies" },
          { type: "critical", message: "CVE-2024-1234 in log4j-core 2.14.0" },
          { type: "warning", message: "Outdated security patches in 5 libraries" },
          { type: "warning", message: "Missing input validation in 8 endpoints" },
          { type: "success", message: "No SQL injection vulnerabilities" },
          { type: "success", message: "HTTPS enforced across all endpoints" }
        ],
        details: { critical: 2, high: 5, medium: 12, low: 23, securityHotspots: 8, owaspCompliance: "Partial" },
        recommendations: [
          "URGENT: Update log4j-core to 2.21.0 or later",
          "URGENT: Patch Jackson-databind vulnerability",
          "Add input validation to all API endpoints",
          "Implement rate limiting on public APIs",
          "Enable security headers (CSP, HSTS, X-Frame-Options)"
        ]
      },
      performance: {
        title: "Performance Analysis", icon: "⚡", score: 74, status: "Good",
        scoreRationale: "Overall good performance with 245ms average response time. Score reduced due to N+1 query patterns in 4 repositories and missing database indexes affecting 7 queries.",
        findings: [
          { type: "warning", message: "N+1 query patterns detected in 4 repositories" },
          { type: "warning", message: "Missing database indexes suggested: 7" },
          { type: "info", message: "Average response time: 245ms" },
          { type: "success", message: "Memory usage within optimal range" },
          { type: "info", message: "GC pause times acceptable" }
        ],
        details: { avgResponseTime: "245ms", p95ResponseTime: "890ms", p99ResponseTime: "1.2s", throughput: "1200 req/s", memoryUsage: "68%", cpuUsage: "45%" },
        recommendations: [
          "Fix N+1 queries using batch fetching or JOIN FETCH",
          "Add missing indexes on frequently queried columns",
          "Implement query result caching for read-heavy operations",
          "Consider connection pooling optimization"
        ]
      },
      quality: {
        title: "Code Quality", icon: "✨", score: 76, status: "Good",
        scoreRationale: "Good code quality with consistent formatting and A-rated reliability. Cyclomatic complexity is high in 14 methods, and documentation coverage at 45% needs improvement.",
        findings: [
          { type: "success", message: "Consistent code formatting across codebase" },
          { type: "warning", message: "Cyclomatic complexity high in 14 methods" },
          { type: "info", message: "Documentation coverage: 45%" },
          { type: "info", message: "Unit test coverage: 67%" },
          { type: "success", message: "No critical bugs detected" }
        ],
        details: { maintainabilityRating: "B", reliabilityRating: "A", securityRating: "B", testCoverage: "67%", documentationCoverage: "45%", duplicatedLines: "12%" },
        recommendations: [
          "Refactor 14 methods with high cyclomatic complexity",
          "Increase documentation coverage to 70%+",
          "Add unit tests to reach 80% coverage",
          "Remove duplicated code blocks"
        ]
      },
      architecture: {
        title: "Architecture Review", icon: "🏗️", score: 82, status: "Well Designed",
        scoreRationale: "Strong architecture with clean separation of concerns and proper layering. Minor deductions for 2 circular dependencies and opportunities for event-driven patterns in 3 workflows.",
        findings: [
          { type: "success", message: "Clean separation of concerns" },
          { type: "success", message: "Proper layered architecture (Controller-Service-Repository)" },
          { type: "warning", message: "Circular dependencies in 2 modules" },
          { type: "info", message: "Consider event-driven patterns for 3 workflows" },
          { type: "success", message: "SOLID principles largely followed" }
        ],
        details: { patterns: ["MVC", "Repository Pattern", "Dependency Injection", "Factory Pattern", "Strategy Pattern"], layers: ["Presentation", "Business", "Data Access", "Infrastructure"], coupling: "Low", cohesion: "High" },
        recommendations: [
          "Break circular dependencies between payment and notification modules",
          "Implement event sourcing for audit-critical workflows",
          "Consider CQRS pattern for read-heavy services",
          "Add anti-corruption layer for legacy integrations"
        ]
      },
      dependency: {
        title: "Dependency Analysis", icon: "🔗", score: 65, status: "Updates Required",
        scoreRationale: "Score reflects 42 outdated dependencies (48% of total), 3 with known CVEs, and 5 deprecated libraries. All licenses are enterprise-compatible which is positive.",
        findings: [
          { type: "critical", message: "14 dependencies need major version updates" },
          { type: "warning", message: "28 dependencies have minor updates available" },
          { type: "critical", message: "3 dependencies have known CVEs" },
          { type: "info", message: "All licenses are enterprise-compatible" },
          { type: "warning", message: "5 dependencies are deprecated" }
        ],
        details: { total: 87, outdated: 42, vulnerable: 3, deprecated: 5, directDependencies: 34, transitiveDependencies: 53 },
        recommendations: [
          "Update Spring Boot from 2.7.x to 3.2.x",
          "Migrate from javax.* to jakarta.* namespace",
          "Replace deprecated commons-lang with commons-lang3",
          "Update vulnerable dependencies immediately",
          "Consider using dependency management tools like Dependabot"
        ]
      },
      migration: {
        title: "Migration Scoring", icon: "📊", score: 79, status: "Favorable",
        scoreRationale: "Good migration readiness with no removed Java 21 APIs in use. Score reflects opportunities to leverage new Java 21 features like virtual threads (8 candidates) and pattern matching (23 locations).",
        effort: "4-6 weeks",
        findings: [
          { type: "success", message: "No usage of removed APIs in Java 21" },
          { type: "info", message: "17 files use preview features now standard in Java 21" },
          { type: "info", message: "Virtual threads can improve 8 async operations" },
          { type: "success", message: "Pattern matching upgrades available in 23 locations" },
          { type: "info", message: "Sequenced collections can simplify 15 operations" }
        ],
        details: { recordClasses: 12, sealedClasses: 4, patternMatching: 23, virtualThreads: 8, sequencedCollections: 15, stringTemplates: 6 },
        recommendations: [
          "Adopt virtual threads for I/O-bound operations",
          "Convert DTOs to record classes where applicable",
          "Use pattern matching in switch statements",
          "Leverage sequenced collections for ordered data",
          "Update build tools to support Java 21"
        ]
      }
    }
  };

  const addRepository = () => {
    setRepositories([...repositories, { id: Date.now(), url: '' }]);
  };

  const removeRepository = (id) => {
    if (repositories.length > 1) {
      setRepositories(repositories.filter(r => r.id !== id));
    }
  };

  const updateRepository = (id, url) => {
    setRepositories(repositories.map(r => r.id === id ? { ...r, url } : r));
  };

  const toggleAssessment = (id) => {
    setSelectedAssessments(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedAssessments(
      selectedAssessments.length === assessments.length ? [] : assessments.map(a => a.id)
    );
  };

  const validRepos = repositories.filter(r => r.url.trim() !== '').length;
  const assessmentCost = selectedAssessments.reduce((sum, id) => {
    const assessment = assessments.find(a => a.id === id);
    return sum + (assessment?.cost || 0);
  }, 0);
  
  // Get agent multiplier
  const agentMultiplier = selectedAgent 
    ? agents.find(a => a.id === selectedAgent)?.multiplier || 1.0
    : 1.0;
  
  const totalCost = Math.round(assessmentCost * (validRepos || 1) * agentMultiplier);
  const canSubmit = validRepos > 0 && appId && selectedAssessments.length > 0 && selectedAgent;

  const startProcessing = () => {
    setShowConfirmModal(false);
    setIsProcessing(true);
    setProcessingStep(0);
    setProcessingProgress(0);

    let currentStep = 0;
    const totalSteps = processingSteps.length;

    const runStep = () => {
      if (currentStep < totalSteps) {
        setProcessingStep(currentStep);
        setProcessingProgress(Math.round((currentStep / totalSteps) * 100));
        
        setTimeout(() => {
          currentStep++;
          runStep();
        }, processingSteps[currentStep].duration);
      } else {
        setProcessingProgress(100);
        setTimeout(() => {
          setIsProcessing(false);
          setShowReport(true);
        }, 500);
      }
    };

    runStep();
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getFindingColor = (type) => {
    switch(type) {
      case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'success': return 'text-green-400 bg-green-500/10 border-green-500/20';
      default: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    }
  };

  const getFindingIcon = (type) => {
    switch(type) {
      case 'critical': return '🔴';
      case 'warning': return '🟡';
      case 'success': return '🟢';
      default: return '🔵';
    }
  };

  const downloadReport = () => {
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `assessment-report-${appId || 'APP'}-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Score Popup Component
  const ScorePopup = ({ assessment, onClose }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-cyan-500/30 rounded-3xl w-full max-w-md p-8 shadow-2xl shadow-cyan-500/20" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl ${getScoreBg(assessment.score)} flex items-center justify-center shadow-lg`}>
              <span className="text-3xl font-bold text-black">{assessment.score}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{assessment.title}</h3>
              <p className={`text-sm ${getScoreColor(assessment.score)}`}>{assessment.status}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white text-2xl transition-colors">×</button>
        </div>
        
        <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-white/10 mb-6">
          <p className="text-sm text-white/80 leading-relaxed">{assessment.scoreRationale}</p>
        </div>

        <div className="text-xs text-white/40">
          <p className="mb-3 font-medium">Score Ranges:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span>80-100: Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span>60-79: Good</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span>0-59: Needs Work</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Expanded Tile Detail View
  const TileDetailView = ({ assessmentId, onBack }) => {
    const data = reportData.assessments[assessmentId];
    if (!data) return null;

    return (
      <div className="fixed inset-0 bg-black z-[60] overflow-y-auto">
        <header className="sticky top-0 z-[70] flex items-center justify-between px-8 py-5 border-b border-white/10 bg-black/95 backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack} 
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 hover:border-cyan-500/50 hover:bg-cyan-500/30 transition-all font-medium text-white"
            >
              <span className="text-lg">←</span>
              <span>Back to Report</span>
            </button>
          </div>
          <button
            onClick={downloadReport}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all font-medium shadow-lg"
          >
            📥 Download Report
          </button>
        </header>

        <main className="max-w-5xl mx-auto px-8 py-12">
          {/* Header */}
          <div className="flex items-start justify-between mb-12">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-5xl backdrop-blur-sm">
                {data.icon}
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
                <p className={`text-xl ${getScoreColor(data.score)}`}>{data.status}</p>
              </div>
            </div>
            <div 
              className={`w-24 h-24 rounded-3xl ${getScoreBg(data.score)} flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-2xl`}
              onClick={() => setShowScorePopup(data)}
            >
              <span className="text-4xl font-bold text-black">{data.score}</span>
            </div>
          </div>

          {/* Score Rationale */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/10 backdrop-blur-sm mb-8">
            <h3 className="text-sm font-medium text-cyan-400 mb-3 uppercase tracking-wider">Score Rationale</h3>
            <p className="text-white/90 leading-relaxed text-lg">{data.scoreRationale}</p>
          </div>

          {/* All Findings */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6">Key Findings</h3>
            <div className="space-y-4">
              {data.findings.map((finding, i) => (
                <div key={i} className={`flex items-start gap-4 p-6 rounded-2xl border ${getFindingColor(finding.type)} backdrop-blur-sm`}>
                  <span className="text-2xl">{getFindingIcon(finding.type)}</span>
                  <span className="flex-1 text-lg">{finding.message}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Details/Metrics */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6">Detailed Metrics</h3>
            <div className="grid grid-cols-3 gap-6">
              {Object.entries(data.details).map(([key, value]) => (
                <div key={key} className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
                  <p className="text-sm text-white/50 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="text-2xl font-bold text-cyan-400">
                    {Array.isArray(value) ? value.length : typeof value === 'object' ? JSON.stringify(value) : value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Recommendations</h3>
            <div className="space-y-4">
              {data.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-white/90 text-lg">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  };

  // Report View
  if (showReport) {
    if (expandedTile) {
      return <TileDetailView assessmentId={expandedTile} onBack={() => setExpandedTile(null)} />;
    }

    return (
      <div className="min-h-screen bg-black text-white">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Report Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 border-b border-white/10 bg-black/80 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowReport(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <span>←</span>
              <span>Back to Assessment</span>
            </button>
            <div className="w-px h-6 bg-white/10" />
            <span className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Assessment Report</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={downloadReport}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 hover:border-cyan-500/50 transition-all"
            >
              📥 Download JSON
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:border-purple-500/50 transition-all">
              📄 Export PDF
            </button>
          </div>
        </header>

        <main className="relative z-10 max-w-7xl mx-auto px-8 py-12">
          {/* Summary Header */}
          <div className="mb-12 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-sm text-white/50 mb-2 uppercase tracking-wider">Application</p>
                <h1 className="text-4xl font-bold mb-2">{reportData.summary.applicationName}</h1>
                <p className="text-lg text-cyan-400">{reportData.summary.appId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/50 mb-2 uppercase tracking-wider">Analyzed by</p>
                <div className="flex items-center gap-3 justify-end">
                  <span className="text-3xl">{agents.find(a => a.id === selectedAgent)?.icon}</span>
                  <span className="text-xl font-semibold">{agents.find(a => a.id === selectedAgent)?.name}</span>
                </div>
                <p className="text-sm text-white/40 mt-2">{reportData.summary.scanDate}</p>
              </div>
            </div>

            {/* Overall Score */}
            <div className="flex items-center gap-12 mb-8">
              <div 
                className="flex items-center gap-6 cursor-pointer group"
                onClick={() => setShowScorePopup({
                  title: "Overall Score",
                  score: reportData.summary.overallScore,
                  status: reportData.summary.migrationReadiness,
                  scoreRationale: "The overall score is a weighted average of all individual assessment scores, with higher weights given to Security (25%), Code Quality (20%), and Architecture (15%). This score indicates your application is generally healthy with some areas requiring attention before migration."
                })}
              >
                <div className={`w-28 h-28 rounded-3xl ${getScoreBg(reportData.summary.overallScore)} flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xl`}>
                  <span className="text-5xl font-bold text-black">{reportData.summary.overallScore}</span>
                </div>
                <div>
                  <p className="text-sm text-white/50 mb-1">Overall Score <span className="text-cyan-400 text-xs ml-2">(click for details)</span></p>
                  <p className={`text-2xl font-bold ${getScoreColor(reportData.summary.overallScore)}`}>
                    {reportData.summary.migrationReadiness}
                  </p>
                </div>
              </div>

              <div className="w-px h-20 bg-white/10" />

              <div className="flex-1 grid grid-cols-4 gap-6">
                <div className="p-4 rounded-2xl bg-white/5">
                  <p className="text-3xl font-bold text-cyan-400">{reportData.summary.totalFiles.toLocaleString()}</p>
                  <p className="text-sm text-white/50 mt-1">Files Scanned</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5">
                  <p className="text-3xl font-bold text-purple-400">{reportData.summary.totalLines.toLocaleString()}</p>
                  <p className="text-sm text-white/50 mt-1">Lines of Code</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5">
                  <p className="text-3xl font-bold text-orange-400">{reportData.summary.currentVersion}</p>
                  <p className="text-sm text-white/50 mt-1">Current Version</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5">
                  <p className="text-3xl font-bold text-green-400">{reportData.summary.targetVersion}</p>
                  <p className="text-sm text-white/50 mt-1">Target Version</p>
                </div>
              </div>
            </div>

            {/* Language Breakdown */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-sm text-white/50 mb-4 uppercase tracking-wider">Language Distribution</p>
              <div className="flex gap-2 h-4 rounded-full overflow-hidden mb-4">
                {Object.entries(reportData.summary.languages).map(([lang, pct], i) => (
                  <div 
                    key={lang}
                    className="h-full transition-all hover:opacity-80"
                    style={{ width: `${pct}%`, backgroundColor: ['#06B6D4', '#8B5CF6', '#10B981', '#F59E0B'][i] }}
                    title={`${lang}: ${pct}%`}
                  />
                ))}</div>
              <div className="flex gap-8">
                {Object.entries(reportData.summary.languages).map(([lang, pct], i) => (
                  <div key={lang} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: ['#06B6D4', '#8B5CF6', '#10B981', '#F59E0B'][i] }} />
                    <span className="text-white/80 font-medium">{lang}</span>
                    <span className="text-white/50">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Assessment Results Grid */}
          <div>
            <h2 className="text-3xl font-bold mb-3">Assessment Results</h2>
            <p className="text-white/50 mb-8">Click on any tile to view detailed analysis and recommendations</p>
            <div className="grid grid-cols-3 gap-6">
              {selectedAssessments.map(id => {
                const data = reportData.assessments[id];
                if (!data) return null;
                return (
                  <div 
                    key={id} 
                    onClick={() => setExpandedTile(id)}
                    className="group relative p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-white/[0.01] backdrop-blur-sm cursor-pointer hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all hover:scale-[1.02]"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all" />
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <span className="text-4xl">{data.icon}</span>
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-cyan-400 transition-colors">{data.title}</h3>
                            <p className={`text-sm ${getScoreColor(data.score)}`}>{data.status}</p>
                          </div>
                        </div>
                        <div 
                          className={`w-14 h-14 rounded-2xl ${getScoreBg(data.score)} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg`}
                          onClick={(e) => { e.stopPropagation(); setShowScorePopup(data); }}
                        >
                          <span className="text-xl font-bold text-black">{data.score}</span>
                        </div>
                      </div>
                      
                      {/* Score Bar */}
                      <div className="w-full h-3 rounded-full bg-white/10 mb-6 overflow-hidden">
                        <div className={`h-full rounded-full ${getScoreBg(data.score)}`} style={{ width: `${data.score}%` }} />
                      </div>

                      {/* Top Findings */}
                      <div className="space-y-3">
                        {data.findings.slice(0, 2).map((finding, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-white/70">
                            <span className="text-lg">{getFindingIcon(finding.type)}</span>
                            <span className="line-clamp-2 leading-relaxed">{finding.message}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-white/50 text-sm">View full report</span>
                        <span className="text-cyan-400 group-hover:translate-x-2 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        {/* Score Popup */}
        {showScorePopup && (
          <ScorePopup assessment={showScorePopup} onClose={() => setShowScorePopup(null)} />
        )}
      </div>
    );
  }

  // Main Assessment Form - REIMAGINED
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0px, transparent 1px, transparent 2px, rgba(255, 255, 255, 0.03) 3px)`
        }} />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/10 backdrop-blur-xl bg-black/50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/business-user')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back</span>
          </button>
          <div className="w-px h-6 bg-white/10" />
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-xl">⚡</span>
            </div>
            <div>
              <span className="text-xl font-semibold">DSE 2.0</span>
              <span className="text-white/30 mx-2">|</span>
              <span className="text-white/50">Application Assessment</span>
            </div>
          </button>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium text-green-400">Self-Service Platform</span>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/20 mb-8 backdrop-blur-sm">
            <div className="relative">
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping absolute inline-flex" />
              <span className="w-3 h-3 rounded-full bg-cyan-400 relative inline-flex" />
            </div>
            <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Powered by Advanced AI Agents</span>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
            AI-Powered Code Assessment
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Connect your repositories, select assessment types, and let our AI agents analyze your codebase in minutes
          </p>
        </div>

        {/* Step 1: Repositories */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-cyan-500/30">
              1
            </div>
            <div>
              <h2 className="text-2xl font-bold">Connect Repositories</h2>
              <p className="text-white/50">Add one or more Git repositories for analysis</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {repositories.map((repo, index) => (
              <div key={repo.id} className="group flex items-center gap-4">
                <input
                  type="text"
                  value={repo.url}
                  onChange={(e) => updateRepository(repo.id, e.target.value)}
                  placeholder={`https://github.com/your-org/repository${index > 0 ? `-${index + 1}` : ''}.git`}
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all backdrop-blur-sm placeholder:text-white/30"
                />
                {repositories.length > 1 && (
                  <button
                    onClick={() => removeRepository(repo.id)}
                    className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/40 transition-all"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addRepository}
              className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors px-2 py-1"
            >
              <span className="text-xl">+</span>
              <span>Add another repository</span>
            </button>
          </div>

          <div className="mt-8">
            <label className="block text-sm text-white/60 mb-3 font-medium">Application ID</label>
            <input
              type="text"
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              placeholder="APP-12345 or TUNA-4521"
              className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all backdrop-blur-sm placeholder:text-white/30"
            />
          </div>
        </section>

        {/* Step 2: Assessments */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-purple-500/30">
                2
              </div>
              <div>
                <h2 className="text-2xl font-bold">Select Assessment Types</h2>
                <p className="text-white/50">Choose which analyses to run on your codebase</p>
              </div>
            </div>
            <button 
              onClick={selectAll} 
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all text-sm font-medium"
            >
              {selectedAssessments.length === assessments.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {assessments.map((assessment) => {
              const isSelected = selectedAssessments.includes(assessment.id);
              return (
                <div
                  key={assessment.id}
                  onClick={() => toggleAssessment(assessment.id)}
                  className={`group relative p-6 rounded-3xl border cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                    isSelected 
                      ? `bg-gradient-to-br ${assessment.color} ${assessment.border} shadow-xl ${assessment.glow} scale-[1.02]` 
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Selection indicator */}
                  <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? 'border-cyan-400 bg-cyan-400 scale-100' : 'border-white/20 scale-90'
                  }`}>
                    {isSelected && <span className="text-black text-sm">✓</span>}
                  </div>

                  <div className="text-5xl mb-5">{assessment.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{assessment.title}</h3>
                  <p className="text-sm text-white/50 mb-4 leading-relaxed">{assessment.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-400">${assessment.cost}</span>
                    <span className="text-xs text-white/40">per repo</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Step 3: Select Agent */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-orange-500/30">
              3
            </div>
            <div>
              <h2 className="text-2xl font-bold">Choose Agentic Framework</h2>
              <p className="text-white/50">Select which AI framework will analyze your code</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {agents.map((agent) => {
              const isSelected = selectedAgent === agent.id;
              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id)}
                  className={`group relative p-4 rounded-xl border cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                    isSelected 
                      ? `bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-500/40 shadow-lg shadow-cyan-500/20` 
                      : 'bg-black/20 border-white/5 hover:border-white/20 hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Selection indicator */}
                  <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-white/10'
                  }`}>
                    {isSelected && <span className="text-black text-xs font-bold">✓</span>}
                  </div>

                  <div>
                    <h3 className={`text-base font-bold mb-1 ${isSelected ? 'text-white' : 'text-white/40'}`}>{agent.name}</h3>
                    <p className={`text-xs ${isSelected ? 'text-white/70' : 'text-white/30'}`}>{agent.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Step 4: Submit */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-green-500/30">
              4
            </div>
            <div>
              <h2 className="text-2xl font-bold">Start Assessment</h2>
              <p className="text-white/50">Review your selections and begin analysis</p>
            </div>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold mb-2">
                  {!canSubmit ? '⚠️ Complete all fields to continue' : '✓ Ready to analyze your codebase'}
                </p>
                <p className="text-white/50">
                  {selectedAssessments.length} assessment{selectedAssessments.length !== 1 ? 's' : ''} × {validRepos || 1} repo{validRepos !== 1 ? 's' : ''}
                  {selectedAgent && (
                    <span className="ml-3">
                      • <span className="text-cyan-400">{agents.find(a => a.id === selectedAgent)?.name}</span>
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">${totalCost}</p>
                  <p className="text-sm text-white/40 mt-1">
                    {selectedAssessments.length === 9 ? 'Complete assessment' : `${selectedAssessments.length} selected`}
                  </p>
                </div>
                <button
                  onClick={() => setShowConfirmModal(true)}
                  disabled={!canSubmit}
                  className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                    canSubmit 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white shadow-xl hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105' 
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  Start Assessment →
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Confirmation Modal - REDESIGNED */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-cyan-500/30 rounded-3xl w-full max-w-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden">
            <div className="p-8 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
              <h2 className="text-2xl font-bold mb-2">Confirm Assessment</h2>
              <p className="text-white/60">Review your configuration before starting</p>
            </div>

            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/50 mb-3 uppercase tracking-wider">Repositories ({validRepos})</p>
                <div className="space-y-2">
                  {repositories.filter(r => r.url).map((r, i) => (
                    <p key={i} className="text-sm text-white/80 truncate font-mono bg-white/5 px-3 py-2 rounded-lg">{r.url}</p>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">Application ID</p>
                <p className="text-lg font-semibold">{appId}</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30">
                <p className="text-xs text-cyan-400 mb-3 uppercase tracking-wider">AI Agent</p>
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{agents.find(a => a.id === selectedAgent)?.icon}</span>
                  <div>
                    <span className="text-xl font-bold">{agents.find(a => a.id === selectedAgent)?.name}</span>
                    <p className="text-sm text-white/60">{agents.find(a => a.id === selectedAgent)?.description}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-white/50 mb-4 uppercase tracking-wider">Selected Assessments ({selectedAssessments.length})</p>
                <div className="grid grid-cols-2 gap-3">
                  {selectedAssessments.map(id => {
                    const a = assessments.find(x => x.id === id);
                    return (
                      <div key={id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="flex items-center gap-3 text-sm">
                          <span className="text-2xl">{a.icon}</span>
                          <span>{a.title}</span>
                        </span>
                        <span className="text-green-400 font-semibold">${a.cost}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Subtotal ({selectedAssessments.length} assessments)</span>
                  <span className="font-semibold">${assessmentCost}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Repositories</span>
                  <span className="font-semibold">× {validRepos}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Agent Multiplier ({agents.find(a => a.id === selectedAgent)?.name})</span>
                  <span className="font-semibold text-cyan-400">× {agentMultiplier.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/20 pt-3 flex items-center justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">${totalCost}</span>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-white/10 flex gap-4 bg-black/50">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={startProcessing}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 font-semibold transition-all shadow-lg hover:shadow-cyan-500/30"
              >
                Start Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Processing Screen - ENHANCED */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative z-10 max-w-2xl w-full mx-8">
            {/* Agent Display */}
            <div className="text-center mb-12">
              <div className="inline-flex w-32 h-32 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/30 flex items-center justify-center mx-auto mb-6 animate-pulse shadow-2xl shadow-cyan-500/30">
                <span className="text-7xl">{agents.find(a => a.id === selectedAgent)?.icon}</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">{agents.find(a => a.id === selectedAgent)?.name}</h2>
              <p className="text-white/60">is analyzing your codebase</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/60 font-medium">Progress</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{processingProgress}%</span>
              </div>
              <div className="relative w-full h-4 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${processingProgress}%` }}
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
            </div>

            {/* Current Step */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 mb-8 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-4">
                <div className="w-6 h-6 rounded-full border-3 border-cyan-400 border-t-transparent animate-spin" />
                <span className="text-lg font-medium">{processingSteps[processingStep]?.label}</span>
              </div>
            </div>

            {/* Steps List */}
            <div className="space-y-2">
              {processingSteps.map((step, idx) => (
                <div 
                  key={idx}
                  className={`flex items-center gap-4 px-5 py-3 rounded-xl transition-all ${
                    idx < processingStep ? 'text-green-400 bg-green-500/10' :
                    idx === processingStep ? 'text-white bg-white/10 scale-105' :
                    'text-white/30 bg-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    idx < processingStep ? 'bg-green-500' :
                    idx === processingStep ? 'bg-cyan-500 animate-pulse' :
                    'bg-white/10'
                  }`}>
                    {idx < processingStep ? '✓' : idx + 1}
                  </div>
                  <span className="font-medium">{step.label.replace('...', '')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessYourApplication;
