import { X, TrendingUp, AlertTriangle, Clock, Users, Target, CheckCircle2, DollarSign } from 'lucide-react';

interface Lego {
  id: string;
  name: string;
  description: string;
  type: 'transform' | 'validate' | 'migrate' | 'test' | 'config';
  status: 'ready' | 'beta' | 'new';
  docUrl: string;
}

interface Pattern {
  id: string;
  name: string;
  source: string;
  target: string;
  category: string;
  effort: 'Low' | 'Medium' | 'High';
  successRate: number;
  risk: 'Low' | 'Medium' | 'High';
  legos: Lego[];
}

interface EffortRiskAnalysisProps {
  selectedPatterns: Pattern[];
  tunaId?: string;
  projectName?: string;
  onClose: () => void;
  onCreateProject: () => void;
}

export default function EffortRiskAnalysis({ 
  selectedPatterns, 
  tunaId, 
  projectName,
  onClose, 
  onCreateProject 
}: EffortRiskAnalysisProps) {
  
  // Calculate aggregated metrics
  const totalLegos = selectedPatterns.reduce((sum, p) => sum + p.legos.length, 0);
  const avgSuccessRate = selectedPatterns.reduce((sum, p) => sum + p.successRate, 0) / selectedPatterns.length;
  
  const effortDistribution = {
    Low: selectedPatterns.filter(p => p.effort === 'Low').length,
    Medium: selectedPatterns.filter(p => p.effort === 'Medium').length,
    High: selectedPatterns.filter(p => p.effort === 'High').length,
  };

  const riskDistribution = {
    Low: selectedPatterns.filter(p => p.risk === 'Low').length,
    Medium: selectedPatterns.filter(p => p.risk === 'Medium').length,
    High: selectedPatterns.filter(p => p.risk === 'High').length,
  };

  // Calculate overall effort and risk levels
  const getOverallLevel = (distribution: { Low: number; Medium: number; High: number }): 'Low' | 'Medium' | 'High' => {
    if (distribution.High > 0) return 'High';
    if (distribution.Medium > 0) return 'Medium';
    return 'Low';
  };

  const overallEffort = getOverallLevel(effortDistribution);
  const overallRisk = getOverallLevel(riskDistribution);

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'Low': return 'text-green-400 bg-green-400/10';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'High': return 'text-red-400 bg-red-400/10';
      default: return 'text-white/50 bg-white/5';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400 bg-green-400/10';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'High': return 'text-red-400 bg-red-400/10';
      default: return 'text-white/50 bg-white/5';
    }
  };

  // Estimated timeline (based on effort level)
  const estimatedDays = overallEffort === 'High' ? '45-60' : overallEffort === 'Medium' ? '20-30' : '10-15';
  const teamSize = overallEffort === 'High' ? '4-6' : overallEffort === 'Medium' ? '2-3' : '1-2';

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-8">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-white/10 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <h2 className="text-xl font-semibold mb-1">Effort & Risk Analysis</h2>
            <p className="text-sm text-white/50">
              {tunaId && <span className="text-red-400 font-mono">{tunaId}</span>}
              {projectName && <span className="ml-2">• {projectName}</span>}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          
          {/* Overview Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-white/50">Patterns</span>
              </div>
              <div className="text-2xl font-bold">{selectedPatterns.length}</div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-xs text-white/50">Success Rate</span>
              </div>
              <div className="text-2xl font-bold">{avgSuccessRate.toFixed(1)}%</div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-white/50">Timeline</span>
              </div>
              <div className="text-xl font-bold">{estimatedDays} days</div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-white/50">Team Size</span>
              </div>
              <div className="text-xl font-bold">{teamSize}</div>
            </div>
          </div>

          {/* Effort & Risk Summary */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">Overall Effort</h3>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getEffortColor(overallEffort)}`}>
                  {overallEffort}
                </span>
                <span className="text-sm text-white/50">
                  Based on {selectedPatterns.length} pattern{selectedPatterns.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="space-y-2">
                {Object.entries(effortDistribution).map(([level, count]) => (
                  count > 0 && (
                    <div key={level} className="flex items-center justify-between text-sm">
                      <span className="text-white/60">{level} Effort</span>
                      <span className="text-white/80">{count} pattern{count > 1 ? 's' : ''}</span>
                    </div>
                  )
                ))}
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <h3 className="font-semibold">Overall Risk</h3>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getRiskColor(overallRisk)}`}>
                  {overallRisk}
                </span>
                <span className="text-sm text-white/50">
                  Assessed from all patterns
                </span>
              </div>
              <div className="space-y-2">
                {Object.entries(riskDistribution).map(([level, count]) => (
                  count > 0 && (
                    <div key={level} className="flex items-center justify-between text-sm">
                      <span className="text-white/60">{level} Risk</span>
                      <span className="text-white/80">{count} pattern{count > 1 ? 's' : ''}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Selected Patterns Breakdown */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 mb-6">
            <h3 className="font-semibold mb-4">Selected Patterns Breakdown</h3>
            <div className="space-y-3">
              {selectedPatterns.map((pattern) => (
                <div 
                  key={pattern.id} 
                  className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{pattern.name}</h4>
                      <p className="text-xs text-white/50">
                        {pattern.source} → {pattern.target}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getEffortColor(pattern.effort)}`}>
                        {pattern.effort}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(pattern.risk)}`}>
                        {pattern.risk} Risk
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/60">
                    <span>{pattern.legos.length} Legos</span>
                    <span>•</span>
                    <span>{pattern.successRate}% Success Rate</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
              Recommendations
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              {overallRisk === 'High' && (
                <li className="flex gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>High-risk patterns detected. Consider creating detailed rollback plans.</span>
                </li>
              )}
              {overallEffort === 'High' && (
                <li className="flex gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>This is a high-effort migration. Recommend breaking into smaller phases.</span>
                </li>
              )}
              <li className="flex gap-2">
                <span className="text-green-400">•</span>
                <span>All selected patterns have proven Legos with {avgSuccessRate.toFixed(0)}% average success rate.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">•</span>
                <span>Total of {totalLegos} automated Legos will be executed during migration.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-white/[0.02]">
          <div className="text-sm text-white/50">
            Ready to create migration project?
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onCreateProject}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-sm font-semibold shadow-lg shadow-red-500/30 transition-all"
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
