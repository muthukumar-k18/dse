import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Download, FileText, Ticket, DollarSign, Package, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

interface Enhancement {
  id: string;
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedCost: number;
}

interface SelectedEnhancement {
  appId: string;
  repoId: string;
  enhancement: Enhancement;
}

interface Repository {
  id: string;
  name: string;
  icon: string;
  enhancements: Enhancement[];
}

interface Application {
  id: string;
  name: string;
  icon: string;
  repositories: Repository[];
}

interface BudgetData {
  totalBudget: number;
  selectedEnhancements: SelectedEnhancement[];
  applications: Application[];
}

const BudgetSummary = () => {
  const navigate = useNavigate();
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [showTunaSuccess, setShowTunaSuccess] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem('budgetData');
    if (data) {
      setBudgetData(JSON.parse(data));
    } else {
      navigate('/business-user/spend-budget');
    }
  }, [navigate]);

  if (!budgetData) {
    return null;
  }

  const totalCost = budgetData.selectedEnhancements.reduce((sum, item) => sum + item.enhancement.estimatedCost, 0);
  const remainingBudget = budgetData.totalBudget - totalCost;

  // Group enhancements by application and repository
  const groupedEnhancements: Record<string, Record<string, SelectedEnhancement[]>> = {};
  budgetData.selectedEnhancements.forEach((item) => {
    if (!groupedEnhancements[item.appId]) {
      groupedEnhancements[item.appId] = {};
    }
    if (!groupedEnhancements[item.appId][item.repoId]) {
      groupedEnhancements[item.appId][item.repoId] = [];
    }
    groupedEnhancements[item.appId][item.repoId].push(item);
  });

  const getApplication = (appId: string) => {
    return budgetData.applications.find((app) => app.id === appId);
  };

  const getRepository = (appId: string, repoId: string) => {
    const app = getApplication(appId);
    return app?.repositories.find((repo) => repo.id === repoId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'low':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      default:
        return 'text-white/40 bg-white/5 border-white/10';
    }
  };

  const handleExportDocument = () => {
    // Generate document content
    let documentContent = '='.repeat(80) + '\n';
    documentContent += 'ENHANCEMENT REQUEST SUMMARY\n';
    documentContent += 'Digital Software Engineering 2.0\n';
    documentContent += '='.repeat(80) + '\n\n';
    documentContent += `Generated: ${new Date().toLocaleString()}\n`;
    documentContent += `Prepared by: John Mitchell (Business User)\n\n`;
    
    documentContent += '-'.repeat(80) + '\n';
    documentContent += 'BUDGET OVERVIEW\n';
    documentContent += '-'.repeat(80) + '\n';
    documentContent += `Total Budget:        $${budgetData.totalBudget.toLocaleString()}\n`;
    documentContent += `Total Allocated:     $${totalCost.toLocaleString()}\n`;
    documentContent += `Remaining Budget:    $${remainingBudget.toLocaleString()}\n`;
    documentContent += `Budget Utilization:  ${((totalCost / budgetData.totalBudget) * 100).toFixed(1)}%\n\n`;

    documentContent += '='.repeat(80) + '\n';
    documentContent += 'ENHANCEMENT DETAILS\n';
    documentContent += '='.repeat(80) + '\n\n';

    Object.keys(groupedEnhancements).forEach((appId) => {
      const app = getApplication(appId);
      if (!app) return;

      documentContent += `\n${'*'.repeat(80)}\n`;
      documentContent += `APPLICATION: ${app.name} ${app.icon}\n`;
      documentContent += `${'*'.repeat(80)}\n\n`;

      Object.keys(groupedEnhancements[appId]).forEach((repoId) => {
        const repo = getRepository(appId, repoId);
        if (!repo) return;

        const repoEnhancements = groupedEnhancements[appId][repoId];
        const repoTotal = repoEnhancements.reduce((sum, item) => sum + item.enhancement.estimatedCost, 0);

        documentContent += `\n${'-'.repeat(80)}\n`;
        documentContent += `REPOSITORY: ${repo.name} ${repo.icon}\n`;
        documentContent += `Total Cost: $${repoTotal.toLocaleString()}\n`;
        documentContent += `${'-'.repeat(80)}\n\n`;

        repoEnhancements.forEach((item, index) => {
          documentContent += `${index + 1}. ${item.enhancement.name}\n`;
          documentContent += `   Priority:     [${item.enhancement.priority.toUpperCase()}]\n`;
          documentContent += `   Cost:         $${item.enhancement.estimatedCost.toLocaleString()}\n`;
          documentContent += `   Description:  ${item.enhancement.description}\n\n`;
        });
      });
    });

    documentContent += '\n' + '='.repeat(80) + '\n';
    documentContent += 'SUMMARY BY PRIORITY\n';
    documentContent += '='.repeat(80) + '\n';

    const priorityCounts = {
      high: budgetData.selectedEnhancements.filter((e) => e.enhancement.priority === 'high').length,
      medium: budgetData.selectedEnhancements.filter((e) => e.enhancement.priority === 'medium').length,
      low: budgetData.selectedEnhancements.filter((e) => e.enhancement.priority === 'low').length,
    };

    const priorityCosts = {
      high: budgetData.selectedEnhancements
        .filter((e) => e.enhancement.priority === 'high')
        .reduce((sum, item) => sum + item.enhancement.estimatedCost, 0),
      medium: budgetData.selectedEnhancements
        .filter((e) => e.enhancement.priority === 'medium')
        .reduce((sum, item) => sum + item.enhancement.estimatedCost, 0),
      low: budgetData.selectedEnhancements
        .filter((e) => e.enhancement.priority === 'low')
        .reduce((sum, item) => sum + item.enhancement.estimatedCost, 0),
    };

    documentContent += `\nHigh Priority:    ${priorityCounts.high} items    $${priorityCosts.high.toLocaleString()}\n`;
    documentContent += `Medium Priority:  ${priorityCounts.medium} items    $${priorityCosts.medium.toLocaleString()}\n`;
    documentContent += `Low Priority:     ${priorityCounts.low} items    $${priorityCosts.low.toLocaleString()}\n\n`;

    documentContent += '='.repeat(80) + '\n';
    documentContent += 'END OF DOCUMENT\n';
    documentContent += '='.repeat(80) + '\n';

    // Create and download file
    const blob = new Blob([documentContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Enhancement_Request_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  const handleCreateTunaTicket = () => {
    // In a real app, this would make an API call to create a TUNA ticket
    console.log('Creating TUNA ticket with data:', budgetData);
    
    setShowTunaSuccess(true);
    setTimeout(() => {
      setShowTunaSuccess(false);
      navigate('/business-user');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/business-user/spend-budget')}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-xl">⚡</span>
            </div>
            <div>
              <span className="text-xl font-semibold">DSE 2.0</span>
              <span className="text-white/30 mx-2">|</span>
              <span className="text-white/50">Enhancement Request Summary</span>
            </div>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-semibold">
              JM
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">John Mitchell</p>
              <p className="text-xs text-white/40">Business User</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Budget Overview Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <p className="text-sm text-white/60">Total Budget</p>
            </div>
            <p className="text-3xl font-bold text-green-400">${budgetData.totalBudget.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-cyan-400" />
              <p className="text-sm text-white/60">Total Allocated</p>
            </div>
            <p className="text-3xl font-bold text-cyan-400">${totalCost.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <p className="text-sm text-white/60">Remaining</p>
            </div>
            <p className={`text-3xl font-bold ${remainingBudget < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              ${remainingBudget.toLocaleString()}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Ticket className="w-5 h-5 text-purple-400" />
              <p className="text-sm text-white/60">Items Selected</p>
            </div>
            <p className="text-3xl font-bold text-purple-400">{budgetData.selectedEnhancements.length}</p>
          </div>
        </div>

        {/* Budget Utilization Bar */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/60">Budget Utilization</span>
            <span className="font-semibold">{((totalCost / budgetData.totalBudget) * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                totalCost > budgetData.totalBudget
                  ? 'bg-gradient-to-r from-red-500 to-red-600'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500'
              }`}
              style={{ width: `${Math.min((totalCost / budgetData.totalBudget) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Enhancement Details by Application */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold">Selected Enhancements</h2>
          
          {Object.keys(groupedEnhancements).map((appId) => {
            const app = getApplication(appId);
            if (!app) return null;

            return (
              <div key={appId} className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 flex items-center justify-center">
                    <span className="text-2xl">{app.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{app.name}</h3>
                    <p className="text-sm text-white/40">
                      {Object.keys(groupedEnhancements[appId]).length} repositories
                    </p>
                  </div>
                </div>

                {Object.keys(groupedEnhancements[appId]).map((repoId) => {
                  const repo = getRepository(appId, repoId);
                  if (!repo) return null;

                  const repoEnhancements = groupedEnhancements[appId][repoId];
                  const repoTotal = repoEnhancements.reduce((sum, item) => sum + item.enhancement.estimatedCost, 0);

                  return (
                    <div key={repoId} className="mb-6 last:mb-0">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{repo.icon}</span>
                          <div>
                            <h4 className="font-semibold">{repo.name}</h4>
                            <p className="text-sm text-white/40">{repoEnhancements.length} enhancements</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-white/40">Subtotal</p>
                          <p className="text-xl font-bold text-cyan-400">${repoTotal.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="space-y-3 ml-10">
                        {repoEnhancements.map((item) => (
                          <div
                            key={item.enhancement.id}
                            className="bg-black/30 border border-white/10 rounded-xl p-4"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h5 className="font-semibold">{item.enhancement.name}</h5>
                                  <span className={`text-xs px-2 py-1 rounded-full border uppercase ${getPriorityColor(item.enhancement.priority)}`}>
                                    {item.enhancement.priority}
                                  </span>
                                </div>
                                <p className="text-sm text-white/60">{item.enhancement.description}</p>
                              </div>
                              <div className="ml-6 text-right">
                                <p className="text-xs text-white/40">Cost</p>
                                <p className="text-lg font-bold text-green-400">
                                  ${item.enhancement.estimatedCost.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleExportDocument}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold shadow-2xl shadow-blue-500/50 transition-all hover:scale-105 flex items-center gap-3"
          >
            <Download className="w-5 h-5" />
            Export as Document
          </button>
          <button
            onClick={handleCreateTunaTicket}
            className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white px-8 py-4 rounded-xl font-semibold shadow-2xl shadow-purple-500/50 transition-all hover:scale-105 flex items-center gap-3"
          >
            <Ticket className="w-5 h-5" />
            Create TUNA Ticket
          </button>
        </div>
      </main>

      {/* Success Notifications */}
      {showExportSuccess && (
        <div className="fixed top-8 right-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl p-6 shadow-2xl shadow-green-500/50 backdrop-blur-sm animate-slide-in-right z-50">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
            <div>
              <p className="font-semibold text-green-400">Document Exported Successfully!</p>
              <p className="text-sm text-white/60">Check your downloads folder</p>
            </div>
          </div>
        </div>
      )}

      {showTunaSuccess && (
        <div className="fixed top-8 right-8 bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/50 rounded-xl p-6 shadow-2xl shadow-purple-500/50 backdrop-blur-sm animate-slide-in-right z-50">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-8 h-8 text-purple-400" />
            <div>
              <p className="font-semibold text-purple-400">TUNA Ticket Created!</p>
              <p className="text-sm text-white/60">Redirecting to dashboard...</p>
            </div>
          </div>
        </div>
      )}

      {remainingBudget < 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-center gap-3 backdrop-blur-sm">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <div>
            <p className="font-semibold text-red-400">Warning: Over Budget</p>
            <p className="text-sm text-white/60">Consider adjusting your selections</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetSummary;