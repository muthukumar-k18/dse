import { ArrowRight, User, Briefcase, DollarSign, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

// OPTION 3: "Minimalist Premium" - Clean, elegant, modern with subtle sophistication
export default function LandingPageOption3() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white">
      {/* Subtle grid background */}
      <div className="fixed inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Ambient light */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10">
        {/* Minimalist Header */}
        <header className="border-b border-white/5">
          <div className="container mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded"></div>
                <span className="text-sm font-medium tracking-wide">DSE 2.0</span>
              </div>
              <div className="text-xs text-gray-500 tracking-wider">ENTERPRISE EDITION</div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-8">
          {/* Hero Section */}
          <div className="min-h-[80vh] flex items-center justify-center">
            <div className="max-w-5xl w-full">
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full text-xs mb-12 border border-white/10">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <span className="text-gray-400">Version 2.0 Now Available</span>
                </div>
                
                <h1 className="text-8xl font-light mb-8 tracking-tight leading-none">
                  Digital Software
                  <br />
                  <span className="font-normal">Engineer</span>
                  <span className="text-red-500"> 2.0</span>
                </h1>
                
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                  Enterprise-grade development platform designed for modern teams
                </p>
              </div>

              {/* Clean portal cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Business User */}
                <button className="group relative bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-red-500/50 rounded-2xl p-8 transition-all duration-300 text-left">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                  
                  <div className="relative">
                    <div className="mb-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-600/20 border border-red-500/20 flex items-center justify-center group-hover:border-red-500/40 transition-colors">
                        <Briefcase className="w-6 h-6 text-red-400" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-light mb-3">Business User</h3>
                    <p className="text-gray-500 text-sm mb-6 font-light leading-relaxed">
                      Strategic insights and executive decision-making tools
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-red-400 group-hover:gap-3 transition-all">
                      <span>Access Portal</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* AAF User */}
                <Link to="/aaf-user" className="group relative bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-red-500/50 rounded-2xl p-8 transition-all duration-300 text-left">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                  
                  <div className="relative">
                    <div className="mb-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-600/20 border border-red-500/20 flex items-center justify-center group-hover:border-red-500/40 transition-colors">
                        <User className="w-6 h-6 text-red-400" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-light mb-3">AAF User</h3>
                    <p className="text-gray-500 text-sm mb-6 font-light leading-relaxed">
                      Advanced application framework and migration tools
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-red-400 group-hover:gap-3 transition-all">
                      <span>Access Portal</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>

                {/* Finance User */}
                <button className="group relative bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-red-500/50 rounded-2xl p-8 transition-all duration-300 text-left">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                  
                  <div className="relative">
                    <div className="mb-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-600/20 border border-red-500/20 flex items-center justify-center group-hover:border-red-500/40 transition-colors">
                        <DollarSign className="w-6 h-6 text-red-400" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-light mb-3">Finance User</h3>
                    <p className="text-gray-500 text-sm mb-6 font-light leading-relaxed">
                      Financial analytics and comprehensive reporting
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-red-400 group-hover:gap-3 transition-all">
                      <span>Access Portal</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              </div>

              {/* Feature list */}
              <div className="mt-24 pt-12 border-t border-white/5">
                <div className="grid md:grid-cols-3 gap-x-12 gap-y-6 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white mb-1">AI-Powered Intelligence</p>
                      <p className="text-gray-500 text-xs font-light">Advanced machine learning capabilities</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white mb-1">Real-Time Collaboration</p>
                      <p className="text-gray-500 text-xs font-light">Seamless team synchronization</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white mb-1">Enterprise Security</p>
                      <p className="text-gray-500 text-xs font-light">Bank-level encryption standards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white mb-1">Cloud Infrastructure</p>
                      <p className="text-gray-500 text-xs font-light">Global deployment network</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white mb-1">Analytics Dashboard</p>
                      <p className="text-gray-500 text-xs font-light">Comprehensive data insights</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white mb-1">24/7 Support</p>
                      <p className="text-gray-500 text-xs font-light">Dedicated success team</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Minimal Footer */}
        <footer className="container mx-auto px-8 py-8 border-t border-white/5">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <p>© 2026 Digital Software Engineer 2.0</p>
            <div className="flex items-center gap-6">
              <span>Terms</span>
              <span>Privacy</span>
              <span>Security</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
