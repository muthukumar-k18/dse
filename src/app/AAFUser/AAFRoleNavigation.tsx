import { useState } from 'react';
import { ArrowLeft, ArrowRight, GitMerge, TestTube, Users, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

interface Persona {
  id: number;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: string;
  gradient: string;
  glowColor: string;
  route?: string;
}

export default function AAFRoleNavigation() {
  const [selectedPersona, setSelectedPersona] = useState<number | null>(null);
  const navigate = useNavigate();

  const personas: Persona[] = [
    {
      id: 1,
      icon: GitMerge,
      title: 'Migration Expert',
      subtitle: 'Java upgrades & legacy modernization',
      color: '#f97316',
      gradient: 'from-orange-500 to-amber-500',
      glowColor: 'rgba(249, 115, 22, 0.15)',
      route: '/aaf-migration-expert',
    },
    {
      id: 2,
      icon: TestTube,
      title: 'Tester',
      subtitle: 'Automated testing & QA pipelines',
      color: '#22d3ee',
      gradient: 'from-cyan-400 to-teal-500',
      glowColor: 'rgba(34, 211, 238, 0.15)',
    },
    {
      id: 3,
      icon: Users,
      title: 'Program Manager',
      subtitle: 'Project tracking & team coordination',
      color: '#a855f7',
      gradient: 'from-purple-500 to-violet-500',
      glowColor: 'rgba(168, 85, 247, 0.15)',
    },
    {
      id: 4,
      icon: Settings,
      title: 'DevOps',
      subtitle: 'CI/CD pipelines & infrastructure',
      color: '#10b981',
      gradient: 'from-emerald-500 to-green-500',
      glowColor: 'rgba(16, 185, 129, 0.15)',
    }
  ];

  const handleContinue = () => {
    const selected = personas.find(p => p.id === selectedPersona);
    if (selected?.route) {
      navigate(selected.route);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Colorful Background Glows */}
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-orange-500/[0.08] rounded-full blur-[150px]" />
        <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-cyan-500/[0.06] rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[450px] h-[450px] bg-purple-500/[0.07] rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] left-[15%] w-[350px] h-[350px] bg-emerald-500/[0.05] rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <Link to="/" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-semibold">DSE 2.0</span>
          <span className="text-white/30 text-xl">|</span>
          <span className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-cyan-400">Automation Factory</span>
        </div>
        <div className="w-20" /> {/* Spacer for centering */}
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-purple-400 to-cyan-400 tracking-[0.2em] uppercase mb-3 font-medium">AAF Workspace</p>
          <h1 className="text-3xl font-semibold mb-3">Select Your Role</h1>
          <p className="text-sm text-white/50">Choose your developer persona to continue</p>
        </div>

        {/* Persona Cards - Horizontal Layout */}
        <div className="flex gap-6 flex-wrap justify-center mb-12">
          {personas.map((persona) => {
            const Icon = persona.icon;
            const isSelected = selectedPersona === persona.id;

            return (
              <div
                key={persona.id}
                onClick={() => setSelectedPersona(persona.id)}
                className="relative cursor-pointer group"
              >
                {/* Glow effect on hover/select */}
                <div 
                  className={`absolute inset-0 rounded-xl blur-xl transition-opacity duration-300 ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                  }`}
                  style={{ backgroundColor: persona.glowColor }}
                />
                
                <div
                  className={`relative w-52 p-6 rounded-xl transition-all duration-200 border ${
                    isSelected 
                      ? 'bg-white/[0.08] scale-105' 
                      : 'bg-white/[0.02] hover:bg-white/[0.05]'
                  }`}
                  style={{
                    borderColor: isSelected ? persona.color : 'rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-5">
                    <div 
                      className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${persona.gradient} shadow-lg transition-transform duration-200 ${
                        isSelected ? 'scale-110' : 'group-hover:scale-105'
                      }`}
                      style={{
                        boxShadow: `0 8px 24px ${persona.glowColor}`
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="text-center">
                    <h3 className="text-sm font-semibold mb-1 text-white">
                      {persona.title}
                    </h3>
                    <p className="text-xs text-white/50">{persona.subtitle}</p>
                  </div>

                  {/* Selection indicator */}
                  <div className={`flex justify-center mt-4 transition-opacity duration-200 ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: persona.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        {(() => {
          const selected = personas.find(p => p.id === selectedPersona);
          return (
            <button 
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                selectedPersona 
                  ? `bg-gradient-to-r ${selected?.gradient} text-white shadow-lg hover:scale-105` 
                  : 'bg-white/[0.05] text-white/30 cursor-not-allowed'
              }`}
              style={{
                boxShadow: selectedPersona ? `0 10px 30px ${selected?.glowColor}` : 'none'
              }}
              disabled={!selectedPersona}
              onClick={handleContinue}
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          );
        })()}

        {/* Footer hint */}
        <p className="mt-8 text-xs text-white/30">
          You can change your role anytime from settings
        </p>
      </main>
    </div>
  );
}
