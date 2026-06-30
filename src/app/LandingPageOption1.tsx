import { ArrowRight, User, Briefcase, Zap, Shield, Cpu, DollarSign, Terminal, Lock, Globe } from 'lucide-react';
import { Link } from 'react-router';
import futuristicImage from 'figma:asset/06a536d8147b6086eb27e189e864f0698072eb82.png';

// OPTION 1: "Command Center" - Technical dashboard-like design with data visualizations
export default function LandingPageOption1() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-950/20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(220, 38, 38, 0.03) 2px, transparent 2px),
            linear-gradient(90deg, rgba(220, 38, 38, 0.03) 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header Bar */}
        <header className="border-b border-red-500/20 backdrop-blur-xl bg-black/30">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">DSE 2.0</h1>
                <p className="text-xs text-red-400">Command Center</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
              <div className="text-gray-400">v2.0.1</div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-16">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-sm mb-6">
              <Lock className="w-4 h-4 text-red-400" />
              <span className="text-red-400">SECURE ACCESS PORTAL</span>
            </div>
            
            <h1 className="text-7xl font-bold mb-6 tracking-tight">
              Digital Software
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-[length:200%_100%] animate-gradient">
                Engineer 2.0
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Advanced AI-powered development platform for enterprise migration and automation
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-red-950/30 to-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-4">
                <div className="text-3xl font-bold text-red-400 mb-1">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <div className="bg-gradient-to-br from-red-950/30 to-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-4">
                <div className="text-3xl font-bold text-red-400 mb-1">5,000+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div className="bg-gradient-to-br from-red-950/30 to-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-4">
                <div className="text-3xl font-bold text-red-400 mb-1">250+</div>
                <div className="text-sm text-gray-400">Teams</div>
              </div>
            </div>
          </div>

          {/* User Portals */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Terminal className="w-5 h-5 text-red-500" />
              <h2 className="text-2xl font-bold">ACCESS PORTALS</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 to-transparent"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Business User */}
              <button className="group relative bg-gradient-to-br from-red-950/40 to-black/60 backdrop-blur-sm border border-red-500/30 hover:border-red-500 rounded-2xl p-8 transition-all hover:shadow-2xl hover:shadow-red-500/20 text-left overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-all"></div>
                
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">Business User</h3>
                  <p className="text-gray-400 mb-6">Strategic planning and executive insights</p>
                  
                  <div className="flex items-center gap-2 text-red-400 font-medium">
                    <span>Launch Portal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </button>

              {/* AFF User */}
              <Link to="/aaf-user" className="group relative bg-gradient-to-br from-red-950/40 to-black/60 backdrop-blur-sm border border-red-500/30 hover:border-red-500 rounded-2xl p-8 transition-all hover:shadow-2xl hover:shadow-red-500/20 text-left overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-all"></div>
                
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">AAF User</h3>
                  <p className="text-gray-400 mb-6">Advanced application framework tools</p>
                  
                  <div className="flex items-center gap-2 text-red-400 font-medium">
                    <span>Launch Portal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Finance User */}
              <button className="group relative bg-gradient-to-br from-red-950/40 to-black/60 backdrop-blur-sm border border-red-500/30 hover:border-red-500 rounded-2xl p-8 transition-all hover:shadow-2xl hover:shadow-red-500/20 text-left overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-all"></div>
                
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">Finance User</h3>
                  <p className="text-gray-400 mb-6">Financial analytics and reporting suite</p>
                  
                  <div className="flex items-center gap-2 text-red-400 font-medium">
                    <span>Launch Portal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-950/20 to-black/40 backdrop-blur-sm border border-red-500/20 rounded-xl p-6">
              <Cpu className="w-10 h-10 text-red-500 mb-4" />
              <h4 className="text-lg font-bold mb-2">AI-Powered Intelligence</h4>
              <p className="text-gray-400 text-sm">Machine learning algorithms optimize every workflow</p>
            </div>
            <div className="bg-gradient-to-br from-red-950/20 to-black/40 backdrop-blur-sm border border-red-500/20 rounded-xl p-6">
              <Zap className="w-10 h-10 text-red-500 mb-4" />
              <h4 className="text-lg font-bold mb-2">Quantum Processing</h4>
              <p className="text-gray-400 text-sm">Lightning-fast execution and real-time updates</p>
            </div>
            <div className="bg-gradient-to-br from-red-950/20 to-black/40 backdrop-blur-sm border border-red-500/20 rounded-xl p-6">
              <Shield className="w-10 h-10 text-red-500 mb-4" />
              <h4 className="text-lg font-bold mb-2">Military-Grade Security</h4>
              <p className="text-gray-400 text-sm">End-to-end encryption with zero-trust architecture</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-8 mt-16 border-t border-red-500/20">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm">© 2026 Digital Software Engineer 2.0</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Globe className="w-4 h-4" />
              <span>Global Network Active</span>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(100px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
