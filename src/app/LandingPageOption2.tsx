import { ArrowRight, User, Briefcase, DollarSign, Sparkles, Layers, Binary } from 'lucide-react';
import { Link } from 'react-router';

// OPTION 2: "Holographic Matrix" - Futuristic cyberpunk with 3D-style cards and heavy animations
export default function LandingPageOption2() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Matrix Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/30 to-black"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          ></div>
        ))}

        {/* Diagonal lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"
              style={{
                width: '200%',
                top: `${i * 10}%`,
                left: '-50%',
                transform: `rotate(-45deg)`,
                animation: `pulse ${3 + i}s infinite ease-in-out`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Futuristic Header */}
        <header className="backdrop-blur-xl bg-black/20 border-b border-red-500/30">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500 blur-xl opacity-50"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-lg transform rotate-45"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Binary className="w-6 h-6 text-white transform -rotate-45" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-wider">DSE 2.0</h1>
                  <p className="text-xs text-red-400 font-mono">SYSTEM_INITIALIZED</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="font-mono text-red-400">CYBER_NET_ACTIVE</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400">ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-20">
          {/* Hero Section with Holographic Effect */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-red-500/10 border border-red-500/50 rounded-full text-sm mb-8 backdrop-blur-xl">
              <Sparkles className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-red-400 font-mono tracking-wider">NEXT_GENERATION_PLATFORM</span>
            </div>
            
            <h1 className="text-8xl font-black mb-6 tracking-tighter relative">
              <span className="text-white">DIGITAL</span>
              <br />
              <span className="relative inline-block">
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 blur-xl">
                  SOFTWARE
                </span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  SOFTWARE
                </span>
              </span>
              <br />
              <span className="text-white">ENGINEER</span>
              <span className="text-red-500"> 2.0</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Step into the future with AI-powered development, real-time collaboration, 
              and quantum-speed processing
            </p>

            {/* Holographic metrics */}
            <div className="flex items-center justify-center gap-8 text-sm font-mono">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">LATENCY: 2ms</span>
              </div>
              <div className="w-px h-6 bg-red-500/30"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-400">LOAD: 32%</span>
              </div>
              <div className="w-px h-6 bg-red-500/30"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-purple-400">ACTIVE: 5,247</span>
              </div>
            </div>
          </div>

          {/* 3D Persona Cards */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-500"></div>
                <Layers className="w-5 h-5 text-red-500" />
                <span className="text-lg font-bold tracking-widest text-red-400">SELECT INTERFACE</span>
                <Layers className="w-5 h-5 text-red-500" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-500"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Business User - 3D Card */}
              <button className="group relative perspective-1000">
                <div className="relative bg-gradient-to-br from-red-950/50 to-black/80 backdrop-blur-xl border-2 border-red-500/30 rounded-3xl p-10 transition-all duration-500 group-hover:border-red-500 group-hover:shadow-2xl group-hover:shadow-red-500/30 transform group-hover:-translate-y-4 group-hover:rotate-y-12">
                  {/* Holographic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/5 to-red-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Corner accents */}
                  <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-red-500/50"></div>
                  <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-red-500/50"></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-6 rounded-2xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all">
                      <Briefcase className="w-12 h-12 text-white" />
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-3">Business User</h3>
                    <p className="text-gray-400 mb-6">Strategic command center</p>
                    
                    <div className="flex items-center gap-2 text-red-400 font-mono text-sm">
                      <span>[</span>
                      <span className="group-hover:text-red-300 transition-colors">ENTER</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span>]</span>
                    </div>
                  </div>
                </div>
              </button>

              {/* AAF User - 3D Card */}
              <Link to="/aaf-user" className="group relative perspective-1000">
                <div className="relative bg-gradient-to-br from-red-950/50 to-black/80 backdrop-blur-xl border-2 border-red-500/30 rounded-3xl p-10 transition-all duration-500 group-hover:border-red-500 group-hover:shadow-2xl group-hover:shadow-red-500/30 transform group-hover:-translate-y-4 group-hover:rotate-y-12">
                  {/* Holographic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/5 to-red-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Corner accents */}
                  <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-red-500/50"></div>
                  <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-red-500/50"></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-6 rounded-2xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-3">AAF User</h3>
                    <p className="text-gray-400 mb-6">Advanced framework access</p>
                    
                    <div className="flex items-center gap-2 text-red-400 font-mono text-sm">
                      <span>[</span>
                      <span className="group-hover:text-red-300 transition-colors">ENTER</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span>]</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Finance User - 3D Card */}
              <button className="group relative perspective-1000">
                <div className="relative bg-gradient-to-br from-red-950/50 to-black/80 backdrop-blur-xl border-2 border-red-500/30 rounded-3xl p-10 transition-all duration-500 group-hover:border-red-500 group-hover:shadow-2xl group-hover:shadow-red-500/30 transform group-hover:-translate-y-4 group-hover:rotate-y-12">
                  {/* Holographic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/5 to-red-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Corner accents */}
                  <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-red-500/50"></div>
                  <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-red-500/50"></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-6 rounded-2xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all">
                      <DollarSign className="w-12 h-12 text-white" />
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-3">Finance User</h3>
                    <p className="text-gray-400 mb-6">Financial operations hub</p>
                    
                    <div className="flex items-center gap-2 text-red-400 font-mono text-sm">
                      <span>[</span>
                      <span className="group-hover:text-red-300 transition-colors">ENTER</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span>]</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-8 border-t border-red-500/20 backdrop-blur-xl">
          <div className="flex items-center justify-center">
            <p className="text-gray-500 text-sm font-mono">
              © 2026 DSE_2.0 // ALL_RIGHTS_RESERVED // BUILD_v2.0.1-STABLE
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
