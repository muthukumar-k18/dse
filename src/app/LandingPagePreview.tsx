import { useState } from 'react';
import { Monitor } from 'lucide-react';
import LandingPageOption1 from './LandingPageOption1';
import LandingPageOption2 from './LandingPageOption2';
import LandingPageOption3 from './LandingPageOption3';

// Preview component to compare all three landing page options
export default function LandingPagePreview() {
  const [selectedOption, setSelectedOption] = useState<1 | 2 | 3>(1);

  const options = [
    {
      id: 1,
      name: 'Command Center',
      description: 'Technical dashboard with stats, structured layout, professional tone',
      component: LandingPageOption1,
      tags: ['Dashboard', 'Technical', 'Stats-Heavy']
    },
    {
      id: 2,
      name: 'Holographic Matrix',
      description: 'Futuristic cyberpunk with 3D cards, heavy animations, bold design',
      component: LandingPageOption2,
      tags: ['Cyberpunk', '3D Effects', 'Animated']
    },
    {
      id: 3,
      name: 'Minimalist Premium',
      description: 'Clean, elegant design with subtle effects, modern sophistication',
      component: LandingPageOption3,
      tags: ['Minimal', 'Elegant', 'Subtle']
    }
  ];

  const CurrentComponent = options[selectedOption - 1].component;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Preview Control Bar */}
      <div className="sticky top-0 z-50 bg-gray-950 border-b border-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Monitor className="w-5 h-5 text-red-500" />
              <h1 className="text-lg font-bold">Landing Page Design Options</h1>
            </div>
            <div className="text-sm text-gray-400">Select your preferred design</div>
          </div>

          {/* Option Selector */}
          <div className="grid grid-cols-3 gap-4">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id as 1 | 2 | 3)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  selectedOption === option.id
                    ? 'bg-red-500/10 border-red-500 shadow-lg shadow-red-500/20'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg">Option {option.id}</h3>
                  {selectedOption === option.id && (
                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-xs">✓</div>
                  )}
                </div>
                <p className="text-sm font-semibold text-red-400 mb-2">{option.name}</p>
                <p className="text-xs text-gray-400 mb-3 leading-relaxed">{option.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {option.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="relative">
        <div className="absolute top-4 right-4 z-40 bg-black/80 backdrop-blur-xl border border-white/20 rounded-lg px-4 py-2 text-sm">
          <span className="text-gray-400">Viewing: </span>
          <span className="text-red-400 font-bold">{options[selectedOption - 1].name}</span>
        </div>
        <CurrentComponent />
      </div>
    </div>
  );
}
