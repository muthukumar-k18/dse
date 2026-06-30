import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Search, Filter, Code, Zap, Package, FileText, Edit2, Trash2, Link as LinkIcon, Sparkles, RefreshCw } from 'lucide-react';

interface Pattern {
  id: number;
  name: string;
  patternType: string;
  legoType: string;
  description: string;
  createdDate: string;
  usageCount: number;
  defaultPipeline: string;
}

export default function CreateNewPattern() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCreatingNewLegoType, setIsCreatingNewLegoType] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    patternType: '',
    legoType: '',
    newLegoType: '',
    description: '',
    documentationLink: '',
    defaultPipeline: ''
  });

  // Available pattern types from the image
  const patternTypes = [
    'Struts-Based UI Modernization to Spring Boot',
    'Legacy Spring Framework Upgrade to Spring Framework Version Upgrade',
    'JSP to Runtime Modernization (JDK Update)',
    'Application Layer Migration Automation',
    'Unit Test Suite Modernization',
    'Security Vulnerability Remediation',
    'Automated Unit Test Creation',
    'Learning Vulnerability Remediation',
    'Observability Enablement (Logging and APM)',
    'Infrastructure Optimization',
    'Virtual Machine Provisioning & Configuration',
    'Integrated CI/CD and Deployment'
  ];

  // Lego types (corresponding to patterns)
  const legoTypes = [
    'UI Modernization Lego',
    'Framework Upgrade Lego',
    'Runtime Migration Lego',
    'Application Migration Lego',
    'Test Automation Lego',
    'Security Remediation Lego',
    'Unit Test Generation Lego',
    'Vulnerability Analysis Lego',
    'Observability Integration Lego',
    'Infrastructure Optimization Lego',
    'VM Provisioning Lego',
    'CI/CD Integration Lego'
  ];

  // Existing patterns (sample data)
  const [existingPatterns, setExistingPatterns] = useState<Pattern[]>([
    {
      id: 1,
      name: 'Spring Boot Migration',
      patternType: 'Struts-Based UI Modernization to Spring Boot',
      legoType: 'UI Modernization Lego',
      description: 'Migrate legacy Struts applications to modern Spring Boot architecture with REST APIs',
      createdDate: '2024-01-15',
      usageCount: 12,
      defaultPipeline: 'Full Pipeline'
    },
    {
      id: 2,
      name: 'JDK 8 to 17 Upgrade',
      patternType: 'JSP to Runtime Modernization (JDK Update)',
      legoType: 'Runtime Migration Lego',
      description: 'Automated JDK upgrade pattern with compatibility checks and code transformations',
      createdDate: '2024-01-20',
      usageCount: 8,
      defaultPipeline: 'Custom Pipeline'
    },
    {
      id: 3,
      name: 'JUnit 5 Migration',
      patternType: 'Unit Test Suite Modernization',
      legoType: 'Test Automation Lego',
      description: 'Migrate existing JUnit 4 tests to JUnit 5 with Jupiter API',
      createdDate: '2024-02-10',
      usageCount: 15,
      defaultPipeline: 'Full Pipeline'
    },
    {
      id: 4,
      name: 'Security Patch Automation',
      patternType: 'Security Vulnerability Remediation',
      legoType: 'Security Remediation Lego',
      description: 'Automated security vulnerability detection and remediation pattern',
      createdDate: '2024-02-25',
      usageCount: 20,
      defaultPipeline: 'Full Pipeline'
    },
    {
      id: 5,
      name: 'APM Integration',
      patternType: 'Observability Enablement (Logging and APM)',
      legoType: 'Observability Integration Lego',
      description: 'Add comprehensive logging and APM instrumentation to legacy applications',
      createdDate: '2024-03-01',
      usageCount: 6,
      defaultPipeline: 'Custom Pipeline'
    }
  ]);

  const handleCreatePattern = () => {
    if (!formData.name || !formData.patternType || !formData.legoType || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    const newPattern: Pattern = {
      id: Math.max(...existingPatterns.map(p => p.id), 0) + 1,
      name: formData.name,
      patternType: formData.patternType,
      legoType: formData.legoType,
      description: formData.description,
      createdDate: new Date().toISOString().split('T')[0],
      usageCount: 0,
      defaultPipeline: formData.defaultPipeline
    };

    setExistingPatterns([newPattern, ...existingPatterns]);
    
    // Reset form
    setFormData({ name: '', patternType: '', legoType: '', newLegoType: '', description: '', documentationLink: '', defaultPipeline: '' });
    setShowCreateForm(false);

    // TODO: Save to database/localStorage
    alert('Pattern created successfully!');
  };

  const filteredPatterns = existingPatterns.filter(pattern =>
    pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pattern.patternType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pattern.legoType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500/5 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-[1800px] mx-auto px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate('/aaf-migration-expert')}
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30">
                  🧩
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Migration Patterns</h1>
                  <p className="text-white/40 text-sm">Create and manage reusable migration patterns</p>
                </div>
              </div>
            </div>
            
            {/* DSE 2.0 Button */}
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-bold shadow-lg shadow-purple-500/30 transition-all hover:scale-105"
            >
              DSE 2.0
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-[1800px] mx-auto px-12 py-12">
        {/* Create New Pattern Section - Prominent */}
        <section className="mb-12">
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            
            {/* Card */}
            <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 border-2 border-purple-500/30 rounded-3xl p-10">
              {!showCreateForm ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl shadow-2xl shadow-purple-500/40">
                      ➕
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold mb-2">Create New Migration Pattern</h2>
                      <p className="text-white/60 text-lg">
                        Define a reusable pattern for your migration workflows
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl font-bold text-lg shadow-2xl shadow-purple-500/40 hover:scale-105 transition-all flex items-center gap-3"
                  >
                    <Plus className="w-6 h-6" />
                    Create Pattern
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">New Pattern Details</h2>
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    {/* Pattern Name */}
                    <div>
                      <label className="block text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Pattern Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Spring Boot Migration"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>

                    {/* Similar to Existing Pattern */}
                    <div>
                      <label className="block text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Similar to Existing Pattern
                      </label>
                      <select
                        value={formData.patternType}
                        onChange={(e) => setFormData({ ...formData, patternType: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                      >
                        <option value="" className="bg-gray-900">Select similar pattern...</option>
                        <option value="None" className="bg-gray-900 text-white/70">None</option>
                        {existingPatterns.map((pattern) => (
                          <option key={pattern.id} value={pattern.name} className="bg-gray-900">
                            {pattern.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Lego Type */}
                    <div>
                      <label className="block text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Lego Type
                      </label>
                      <div className="space-y-3">
                        <select
                          value={isCreatingNewLegoType ? 'CREATE_NEW' : formData.legoType}
                          onChange={(e) => {
                            if (e.target.value === 'CREATE_NEW') {
                              setIsCreatingNewLegoType(true);
                              setFormData({ ...formData, legoType: '' });
                            } else {
                              setIsCreatingNewLegoType(false);
                              setFormData({ ...formData, legoType: e.target.value, newLegoType: '' });
                            }
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                        >
                          <option value="" className="bg-gray-900">Select lego type...</option>
                          {legoTypes.map((type, index) => (
                            <option key={index} value={type} className="bg-gray-900">
                              {type}
                            </option>
                          ))}
                          <option value="CREATE_NEW" className="bg-gray-900 text-purple-400 font-semibold">
                            ➕ Create New Lego Type...
                          </option>
                        </select>
                        <button
                          onClick={() => navigate('/manage-legos/0')}
                          className="w-full py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border border-green-500/30 hover:border-green-500/50 rounded-xl font-semibold text-green-400 transition-all flex items-center justify-center gap-2"
                        >
                          <Package className="w-4 h-4" />
                          Manage Legos & Lego Types
                        </button>
                      </div>
                    </div>

                    {/* New Lego Type - Conditional */}
                    {isCreatingNewLegoType && (
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          <span>Enter New Lego Type Name</span>
                          <span className="text-red-400 text-sm">*</span>
                        </label>
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={formData.newLegoType}
                            onChange={(e) => setFormData({ ...formData, newLegoType: e.target.value, legoType: e.target.value })}
                            placeholder="e.g., Custom Migration Lego"
                            className="flex-1 bg-white/5 border border-purple-500/30 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                            autoFocus
                          />
                          <button
                            onClick={() => {
                              setIsCreatingNewLegoType(false);
                              setFormData({ ...formData, newLegoType: '', legoType: '' });
                            }}
                            className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-semibold transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Description - Full Width - MANDATORY */}
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        <span>Description</span>
                        <span className="text-red-400 text-sm">*</span>
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe the migration pattern in detail... (Required)"
                        rows={4}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none"
                      />
                    </div>

                    {/* Link to Detailed Documentation */}
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                        <LinkIcon className="w-4 h-4" />
                        Link to Detailed Documentation
                      </label>
                      <input
                        type="url"
                        value={formData.documentationLink}
                        onChange={(e) => setFormData({ ...formData, documentationLink: e.target.value })}
                        placeholder="https://docs.example.com/migration-pattern"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>

                    {/* Default Pipeline */}
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Default Pipeline
                      </label>
                      <select
                        value={formData.defaultPipeline}
                        onChange={(e) => setFormData({ ...formData, defaultPipeline: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                      >
                        <option value="" className="bg-gray-900">Select default pipeline...</option>
                        <option value="Full Pipeline" className="bg-gray-900">Full Pipeline</option>
                        <option value="Custom Pipeline" className="bg-gray-900">Custom Pipeline</option>
                      </select>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleCreatePattern}
                      className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-bold text-lg shadow-xl shadow-purple-500/30 transition-all flex items-center justify-center gap-3"
                    >
                      <Plus className="w-5 h-5" />
                      Create Pattern
                    </button>
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-semibold transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Existing Patterns Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">Existing Patterns</h2>
              <p className="text-white/40 text-sm">{existingPatterns.length} patterns available</p>
            </div>
            
            {/* Search */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search patterns..."
                  className="bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 w-80 text-sm focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all placeholder-white/30"
                />
              </div>
              <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Patterns Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredPatterns.map((pattern) => (
              <div
                key={pattern.id}
                className="group relative bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 hover:border-purple-500/30 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-2xl flex-shrink-0">
                    🧩
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1 group-hover:text-purple-400 transition-colors">
                          {pattern.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-white/50">
                          <span className="flex items-center gap-1">
                            <Code className="w-3 h-3" />
                            {pattern.patternType}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            {pattern.legoType}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <RefreshCw className="w-3 h-3" />
                            {pattern.defaultPipeline}
                          </span>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">{pattern.usageCount}</div>
                          <div className="text-xs text-white/40">Uses</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-white/60">{pattern.createdDate}</div>
                          <div className="text-xs text-white/40">Created</div>
                        </div>
                      </div>
                    </div>

                    <p className="text-white/60 text-sm mb-4">
                      {pattern.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-500/50 rounded-lg text-sm font-medium transition-all">
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 rounded-lg text-sm font-medium transition-all">
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                      <button className="ml-auto px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-sm font-semibold shadow-lg shadow-purple-500/20 transition-all">
                        Use Pattern
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPatterns.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-white/20" />
              </div>
              <p className="text-white/40">No patterns found matching your search</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}