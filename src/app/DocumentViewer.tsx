import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar, LineChart, Line } from 'recharts';

const DocumentViewer = () => {
  const navigate = useNavigate();
  const { projectId, stageId, documentType } = useParams();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Smith',
      initials: 'JS',
      role: 'Business Owner',
      date: '2 days ago',
      text: 'The scope looks comprehensive. I suggest we prioritize the security enhancements in Phase 1.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 2,
      author: 'Sarah Chen',
      initials: 'SC',
      role: 'Tech Lead',
      date: '1 day ago',
      text: 'Agreed on security priority. Also, we should allocate more time for the database migration given the complexity.',
      color: 'from-purple-500 to-pink-500'
    }
  ]);

  // States for recommended changes management
  const [recommendedChanges, setRecommendedChanges] = useState([
    {
      id: 1,
      title: 'Deprecated API Remediation',
      category: 'Code Quality',
      impact: 'High',
      reason: 'Java 8 code uses 43 deprecated APIs that are removed in Java 17. These require refactoring to use modern alternatives to ensure compatibility and future-proofing.',
      effort: '3 weeks',
      savings: 'Reduced technical debt, improved maintainability',
      color: 'from-green-500 to-emerald-500',
      status: 'pending', // pending, accepted, rejected
      inScope: true // true for in-scope, false for out-of-scope
    },
    {
      id: 2,
      title: 'Dependency Security Updates',
      category: 'Security',
      impact: 'Critical',
      reason: '27 dependencies have known security vulnerabilities (including Log4j). Updating to secure versions is critical to prevent security breaches.',
      effort: '2 weeks',
      savings: 'Risk mitigation, compliance adherence',
      color: 'from-red-500 to-orange-500',
      status: 'pending',
      inScope: true
    },
    {
      id: 3,
      title: 'Performance Optimization',
      category: 'Performance',
      impact: 'Medium',
      reason: 'Java 17 offers performance improvements through new GC algorithms. Tuning JVM parameters can improve throughput by 15-20%.',
      effort: '2 weeks',
      savings: 'Improved response times, reduced infrastructure costs',
      color: 'from-purple-500 to-pink-500',
      status: 'pending',
      inScope: true
    },
    {
      id: 4,
      title: 'Code Quality Improvements',
      category: 'Quality',
      impact: 'Medium',
      reason: 'Static analysis reveals 156 code quality issues. Addressing these will improve code maintainability and reduce future bugs.',
      effort: '3 weeks',
      savings: 'Reduced maintenance overhead',
      color: 'from-blue-500 to-cyan-500',
      status: 'pending',
      inScope: true
    }
  ]);

  const [outOfScopeEnhancements, setOutOfScopeEnhancements] = useState([
    {
      id: 6,
      title: 'Event-Driven Architecture with Apache Kafka',
      category: 'Horizon 1',
      impact: 'High',
      reason: 'Implement event streaming for real-time transaction processing and account updates. Enables asynchronous communication between banking modules and improves system resilience.',
      effort: '8 weeks',
      savings: 'Improved transaction throughput, better fault tolerance',
      performanceImprovement: 'Real-time event processing, reduced latency',
      ballparkEffort: '8-10 weeks with 3 developers',
      color: 'from-indigo-500 to-purple-500',
      status: 'pending'
    },
    {
      id: 7,
      title: 'API Gateway & OAuth 2.0 Security',
      category: 'Horizon 1',
      impact: 'Critical',
      reason: 'Centralized API gateway for all banking services with modern OAuth 2.0 authentication, rate limiting, and request throttling for enhanced security and control.',
      effort: '6 weeks',
      savings: 'Enhanced security posture, regulatory compliance',
      performanceImprovement: 'Centralized security, API management',
      ballparkEffort: '6-8 weeks with security team',
      color: 'from-red-500 to-orange-500',
      status: 'pending'
    },
    {
      id: 8,
      title: 'Spring Boot Microservices Decomposition',
      category: 'Horizon 2',
      impact: 'High',
      reason: 'Break monolithic banking application into domain-driven microservices (Accounts, Transactions, Customers, Payments) for independent scaling and deployment.',
      effort: '16 weeks',
      savings: 'Independent scaling, faster deployments',
      performanceImprovement: 'Service isolation, better resource utilization',
      ballparkEffort: '14-18 weeks with architecture team',
      color: 'from-blue-500 to-cyan-500',
      status: 'pending'
    },
    {
      id: 9,
      title: 'Cloud-Native Migration (Azure/AWS)',
      category: 'Horizon 2',
      impact: 'Critical',
      reason: 'Migrate from on-premise to cloud platform (Azure Kubernetes Service or AWS EKS) with containerization, auto-scaling, and managed services for databases and caching.',
      effort: '20 weeks',
      savings: 'Reduced infrastructure costs, improved availability',
      performanceImprovement: 'Auto-scaling, global distribution, 99.99% SLA',
      ballparkEffort: '18-24 weeks with cloud team',
      color: 'from-purple-500 to-pink-500',
      status: 'pending'
    }
  ]);

  const [editingChange, setEditingChange] = useState(null);
  const [editReason, setEditReason] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  // Stakeholders from the previous stage
  const stakeholders = [
    { name: 'John Smith', email: 'john.smith@company.com', division: 'Business Operations', role: 'Business Owner', location: 'New York, USA', initials: 'JS', color: 'from-cyan-500 to-blue-500' },
    { name: 'Sarah Chen', email: 'sarah.chen@company.com', division: 'Technology', role: 'Tech Lead', location: 'San Francisco, USA', initials: 'SC', color: 'from-purple-500 to-pink-500' },
    { name: 'Michael Brown', email: 'michael.brown@company.com', division: 'Finance', role: 'Finance Manager', location: 'London, UK', initials: 'MB', color: 'from-green-500 to-emerald-500' },
  ];

  const owner = { name: 'Persona Name', initials: 'PN', role: 'Migration Expert', color: 'from-orange-500 to-red-500' };

  // Dashboard Data - Java Migration Specific
  const migrationScopeData = [
    { name: 'Java Modules', value: 6, color: '#06b6d4' },
    { name: 'Java Files', value: 850, color: '#8b5cf6' },
    { name: 'Dependencies', value: 127, color: '#10b981' },
    { name: 'APIs', value: 45, color: '#f59e0b' }
  ];

  const codeMetricsData = [
    { name: 'Java 8 Code', lines: 80000, color: '#ef4444' },
    { name: 'Migrated to Java 17', lines: 62000, color: '#10b981' },
    { name: 'Test Coverage', lines: 24000, color: '#06b6d4' }
  ];

  // In Scope Migration - Only JDK
  const inScopeTechStack = [
    { category: 'JDK Version', current: 'Java 8 (1.8.0_202)', target: 'Java 17 LTS', progress: 0 }
  ];

  // Future Technology Migration - Framework, Build, Persistence, Testing
  const futureTechStack = [
    { category: 'Framework', current: 'Spring 4.x', target: 'Spring Boot 3.x', progress: 0 },
    { category: 'Build Tool', current: 'Maven 3.6', target: 'Maven 3.9+', progress: 0 },
    { category: 'Persistence', current: 'Hibernate 5.x', target: 'Hibernate 6.x (Jakarta)', progress: 0 },
    { category: 'Testing', current: 'JUnit 4', target: 'JUnit 5 Jupiter', progress: 0 }
  ];

  const performanceGaugeData = [
    { name: 'API Response', value: 76, fill: '#10b981' },
    { name: 'Page Load', value: 64, fill: '#06b6d4' },
    { name: 'Query Time', value: 84, fill: '#8b5cf6' }
  ];

  const scopeDetails = [
    {
      title: 'Connected Application Network',
      items: [
        { name: 'Account Management', complexity: 'High', lines: 18000 },
        { name: 'Transaction Processing', complexity: 'Critical', lines: 22000 },
        { name: 'Customer Service', complexity: 'Medium', lines: 14000 },
        { name: 'Payment Gateway', complexity: 'High', lines: 12000 },
        { name: 'Reporting Module', complexity: 'Medium', lines: 9000 },
        { name: 'Notification Engine', complexity: 'Low', lines: 5000 }
      ]
    },
    {
      title: 'Java Migration Phases',
      items: [
        { phase: 'Phase 1', name: 'Java 17 Setup & Build Configuration', duration: '4 weeks', modules: 'JDK 17 installation, Maven/Gradle updates, compiler flags' },
        { phase: 'Phase 2', name: 'Code Modernization', duration: '10 weeks', modules: 'Deprecated API replacement, new language features adoption' },
        { phase: 'Phase 3', name: 'Dependency Updates & Security', duration: '4 weeks', modules: 'Library upgrades, vulnerability fixes, compatibility testing' },
        { phase: 'Phase 4', name: 'Testing & Production Rollout', duration: '4 weeks', modules: 'Integration testing, performance validation, deployment' }
      ]
    }
  ];

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: owner.name,
        initials: owner.initials,
        role: owner.role,
        date: 'Just now',
        text: comment,
        color: owner.color
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  const handleDownloadDocument = () => {
    alert('Downloading formatted PDF document...\n\nThis will include:\n• Dashboard visualizations\n• Scope details\n• Recommended changes\n• Technical specifications\n• Success metrics');
  };

  const handleEditReason = (id) => {
    const change = recommendedChanges.find(c => c.id === id);
    if (change) {
      setEditingChange(change);
      setEditReason(change.reason);
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = () => {
    if (editingChange && editReason.trim()) {
      const updatedChanges = recommendedChanges.map(change => 
        change.id === editingChange.id ? { ...change, reason: editReason } : change
      );
      setRecommendedChanges(updatedChanges);
      setEditingChange(null);
      setEditReason('');
      setShowEditModal(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingChange(null);
    setEditReason('');
    setShowEditModal(false);
  };

  const handleDeleteChange = (id) => {
    if (window.confirm('Are you sure you want to remove this recommended change?')) {
      setRecommendedChanges(recommendedChanges.filter(change => change.id !== id));
    }
  };

  const handleAcceptChange = (id) => {
    const updatedChanges = recommendedChanges.map(change => 
      change.id === id ? { ...change, status: 'accepted' } : change
    );
    setRecommendedChanges(updatedChanges);
  };

  const handleDeleteOutOfScope = (id) => {
    if (window.confirm('Are you sure you want to remove this enhancement?')) {
      setOutOfScopeEnhancements(outOfScopeEnhancements.filter(item => item.id !== id));
    }
  };

  const handleAcceptOutOfScope = (id) => {
    const updatedItems = outOfScopeEnhancements.map(item => 
      item.id === id ? { ...item, status: 'accepted' } : item
    );
    setOutOfScopeEnhancements(updatedItems);
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

      {/* Header with Owner & Collaborators */}
      <div className="mb-8 pb-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Project Scope Document
            </h1>
            <p className="text-white/50 text-sm">Generated on March 1, 2026 • TUNA-2024-001</p>
          </div>
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
            className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all flex items-center gap-2 border border-white/10"
          >
            <span>←</span>
            <span>Back to Stage</span>
          </button>
        </div>

        {/* Owner & Collaborators */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/50 font-medium">Document Owner:</span>
            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${owner.color} flex items-center justify-center font-bold`}>
                {owner.initials}
              </div>
              <div>
                <p className="font-semibold text-sm">{owner.name}</p>
                <p className="text-xs text-white/50">{owner.role}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-white/50 font-medium">Collaborators:</span>
            <div className="flex items-center -space-x-3">
              {stakeholders.map((stakeholder, idx) => (
                <div
                  key={idx}
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${stakeholder.color} flex items-center justify-center font-bold border-2 border-black hover:scale-110 transition-transform cursor-pointer`}
                  title={`${stakeholder.name} - ${stakeholder.role}`}
                >
                  {stakeholder.initials}
                </div>
              ))}
            </div>
            <button className="ml-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/20 transition-all">
              +
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-5xl">📦</span>
              <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full">Scope</span>
            </div>
            <p className="text-3xl font-bold mb-1">6</p>
            <p className="text-sm text-white/50">Java Modules</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-5xl">☕</span>
              <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">Files</span>
            </div>
            <p className="text-3xl font-bold mb-1">850</p>
            <p className="text-sm text-white/50">Java Files</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-5xl">📦</span>
              <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Dependencies</span>
            </div>
            <p className="text-3xl font-bold mb-1">127</p>
            <p className="text-sm text-white/50">Maven Dependencies</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-5xl">📅</span>
              <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-400 rounded-full">Timeline</span>
            </div>
            <p className="text-3xl font-bold mb-1">22</p>
            <p className="text-sm text-white/50">Weeks Total</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Migration Scope Breakdown */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-2xl">📊</span>
                <span>Migration Scope Breakdown</span>
              </h3>
              <button
                onClick={() => navigate(`/code360/${projectId}`)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center gap-2"
              >
                <span className="text-lg">🔍</span>
                <span>Code 360</span>
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={migrationScopeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {migrationScopeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Code Volume Analysis */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-2xl">💻</span>
                <span>Code Volume (Lines)</span>
              </h3>
              <button
                onClick={() => navigate(`/code360/${projectId}`)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center gap-2"
              >
                <span className="text-lg">🔍</span>
                <span>Code 360</span>
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={codeMetricsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="lines" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* In-Scope Modules - Visual Grid */}
        <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-3xl">🔗</span>
                <span>Connected Application Network</span>
              </h2>
              <p className="text-white/60 text-sm mt-2">6 interconnected modules totaling 80,000 lines of Java code</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-cyan-400">80K</p>
              <p className="text-xs text-white/50">Total LOC</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {scopeDetails[0].items.map((module, idx) => {
              const getModuleIcon = (name) => {
                if (name.includes('User')) return '👥';
                if (name.includes('Order')) return '📋';
                if (name.includes('Inventory')) return '📦';
                if (name.includes('Payment')) return '💳';
                if (name.includes('Report')) return '📊';
                if (name.includes('Notification')) return '🔔';
                if (name.includes('Audit')) return '📝';
                if (name.includes('Configuration')) return '⚙️';
                return '📦';
              };
              
              const getComplexityGradient = (complexity) => {
                switch(complexity) {
                  case 'Critical': return 'from-red-500/20 to-orange-500/20 border-red-500/40';
                  case 'High': return 'from-orange-500/20 to-yellow-500/20 border-orange-500/40';
                  case 'Medium': return 'from-yellow-500/20 to-green-500/20 border-yellow-500/40';
                  case 'Low': return 'from-green-500/20 to-emerald-500/20 border-green-500/40';
                  default: return 'from-gray-500/20 to-gray-500/20 border-gray-500/40';
                }
              };

              return (
                <div 
                  key={idx} 
                  className={`bg-gradient-to-br ${getComplexityGradient(module.complexity)} border rounded-xl p-5 hover:scale-105 transition-all cursor-pointer group`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{getModuleIcon(module.name)}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      module.complexity === 'Critical' ? 'bg-red-500/40 text-red-200' :
                      module.complexity === 'High' ? 'bg-orange-500/40 text-orange-200' :
                      module.complexity === 'Medium' ? 'bg-yellow-500/40 text-yellow-200' :
                      'bg-green-500/40 text-green-200'
                    }`}>
                      {module.complexity}
                    </span>
                  </div>
                  <h3 className="font-bold text-base mb-2 text-white group-hover:text-cyan-300 transition-colors">
                    {module.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-white/60">💻</span>
                    <span className="text-white/70 font-medium">{module.lines.toLocaleString()}</span>
                    <span className="text-white/50">LOC</span>
                  </div>
                  <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        module.complexity === 'Critical' ? 'bg-red-500' :
                        module.complexity === 'High' ? 'bg-orange-500' :
                        module.complexity === 'Medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ 
                        width: `${(module.lines / 35000) * 100}%`,
                        transition: 'width 0.5s ease'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Complexity Legend */}
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-white/60">Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-white/60">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-white/60">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-white/60">Low</span>
            </div>
          </div>
        </div>

        {/* Migration Phases - Timeline Visualization */}
        <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-3xl">🗓️</span>
                <span>Java Migration Timeline & Phases</span>
              </h2>
              <p className="text-white/60 text-sm mt-2">4 phases spanning 22 weeks of Java 8 → 17 migration</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-purple-400">22</p>
              <p className="text-xs text-white/50">Weeks</p>
            </div>
          </div>

          {/* Visual Timeline */}
          <div className="relative">
            {/* Phase Cards */}
            <div className="grid grid-cols-4 gap-4 relative">
              {scopeDetails[1].items.map((phase, idx) => {
                const getPhaseColor = (index) => {
                  const colors = [
                    { bg: 'from-purple-500/20 to-indigo-500/20', border: 'border-purple-500/40', text: 'text-purple-300', dot: 'bg-purple-500' },
                    { bg: 'from-pink-500/20 to-purple-500/20', border: 'border-pink-500/40', text: 'text-pink-300', dot: 'bg-pink-500' },
                    { bg: 'from-orange-500/20 to-pink-500/20', border: 'border-orange-500/40', text: 'text-orange-300', dot: 'bg-orange-500' },
                    { bg: 'from-red-500/20 to-orange-500/20', border: 'border-red-500/40', text: 'text-red-300', dot: 'bg-red-500' }
                  ];
                  return colors[index];
                };

                const phaseColor = getPhaseColor(idx);
                const phaseNumber = idx + 1;

                return (
                  <div key={idx} className="relative">
                    {/* Timeline Dot */}
                    <div className="flex justify-center mb-4">
                      <div className={`w-8 h-8 ${phaseColor.dot} rounded-full flex items-center justify-center font-bold text-white shadow-lg z-10 border-4 border-black`}>
                        {phaseNumber}
                      </div>
                    </div>

                    {/* Phase Card */}
                    <div className={`bg-gradient-to-br ${phaseColor.bg} border ${phaseColor.border} rounded-xl p-5 hover:scale-105 transition-all cursor-pointer group h-full`}>
                      <div className="text-center mb-3">
                        <p className={`text-xs font-bold ${phaseColor.text} mb-1`}>{phase.phase}</p>
                        <h3 className="font-bold text-sm text-white mb-2 group-hover:text-cyan-300 transition-colors">
                          {phase.name}
                        </h3>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2 text-xs">
                          <span>⏱️</span>
                          <span className={`font-bold ${phaseColor.text}`}>{phase.duration}</span>
                        </div>
                        
                        <div className="p-3 bg-black/30 rounded-lg border border-white/10">
                          <p className="text-xs text-white/70 leading-relaxed text-center">
                            {phase.modules}
                          </p>
                        </div>
                      </div>

                      {/* Progress Indicator */}
                      <div className="mt-4">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${phaseColor.dot} rounded-full`}
                            style={{ 
                              width: idx === 0 ? '100%' : idx === 1 ? '60%' : idx === 2 ? '30%' : '0%',
                              transition: 'width 1s ease'
                            }}
                          />
                        </div>
                        <p className="text-xs text-white/40 text-center mt-1">
                          {idx === 0 ? 'Completed' : idx === 1 ? 'In Progress' : idx === 2 ? 'Planning' : 'Upcoming'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phase Summary Stats */}
          <div className="mt-8 grid grid-cols-4 gap-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-purple-400">1</p>
              <p className="text-xs text-white/60 mt-1">Completed</p>
            </div>
            <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-pink-400">1</p>
              <p className="text-xs text-white/60 mt-1">In Progress</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-orange-400">2</p>
              <p className="text-xs text-white/60 mt-1">Remaining</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-400">29%</p>
              <p className="text-xs text-white/60 mt-1">Overall Progress</p>
            </div>
          </div>
        </div>

        {/* Technology Stack Migration - Split into In Scope and Future */}
        <div className="bg-gradient-to-br from-green-900/20 to-teal-900/20 border border-green-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-3xl">🔧</span>
                <span>Technology Stack Migration</span>
              </h2>
              <p className="text-white/60 text-sm mt-1">Current scope focuses on JDK migration; framework upgrades planned for future phases</p>
            </div>
          </div>

          {/* IN SCOPE MIGRATION Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">✅</span>
              <h3 className="text-lg font-bold text-green-300">In Scope Migration</h3>
              <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Current REM ID</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {inScopeTechStack.map((tech, idx) => {
              const getStackIcon = (category) => {
                switch(category) {
                  case 'JDK Version': return '☕';
                  case 'Framework': return '🏗️';
                  case 'Build Tool': return '🔨';
                  case 'Persistence': return '🗄️';
                  case 'Testing': return '✅';
                  default: return '⚙️';
                }
              };

              return (
                <div key={idx} className="bg-white/[0.03] border border-green-500/30 rounded-xl p-4 hover:bg-white/[0.05] transition-all">
                  {/* Header with Icon and Title */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{getStackIcon(tech.category)}</span>
                    <h3 className="text-base font-bold text-white">{tech.category}</h3>
                    <span className="ml-auto text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full font-medium">
                      IN SCOPE
                    </span>
                  </div>

                  {/* Horizontal Layout: Legacy | Arrow | Modern */}
                  <div className="flex items-center gap-3">
                    {/* Legacy (Source) */}
                    <div className="flex-1 bg-gradient-to-br from-red-900/30 to-orange-900/20 border border-red-500/30 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-[9px] px-1.5 py-0.5 bg-red-500/30 text-red-300 rounded-full font-medium">
                          LEGACY
                        </span>
                        <span className="text-[8px] text-white/40">Source</span>
                      </div>
                      <p className="text-sm font-bold text-red-300 mb-1.5">{tech.current}</p>
                      <div className="space-y-0.5 text-[9px]">
                        <div className="flex items-center gap-1 text-white/50">
                          <span>⚠️</span>
                          <span>End of Life Support</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/50">
                          <span>🔒</span>
                          <span>Security Vulnerabilities</span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex flex-col items-center justify-center gap-0.5 px-1">
                      <button className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-green-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <span className="text-lg">→</span>
                      </button>
                      <span className="text-[8px] text-cyan-400 font-medium hover:underline cursor-pointer whitespace-nowrap">Read More</span>
                    </div>

                    {/* Modern (Destination) */}
                    <div className="flex-1 bg-gradient-to-br from-green-900/30 to-emerald-900/20 border border-green-500/30 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-[9px] px-1.5 py-0.5 bg-green-500/30 text-green-300 rounded-full font-medium">
                          MODERN
                        </span>
                        <span className="text-[8px] text-white/40">Destination</span>
                      </div>
                      <p className="text-sm font-bold text-green-300 mb-1.5">{tech.target}</p>
                      <div className="space-y-0.5 text-[9px]">
                        <div className="flex items-center gap-1 text-white/70">
                          <span>✅</span>
                          <span>Active LTS Support</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/70">
                          <span>🛡️</span>
                          <span>Enhanced Security</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          </div>

          {/* FUTURE TECHNOLOGY MIGRATION Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🔮</span>
              <h3 className="text-lg font-bold text-purple-300">Future Technology Migration</h3>
              <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">Separate REM ID Required</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {futureTechStack.map((tech, idx) => {
                const getStackIcon = (category) => {
                  switch(category) {
                    case 'JDK Version': return '☕';
                    case 'Framework': return '🏗️';
                    case 'Build Tool': return '🔨';
                    case 'Persistence': return '🗄️';
                    case 'Testing': return '✅';
                    default: return '⚙️';
                  }
                };

                return (
                  <div key={idx} className="bg-white/[0.02] border border-purple-500/20 rounded-xl p-3 hover:bg-white/[0.04] transition-all opacity-70">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{getStackIcon(tech.category)}</span>
                      <h3 className="text-sm font-bold text-white">{tech.category}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gradient-to-br from-red-900/30 to-orange-900/20 border border-red-500/30 rounded-lg p-2.5">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-[9px] px-1.5 py-0.5 bg-red-500/30 text-red-300 rounded-full font-medium">
                            LEGACY
                          </span>
                        </div>
                        <p className="text-sm font-bold text-red-300">{tech.current}</p>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-0.5 px-1">
                        <button className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                          <span className="text-base">→</span>
                        </button>
                        <span className="text-[8px] text-purple-400 font-medium">Future</span>
                      </div>

                      <div className="flex-1 bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-lg p-2.5">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-[9px] px-1.5 py-0.5 bg-purple-500/30 text-purple-300 rounded-full font-medium">
                            PLANNED
                          </span>
                        </div>
                        <p className="text-sm font-bold text-purple-300">{tech.target}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Migration Strategy Summary */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">✅</span>
                <p className="text-sm font-semibold text-green-300">Current Scope</p>
              </div>
              <p className="text-[10px] text-white/60">JDK 8 → 17 migration only</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">🔮</span>
                <p className="text-sm font-semibold text-purple-300">Future Phases</p>
              </div>
              <p className="text-[10px] text-white/60">Framework & tooling upgrades require separate REM ID</p>
            </div>
          </div>
        </div>

        {/* Possible Additional Scopes Section */}
        <div className="bg-gradient-to-br from-yellow-900/20 to-amber-900/20 border border-yellow-500/30 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="text-3xl">⚠️</span>
            <span>Possible Additional Scopes not stated in the Migration Request</span>
          </h2>
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
            <p className="text-white/80 text-sm leading-relaxed">
              <span className="font-semibold text-yellow-400">⚡ Important:</span> The following items were discovered during code analysis but were <span className="font-semibold text-yellow-300">NOT explicitly mentioned in the original migration request</span>. These represent technical debt, optimizations, or architectural improvements that could significantly impact project success. Review carefully to decide if they should be included in scope.
            </p>
          </div>

          <div className="space-y-4">
            {recommendedChanges.map((change) => (
              <div key={change.id} className="bg-white/[0.03] border border-yellow-500/20 rounded-xl p-6 hover:bg-white/[0.05] transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-yellow-100">{change.title}</h3>
                      <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                        change.impact === 'Critical' ? 'bg-red-500/30 text-red-300 border border-red-500/50' :
                        change.impact === 'High' ? 'bg-orange-500/30 text-orange-300 border border-orange-500/50' :
                        'bg-yellow-500/30 text-yellow-300 border border-yellow-500/50'
                      }`}>
                        {change.impact} Impact
                      </span>
                      <span className="text-xs px-3 py-1.5 rounded-full bg-purple-500/30 text-purple-300 border border-purple-500/50 font-medium">
                        {change.category}
                      </span>
                      {change.status === 'accepted' && (
                        <span className="text-xs px-3 py-1.5 rounded-full bg-green-500/30 text-green-300 border border-green-500/50 font-medium">
                          ✓ Accepted
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEditReason(change.id)}
                      className="text-sm px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                    >
                      ✎ Edit
                    </button>
                    <button
                      onClick={() => handleAcceptChange(change.id)}
                      disabled={change.status === 'accepted'}
                      className={`text-sm px-3 py-1.5 rounded-lg transition-colors border ${
                        change.status === 'accepted' 
                          ? 'bg-green-500/10 text-green-500/50 border-green-500/20 cursor-not-allowed'
                          : 'bg-green-500/20 text-green-300 hover:bg-green-500/30 border-green-500/30'
                      }`}
                    >
                      ✓ Add to Scope
                    </button>
                    <button
                      onClick={() => handleDeleteChange(change.id)}
                      className="text-sm px-3 py-1.5 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30"
                    >
                      ✕ Dismiss
                    </button>
                  </div>
                </div>

                <div className="mb-4 p-4 bg-black/20 rounded-lg border border-white/5">
                  <p className="text-sm font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                    <span>🔍</span>
                    <span>Analysis & Reasoning</span>
                  </p>
                  <p className="text-white/80 leading-relaxed text-sm">{change.reason}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg">
                    <p className="text-xs text-white/50 mb-1 flex items-center gap-1">
                      <span>⏱️</span>
                      <span>Estimated Additional Effort</span>
                    </p>
                    <p className="text-lg font-bold text-orange-300">{change.effort}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-xs text-white/50 mb-1 flex items-center gap-1">
                      <span>💰</span>
                      <span>Expected Benefit / ROI</span>
                    </p>
                    <p className="text-lg font-bold text-green-300">{change.savings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
            <p className="text-sm text-cyan-300">
              <span className="font-semibold">💡 Recommendation:</span> Items marked as "Critical" or "High" impact should be reviewed with stakeholders to assess whether they should be added to the current migration scope or deferred to a future phase.
            </p>
          </div>
        </div>

        {/* Future Transformation Section - Horizon 1 and Horizon 2 */}
        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/30 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">🚀</span>
            <span>Future Transformation (Horizon 1 & Horizon 2)</span>
          </h2>
          <p className="text-white/60 mb-6">
            Strategic technology initiatives for Core Banking API modernization beyond Java 17 migration. <span className="font-semibold text-indigo-300">Horizon 1</span> focuses on near-term improvements, while <span className="font-semibold text-purple-300">Horizon 2</span> targets long-term architectural transformation.
          </p>

          {/* Performance Improvements Subsection */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-300">
              <span className="text-2xl">⚡</span>
              <span>Expected Performance Improvements</span>
            </h3>
            <div className="grid grid-cols-3 gap-6 mb-6">
              {performanceGaugeData.map((metric, idx) => (
                <div key={idx} className="text-center bg-white/[0.02] border border-indigo-500/20 rounded-xl p-4">
                  <ResponsiveContainer width="100%" height={180}>
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="90%"
                      data={[metric]}
                      startAngle={180}
                      endAngle={0}
                    >
                      <RadialBar
                        minAngle={15}
                        background
                        clockWise
                        dataKey="value"
                        fill={metric.fill}
                        cornerRadius={10}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <p className="text-3xl font-bold mt-2" style={{ color: metric.fill }}>{metric.value}%</p>
                  <p className="text-sm text-white/50">{metric.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Technology Roadmap */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-indigo-300">
              <span className="text-2xl">🎯</span>
              <span>Strategic Technology Roadmap</span>
            </h3>
            <div className="space-y-4">
              {outOfScopeEnhancements.map((enhancement) => (
                <div key={enhancement.id} className="bg-white/[0.03] border border-indigo-500/20 rounded-xl p-6 hover:bg-white/[0.05] transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">{enhancement.title}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          enhancement.impact === 'Critical' ? 'bg-red-500/20 text-red-400' :
                          enhancement.impact === 'High' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {enhancement.impact} Impact
                        </span>
                        <span className={enhancement.category === 'Horizon 1' ? 'text-xs px-3 py-1.5 rounded-full font-semibold border bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'text-xs px-3 py-1.5 rounded-full font-semibold border bg-purple-500/20 text-purple-300 border-purple-500/40'}>
                          {enhancement.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAcceptOutOfScope(enhancement.id)}
                        className="text-sm px-3 py-1 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 transition-colors"
                      >
                        ✓ Accept
                      </button>
                      <button
                        onClick={() => handleDeleteOutOfScope(enhancement.id)}
                        className="text-sm px-3 py-1 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-colors"
                      >
                        ✕ Decline
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-cyan-400 mb-2">Description</p>
                    <p className="text-white/70 leading-relaxed">{enhancement.reason}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                      <p className="text-xs text-white/50 mb-1">Estimated Effort</p>
                      <p className="text-sm font-semibold text-orange-400">{enhancement.effort}</p>
                    </div>
                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <p className="text-xs text-white/50 mb-1">Performance Improvement</p>
                      <p className="text-sm font-semibold text-green-400">{enhancement.performanceImprovement}</p>
                    </div>
                    <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                      <p className="text-xs text-white/50 mb-1">Ballpark Effort Required</p>
                      <p className="text-sm font-semibold text-cyan-400">{enhancement.ballparkEffort}</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-white/[0.02] border border-white/10 rounded-lg">
                    <p className="text-xs text-white/50 mb-1">Expected Benefit / ROI</p>
                    <p className="text-sm font-semibold text-emerald-400">{enhancement.savings}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-gradient-to-r from-orange-900/40 via-red-900/40 to-orange-900/40 border border-orange-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Download Complete Document</h3>
              <p className="text-white/60 text-sm">
                Export this scope document as a formatted PDF with all visualizations, details, and recommendations.
              </p>
            </div>
            <button
              onClick={handleDownloadDocument}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center gap-3 text-lg"
            >
              <span>⬇</span>
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">💬</span>
            <span>Comments & Collaboration</span>
          </h2>

          {/* Existing Comments */}
          <div className="space-y-4 mb-6">
            {comments.map((c) => (
              <div key={c.id} className="flex gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center font-bold flex-shrink-0`}>
                  {c.initials}
                </div>
                <div className="flex-1">
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{c.author}</span>
                      <span className="text-xs text-white/40">•</span>
                      <span className="text-xs text-white/40">{c.role}</span>
                      <span className="text-xs text-white/40">•</span>
                      <span className="text-xs text-white/40">{c.date}</span>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <div className="flex gap-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${owner.color} flex items-center justify-center font-bold flex-shrink-0`}>
              {owner.initials}
            </div>
            <div className="flex-1">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your comment or feedback..."
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors resize-none mb-3"
                rows={3}
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddComment}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Reason Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Reason</h3>
            <textarea
              value={editReason}
              onChange={(e) => setEditReason(e.target.value)}
              placeholder="Enter the new reason..."
              className="w-full bg-gray-100 border border-gray-300 rounded-lg p-4 text-gray-800 focus:outline-none focus:border-blue-500 transition-colors resize-none mb-3"
              rows={4}
            />
            <div className="flex justify-end">
              <button
                onClick={handleSaveEdit}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-6 py-2 bg-gray-300 rounded-lg font-medium hover:bg-gray-400 transition-colors ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;