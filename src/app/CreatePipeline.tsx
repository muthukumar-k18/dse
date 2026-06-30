import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Trash2, Edit2, GripVertical, CheckCircle2, Circle, Save } from 'lucide-react';

interface PipelineStep {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  order: number;
}

export default function CreatePipeline() {
  const navigate = useNavigate();
  const [pipelineName, setPipelineName] = useState('');
  const [pipelineDescription, setPipelineDescription] = useState('');
  const [editingStepId, setEditingStepId] = useState<number | null>(null);
  const [editingStepName, setEditingStepName] = useState('');
  const [editingStepDescription, setEditingStepDescription] = useState('');

  // Default pipeline steps
  const [steps, setSteps] = useState<PipelineStep[]>([
    {
      id: 1,
      name: 'Discovery & Assessment',
      description: 'Analyze existing application architecture, identify dependencies, and assess migration complexity',
      isActive: true,
      order: 1
    },
    {
      id: 2,
      name: 'Planning & Estimation',
      description: 'Create detailed migration plan, estimate effort, and define resource requirements',
      isActive: true,
      order: 2
    },
    {
      id: 3,
      name: 'Pattern Identification',
      description: 'Identify migration patterns and map them to appropriate transformation strategies',
      isActive: true,
      order: 3
    },
    {
      id: 4,
      name: 'Lego Selection & Configuration',
      description: 'Select and configure reusable Lego components for the migration process',
      isActive: true,
      order: 4
    },
    {
      id: 5,
      name: 'Code Transformation',
      description: 'Execute automated code transformations using selected patterns and Legos',
      isActive: true,
      order: 5
    },
    {
      id: 6,
      name: 'Testing & Validation',
      description: 'Perform comprehensive testing including unit, integration, and acceptance tests',
      isActive: true,
      order: 6
    },
    {
      id: 7,
      name: 'Remediation',
      description: 'Address issues identified during testing and refine the migrated application',
      isActive: true,
      order: 7
    },
    {
      id: 8,
      name: 'Deployment',
      description: 'Deploy the migrated application to target environment with proper CI/CD integration',
      isActive: true,
      order: 8
    },
    {
      id: 9,
      name: 'Post-Migration Support',
      description: 'Monitor application performance and provide ongoing support for stabilization',
      isActive: true,
      order: 9
    }
  ]);

  const handleToggleStep = (stepId: number) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, isActive: !step.isActive } : step
    ));
  };

  const handleRemoveStep = (stepId: number) => {
    setSteps(steps.filter(step => step.id !== stepId));
  };

  const handleAddStep = () => {
    const newStep: PipelineStep = {
      id: Math.max(...steps.map(s => s.id), 0) + 1,
      name: 'New Step',
      description: 'Describe this step...',
      isActive: true,
      order: steps.length + 1
    };
    setSteps([...steps, newStep]);
    setEditingStepId(newStep.id);
    setEditingStepName(newStep.name);
    setEditingStepDescription(newStep.description);
  };

  const handleStartEdit = (step: PipelineStep) => {
    setEditingStepId(step.id);
    setEditingStepName(step.name);
    setEditingStepDescription(step.description);
  };

  const handleSaveEdit = () => {
    if (editingStepId !== null) {
      setSteps(steps.map(step =>
        step.id === editingStepId
          ? { ...step, name: editingStepName, description: editingStepDescription }
          : step
      ));
      setEditingStepId(null);
      setEditingStepName('');
      setEditingStepDescription('');
    }
  };

  const handleCancelEdit = () => {
    setEditingStepId(null);
    setEditingStepName('');
    setEditingStepDescription('');
  };

  const handleSavePipeline = () => {
    if (!pipelineName.trim()) {
      alert('Please enter a pipeline name');
      return;
    }

    alert('Pipeline saved successfully!');
    // In real implementation, this would save to backend
    navigate('/aaf-migration-expert');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-green-500/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/5 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-12 py-6">
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl shadow-lg shadow-green-500/30">
                  ⚙️
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Create Pipeline</h1>
                  <p className="text-white/40 text-sm">Design custom migration pipeline tailored to your needs</p>
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
      <main className="relative z-10 max-w-[1600px] mx-auto px-12 py-12">
        
        {/* Pipeline Details Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl shadow-lg shadow-green-500/30">
                📋
              </div>
              Pipeline Details
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white/70 mb-3">
                  Pipeline Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={pipelineName}
                  onChange={(e) => setPipelineName(e.target.value)}
                  placeholder="e.g., Standard Migration Pipeline"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-semibold text-white/70 mb-3">
                  Description
                </label>
                <textarea
                  value={pipelineDescription}
                  onChange={(e) => setPipelineDescription(e.target.value)}
                  placeholder="Describe the purpose and scope of this pipeline..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all resize-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pipeline Steps Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Pipeline Steps</h2>
              <p className="text-white/40 text-sm">
                {steps.filter(s => s.isActive).length} active steps • {steps.length} total steps
              </p>
            </div>
            
            <button
              onClick={handleAddStep}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl font-semibold shadow-lg shadow-green-500/30 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Step
            </button>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`bg-gradient-to-br from-white/[0.04] to-white/[0.02] border rounded-2xl p-6 transition-all ${
                  step.isActive 
                    ? 'border-white/10 hover:border-green-500/30' 
                    : 'border-white/5 opacity-50'
                }`}
              >
                {editingStepId === step.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-white/70 mb-2">
                        Step Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={editingStepName}
                        onChange={(e) => setEditingStepName(e.target.value)}
                        className="w-full bg-white/5 border border-green-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                        autoFocus
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-white/70 mb-2">
                        Description
                      </label>
                      <textarea
                        value={editingStepDescription}
                        onChange={(e) => setEditingStepDescription(e.target.value)}
                        rows={3}
                        className="w-full bg-white/5 border border-green-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all resize-none"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveEdit}
                        className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg font-semibold transition-all flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg font-semibold transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex items-start gap-4">
                    {/* Drag Handle */}
                    <div className="cursor-move mt-1">
                      <GripVertical className="w-5 h-5 text-white/30 hover:text-white/50 transition-colors" />
                    </div>

                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shadow-lg ${
                        step.isActive
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-green-500/30'
                          : 'bg-white/5 text-white/30'
                      }`}>
                        {index + 1}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold">{step.name}</h3>
                          {step.isActive ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-white/30" />
                          )}
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleStep(step.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                              step.isActive
                                ? 'bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20'
                                : 'bg-white/5 border border-white/10 text-white/50 hover:bg-white/10'
                            }`}
                          >
                            {step.isActive ? 'Active' : 'Inactive'}
                          </button>
                          
                          <button
                            onClick={() => handleStartEdit(step)}
                            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => handleRemoveStep(step.id)}
                            className="p-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-white/60 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex gap-4">
          <button
            onClick={handleSavePipeline}
            className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl font-bold text-lg shadow-xl shadow-green-500/30 transition-all flex items-center justify-center gap-3"
          >
            <Save className="w-5 h-5" />
            Save Pipeline
          </button>
          
          <button
            onClick={() => navigate('/aaf-migration-expert')}
            className="px-12 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-semibold transition-all"
          >
            Cancel
          </button>
        </section>
      </main>
    </div>
  );
}
