import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

const EstimationSignoff = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [estimationData, setEstimationData] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState('pending'); // pending, approved, rejected

  useEffect(() => {
    // Load estimation data from localStorage
    const savedEstimation = localStorage.getItem(`estimation_${projectId}`);
    if (savedEstimation) {
      setEstimationData(JSON.parse(savedEstimation));
    }
  }, [projectId]);

  const handleApprove = () => {
    setApprovalStatus('approved');
    setShowApprovalModal(true);
    
    // Save approval status
    const updatedData = {
      ...estimationData,
      approvalStatus: 'approved',
      approvedDate: new Date().toISOString(),
    };
    localStorage.setItem(`estimation_${projectId}`, JSON.stringify(updatedData));
    
    setTimeout(() => {
      setShowApprovalModal(false);
      navigate(`/project-pipeline/${projectId}`);
    }, 2000);
  };

  const handleReject = () => {
    setApprovalStatus('rejected');
    setShowApprovalModal(true);
    
    setTimeout(() => {
      setShowApprovalModal(false);
      navigate(`/project-pipeline/${projectId}`);
    }, 2000);
  };

  if (!estimationData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold mb-2">No Estimation Found</h2>
          <p className="text-white/60 mb-6">Please complete the Bottom-Up Estimation first.</p>
          <button
            onClick={() => navigate(`/project-pipeline/${projectId}`)}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg font-semibold hover:scale-105 transition-all"
          >
            Go to Pipeline
          </button>
        </div>
      </div>
    );
  }

  const complexityConfig = {
    Simple: { icon: '🟢', legos: 3 },
    Medium: { icon: '🟡', legos: 5 },
    Complex: { icon: '🔴', legos: 10 },
  };

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
                ← Back to Pipeline
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  Estimation Sign-off
                </h1>
                <p className="text-sm text-white/50">Review and approve the estimation</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
                <span className="text-xs text-white/60">REM ID</span>
                <p className="font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  {estimationData.remId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Estimation Method Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
            <span className="text-2xl">🧱</span>
            <span className="font-semibold text-blue-400">{estimationData.method}</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="text-sm text-white/60 mb-1">Total Patterns</div>
            <div className="text-3xl font-bold text-blue-400">{estimationData.patterns.length}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-xl p-4">
            <div className="text-sm text-white/60 mb-1">Total Hours</div>
            <div className="text-3xl font-bold text-purple-400">{estimationData.totalEffort}h</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
            <div className="text-sm text-white/60 mb-1">Total Days</div>
            <div className="text-3xl font-bold text-green-400">{estimationData.totalDays}</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl p-4">
            <div className="text-sm text-white/60 mb-1">Estimated Cost</div>
            <div className="text-3xl font-bold text-orange-400">${(estimationData.estimatedCost).toLocaleString()}</div>
          </div>
        </div>

        {/* Pattern Details */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-2xl">
              📚
            </div>
            <div>
              <h2 className="text-xl font-bold">Migration Patterns & Lego Breakdown</h2>
              <p className="text-sm text-white/50">Detailed estimation for each pattern</p>
            </div>
          </div>

          <div className="space-y-4">
            {estimationData.estimates.map((estimate, index) => (
              <div 
                key={estimate.patternId}
                className="bg-white/[0.02] border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{estimate.patternName}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-white/60">{estimationData.patterns[index].source}</span>
                      <span className="text-white/30">→</span>
                      <span className="text-teal-400">{estimationData.patterns[index].target}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/60">Total Effort</div>
                    <div className="text-2xl font-bold text-teal-400">{estimate.totalEffort}h</div>
                  </div>
                </div>

                {/* Lego Details */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-white/[0.02] border border-white/10 rounded-lg p-3">
                    <div className="text-xs text-white/60 mb-1">Complexity</div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{complexityConfig[estimate.complexity].icon}</span>
                      <span className="font-semibold">{estimate.complexity}</span>
                    </div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/10 rounded-lg p-3">
                    <div className="text-xs text-white/60 mb-1">Lego Count</div>
                    <div className="text-2xl font-bold text-purple-400">{estimate.legoCount}</div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/10 rounded-lg p-3">
                    <div className="text-xs text-white/60 mb-1">Effort per Lego</div>
                    <div className="text-2xl font-bold text-blue-400">{estimate.effortPerLego}h</div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/10 rounded-lg p-3">
                    <div className="text-xs text-white/60 mb-1">Custom Effort</div>
                    <div className="text-2xl font-bold text-orange-400">{estimate.customEffort}h</div>
                  </div>
                </div>

                {/* Calculation */}
                <div className="bg-white/[0.02] border border-white/10 rounded-lg p-3">
                  <div className="text-xs text-white/60 mb-1">Calculation</div>
                  <div className="text-sm text-white/80">
                    ({estimate.legoCount} legos × {estimate.effortPerLego}h) + {estimate.customEffort}h custom = 
                    <span className="font-bold text-teal-400 ml-2">{estimate.totalEffort}h</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Estimation */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-2xl">
              ✨
            </div>
            <div>
              <h2 className="text-xl font-bold">Custom Estimation Breakdown</h2>
              <p className="text-sm text-white/50">Additional effort beyond pattern legos</p>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 bg-white/[0.02] rounded-lg">
                <span className="text-white/70">Project Management:</span>
                <span className="font-bold text-white">{estimationData.customEstimation.projectManagement}h</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/[0.02] rounded-lg">
                <span className="text-white/70">Documentation:</span>
                <span className="font-bold text-white">{estimationData.customEstimation.documentation}h</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/[0.02] rounded-lg">
                <span className="text-white/70">Deployment & Setup:</span>
                <span className="font-bold text-white">{estimationData.customEstimation.deployment}h</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/[0.02] rounded-lg">
                <span className="text-white/70">Contingency Buffer:</span>
                <span className="font-bold text-white">{estimationData.customEstimation.contingency}h</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-white/70">Custom Estimation Subtotal:</span>
              <span className="text-2xl font-bold text-orange-400">
                {Object.values(estimationData.customEstimation).reduce((sum, val) => sum + val, 0)}h
              </span>
            </div>
          </div>
        </div>

        {/* Final Summary */}
        <div className="bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 border-2 border-emerald-500/30 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-3xl">
              📊
            </div>
            <div>
              <h2 className="text-2xl font-bold">Final Estimation Summary</h2>
              <p className="text-sm text-white/60">Complete breakdown awaiting approval</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Pattern-Based Effort:</span>
                <span className="text-xl font-bold text-white">
                  {estimationData.estimates.reduce((sum, est) => sum + est.totalEffort, 0)}h
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Custom Estimation:</span>
                <span className="text-xl font-bold text-white">
                  {Object.values(estimationData.customEstimation).reduce((sum, val) => sum + val, 0)}h
                </span>
              </div>
              <div className="h-px bg-white/20"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-white">Total Effort:</span>
                <span className="text-3xl font-bold text-emerald-400">{estimationData.totalEffort}h</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Working Days (8h/day):</span>
                <span className="text-xl font-bold text-white">{estimationData.totalDays} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Working Weeks (5 days/week):</span>
                <span className="text-xl font-bold text-white">{estimationData.totalWeeks} weeks</span>
              </div>
              <div className="h-px bg-white/20"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-white">Estimated Cost (@$150/hour):</span>
                <span className="text-3xl font-bold text-green-400">${estimationData.estimatedCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Approval Actions */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
          <h3 className="text-xl font-bold mb-4">Approval Decision</h3>
          <p className="text-white/60 mb-6">
            Review the estimation details above and approve or reject the estimation for this migration project.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleReject}
              className="flex-1 px-6 py-4 bg-red-500/10 border border-red-500/30 rounded-xl font-semibold text-red-400 hover:bg-red-500/20 transition-all"
            >
              ❌ Reject Estimation
            </button>
            <button
              onClick={handleApprove}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl font-semibold hover:scale-105 transition-all shadow-2xl shadow-emerald-500/50"
            >
              ✅ Approve Estimation
            </button>
          </div>
        </div>
      </main>

      {/* Approval/Rejection Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className={`bg-gradient-to-br ${
            approvalStatus === 'approved' 
              ? 'from-emerald-500/20 to-green-500/20 border-emerald-500/30' 
              : 'from-red-500/20 to-orange-500/20 border-red-500/30'
          } border-2 rounded-2xl p-8 max-w-md text-center`}>
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${
              approvalStatus === 'approved' 
                ? 'from-emerald-500 to-green-500' 
                : 'from-red-500 to-orange-500'
            } flex items-center justify-center text-4xl mx-auto mb-4 animate-bounce`}>
              {approvalStatus === 'approved' ? '✅' : '❌'}
            </div>
            <h3 className="text-2xl font-bold mb-2">
              {approvalStatus === 'approved' ? 'Estimation Approved!' : 'Estimation Rejected'}
            </h3>
            <p className="text-white/70 mb-4">
              {approvalStatus === 'approved' 
                ? 'The estimation has been approved and the project can proceed to the next stage.' 
                : 'The estimation has been rejected. The team will be notified to revise it.'}
            </p>
            <div className="text-sm text-white/50">
              REM ID: <span className={`font-bold ${approvalStatus === 'approved' ? 'text-emerald-400' : 'text-red-400'}`}>{estimationData.remId}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstimationSignoff;
