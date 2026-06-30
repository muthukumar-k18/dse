import { User, Briefcase, DollarSign } from 'lucide-react';
import { Link } from 'react-router';
import futuristicImage from 'figma:asset/06a536d8147b6086eb27e189e864f0698072eb82.png';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Blurred Background Image */}
      <div className="absolute inset-0">
        <img 
          src={futuristicImage} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 backdrop-blur-xl bg-black/5"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(139, 0, 0, 0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(139, 0, 0, 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Hero Section */}
      <main className="relative container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Hero Content */}
          <div className="text-center space-y-6 pt-12">
            <div className="inline-block px-4 py-2 bg-red-950/50 border border-red-500/30 rounded-full text-sm text-red-400 backdrop-blur-sm">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              Next-Gen Platform
            </div>
            <h2 className="text-6xl lg:text-7xl leading-tight tracking-tight">
              Welcome to the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-orange-500">
                Digital Software Engineer 2.0
              </span>
            </h2>
            <p className="text-sm text-gray-400 uppercase tracking-widest">Future of Development</p>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience next-generation software engineering with AI-powered intelligence and quantum-speed automation
            </p>
          </div>

          {/* Persona Selection */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
              <h3 className="text-lg text-red-400 uppercase tracking-widest">Select Your Interface</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Business User */}
              <Link to="/business-user" className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-red-950/30 to-black/30 backdrop-blur-sm border border-red-500/20 hover:border-red-500/50 transition-all hover:scale-105">
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full bg-red-500/20 blur-2xl group-hover:bg-red-500/40 transition-all"></div>
                  
                  {/* Main circle */}
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-red-900/50 to-red-950/30 border-2 border-red-500/30 group-hover:border-red-500/60 flex items-center justify-center transition-all backdrop-blur-sm">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/10 to-transparent"></div>
                    <Briefcase className="w-12 h-12 text-red-300 relative z-10 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                
                <div className="text-center space-y-1">
                  <h4 className="text-2xl tracking-wide">Business User</h4>
                  <p className="text-gray-500 text-sm">Strategic insights and analytics</p>
                </div>
              </Link>

              {/* AAF User */}
              <Link to="/aaf-user" className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-red-950/30 to-black/30 backdrop-blur-sm border border-red-500/20 hover:border-red-500/50 transition-all hover:scale-105">
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full bg-red-500/20 blur-2xl group-hover:bg-red-500/40 transition-all"></div>
                  
                  {/* Main circle */}
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-red-900/50 to-red-950/30 border-2 border-red-500/30 group-hover:border-red-500/60 flex items-center justify-center transition-all backdrop-blur-sm">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/10 to-transparent"></div>
                    <User className="w-12 h-12 text-red-300 relative z-10 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                
                <div className="text-center space-y-1">
                  <h4 className="text-2xl tracking-wide">AAF User</h4>
                  <p className="text-gray-500 text-sm">Advanced feature framework</p>
                </div>
              </Link>

              {/* Finance User */}
              <button className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-red-950/30 to-black/30 backdrop-blur-sm border border-red-500/20 hover:border-red-500/50 transition-all hover:scale-105">
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full bg-red-500/20 blur-2xl group-hover:bg-red-500/40 transition-all"></div>
                  
                  {/* Main circle */}
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-red-900/50 to-red-950/30 border-2 border-red-500/30 group-hover:border-red-500/60 flex items-center justify-center transition-all backdrop-blur-sm">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/10 to-transparent"></div>
                    <DollarSign className="w-12 h-12 text-red-300 relative z-10 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                
                <div className="text-center space-y-1">
                  <h4 className="text-2xl tracking-wide">Finance User</h4>
                  <p className="text-gray-500 text-sm">Financial analytics and reports</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}