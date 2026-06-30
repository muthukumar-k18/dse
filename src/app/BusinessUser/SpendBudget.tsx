import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown, DollarSign, GitBranch, AlertCircle, CheckCircle2, Circle } from 'lucide-react';

interface Enhancement {
  id: string;
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedCost: number;
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

const SpendBudget = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState<string>('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [selectedEnhancements, setSelectedEnhancements] = useState<{
    appId: string;
    repoId: string;
    enhancement: Enhancement;
  }[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Mock applications data
  const applications: Application[] = [
    {
      id: 'app1',
      name: 'Customer Portal',
      icon: '👥',
      repositories: [
        {
          id: 'repo1',
          name: 'customer-portal-frontend',
          icon: '⚛️',
          enhancements: [
            { id: 'e1', name: 'Migrate to React 19', description: 'Update React version and refactor deprecated patterns', priority: 'high', estimatedCost: 15000 },
            { id: 'e2', name: 'Implement SSR', description: 'Add server-side rendering for improved SEO and performance', priority: 'high', estimatedCost: 25000 },
            { id: 'e3', name: 'Accessibility Audit', description: 'Comprehensive WCAG 2.1 compliance review and fixes', priority: 'medium', estimatedCost: 8000 },
            { id: 'e4', name: 'Bundle Optimization', description: 'Reduce bundle size with code splitting and tree shaking', priority: 'medium', estimatedCost: 5000 },
            { id: 'e5', name: 'Update Icons Library', description: 'Migrate from Font Awesome to Lucide React', priority: 'low', estimatedCost: 2000 },
          ],
        },
        {
          id: 'repo2',
          name: 'customer-portal-api',
          icon: '🔧',
          enhancements: [
            { id: 'e6', name: 'API Rate Limiting', description: 'Implement Redis-based rate limiting for API endpoints', priority: 'high', estimatedCost: 12000 },
            { id: 'e7', name: 'GraphQL Migration', description: 'Migrate REST endpoints to GraphQL for better flexibility', priority: 'high', estimatedCost: 30000 },
            { id: 'e8', name: 'Enhanced Logging', description: 'Implement structured logging with ELK stack integration', priority: 'medium', estimatedCost: 6000 },
            { id: 'e9', name: 'API Documentation', description: 'Auto-generate OpenAPI docs with interactive examples', priority: 'low', estimatedCost: 3000 },
          ],
        },
      ],
    },
    {
      id: 'app2',
      name: 'Analytics Dashboard',
      icon: '📊',
      repositories: [
        {
          id: 'repo3',
          name: 'analytics-ui',
          icon: '📈',
          enhancements: [
            { id: 'e10', name: 'Real-time Data Streaming', description: 'Implement WebSocket connections for live data updates', priority: 'high', estimatedCost: 20000 },
            { id: 'e11', name: 'Custom Chart Library', description: 'Replace Chart.js with D3.js for advanced visualizations', priority: 'medium', estimatedCost: 18000 },
            { id: 'e12', name: 'Export Functionality', description: 'Add PDF and Excel export capabilities', priority: 'medium', estimatedCost: 7000 },
            { id: 'e13', name: 'Dark Mode', description: 'Implement dark mode theme with user preference storage', priority: 'low', estimatedCost: 4000 },
          ],
        },
        {
          id: 'repo4',
          name: 'analytics-processing',
          icon: '⚙️',
          enhancements: [
            { id: 'e14', name: 'Data Pipeline Optimization', description: 'Refactor data processing for 3x speed improvement', priority: 'high', estimatedCost: 28000 },
            { id: 'e15', name: 'ML Model Integration', description: 'Add predictive analytics with TensorFlow', priority: 'medium', estimatedCost: 35000 },
            { id: 'e16', name: 'Caching Layer', description: 'Implement Redis caching for frequently accessed data', priority: 'medium', estimatedCost: 10000 },
            { id: 'e17', name: 'Data Validation', description: 'Enhanced input validation and data quality checks', priority: 'low', estimatedCost: 5000 },
          ],
        },
      ],
    },
    {
      id: 'app3',
      name: 'Payment Gateway',
      icon: '💳',
      repositories: [
        {
          id: 'repo5',
          name: 'payment-service',
          icon: '💰',
          enhancements: [
            { id: 'e18', name: 'PCI DSS Compliance', description: 'Full compliance audit and implementation', priority: 'high', estimatedCost: 45000 },
            { id: 'e19', name: 'Multi-Currency Support', description: 'Add support for 50+ currencies with real-time exchange rates', priority: 'high', estimatedCost: 22000 },
            { id: 'e20', name: 'Fraud Detection', description: 'ML-based fraud detection system', priority: 'medium', estimatedCost: 32000 },
            { id: 'e21', name: 'Payment Retry Logic', description: 'Intelligent retry mechanism for failed transactions', priority: 'medium', estimatedCost: 8000 },
            { id: 'e22', name: 'Receipt Templates', description: 'Customizable email receipt templates', priority: 'low', estimatedCost: 3500 },
          ],
        },
      ],
    },
  ];

  const totalBudget = parseFloat(budget) || 0;
  const spentBudget = selectedEnhancements.reduce((sum, item) => sum + item.enhancement.estimatedCost, 0);
  const remainingBudget = totalBudget - spentBudget;

  const handleEnhancementToggle = (appId: string, repoId: string, enhancement: Enhancement) => {
    const isSelected = selectedEnhancements.some(
      (item) => item.appId === appId && item.repoId === repoId && item.enhancement.id === enhancement.id
    );

    if (isSelected) {
      setSelectedEnhancements(
        selectedEnhancements.filter(
          (item) => !(item.appId === appId && item.repoId === repoId && item.enhancement.id === enhancement.id)
        )
      );
    } else {
      // Check if budget allows
      if (remainingBudget >= enhancement.estimatedCost) {
        setSelectedEnhancements([...selectedEnhancements, { appId, repoId, enhancement }]);
      }
    }
  };

  const isEnhancementSelected = (appId: string, repoId: string, enhancementId: string) => {
    return selectedEnhancements.some(
      (item) => item.appId === appId && item.repoId === repoId && item.enhancement.id === enhancementId
    );
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

  const handleProceedToSummary = () => {
    if (selectedEnhancements.length === 0) return;
    
    // Store data in sessionStorage for the summary page
    sessionStorage.setItem('budgetData', JSON.stringify({
      totalBudget,
      selectedEnhancements,
      applications,
    }));
    
    navigate('/business-user/budget-summary');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/business-user')}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <span className="text-xl">←</span>
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
              <span className="text-white/50">Spend & Budget Planning</span>
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
        {/* Budget Input Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-green-400" />
              Set Your Budget
            </h2>
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <label className="block text-sm text-white/60 mb-2">Total Budget Available</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-green-400">$</span>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="0"
                    className="w-full bg-black/50 border border-white/20 rounded-xl px-12 py-4 text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 flex-1">
                <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                  <p className="text-xs text-white/40 mb-1">Total Budget</p>
                  <p className="text-xl font-bold text-green-400">${totalBudget.toLocaleString()}</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                  <p className="text-xs text-white/40 mb-1">Allocated</p>
                  <p className="text-xl font-bold text-cyan-400">${spentBudget.toLocaleString()}</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                  <p className="text-xs text-white/40 mb-1">Remaining</p>
                  <p className={`text-xl font-bold ${remainingBudget < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    ${remainingBudget.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Selection */}
        <div className="mb-6">
          <label className="block text-sm text-white/60 mb-3">Select Application</label>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-xl px-6 py-4 flex items-center justify-between hover:border-white/30 transition-colors"
            >
              {selectedApp ? (
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedApp.icon}</span>
                  <span className="font-semibold">{selectedApp.name}</span>
                  <span className="text-white/40">({selectedApp.repositories.length} repositories)</span>
                </div>
              ) : (
                <span className="text-white/40">Choose an application...</span>
              )}
              <ChevronDown className={`w-5 h-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a] border border-white/20 rounded-xl overflow-hidden shadow-2xl z-10">
                {applications.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      setSelectedApp(app);
                      setShowDropdown(false);
                    }}
                    className="w-full px-6 py-4 flex items-center gap-3 hover:bg-white/5 transition-colors border-b border-white/10 last:border-b-0"
                  >
                    <span className="text-2xl">{app.icon}</span>
                    <div className="text-left">
                      <p className="font-semibold">{app.name}</p>
                      <p className="text-sm text-white/40">{app.repositories.length} repositories</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Repositories and Enhancements */}
        {selectedApp && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-3">
              <GitBranch className="w-5 h-5 text-cyan-400" />
              Repositories & Enhancement Opportunities
            </h3>

            {selectedApp.repositories.map((repo) => {
              const repoEnhancements = selectedEnhancements.filter(
                (item) => item.repoId === repo.id
              );
              const repoTotal = repoEnhancements.reduce((sum, item) => sum + item.enhancement.estimatedCost, 0);

              return (
                <div key={repo.id} className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <span className="text-2xl">{repo.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{repo.name}</h4>
                        <p className="text-sm text-white/40">{repo.enhancements.length} enhancements available</p>
                      </div>
                    </div>
                    {repoTotal > 0 && (
                      <div className="text-right">
                        <p className="text-xs text-white/40">Selected</p>
                        <p className="text-xl font-bold text-cyan-400">${repoTotal.toLocaleString()}</p>
                      </div>
                    )}
                  </div>

                  {/* Enhancements List */}
                  <div className="space-y-3">
                    {repo.enhancements.map((enhancement) => {
                      const isSelected = isEnhancementSelected(selectedApp.id, repo.id, enhancement.id);
                      const canSelect = remainingBudget >= enhancement.estimatedCost || isSelected;

                      return (
                        <button
                          key={enhancement.id}
                          onClick={() => handleEnhancementToggle(selectedApp.id, repo.id, enhancement)}
                          disabled={!canSelect && !isSelected}
                          className={`w-full p-4 rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                              : canSelect
                              ? 'bg-black/30 border-white/10 hover:border-white/30 hover:bg-white/5'
                              : 'bg-black/20 border-white/5 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-1">
                              {isSelected ? (
                                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                              ) : (
                                <Circle className="w-5 h-5 text-white/30" />
                              )}
                            </div>
                            <div className="flex-1 text-left">
                              <div className="flex items-center gap-3 mb-2">
                                <h5 className="font-semibold">{enhancement.name}</h5>
                                <span className={`text-xs px-2 py-1 rounded-full border uppercase ${getPriorityColor(enhancement.priority)}`}>
                                  {enhancement.priority}
                                </span>
                              </div>
                              <p className="text-sm text-white/60 mb-3">{enhancement.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-white/40">Estimated Cost</span>
                                <span className="text-lg font-bold text-green-400">${enhancement.estimatedCost.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Button */}
        {selectedEnhancements.length > 0 && (
          <div className="fixed bottom-8 right-8">
            <button
              onClick={handleProceedToSummary}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold shadow-2xl shadow-green-500/50 transition-all hover:scale-105 flex items-center gap-3"
            >
              <span>Review Selection</span>
              <span className="bg-white/20 px-3 py-1 rounded-lg text-sm">
                {selectedEnhancements.length} items · ${spentBudget.toLocaleString()}
              </span>
            </button>
          </div>
        )}

        {/* Warning if over budget */}
        {remainingBudget < 0 && (
          <div className="fixed bottom-8 left-8 bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-center gap-3 backdrop-blur-sm">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <div>
              <p className="font-semibold text-red-400">Over Budget</p>
              <p className="text-sm text-white/60">Remove items to proceed</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SpendBudget;