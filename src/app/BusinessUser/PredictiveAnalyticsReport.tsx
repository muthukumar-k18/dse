import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PredictiveAnalyticsReport = () => {
  const [searchParams] = useSearchParams();
  const appName = searchParams.get('app') || 'Unknown Application';
  const tooling = searchParams.get('tooling') || 'ghcp';
  const horizon = parseInt(searchParams.get('horizon') || '12');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArchOption, setSelectedArchOption] = useState<any>(null);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  // Dashboard Statistics
  const stats = [
    { label: 'Predicted Changes', value: '127', icon: '📝', color: 'from-blue-500 to-cyan-500', trend: '+24%' },
    { label: 'Critical Risks', value: '8', icon: '⚠️', color: 'from-red-500 to-orange-500', trend: '+3' },
    { label: 'Opportunities', value: '15', icon: '✨', color: 'from-green-500 to-emerald-500', trend: '+12%' },
    { label: 'Estimated Cost', value: '$98K', icon: '💰', color: 'from-purple-500 to-violet-500', trend: '+8%' },
  ];

  // Cost Breakdown Data
  const costData = [
    { name: 'Infrastructure', value: 32000, color: '#3b82f6' },
    { name: 'Development', value: 45000, color: '#8b5cf6' },
    { name: 'Security', value: 12000, color: '#06b6d4' },
    { name: 'Compliance', value: 9000, color: '#10b981' },
  ];

  // Trend Over Time
  const trendData = [
    { month: 'Current', changes: 5, cost: 12000 },
    { month: '6M', changes: 18, cost: 45000 },
    { month: '12M', changes: 32, cost: 89000 },
    { month: '18M', changes: 48, cost: 142000 },
    { month: '24M', changes: 61, cost: 198000 },
    { month: '30M', changes: 79, cost: 267000 },
    { month: '36M', changes: 95, cost: 325000 },
  ].filter((_, idx) => idx <= horizon / 6);

  // Full 36-month cost projection
  const fullCostProjection = [
    { month: 'Current', cost: 0 },
    { month: '3M', cost: 2500 },
    { month: '6M', cost: 8000 },
    { month: '9M', cost: 15000 },
    { month: '12M', cost: 24000 },
    { month: '15M', cost: 35000 },
    { month: '18M', cost: 48000 },
    { month: '21M', cost: 58000 },
    { month: '24M', cost: 68000 },
    { month: '27M', cost: 78000 },
    { month: '30M', cost: 88000 },
    { month: '33M', cost: 94000 },
    { month: '36M', cost: 98000 },
  ];

  // Architecture Options
  const archOptions = [
    {
      id: 'replatform',
      title: 'Replatforming',
      icon: '🚀',
      color: 'from-blue-500 to-cyan-500',
      description: 'Migrate to a new platform with minimal code changes',
      details: 'Move your application to a modern cloud platform (Azure, GCP) while keeping the core architecture intact. This approach balances modernization with risk mitigation.',
      benefits: ['Faster time to market', 'Lower initial cost', 'Reduced migration risk', 'Immediate cloud benefits'],
      considerations: ['May not address technical debt', 'Limited modernization gains', 'Future refactoring might be needed'],
      timeframe: '3-6 months',
      cost: '$45K - $75K',
      complexity: 'Medium'
    },
    {
      id: 'refactor',
      title: 'Refactoring',
      icon: '⚡',
      color: 'from-purple-500 to-violet-500',
      description: 'Restructure and optimize code for cloud-native architecture',
      details: 'Fundamentally restructure your application to leverage cloud-native features like microservices, containers, and serverless computing. Maximize scalability and performance.',
      benefits: ['Optimal performance', 'Cloud-native features', 'Better scalability', 'Long-term cost savings'],
      considerations: ['Higher upfront investment', 'Longer timeline', 'Requires skilled team', 'More complex migration'],
      timeframe: '9-18 months',
      cost: '$120K - $250K',
      complexity: 'High'
    },
    {
      id: 'retire',
      title: 'Retiring',
      icon: '🗑️',
      color: 'from-red-500 to-orange-500',
      description: 'Decommission legacy systems that are no longer needed',
      details: 'Identify and safely decommission applications that provide minimal business value or have been replaced by other systems. Archive data and redirect users.',
      benefits: ['Immediate cost savings', 'Reduced maintenance', 'Simplified portfolio', 'Lower security risk'],
      considerations: ['Data archival requirements', 'User migration plan', 'Dependency mapping needed', 'Compliance obligations'],
      timeframe: '1-3 months',
      cost: '$5K - $15K',
      complexity: 'Low'
    },
    {
      id: 'rehost',
      title: 'Re-Hosting (Lift & Shift)',
      icon: '📦',
      color: 'from-green-500 to-emerald-500',
      description: 'Move applications to cloud without modifications',
      details: 'Quickly migrate existing applications to the cloud infrastructure without changing code or architecture. Also known as "lift and shift" - the fastest path to cloud adoption.',
      benefits: ['Quickest migration path', 'Lowest cost option', 'Minimal disruption', 'Immediate infrastructure benefits'],
      considerations: ['No optimization gains', 'May carry over inefficiencies', 'Limited cloud advantages', 'Future modernization needed'],
      timeframe: '1-4 months',
      cost: '$25K - $50K',
      complexity: 'Low'
    }
  ];

  // Time-based predictions
  const timePeriods = [
    {
      period: '6-12 Months',
      color: 'from-blue-500 to-cyan-500',
      changes: [
        { type: 'Framework Upgrade', desc: 'React 19 migration recommended', impact: 'High', cost: '$45K' },
        { type: 'Security Patches', desc: '12 critical dependencies to update', impact: 'Critical', cost: '$28K' },
        { type: 'API Modernization', desc: 'REST to GraphQL migration opportunity', impact: 'Medium', cost: '$67K' },
        { type: 'Performance', desc: 'Database optimization needed', impact: 'High', cost: '$32K' },
      ]
    },
    {
      period: '12-24 Months',
      color: 'from-purple-500 to-violet-500',
      changes: [
        { type: 'Cloud Migration', desc: 'Shift to serverless architecture', impact: 'High', cost: '$125K' },
        { type: 'AI Integration', desc: 'ML-powered features implementation', impact: 'Medium', cost: '$89K' },
        { type: 'Compliance', desc: 'GDPR & SOC2 certification updates', impact: 'Critical', cost: '$43K' },
        { type: 'Mobile Expansion', desc: 'Native mobile app development', impact: 'Medium', cost: '$156K' },
      ]
    },
    {
      period: '24-36 Months',
      color: 'from-orange-500 to-amber-500',
      changes: [
        { type: 'Platform Overhaul', desc: 'Microservices architecture transition', impact: 'Critical', cost: '$245K' },
        { type: 'Tech Debt', desc: 'Legacy code refactoring initiative', impact: 'High', cost: '$87K' },
        { type: 'Blockchain', desc: 'Decentralized identity integration', impact: 'Low', cost: '$112K' },
        { type: 'Scalability', desc: 'Multi-region deployment setup', impact: 'High', cost: '$178K' },
      ]
    }
  ];

  // Risks and Threats
  const risks = [
    { 
      title: 'Dependency Vulnerabilities', 
      severity: 'Critical', 
      probability: '85%', 
      description: 'Multiple outdated packages with known CVEs', 
      remediation: 'Automated dependency scanning and patching',
      factoryPattern: 'Security Hardening Pattern',
      patternStatus: 'Available'
    },
    { 
      title: 'Technical Debt Accumulation', 
      severity: 'High', 
      probability: '72%', 
      description: 'Code complexity increasing faster than refactoring efforts', 
      remediation: 'Implement continuous refactoring sprints',
      factoryPattern: 'Code Quality Improvement Pattern',
      patternStatus: 'Available'
    },
    { 
      title: 'Scalability Bottlenecks', 
      severity: 'Medium', 
      probability: '58%', 
      description: 'Current architecture may not handle 3x traffic increase', 
      remediation: 'Cloud-native microservices migration',
      factoryPattern: 'Elastic Scale Pattern',
      patternStatus: 'WIP'
    },
    { 
      title: 'Team Knowledge Gap', 
      severity: 'Medium', 
      probability: '64%', 
      description: 'Emerging technologies require upskilling', 
      remediation: 'AI-assisted learning and knowledge transfer',
      factoryPattern: 'Skills Development Pattern',
      patternStatus: 'Available'
    },
    { 
      title: 'Vendor Lock-in Risk', 
      severity: 'Low', 
      probability: '41%', 
      description: 'Heavy dependency on proprietary platforms', 
      remediation: 'Multi-cloud abstraction layer implementation',
      factoryPattern: 'Cloud Agnostic Pattern',
      patternStatus: 'WIP'
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-400 border-red-500/30 bg-red-500/10';
      case 'High': return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
      case 'Medium': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      default: return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'High': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl text-white/70">Analyzing application patterns...</p>
          <p className="text-sm text-white/40 mt-2">Processing {horizon} months of predictive data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur-xl z-50">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <span className="text-xl">⚡</span>
          </div>
          <div>
            <span className="text-xl font-semibold">DSE 2.0</span>
            <span className="text-white/30 mx-2">|</span>
            <span className="text-white/50">Predictive Report</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/business-user/predictive-analytics"
            className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            ← New Analysis
          </Link>
          <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-colors text-sm font-medium">
            Download Report
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-semibold">
              JM
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">John Mitchell</p>
              <p className="text-xs text-white/40">Business User</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{appName}</h1>
            <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-xs font-medium text-cyan-300">
              {horizon} Month Forecast
            </div>
          </div>
          <p className="text-white/50">
            Predictive analysis powered by {tooling.toUpperCase()} Agents
          </p>
        </div>

        {/* Dashboard Statistics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="px-2 py-1 bg-green-500/20 text-green-300 rounded-lg text-xs font-medium">
                  {stat.trend}
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* 36-Month Cost Projection */}
          <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl p-6 col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">36-Month Cost Projection</h3>
                <p className="text-sm text-white/40 mt-1">Full timeline investment forecast</p>
              </div>
              <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                <span className="text-2xl font-bold text-purple-300">$98K</span>
                <span className="text-sm text-white/50 ml-2">Total</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fullCostProjection}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" />
                <YAxis stroke="rgba(139,92,246,0.8)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Bar dataKey="cost" fill="url(#colorCost)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Distribution (moved from above) */}
        <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-6">Cost Distribution</h3>
          <div className="grid grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => `$${(value / 1000).toFixed(0)}K`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center space-y-3">
              {costData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-white/70">{item.name}</span>
                  </div>
                  <span className="font-semibold text-lg">${(item.value / 1000).toFixed(0)}K</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risks and Threats */}
        <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xl">
                ⚠️
              </div>
              <div>
                <h3 className="text-lg font-semibold">Risk Assessment & Remediation</h3>
                <p className="text-sm text-white/40">Identified threats with Factory.AI patterns</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 flex items-center gap-2">
              <span className="text-xl">🏭</span>
              <span>Engage with Factory for Advisory</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {risks.map((risk, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:bg-white/[0.04] transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="font-semibold text-lg">{risk.title}</h4>
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getSeverityColor(risk.severity)}`}>
                        {risk.severity}
                      </span>
                    </div>
                    
                    <p className="text-sm text-white/60 mb-4">{risk.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {/* Remediation Action */}
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-cyan-400">🔧</span>
                          <span className="text-xs font-semibold text-cyan-300">Remediation Action</span>
                        </div>
                        <p className="text-sm text-white/80">{risk.remediation}</p>
                      </div>
                      
                      {/* Factory Pattern */}
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-orange-400">🏭</span>
                          <span className="text-xs font-semibold text-orange-300">Factory Pattern</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-white/80">{risk.factoryPattern}</p>
                          {risk.patternStatus === 'WIP' ? (
                            <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded text-xs font-semibold text-yellow-300">
                              WIP
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs font-semibold text-green-300">
                              Available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Probability Badge */}
                  <div className="text-center">
                    <p className="text-xs text-white/40 mb-2">Probability</p>
                    <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center">
                      <p className="text-3xl font-bold text-orange-400">{risk.probability}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Period Predictions */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">
              🔮
            </div>
            <div>
              <h3 className="text-lg font-semibold">Future Change Predictions</h3>
              <p className="text-sm text-white/40">Anticipated changes across different timeframes</p>
            </div>
          </div>

          {timePeriods.map((period, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`px-4 py-2 bg-gradient-to-r ${period.color} rounded-lg font-semibold`}>
                  {period.period}
                </div>
                <div className="text-sm text-white/40">
                  {period.changes.length} predicted changes
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {period.changes.map((change, changeIdx) => (
                  <div key={changeIdx} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white/90">{change.type}</h4>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getImpactColor(change.impact)}`}>
                        {change.impact}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 mb-3">{change.desc}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-xs text-white/40">Estimated Cost</span>
                      <span className="text-lg font-bold text-cyan-400">{change.cost}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Options */}
        <div className="mt-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-xl">
                🏗️
              </div>
              <div>
                <h3 className="text-lg font-semibold">Architecture Modernization Pathways</h3>
                <p className="text-sm text-white/40">Select your transformation strategy</p>
              </div>
            </div>
            <div className="text-xs text-white/30">Click to explore details</div>
          </div>

          {/* Sophisticated Architecture Pathways Grid */}
          <div className="relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-orange-500/5 rounded-3xl blur-3xl"></div>
            
            <div className="relative grid grid-cols-2 gap-8">
              {archOptions.map((option, idx) => (
                <div
                  key={option.id}
                  onClick={() => setSelectedArchOption(option)}
                  className="group cursor-pointer relative"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Main Card */}
                  <div className={`relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-2 border-white/10 rounded-3xl p-8 overflow-hidden
                    hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-${option.id === 'replatform' ? 'blue' : option.id === 'refactor' ? 'purple' : option.id === 'retire' ? 'red' : 'green'}-500/20`}>
                    
                    {/* Animated background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Top section with icon and title */}
                    <div className="relative flex items-start gap-6 mb-6">
                      {/* Large gradient icon with pulse effect */}
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${option.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
                        <div className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center text-5xl shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                          {option.icon}
                        </div>
                      </div>
                      
                      {/* Title and description */}
                      <div className="flex-1 pt-2">
                        <h4 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">{option.title}</h4>
                        <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">{option.description}</p>
                      </div>
                    </div>

                    {/* Metrics grid */}
                    <div className="relative grid grid-cols-3 gap-3 mb-6">
                      {/* Timeline */}
                      <div className="bg-white/[0.05] border border-white/10 rounded-xl p-3 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">⏱️</span>
                          <span className="text-xs text-white/40 font-medium">Timeline</span>
                        </div>
                        <p className="text-sm font-bold text-cyan-400">{option.timeframe}</p>
                      </div>

                      {/* Cost */}
                      <div className="bg-white/[0.05] border border-white/10 rounded-xl p-3 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">💰</span>
                          <span className="text-xs text-white/40 font-medium">Investment</span>
                        </div>
                        <p className="text-sm font-bold text-purple-400">{option.cost}</p>
                      </div>

                      {/* Complexity */}
                      <div className="bg-white/[0.05] border border-white/10 rounded-xl p-3 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">⚡</span>
                          <span className="text-xs text-white/40 font-medium">Level</span>
                        </div>
                        <div className={`inline-flex px-2 py-1 rounded-lg text-xs font-bold border ${
                          option.complexity === 'High' ? 'bg-red-500/20 text-red-300 border-red-500/40' :
                          option.complexity === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40' :
                          'bg-green-500/20 text-green-300 border-green-500/40'
                        }`}>
                          {option.complexity}
                        </div>
                      </div>
                    </div>

                    {/* Progress bar showing suitability score */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-white/40">Recommended Match</span>
                        <span className="text-xs font-bold text-white/60">{idx === 0 ? '92%' : idx === 1 ? '78%' : idx === 2 ? '45%' : '85%'}</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${option.color} transition-all duration-1000 group-hover:animate-pulse`}
                          style={{ width: idx === 0 ? '92%' : idx === 1 ? '78%' : idx === 2 ? '45%' : '85%' }}
                        ></div>
                      </div>
                    </div>

                    {/* Hover arrow indicator */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-lg`}>
                        <span className="text-2xl">→</span>
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Center connecting element */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/5 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <p className="text-xs text-white/40 mb-1">Choose Your</p>
                  <p className="text-sm font-bold text-white/60">Path</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Option Modal */}
        {selectedArchOption && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-8"
               onClick={() => setSelectedArchOption(null)}>
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                 onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className={`bg-gradient-to-r ${selectedArchOption.color} p-8 rounded-t-3xl`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl shadow-xl">
                      {selectedArchOption.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedArchOption.title}</h2>
                      <p className="text-white/80">{selectedArchOption.description}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedArchOption(null)}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <span className="text-2xl">×</span>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-6">
                {/* Overview */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="text-2xl">📖</span>
                    Overview
                  </h3>
                  <p className="text-white/70 leading-relaxed">{selectedArchOption.details}</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-xs text-white/40 mb-2">Timeline</p>
                    <p className="text-2xl font-bold text-cyan-400">{selectedArchOption.timeframe}</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-xs text-white/40 mb-2">Investment</p>
                    <p className="text-2xl font-bold text-purple-400">{selectedArchOption.cost}</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-xs text-white/40 mb-2">Complexity</p>
                    <p className="text-2xl font-bold text-orange-400">{selectedArchOption.complexity}</p>
                  </div>
                </div>

                {/* Benefits & Considerations */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Benefits */}
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="text-2xl">✅</span>
                      Key Benefits
                    </h4>
                    <ul className="space-y-3">
                      {selectedArchOption.benefits.map((benefit: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-green-400 mt-1">•</span>
                          <span className="text-white/80">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Considerations */}
                  <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="text-2xl">⚡</span>
                      Considerations
                    </h4>
                    <ul className="space-y-3">
                      {selectedArchOption.considerations.map((consideration: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-orange-400 mt-1">•</span>
                          <span className="text-white/80">{consideration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-xl p-6 mt-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-3xl shadow-lg">
                        🏭
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-1">Ready to Get Started?</h4>
                        <p className="text-sm text-white/60">
                          Connect with our Factory.AI experts for personalized guidance
                        </p>
                      </div>
                    </div>
                    <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105">
                      Engage Factory Advisory
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Summary Footer */}
        <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📋</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Executive Summary</h3>
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                Based on the {horizon}-month predictive analysis for <strong>{appName}</strong>, our AI models 
                forecast {stats[0].value} significant changes requiring attention. The estimated total investment 
                of <strong>{stats[3].value}</strong> should be planned across infrastructure modernization, 
                development initiatives, security enhancements, and compliance requirements. Immediate action 
                is recommended on {stats[1].value} critical risks to ensure system stability and security.
              </p>
              <div className="flex items-center gap-4 text-xs text-white/50">
                <span>Generated: {new Date().toLocaleDateString()}</span>
                <span>•</span>
                <span>Confidence Level: 87%</span>
                <span>•</span>
                <span>Tooling: {tooling.toUpperCase()} Agents</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PredictiveAnalyticsReport;