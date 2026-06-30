import React, { useState } from 'react';

interface Stat {
  label: string;
  value: string;
  trend: string;
  icon: string;
}

interface Project {
  id: number;
  tunaId: string;
  name: string;
  module: string;
  progress: number;
  status: string;
  priority: 'High' | 'Medium' | 'Low';
}

interface QuickAction {
  icon: string;
  label: string;
  desc: string;
}

interface Activity {
  type: 'success' | 'warning' | 'info';
  message: string;
  time: string;
  project: string;
}

interface Template {
  name: string;
  uses: string;
  rating: number;
}

const AAFDashboard: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const stats: Stat[] = [
    { label: 'Active Migrations', value: '12', trend: '+3 this week', icon: '⚡' },
    { label: 'Pipelines Running', value: '8', trend: '2 pending', icon: '🔄' },
    { label: 'Success Rate', value: '94.2%', trend: '+2.1%', icon: '✓' },
    { label: 'Code Analyzed', value: '2.4M', trend: 'lines', icon: '📊' },
  ];

  const activeProjects: Project[] = [
    { id: 1, tunaId: 'TUNA-4521', name: 'Java 8 → 17 Migration', module: 'Core Banking API', progress: 78, status: 'In Progress', priority: 'High' },
    { id: 2, tunaId: 'TUNA-4498', name: 'Spring Boot 2 → 3 Upgrade', module: 'Payment Gateway', progress: 45, status: 'In Progress', priority: 'Medium' },
    { id: 3, tunaId: 'TUNA-4387', name: 'Legacy COBOL Wrapper', module: 'Account Services', progress: 92, status: 'Review', priority: 'High' },
    { id: 4, tunaId: 'TUNA-4612', name: 'API Modernization', module: 'Customer Portal', progress: 23, status: 'In Progress', priority: 'Low' },
  ];

  const quickActions: QuickAction[] = [
    { icon: '🚀', label: 'New Migration', desc: 'Start automated migration' },
    { icon: '🔧', label: 'Pipeline Builder', desc: 'Create CI/CD pipeline' },
    { icon: '🔍', label: 'Code Analysis', desc: 'Scan & analyze codebase' },
    { icon: '📋', label: 'Templates', desc: 'Browse automation templates' },
    { icon: '🤖', label: 'AI Assistant', desc: 'Get coding help' },
    { icon: '📚', label: 'Documentation', desc: 'Guides & references' },
  ];

  const recentActivity: Activity[] = [
    { type: 'success', message: 'Pipeline #847 completed successfully', time: '5 min ago', project: 'Core Banking API' },
    { type: 'warning', message: 'Code review requested for PR #234', time: '23 min ago', project: 'Payment Gateway' },
    { type: 'info', message: 'Migration checkpoint saved', time: '1 hour ago', project: 'Account Services' },
    { type: 'success', message: '1,247 files auto-migrated', time: '2 hours ago', project: 'Core Banking API' },
  ];

  const templates: Template[] = [
    { name: 'Java Version Migration', uses: '2.3k', rating: 4.8 },
    { name: 'Spring Boot Upgrade', uses: '1.8k', rating: 4.7 },
    { name: 'REST to GraphQL', uses: '956', rating: 4.5 },
    { name: 'Microservices Split', uses: '743', rating: 4.6 },
  ];

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-green-500/20 text-green-400';
    }
  };

  const getActivityColor = (type: string): string => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 99, 71, 0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 99, 71, 0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-8 py-4 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl text-red-500">◈</span>
          <span className="text-lg font-bold">DSE 2.0</span>
          <span className="text-white/30">|</span>
          <span className="text-sm text-white/60">Automation Factory</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
            <span className="text-white/40">⌕</span>
            <input 
              type="text" 
              placeholder="Search projects, templates..." 
              className="bg-transparent border-none text-sm w-48 outline-none text-white placeholder-white/40"
            />
            <span className="text-xs text-white/30 bg-white/10 px-2 py-0.5 rounded">⌘K</span>
          </div>
          <div className="relative cursor-pointer">
            <span className="text-lg">🔔</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1.5 rounded-full font-semibold">3</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center text-xs font-semibold cursor-pointer">
            JD
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <section className="flex justify-between items-center mb-8">
          <div>
            <p className="text-white/50 text-sm mb-1">Good morning, Migration Expert</p>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-orange-400">AAF Migration Expert</span> Workspace
            </h1>
            <p className="text-white/60 text-sm mt-2">
              Advanced Feature Framework • 12 active projects • 8 pipelines running
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-3 rounded-lg font-semibold text-sm shadow-lg shadow-red-500/30 transition-all">
              + New Migration
            </button>
            <button className="bg-white/5 border border-white/15 hover:bg-white/10 px-6 py-3 rounded-lg font-medium text-sm transition-all">
              View All Projects
            </button>
          </div>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5 flex items-center gap-4 hover:bg-white/[0.05] transition-all"
            >
              <div className="text-2xl w-12 h-12 flex items-center justify-center bg-red-500/10 rounded-xl">
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight">{stat.value}</span>
                <span className="text-xs text-white/60">{stat.label}</span>
                <span className="text-xs text-green-400">{stat.trend}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-[1fr_380px] gap-6 mb-8">
          {/* Active Projects */}
          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold">Active Projects</h2>
              <button className="text-red-500 text-sm hover:text-red-400 transition-colors">See all →</button>
            </div>
            {/* Column Headers */}
            <div className="flex items-center gap-4 px-4 py-2 mb-3 text-xs text-white/40 uppercase tracking-wider border-b border-white/[0.06]">
              <span className="w-24">Tuna ID</span>
              <span className="flex-1">Project Name</span>
              <span className="w-20">Progress</span>
              <span className="w-24 text-right">Status</span>
            </div>
            <div className="flex flex-col gap-3">
              {activeProjects.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  className={`bg-white/[0.03] border rounded-xl p-4 cursor-pointer transition-all hover:bg-white/[0.05] ${
                    selectedProject === project.id 
                      ? 'border-red-500/50 bg-red-500/5' 
                      : 'border-white/[0.06]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded">{project.tunaId}</span>
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm">{project.name}</h3>
                      <span className="text-xs text-white/50">{project.module}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-red-400 min-w-[40px]">{project.progress}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-medium ${project.status === 'Review' ? 'text-yellow-400' : 'text-green-400'}`}>
                      ● {project.status}
                    </span>
                    <button className="text-xs text-white/60 hover:text-white transition-colors">Open →</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Quick Actions */}
            <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-3 gap-2">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="flex flex-col items-center gap-2 p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.08] hover:border-red-500/30 transition-all"
                  >
                    <span className="text-2xl">{action.icon}</span>
                    <span className="text-xs text-white/80 text-center">{action.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <span className="text-xs text-green-400">● Live</span>
              </div>
              <div className="flex flex-col gap-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getActivityColor(activity.type)}`} />
                    <div>
                      <p className="text-sm leading-relaxed">{activity.message}</p>
                      <div className="flex gap-2 text-xs text-white/40 mt-1">
                        <span>{activity.project}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Templates Section */}
        <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold">Popular Templates</h2>
            <button className="text-red-500 text-sm hover:text-red-400 transition-colors">Browse all →</button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {templates.map((template, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                <div className="text-2xl w-12 h-12 flex items-center justify-center bg-red-500/10 rounded-lg">
                  📦
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{template.name}</h3>
                  <div className="flex gap-3 text-xs text-white/50 mt-1">
                    <span>⬇ {template.uses}</span>
                    <span>★ {template.rating}</span>
                  </div>
                </div>
                <button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-medium px-3 py-1.5 rounded-md transition-all">
                  Use
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* AI Assistant Widget */}
        <div className="fixed bottom-8 right-8 flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 px-5 py-3 rounded-full cursor-pointer shadow-lg shadow-red-500/40 hover:shadow-red-500/60 transition-all z-50">
          <span className="text-lg">🤖</span>
          <span className="text-sm font-semibold">AI Assistant</span>
        </div>
      </main>
    </div>
  );
};

export default AAFDashboard;
