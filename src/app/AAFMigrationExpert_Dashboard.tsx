import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { projectRepository } from '../utils/projectRepository';
import type { Project } from '../utils/projectRepository';
import { useUser } from '../contexts/UserContext';

interface Stat {
  label: string;
  value: string;
  trend: string;
  icon: string;
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

export default function AAFMigrationExpert() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Load projects on mount
  useEffect(() => {
    const projects = projectRepository.getAllProjects();
    setActiveProjects(projects);
  }, []);

  const handleDownloadProjectsJSON = () => {
    projectRepository.downloadProjectsJSON();
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const stats: Stat[] = [
    { label: 'Active Migrations', value: activeProjects.length.toString(), trend: '+3 this week', icon: '⚡' },
    { label: 'Pipelines Running', value: '8', trend: '2 pending', icon: '🔄' },
    { label: 'Tokens Used This Month', value: '847K', trend: '+124K', icon: '🎯' },
    { label: 'Code Migrated This Month', value: '156K', trend: 'lines of code', icon: '📈' },
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

  const navigate = useNavigate();
  const { currentUser, activeRole } = useUser();

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
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="text-2xl text-red-500">◈</span>
            <span className="text-lg font-bold">DSE 2.0</span>
          </Link>
          <span className="text-white/30">|</span>
          <span className="text-sm text-white/60">Migration Expert Dashboard</span>
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
          <button
            onClick={handleDownloadProjectsJSON}
            className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1"
            title="Download projects.json"
          >
            <span>💾</span>
          </button>
          <div className="relative cursor-pointer">
            <span className="text-lg">🔔</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1.5 rounded-full font-semibold">3</span>
          </div>
          <div className="group relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center text-xs font-semibold cursor-pointer">
              {currentUser?.initials || 'PN'}
            </div>
            {/* User info tooltip */}
            <div className="absolute right-0 top-12 bg-slate-900 border border-white/20 rounded-xl p-4 min-w-[200px] opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity shadow-2xl z-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center text-sm font-semibold">
                  {currentUser?.initials || 'PN'}
                </div>
                <div>
                  <p className="font-semibold text-sm">{currentUser?.fullName || 'Pramod Nair'}</p>
                  <p className="text-xs text-white/50">{currentUser?.email || 'pramod.nair@company.com'}</p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-3">
                <p className="text-xs text-white/40 mb-1">Active Role:</p>
                <p className="text-sm font-medium text-cyan-400">{activeRole || currentUser?.primaryRole || 'Migration Expert'}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <section className="flex justify-between items-center mb-8">
          <div>
            <p className="text-white/50 text-sm mb-1">Good morning, {currentUser?.fullName || 'Pramod Nair'}</p>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-orange-400">AAF Migration </span> Workspace
            </h1>
            <p className="text-white/60 text-sm mt-2">
              {activeRole || currentUser?.primaryRole || 'Migration Expert'} • {activeProjects.length} active projects • 8 pipelines running
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/create-project" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-3 rounded-lg font-semibold text-sm shadow-lg shadow-red-500/30 transition-all">
              + New Migration
            </Link>
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

        {/* Active Projects - Reimagined */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Active Migration Projects</h2>
              <p className="text-sm text-white/50">{activeProjects.length} projects in progress • Click to select, double-click to open</p>
            </div>
            <button className="text-red-500 text-sm hover:text-red-400 transition-colors flex items-center gap-2">
              View All Projects
              <span>→</span>
            </button>
          </div>
          
          {/* Horizontal Scrollable Project Cards with Scroll Buttons */}
          <div className="relative group">
            {/* Left Scroll Button */}
            <button 
              onClick={handleScrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-r from-black via-black/90 to-transparent flex items-center justify-center text-white/60 hover:text-white transition-all opacity-0 group-hover:opacity-100 -ml-6"
            >
              <span className="text-2xl">←</span>
            </button>

            {/* Right Scroll Button */}
            <button 
              onClick={handleScrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-l from-black via-black/90 to-transparent flex items-center justify-center text-white/60 hover:text-white transition-all opacity-0 group-hover:opacity-100 -mr-6"
            >
              <span className="text-2xl">→</span>
            </button>

            <div ref={scrollContainerRef} id="projects-scroll" className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent scroll-smooth">
              {activeProjects.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  onDoubleClick={() => navigate(`/project-pipeline/${project.id}`)}
                  className={`flex-shrink-0 w-80 bg-white/[0.02] border rounded-2xl p-6 cursor-pointer transition-all hover:bg-white/[0.03] hover:border-white/20 ${
                    selectedProject === project.id 
                      ? 'border-red-500/30 bg-red-500/[0.03] shadow-lg shadow-red-500/10' 
                      : 'border-white/[0.08]'
                  }`}
                >
                  {/* Status & Priority Row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${project.status === 'Review' ? 'text-yellow-300/80 bg-yellow-500/10 border border-yellow-500/20' : 'text-emerald-300/80 bg-emerald-500/10 border border-emerald-500/20'}`}>
                      ● {project.status}
                    </span>
                    <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${getPriorityColor(project.priority)} border ${project.priority === 'High' ? 'border-red-500/20' : project.priority === 'Medium' ? 'border-yellow-500/20' : 'border-green-500/20'}`}>
                      {project.priority} Priority
                    </span>
                  </div>

                  {/* Tuna ID Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                      <span className="text-xs text-white/50 font-medium">ID:</span>
                      <span className="text-sm font-bold text-red-300/90">{project.tunaId}</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>

                  {/* Project Info */}
                  <div className="mb-5">
                    <h3 className="text-lg font-bold mb-2 text-white/90 leading-tight">{project.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/40">Module:</span>
                      <span className="text-xs text-white/60 font-medium">{project.module}</span>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="bg-white/[0.01] border border-white/[0.08] rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-white/50">Migration Progress</span>
                      <span className="text-xl font-bold text-red-300/80">{project.progress}%</span>
                    </div>
                    <div className="h-2.5 bg-white/[0.08] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-400/60 via-orange-400/60 to-yellow-400/60 rounded-full transition-all duration-700 relative"
                        style={{ width: `${project.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/project-pipeline/${project.id}`);
                      }}
                      className="py-2.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 hover:border-blue-500/40 rounded-lg text-sm font-medium text-blue-300/90 hover:text-blue-200 transition-all"
                    >
                      Open Pipeline
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="py-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-lg text-sm font-medium text-white/70 hover:text-white/90 transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions - Moved to Bottom */}
        <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-5">Quick Actions</h2>
          <div className="grid grid-cols-6 gap-3">
            {quickActions.map((action, index) => (
              <button 
                key={index}
                className="flex flex-col items-center gap-3 p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.08] hover:border-red-500/30 hover:scale-105 transition-all"
              >
                <span className="text-3xl">{action.icon}</span>
                <div className="text-center">
                  <div className="text-sm font-medium mb-1">{action.label}</div>
                  <div className="text-xs text-white/40">{action.desc}</div>
                </div>
              </button>
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
}