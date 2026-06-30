import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

const BottomUpEstimation = () => {
  const navigate = useNavigate();
  const { projectId, method } = useParams();
  
  // Sample REM and patterns data - in real app this would come from project data
  const [remId] = useState('REM-2024-789');
  const [approvalStatus, setApprovalStatus] = useState(null);

  // Check for approval status on component mount
  useEffect(() => {
    const savedEstimation = localStorage.getItem(`estimation_${projectId}`);
    if (savedEstimation) {
      const data = JSON.parse(savedEstimation);
      if (data.approvalStatus) {
        setApprovalStatus(data.approvalStatus);
      }
    }
  }, [projectId]);

  const [selectedPatterns] = useState([
    { id: '10', name: 'JDK Upgrade', source: 'Java 8', target: 'Java 17' },
    { id: '5', name: 'Springboot Vertical Upgrade', source: 'Spring Boot 2.x', target: 'Spring Boot 3.x' },
    { id: '1', name: 'QA/Regression/Functional Testing', source: 'Manual Tests', target: 'Automated Tests' },
  ]);

  const [patternEstimates, setPatternEstimates] = useState(
    selectedPatterns.map(pattern => ({
      patternId: pattern.id,
      patternName: pattern.name,
      complexity: 'Medium', // Simple, Medium, Complex
      legoCount: 5,
      effortPerLego: 5, // hours
      customEffort: 0,
      totalEffort: 25,
    }))
  );

  const [customEstimation, setCustomEstimation] = useState({
    totalHours: 0,
  });

  const [tokenUsage, setTokenUsage] = useState(0);
  
  const [customEstimationMode, setCustomEstimationMode] = useState('add'); // 'add' or 'override'
  
  const [qaTestingEnabled, setQaTestingEnabled] = useState(true);

  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const complexityConfig = {
    Simple: { legos: 3, color: 'green', icon: '🟢' },
    Medium: { legos: 5, color: 'yellow', icon: '🟡' },
    Complex: { legos: 10, color: 'red', icon: '🔴' },
  };

  const handleComplexityChange = (index, complexity) => {
    const updatedEstimates = [...patternEstimates];
    const legoCount = complexityConfig[complexity].legos;
    updatedEstimates[index] = {
      ...updatedEstimates[index],
      complexity,
      legoCount,
      totalEffort: legoCount * updatedEstimates[index].effortPerLego + updatedEstimates[index].customEffort,
    };
    setPatternEstimates(updatedEstimates);
  };

  const handleEffortPerLegoChange = (index, effort) => {
    const updatedEstimates = [...patternEstimates];
    updatedEstimates[index] = {
      ...updatedEstimates[index],
      effortPerLego: effort,
      totalEffort: updatedEstimates[index].legoCount * effort + updatedEstimates[index].customEffort,
    };
    setPatternEstimates(updatedEstimates);
  };

  const handleCustomEffortChange = (index, customEffort) => {
    const updatedEstimates = [...patternEstimates];
    updatedEstimates[index] = {
      ...updatedEstimates[index],
      customEffort,
      totalEffort: updatedEstimates[index].legoCount * updatedEstimates[index].effortPerLego + customEffort,
    };
    setPatternEstimates(updatedEstimates);
  };

  const handleCustomEstimationChange = (field, value) => {
    setCustomEstimation(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateTotalEffort = () => {
    // Calculate pattern total, excluding QA testing if disabled
    const patternTotal = patternEstimates.reduce((sum, est, index) => {
      const isQATesting = est.patternName === 'QA/Regression/Functional Testing';
      if (isQATesting && !qaTestingEnabled) {
        return sum;
      }
      return sum + est.totalEffort;
    }, 0);
    
    const customTotal = Object.values(customEstimation).reduce((sum, val) => sum + val, 0);
    
    // If override mode, use custom total only, otherwise add them together
    if (customEstimationMode === 'override' && customTotal > 0) {
      return customTotal;
    }
    
    return patternTotal + customTotal;
  };

  const handleSendForApproval = () => {
    // Save estimation data to localStorage for the sign-off page
    const estimationData = {
      method: 'Lego-based Estimation',
      remId,
      projectId,
      patterns: selectedPatterns,
      estimates: patternEstimates,
      customEstimation,
      totalEffort,
      totalDays,
      totalWeeks,
      estimatedCost: totalEffort * 150,
      createdDate: new Date().toISOString(),
    };
    localStorage.setItem(`estimation_${projectId}`, JSON.stringify(estimationData));
    
    setShowApprovalModal(true);
    // In real app, save to backend and notify business user
    setTimeout(() => {
      setShowApprovalModal(false);
      navigate(`/project-pipeline/${projectId}`);
    }, 2000);
  };

  const totalEffort = calculateTotalEffort();
  const totalDays = Math.ceil(totalEffort / 8);
  const totalWeeks = Math.ceil(totalDays / 5);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(`/project-pipeline/${projectId}`)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  Lego Based Pricing
                </h1>
                <p className="text-sm text-white/50">Per hour price is $30</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
                <span className="text-xs text-white/60">REM ID</span>
                <p className="font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  {remId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Approval Status Banner */}
        {approvalStatus && (
          <div className={`mb-8 p-6 rounded-2xl border-2 ${
            approvalStatus === 'approved' 
              ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-500/50' 
              : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full ${
                  approvalStatus === 'approved' 
                    ? 'bg-gradient-to-br from-emerald-500 to-green-500' 
                    : 'bg-gradient-to-br from-red-500 to-orange-500'
                } flex items-center justify-center text-3xl shadow-2xl`}>
                  {approvalStatus === 'approved' ? '✅' : '❌'}
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${
                    approvalStatus === 'approved' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {approvalStatus === 'approved' ? 'ESTIMATION APPROVED' : 'ESTIMATION REJECTED'}
                  </h3>
                  <p className="text-white/70">
                    {approvalStatus === 'approved' 
                      ? 'This estimation has been approved by Business User and is ready for execution.' 
                      : 'This estimation was rejected. Please review and revise the estimates.'}
                  </p>
                </div>
              </div>
              {approvalStatus === 'approved' && (
                <div className="text-right">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-emerald-300 font-semibold">Approved Status</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="text-sm text-white/60 mb-1">Total Patterns</div>
            <div className="text-3xl font-bold text-blue-400">{selectedPatterns.length}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-xl p-4">
            <div className="text-sm text-white/60 mb-1">Total Hours</div>
            <div className="text-3xl font-bold text-purple-400">{totalEffort}h</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
            <div className="text-sm text-white/60 mb-1">Total Days</div>
            <div className="text-3xl font-bold text-green-400">{totalDays}</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl p-4">
            <div className="text-sm text-white/60 mb-1">Total Weeks</div>
            <div className="text-3xl font-bold text-orange-400">{totalWeeks}</div>
          </div>
        </div>

        {/* Pattern-Based Estimation */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-2xl">
              📚
            </div>
            <div>
              <h2 className="text-xl font-bold">Pattern-Based Estimation</h2>
              <p className="text-sm text-white/50">Configure complexity and effort for each migration pattern</p>
            </div>
          </div>

          <div className="space-y-4">
            {patternEstimates.map((estimate, index) => {
              const isQATesting = estimate.patternName === 'QA/Regression/Functional Testing';
              const isDisabled = isQATesting && !qaTestingEnabled;
              
              return (
                <div 
                  key={estimate.patternId}
                  className={`bg-white/[0.02] border border-white/10 rounded-xl p-6 transition-all ${
                    isDisabled ? 'opacity-60 pointer-events-none' : 'hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Pattern Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 flex items-center gap-3">
                      {isQATesting && (
                        <label className="flex items-center cursor-pointer pointer-events-auto">
                          <input
                            type="checkbox"
                            checked={qaTestingEnabled}
                            onChange={(e) => setQaTestingEnabled(e.target.checked)}
                            className="w-5 h-5 rounded border-2 border-white/30 bg-white/5 checked:bg-teal-500 checked:border-teal-500 cursor-pointer"
                          />
                        </label>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{estimate.patternName}</h3>
                        {!isQATesting && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-white/60">{selectedPatterns[index].source}</span>
                            <span className="text-white/30">→</span>
                            <span className="text-teal-400">{selectedPatterns[index].target}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white/60">Total Effort</div>
                      <div className="text-2xl font-bold text-teal-400">{isDisabled ? 0 : estimate.totalEffort}h</div>
                    </div>
                  </div>

                  {/* Configuration Grid */}
                  <div className="grid grid-cols-4 gap-4">
                    {/* Complexity */}
                    <div>
                      <label className="block text-sm text-white/60 mb-2">T-Shirt Size</label>
                      <div className="space-y-2">
                        {Object.keys(complexityConfig).map(complexity => (
                          <button
                            key={complexity}
                            onClick={() => handleComplexityChange(index, complexity)}
                            className={`w-full px-4 py-2 rounded-lg border-2 transition-all ${
                              estimate.complexity === complexity
                                ? `bg-${complexityConfig[complexity].color}-500/20 border-${complexityConfig[complexity].color}-500 text-${complexityConfig[complexity].color}-400`
                                : 'bg-white/[0.02] border-white/10 text-white/60 hover:border-white/30'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span>{complexityConfig[complexity].icon}</span>
                              <span className="font-semibold">{complexity}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Lego Count */}
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Number of Legos</label>
                      <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
                        <div className="text-4xl font-bold text-purple-400">{estimate.legoCount}</div>
                        <div className="text-xs text-white/50 mt-1">Legos</div>
                      </div>
                      <div className="mt-2 text-xs text-white/40">
                        Auto-set based on complexity
                      </div>
                    </div>

                    {/* Effort per Lego */}
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Effort per Lego (hours)</label>
                      <input
                        type="number"
                        value={estimate.effortPerLego}
                        onChange={(e) => handleEffortPerLegoChange(index, parseInt(e.target.value) || 0)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-teal-500"
                        min="0"
                      />
                      <div className="mt-2 text-xs text-white/40">
                        Subtotal: {estimate.legoCount * estimate.effortPerLego}h
                      </div>
                    </div>

                    {/* Custom Effort */}
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Custom Effort (hours)</label>
                      <input
                        type="number"
                        value={estimate.customEffort}
                        onChange={(e) => handleCustomEffortChange(index, parseInt(e.target.value) || 0)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500"
                        min="0"
                        placeholder="0"
                      />
                      <div className="mt-2 text-xs text-white/40">
                        Additional effort beyond legos
                      </div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Calculation:</span>
                      <span className="text-white/80">
                        ({estimate.legoCount} legos × {estimate.effortPerLego}h) + {estimate.customEffort}h custom = 
                        <span className="font-bold text-teal-400 ml-2">{isDisabled ? 0 : estimate.totalEffort}h</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Approximate Token Usage Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-2xl">
              🔢
            </div>
            <div>
              <h2 className="text-xl font-bold">Approximate Token Usage</h2>
              <p className="text-sm text-white/50">Estimated AI token consumption for this migration</p>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
            <div>
              <label className="block text-sm text-white/60 mb-2">Number of Tokens Required</label>
              <input
                type="number"
                value={tokenUsage}
                onChange={(e) => setTokenUsage(parseInt(e.target.value) || 0)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-500 text-lg"
                min="0"
                placeholder="Enter estimated token count for this migration"
              />
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Total Token Estimate:</span>
                <span className="text-2xl font-bold text-cyan-400">
                  {tokenUsage.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Estimation Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-2xl">
              ✨
            </div>
            <div>
              <h2 className="text-xl font-bold">Custom Estimation</h2>
              <p className="text-sm text-white/50">Additional effort for activities beyond pattern legos</p>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
            {/* Mode Toggle */}
            <div className="mb-6 pb-6 border-b border-white/10">
              <label className="block text-sm text-white/60 mb-2">Estimation Mode</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setCustomEstimationMode('add')}
                  className={`px-3 py-2 rounded-lg border transition-all text-sm ${
                    customEstimationMode === 'add'
                      ? 'bg-teal-500/20 border-teal-500 text-teal-400'
                      : 'bg-white/[0.02] border-white/10 text-white/60 hover:border-white/30'
                  }`}
                >
                  ➕ Add To Pattern-Based
                </button>
                <button
                  onClick={() => setCustomEstimationMode('override')}
                  className={`px-3 py-2 rounded-lg border transition-all text-sm ${
                    customEstimationMode === 'override'
                      ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                      : 'bg-white/[0.02] border-white/10 text-white/60 hover:border-white/30'
                  }`}
                >
                  🔄 Override Pattern-Based
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Total Custom Hours</label>
              <input
                type="number"
                value={customEstimation.totalHours}
                onChange={(e) => handleCustomEstimationChange('totalHours', parseInt(e.target.value) || 0)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500 text-lg"
                min="0"
                placeholder="Enter additional hours (project management, documentation, deployment, etc.)"
              />
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Custom Estimation Subtotal:</span>
                <span className="text-2xl font-bold text-orange-400">
                  {customEstimation.totalHours}h
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Final Summary */}
        <div className="bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-green-500/10 border-2 border-teal-500/30 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-3xl">
              📊
            </div>
            <div>
              <h2 className="text-2xl font-bold">Final Estimation Summary</h2>
              <p className="text-sm text-white/60">Complete breakdown of all effort</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Pattern-Based Effort:</span>
                <span className="text-xl font-bold text-white">
                  {patternEstimates.reduce((sum, est) => sum + est.totalEffort, 0)}h
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Custom Estimation:</span>
                <span className="text-xl font-bold text-white">
                  {Object.values(customEstimation).reduce((sum, val) => sum + val, 0)}h
                </span>
              </div>
              <div className="h-px bg-white/20"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-white">Total Effort:</span>
                <span className="text-3xl font-bold text-teal-400">{totalEffort}h</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Working Days (8h/day):</span>
                <span className="text-xl font-bold text-white">{totalDays} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Working Weeks (5 days/week):</span>
                <span className="text-xl font-bold text-white">{totalWeeks} weeks</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/project-pipeline/${projectId}`)}
              className="flex-1 px-6 py-4 bg-white/5 border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Save as Draft
            </button>
            <button
              onClick={handleSendForApproval}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl font-semibold hover:scale-105 transition-all shadow-2xl shadow-teal-500/50"
            >
              Send to Business User for Approval →
            </button>
          </div>
        </div>
      </main>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border-2 border-teal-500/30 rounded-2xl p-8 max-w-md text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-4xl mx-auto mb-4 animate-bounce">
              ✅
            </div>
            <h3 className="text-2xl font-bold mb-2">Sent for Approval!</h3>
            <p className="text-white/70 mb-4">
              Estimation has been sent to Business User for review and approval.
            </p>
            <div className="text-sm text-white/50">
              REM ID: <span className="text-teal-400 font-bold">{remId}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomUpEstimation;