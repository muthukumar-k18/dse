import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { projectRepository } from '../../utils/projectRepository';
import type { Project } from '../../utils/projectRepository';
import { useUser } from '../../contexts/UserContext';
import { Search, Bell, Plus, ArrowRight, TrendingUp, Zap, Code, BarChart3, Download, Activity } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Stat {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
}

export default function AAFMigrationExpert() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const { currentUser, activeRole } = useUser();

  useEffect(() => {
    const projects = projectRepository.getAllProjects();
    setActiveProjects(projects);
  }, []);

  const handleDownloadProjectsJSON = () => {
    projectRepository.downloadProjectsJSON();
  };

  // Helper function to get project-specific stats
  const getProjectStats = (project: Project) => {
    // Generate consistent stats based on project ID
    const seed = project.id;
    const files = 150 + (seed * 47) % 500;
    const lines = (files * 180 + seed * 1000) / 1000; // in K
    const duration = 5 + (seed * 3) % 25;
    
    // Special case for project ID 2 (Payment Gateway) - should have 4 team members
    const team = project.id === 2 ? 4 : 4 + (seed * 2) % 8;
    
    return {
      files,
      lines: `${lines.toFixed(1)}K`,
      duration: `${duration} days`,
      team: `${team} members`
    };
  };

  // Helper function to get migration pattern display
  const getMigrationPattern = (project: Project) => {
    const patterns: { [key: string]: string } = {
      'webapp': 'Webapps to MAKS',
      'jdk': 'JDK Upgrade',
      'onprem': 'OnPrem to MAKS',
      'junit': 'Junit Test Case Creation/Update',
      'password': 'Password Rotation Automation',
      'monolith': 'Monolithic to Microservices',
      'dotnet': '.NET Framework 4.x to .NET 8 Core',
      'springboot': 'Springboot Vertical Upgrade',
      'soap': 'SOAP to Rest API',
      'apigee': 'APIGEE to APIM',
      'cert': 'Map Connection Cert to Token',
      'testpack': 'Test pack Creation'
    };
    
    // Try to match module name to pattern
    const moduleLower = project.module.toLowerCase();
    for (const [key, pattern] of Object.entries(patterns)) {
      if (moduleLower.includes(key)) {
        return pattern;
      }
    }
    
    // Default fallback based on source and target tech
    if (project.sourceTech && project.targetTech) {
      return `${project.sourceTech} → ${project.targetTech}`;
    }
    
    return project.module;
  };

  const stats: Stat[] = [
    { 
      label: 'Active Migrations', 
      value: activeProjects.length.toString(), 
      change: '+12%',
      icon: <Zap className="w-5 h-5" />,
      trend: 'up'
    },
    { 
      label: 'Code Migrated', 
      value: '156K', 
      change: 'lines this month',
      icon: <Code className="w-5 h-5" />,
      trend: 'up'
    },
    { 
      label: 'Tokens Used', 
      value: '847K', 
      change: '+124K',
      icon: <BarChart3 className="w-5 h-5" />,
      trend: 'up'
    },
    { 
      label: 'Success Rate', 
      value: '94.2%', 
      change: '+2.1%',
      icon: <TrendingUp className="w-5 h-5" />,
      trend: 'up'
    },
  ];

  // Chart Data
  const migrationTrendData = [
    { month: 'Jan', migrations: 12, tokens: 245000 },
    { month: 'Feb', migrations: 19, tokens: 398000 },
    { month: 'Mar', migrations: 15, tokens: 512000 },
    { month: 'Apr', migrations: 24, tokens: 623000 },
    { month: 'May', migrations: 28, tokens: 721000 },
    { month: 'Jun', migrations: 32, tokens: 847000 },
  ];

  const codeVolumeData = [
    { week: 'Week 1', migrated: 28000, reviewed: 24000 },
    { week: 'Week 2', migrated: 42000, reviewed: 38000 },
    { week: 'Week 3', migrated: 51000, reviewed: 46000 },
    { week: 'Week 4', migrated: 67000, reviewed: 59000 },
  ];

  const pipelineTrendData = [
    { type: 'Cloud to Cloud', count: 15, color: '#3b82f6' },
    { type: 'On-Prem to Cloud', count: 22, color: '#8b5cf6' },
    { type: 'Managed AKS', count: 18, color: '#06b6d4' },
    { type: 'Hybrid Migration', count: 12, color: '#10b981' },
    { type: 'Data Migration', count: 9, color: '#f59e0b' },
    { type: 'Lift & Shift', count: 8, color: '#ef4444' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Review':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Completed':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default:
        return 'bg-white/5 text-white/60 border-white/10';
    }
  };

  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'High':
        return <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />;
      case 'Medium':
        return <div className="w-2 h-2 rounded-full bg-yellow-400" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-green-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Elegant Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-red-500/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-orange-500/5 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header - Minimal & Elegant */}
      <header className="relative z-10 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-[1800px] mx-auto px-12 py-6">
          <div className="flex items-center justify-between">
            {/* Left: Branding */}
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-semibold">DSE 2.0</span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/40 text-sm">Migration Expert</span>
                </div>
              </div>
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative group">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white/60 transition-colors" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 w-72 text-sm focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all placeholder-white/30"
                />
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownloadProjectsJSON}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all"
                title="Download projects.json"
              >
                <Download className="w-4 h-4 text-white/60" />
              </button>

              {/* Notifications */}
              <button className="relative p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all">
                <Bell className="w-4 h-4 text-white/60" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-semibold">3</span>
              </button>

              {/* User Menu */}
              <div className="group relative">
                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                  <div className="text-right">
                    <p className="text-sm font-medium">{currentUser?.fullName || 'Pramod Nair'}</p>
                    <p className="text-xs text-white/40">{activeRole || 'Migration Expert'}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-sm font-semibold shadow-lg">
                    {currentUser?.initials || 'PN'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-[1800px] mx-auto px-12 py-12">
        {/* Welcome Section - Clean & Spacious */}
        <section className="mb-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/40 text-sm mb-3 uppercase tracking-wider">Dashboard</p>
              <h1 className="text-5xl font-bold mb-4 tracking-tight">
                AAF Migration Workspace
              </h1>
              <p className="text-white/50 text-lg">
                {activeProjects.length} active {activeProjects.length === 1 ? 'project' : 'projects'} • 8 pipelines running
              </p>
            </div>
            <Link 
              to="/create-project" 
              className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 px-8 py-4 rounded-xl font-semibold shadow-2xl shadow-red-500/30 transition-all hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              New Migration Project
            </Link>
          </div>
        </section>

        {/* Stats - Minimalist Cards */}
        <section className="grid grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center text-red-400">
                  {stat.icon}
                </div>
                <div className="text-xs text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-sm text-white/40">{stat.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Analytics Section - Charts & Graphs */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Activity className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-semibold">Analytics & Trends</h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Pipeline Trend */}
            <div className="bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/5 rounded-2xl p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">Pipeline Trends</h3>
                <p className="text-sm text-white/40">Open projects by migration type</p>
              </div>
              <div className="space-y-3">
                {pipelineTrendData.map((pipeline, index) => {
                  const maxCount = Math.max(...pipelineTrendData.map(p => p.count));
                  const percentage = (pipeline.count / maxCount) * 100;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">{pipeline.type}</span>
                        <span className="font-semibold text-white">{pipeline.count}</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: pipeline.color
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>Total Pipelines</span>
                  <span className="font-semibold text-white/60">
                    {pipelineTrendData.reduce((sum, p) => sum + p.count, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Code Volume Bar Chart */}
            <div className="bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/5 rounded-2xl p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">Code Volume Analysis</h3>
                <p className="text-sm text-white/40">Weekly code migration and review metrics</p>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={codeVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                  <XAxis dataKey="week" stroke="#ffffff40" tick={{ fill: '#ffffff60' }} />
                  <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff60' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #ffffff20',
                      borderRadius: '12px',
                      padding: '12px'
                    }}
                    labelStyle={{ color: '#ffffff' }}
                  />
                  <Legend wrapperStyle={{ color: '#ffffff80' }} />
                  <Bar dataKey="migrated" fill="#ef4444" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="reviewed" fill="#f97316" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Projects Section - Gallery Style */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Active Projects</h2>
              <p className="text-white/40 text-sm">Manage and monitor your migration pipelines</p>
            </div>
            <button className="text-sm text-white/40 hover:text-white flex items-center gap-2 transition-colors">
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {activeProjects.length === 0 ? (
            <div className="bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/5 rounded-2xl p-16 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <Code className="w-10 h-10 text-white/20" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white/60">No Active Projects</h3>
              <p className="text-white/40 mb-8">Create your first migration project to get started</p>
              <Link 
                to="/create-project"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-6 py-3 rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                Create Project
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {activeProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  onDoubleClick={() => navigate(`/project-pipeline/${project.id}`)}
                  className={`group relative cursor-pointer transition-all duration-500 ${
                    selectedProject === project.id
                      ? 'scale-[1.01]'
                      : ''
                  }`}
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500 ${
                    selectedProject === project.id ? 'opacity-20' : ''
                  }`}></div>
                  
                  {/* Main Card */}
                  <div className={`relative bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02] border-2 rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500 ${
                    selectedProject === project.id
                      ? 'border-red-500/50 shadow-2xl shadow-red-500/20'
                      : 'border-white/10 group-hover:border-white/20'
                  }`}>
                    
                    {/* Top Gradient Bar */}
                    <div className="h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" 
                      style={{ width: `${project.progress}%` }}></div>
                    
                    {/* Content Container */}
                    <div className="p-8">
                      <div className="flex items-start gap-8">
                        {/* Left: Project Icon & Visual Identity */}
                        <div className="relative flex-shrink-0">
                          <div className="absolute -inset-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl blur-2xl"></div>
                          <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-red-500/10 via-orange-500/10 to-red-500/10 border border-white/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                            <div className="text-center">
                              <div className="text-5xl mb-2">🚀</div>
                              <div className="text-xs text-white/50 font-bold uppercase tracking-wider">Project</div>
                            </div>
                          </div>
                          {/* Priority Pulse */}
                          <div className="absolute -top-2 -right-2">
                            {getPriorityIndicator(project.priority)}
                          </div>
                        </div>

                        {/* Middle: Project Details */}
                        <div className="flex-1 min-w-0">
                          {/* Header Row */}
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-3xl font-bold group-hover:text-white transition-colors">
                                  {project.name}
                                </h3>
                                <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${getStatusColor(project.status)}`}>
                                  {project.status}
                                </span>
                              </div>
                              <p className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent mb-4">{project.module}</p>
                              
                              {/* Metrics Row */}
                              <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                  <Code className="w-4 h-4 text-red-400" />
                                  <span className="text-sm text-white/60">
                                    {getMigrationPattern(project)}
                                  </span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-white/20"></div>
                                <div className="flex items-center gap-2">
                                  <Zap className="w-4 h-4 text-cyan-400" />
                                  <span className="text-sm text-white/60">{project.pipelineType || 'Full Cycle Pipeline'}</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-white/20"></div>
                                <div className="flex items-center gap-2">
                                  <Activity className="w-4 h-4 text-orange-400" />
                                  <span className="text-sm text-white/60">5 Active Stages</span>
                                </div>
                              </div>
                            </div>

                            {/* REM ID - Prominent */}
                            <div className="relative group/rem">
                              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl blur-xl opacity-60 group-hover/rem:opacity-100 transition-opacity"></div>
                              <div className="relative bg-gradient-to-br from-red-500/30 via-orange-500/30 to-red-500/30 border-2 border-red-400/50 rounded-2xl px-6 py-4 backdrop-blur-sm shadow-2xl group-hover/rem:scale-105 transition-transform">
                                <div className="text-center">
                                  <div className="text-xs text-red-200/80 uppercase font-bold tracking-widest mb-1">REM ID</div>
                                  <div className="text-2xl font-black text-red-300">{project.remId}</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Progress Section */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-white/50 uppercase tracking-wider font-semibold">Migration Progress</span>
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-white/40">Completion</span>
                                <span className="text-3xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                                  {project.progress}%
                                </span>
                              </div>
                            </div>
                            
                            {/* Enhanced Progress Bar */}
                            <div className="relative h-4 bg-black/40 rounded-full overflow-hidden border border-white/10">
                              <div
                                className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full transition-all duration-1000 shadow-lg"
                                style={{ width: `${project.progress}%` }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-white/20"></div>
                              </div>
                              {/* Animated Shine */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                            </div>

                            {/* Mini Stats */}
                            <div className="grid grid-cols-4 gap-3 pt-2">
                              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                <div className="text-xs text-white/40 mb-1">Files</div>
                                <div className="text-lg font-bold text-white/90">{getProjectStats(project).files}</div>
                              </div>
                              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                <div className="text-xs text-white/40 mb-1">Lines</div>
                                <div className="text-lg font-bold text-white/90">{getProjectStats(project).lines}</div>
                              </div>
                              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                <div className="text-xs text-white/40 mb-1">Duration</div>
                                <div className="text-lg font-bold text-white/90">{getProjectStats(project).duration}</div>
                              </div>
                              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                <div className="text-xs text-white/40 mb-1">Team</div>
                                <div className="text-lg font-bold text-white/90">{getProjectStats(project).team}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Action Button */}
                        <div className="flex-shrink-0 flex flex-col justify-between h-full">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/project-pipeline/${project.id}`);
                            }}
                            className="group/btn relative overflow-hidden bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 px-8 py-4 rounded-2xl font-semibold shadow-2xl shadow-red-500/30 transition-all hover:scale-105 hover:shadow-red-500/50"
                          >
                            <div className="relative flex items-center gap-3">
                              <span>Open Pipeline</span>
                              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </div>
                            {/* Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Selected Indicator */}
                    {selectedProject === project.id && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 animate-pulse"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quick Actions - Horizontal Pills */}
        <section>
          <h2 className="text-lg font-semibold mb-6 text-white/60">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-6">
            {/* Create New Pattern */}
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 border-2 border-purple-500/30 hover:border-purple-400/60 rounded-2xl p-8 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30">
                    🧩
                  </div>
                  <h3 className="text-xl font-bold text-white">Create New Pattern</h3>
                </div>
                <p className="text-white/60 text-sm mb-6">
                  Define reusable migration patterns for your workflows
                </p>
                <button 
                  onClick={() => navigate('/create-new-pattern/0')}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/30">
                  <span className="flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Pattern
                  </span>
                </button>
              </div>
            </div>

            {/* Create New Lego */}
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border-2 border-cyan-500/30 hover:border-cyan-400/60 rounded-2xl p-8 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/30">
                    🧱
                  </div>
                  <h3 className="text-xl font-bold text-white">Create New Lego</h3>
                </div>
                <p className="text-white/60 text-sm mb-6">
                  Build modular components for migration estimations
                </p>
                <button 
                  onClick={() => navigate('/manage-legos/0')}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl font-semibold transition-all shadow-lg shadow-cyan-500/30">
                  <span className="flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Lego
                  </span>
                </button>
              </div>
            </div>

            {/* Create New Pipeline */}
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-br from-green-500 via-emerald-500 to-green-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-green-500/10 border-2 border-green-500/30 hover:border-green-400/60 rounded-2xl p-8 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl shadow-lg shadow-green-500/30">
                    ⚙️
                  </div>
                  <h3 className="text-xl font-bold text-white">Create New Pipeline</h3>
                </div>
                <p className="text-white/60 text-sm mb-6">
                  Design custom migration pipelines tailored to your needs
                </p>
                <button 
                  onClick={() => navigate('/create-pipeline/1')}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl font-semibold transition-all shadow-lg shadow-green-500/30">
                  <span className="flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Pipeline
                  </span>
                </button>
              </div>
            </div>

            {/* Templates */}
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-orange-500/10 border-2 border-orange-500/30 hover:border-orange-400/60 rounded-2xl p-8 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/30">
                    📋
                  </div>
                  <h3 className="text-xl font-bold text-white">Templates</h3>
                </div>
                <p className="text-white/60 text-sm mb-6">
                  Browse and use pre-built migration templates
                </p>
                <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl font-semibold transition-all shadow-lg shadow-orange-500/30">
                  <span className="flex items-center justify-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    Browse Templates
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
