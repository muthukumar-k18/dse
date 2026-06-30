import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Plus, Package, Code, ChevronDown, ChevronUp, Edit2, Trash2, DollarSign, FileText, Sparkles } from 'lucide-react';

interface Pattern {
  id: number;
  name: string;
  patternType: string;
}

interface Lego {
  id: number;
  name: string;
  legoType: string;
  associatedPattern: string;
  estimationType: string;
  description: string;
  createdDate: string;
  variants?: { name: string; rangeStart: string; rangeEnd: string; numberOfLegos: string }[];
}

interface LegoType {
  name: string;
  legos: Lego[];
}

export default function ManageLegos() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [expandedLegoTypes, setExpandedLegoTypes] = useState<Set<string>>(new Set());
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCreatingNewLegoType, setIsCreatingNewLegoType] = useState(false);
  const [isCreatingNewEstimationCriteria, setIsCreatingNewEstimationCriteria] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    legoName: '',
    legoType: '',
    newLegoType: '',
    associatedPattern: '',
    estimationType: '',
    newEstimationType: '',
    description: '',
    numberOfVariants: '',
    variants: [] as { name: string; rangeStart: string; rangeEnd: string; numberOfLegos: string }[]
  });

  // Available patterns (from previous screen)
  const availablePatterns: Pattern[] = [
    { id: 1, name: 'Spring Boot Migration', patternType: 'Struts-Based UI Modernization to Spring Boot' },
    { id: 2, name: 'JDK 8 to 17 Upgrade', patternType: 'JSP to Runtime Modernization (JDK Update)' },
    { id: 3, name: 'JUnit 5 Migration', patternType: 'Unit Test Suite Modernization' },
    { id: 4, name: 'Security Patch Automation', patternType: 'Security Vulnerability Remediation' },
    { id: 5, name: 'APM Integration', patternType: 'Observability Enablement (Logging and APM)' }
  ];

  // Estimation types
  const estimationTypes = [
    'Number of Struts Actions',
    'Number of Bean Definitions',
    'Number of Dependencies',
    'Number of Application Files',
    'Number of Test Cases',
    'Number of Performance Bottlenecks',
    'Number of Classes',
    'Number of Quality Issues',
    'Number of Log Statements',
    'Number of Cloud Resources',
    'Number of VM Instances',
    'Number of Files',
    'Number of Lines',
    'Number of Methods',
    'Number of Functions',
    'Story Point-based',
    'Lego-based (T-shirt sizing)',
    'Custom Estimation',
    'Fixed Price',
    'Time & Materials'
  ];

  // Sample data - Lego types with associated legos
  const [legoData, setLegoData] = useState<LegoType[]>([
    {
      name: 'Application Transformation',
      legos: [
        {
          id: 1,
          name: 'Spring Framework Version Upgrade',
          legoType: 'Application Transformation',
          associatedPattern: 'Spring Boot Migration',
          estimationType: 'Number of Controllers / Classes impacted, including compatibility fixes',
          description: 'Automated upgrade of Spring Framework versions with comprehensive compatibility analysis',
          createdDate: '2024-01-15',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '10', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '11', rangeEnd: '50', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '51', rangeEnd: '100', numberOfLegos: '6' }
          ]
        },
        {
          id: 2,
          name: 'Java Runtime Modernization (JDK Upgrade)',
          legoType: 'Application Transformation',
          associatedPattern: 'JDK 8 to 17 Upgrade',
          estimationType: 'Number of Application artifacts (WARs) requiring upgrade and validation',
          description: 'Modernize Java runtime environments with automated migration tooling',
          createdDate: '2024-01-16',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '5', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '6', rangeEnd: '15', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '16', rangeEnd: '30', numberOfLegos: '6' }
          ]
        },
        {
          id: 3,
          name: 'Application Server Migration (TomCat/JBoss/WebSphere)',
          legoType: 'Application Transformation',
          associatedPattern: 'Application Server Migration',
          estimationType: 'Number of Library namespace changes (java→jakarta)',
          description: 'Migrate applications across different application server platforms',
          createdDate: '2024-01-17',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '20', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '21', rangeEnd: '50', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '51', rangeEnd: '100', numberOfLegos: '6' },
            { name: 'Variant 4', rangeStart: '101', rangeEnd: '200', numberOfLegos: '10' }
          ]
        },
        {
          id: 4,
          name: 'Stateful Application Refactoring',
          legoType: 'Application Transformation',
          associatedPattern: 'Application Modernization',
          estimationType: 'Complexity level (AA-level) including redesign and validation',
          description: 'Refactor stateful applications to modern stateless architecture patterns',
          createdDate: '2024-01-18',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '3', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '4', rangeEnd: '7', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '8', rangeEnd: '10', numberOfLegos: '6' }
          ]
        }
      ]
    },
    {
      name: 'Quality Engineering',
      legos: [
        {
          id: 5,
          name: 'Unit Test Suite Modernization',
          legoType: 'Quality Engineering',
          associatedPattern: 'JUnit 5 Migration',
          estimationType: 'Number of Test Cases to be updated, including regeneration and validation',
          description: 'Modernize unit test suites to latest testing frameworks and best practices',
          createdDate: '2024-02-01',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '50', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '51', rangeEnd: '200', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '201', rangeEnd: '500', numberOfLegos: '6' },
            { name: 'Variant 4', rangeStart: '501', rangeEnd: '1000', numberOfLegos: '10' }
          ]
        },
        {
          id: 6,
          name: 'Test Framework Migration',
          legoType: 'Quality Engineering',
          associatedPattern: 'Test Framework Upgrade',
          estimationType: 'Number of Test Cases migrated across frameworks, including conversion effort',
          description: 'Migrate test suites across different testing frameworks',
          createdDate: '2024-02-02',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '100', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '101', rangeEnd: '500', numberOfLegos: '6' }
          ]
        },
        {
          id: 7,
          name: 'Automated Unit Test Creation',
          legoType: 'Quality Engineering',
          associatedPattern: 'Test Automation',
          estimationType: 'Number of Test Cases to be developed, including generation and validation',
          description: 'Automatically generate unit tests based on code analysis',
          createdDate: '2024-02-03',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '25', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '26', rangeEnd: '100', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '101', rangeEnd: '300', numberOfLegos: '6' }
          ]
        }
      ]
    },
    {
      name: 'Security Engineering',
      legos: [
        {
          id: 8,
          name: 'Security Vulnerability Remediation',
          legoType: 'Security Engineering',
          associatedPattern: 'Security Patch Automation',
          estimationType: 'Number of Classes with identified issues, including fixes and validation',
          description: 'Identify and remediate security vulnerabilities with automated patching',
          createdDate: '2024-02-10',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '10', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '11', rangeEnd: '30', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '31', rangeEnd: '100', numberOfLegos: '6' }
          ]
        },
        {
          id: 9,
          name: 'Identity and Access Integration',
          legoType: 'Security Engineering',
          associatedPattern: 'IAM Integration',
          estimationType: 'Complexity level (AA-level) including configuration and validation',
          description: 'Integrate identity and access management systems',
          createdDate: '2024-02-11',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '3', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '4', rangeEnd: '6', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '7', rangeEnd: '10', numberOfLegos: '6' }
          ]
        },
        {
          id: 10,
          name: 'Secure Secrets and Vault Integration',
          legoType: 'Security Engineering',
          associatedPattern: 'Vault Integration',
          estimationType: 'Complexity level (AA-level) including integration and validation',
          description: 'Integrate secure vault solutions for secrets management',
          createdDate: '2024-02-12',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '2', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '3', rangeEnd: '5', numberOfLegos: '3' },
            { name: 'Custom', rangeStart: '', rangeEnd: '', numberOfLegos: 'Custom' }
          ]
        },
        {
          id: 11,
          name: 'Access Control and Authorization Services',
          legoType: 'Security Engineering',
          associatedPattern: 'Authorization Services',
          estimationType: 'Complexity level (AA-level) including onboarding and validation',
          description: 'Implement comprehensive access control and authorization mechanisms',
          createdDate: '2024-02-13',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '5', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '6', rangeEnd: '15', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '16', rangeEnd: '30', numberOfLegos: '6' }
          ]
        }
      ]
    },
    {
      name: 'Observability & Monitoring',
      legos: [
        {
          id: 12,
          name: 'Observability Enablement (Logging and Monitoring)',
          legoType: 'Observability & Monitoring',
          associatedPattern: 'APM Integration',
          estimationType: 'Number of Alerts / monitoring configurations, including setup and tuning',
          description: 'Enable comprehensive observability with logging and monitoring solutions',
          createdDate: '2024-03-01',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '10', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '11', rangeEnd: '50', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '51', rangeEnd: '200', numberOfLegos: '6' }
          ]
        }
      ]
    },
    {
      name: 'DevOps Enablement',
      legos: [
        {
          id: 13,
          name: 'CI/CD Pipeline Enablement',
          legoType: 'DevOps Enablement',
          associatedPattern: 'CI/CD Setup',
          estimationType: 'Number of Environments onboarded, including pipeline and validation',
          description: 'Enable CI/CD pipelines for automated build, test, and deployment',
          createdDate: '2024-03-05',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '1', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '2', rangeEnd: '2', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '3', rangeEnd: '5', numberOfLegos: '6' }
          ]
        },
        {
          id: 14,
          name: 'Cloud Automation Setup',
          legoType: 'DevOps Enablement',
          associatedPattern: 'Cloud Automation',
          estimationType: 'Number of Environments, including pipeline and integration setup',
          description: 'Setup cloud automation infrastructure and workflows',
          createdDate: '2024-03-06',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '2', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '3', rangeEnd: '5', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '6', rangeEnd: '10', numberOfLegos: '6' }
          ]
        },
        {
          id: 15,
          name: 'Integrated CI/CD and Deployment Strategies',
          legoType: 'DevOps Enablement',
          associatedPattern: 'Advanced CI/CD',
          estimationType: 'Number of Environments and deployments, including orchestration',
          description: 'Implement advanced CI/CD and deployment strategies with orchestration',
          createdDate: '2024-03-07',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '2', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '3', rangeEnd: '5', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '6', rangeEnd: '10', numberOfLegos: '6' },
            { name: 'Variant 4', rangeStart: '11', rangeEnd: '20', numberOfLegos: '10' },
            { name: 'Custom', rangeStart: '', rangeEnd: '', numberOfLegos: 'Custom' }
          ]
        },
        {
          id: 16,
          name: 'Advanced Release Pipeline Enablement',
          legoType: 'DevOps Enablement',
          associatedPattern: 'Release Pipeline',
          estimationType: 'Number of Environments, including release orchestration',
          description: 'Enable advanced release pipeline management and orchestration',
          createdDate: '2024-03-08',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '3', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '4', rangeEnd: '8', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '9', rangeEnd: '15', numberOfLegos: '6' }
          ]
        }
      ]
    },
    {
      name: 'Cloud Infrastructure',
      legos: [
        {
          id: 17,
          name: 'Virtual Machine Provisioning & Configuration',
          legoType: 'Cloud Infrastructure',
          associatedPattern: 'VM Management',
          estimationType: 'Number of VMs to be provisioned and configured',
          description: 'Automate virtual machine provisioning and configuration',
          createdDate: '2024-03-10',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '5', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '6', rangeEnd: '20', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '21', rangeEnd: '50', numberOfLegos: '6' },
            { name: 'Variant 4', rangeStart: '51', rangeEnd: '100', numberOfLegos: '10' }
          ]
        }
      ]
    },
    {
      name: 'Integration Services',
      legos: [
        {
          id: 18,
          name: 'Managed File Transfer Enablement',
          legoType: 'Integration Services',
          associatedPattern: 'MFT Integration',
          estimationType: 'Number of File types / transfer flows, including setup',
          description: 'Enable managed file transfer capabilities across systems',
          createdDate: '2024-03-15',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '5', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '6', rangeEnd: '15', numberOfLegos: '3' }
          ]
        },
        {
          id: 19,
          name: 'External System Connectivity Integration',
          legoType: 'Integration Services',
          associatedPattern: 'External Integration',
          estimationType: 'Number of External integrations, including setup and validation',
          description: 'Integrate with external systems and services',
          createdDate: '2024-03-16',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '3', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '4', rangeEnd: '10', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '11', rangeEnd: '25', numberOfLegos: '6' }
          ]
        }
      ]
    },
    {
      name: 'Data Integration',
      legos: [
        {
          id: 20,
          name: 'Database Integration Refactoring',
          legoType: 'Data Integration',
          associatedPattern: 'Database Migration',
          estimationType: 'Number of Artifacts / integration points, including modification',
          description: 'Refactor database integrations for improved performance and maintainability',
          createdDate: '2024-03-20',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '10', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '11', rangeEnd: '30', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '31', rangeEnd: '100', numberOfLegos: '6' }
          ]
        }
      ]
    },
    {
      name: 'API & Integration',
      legos: [
        {
          id: 21,
          name: 'API Endpoint Modification and Refactoring',
          legoType: 'API & Integration',
          associatedPattern: 'API Modernization',
          estimationType: 'Number of Endpoints impacted, including reconfiguration and validation',
          description: 'Modify and refactor API endpoints for modern architecture patterns',
          createdDate: '2024-03-25',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '10', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '11', rangeEnd: '50', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '51', rangeEnd: '150', numberOfLegos: '6' },
            { name: 'Variant 4', rangeStart: '151', rangeEnd: '300', numberOfLegos: '10' }
          ]
        }
      ]
    },
    {
      name: 'API Management',
      legos: [
        {
          id: 22,
          name: 'Web Management Onboarding',
          legoType: 'API Management',
          associatedPattern: 'API Gateway Setup',
          estimationType: 'Number of API Gateway / API Management instances, including setup',
          description: 'Onboard web management and API gateway solutions',
          createdDate: '2024-03-30',
          variants: [
            { name: 'Variant 1', rangeStart: '1', rangeEnd: '1', numberOfLegos: '2' },
            { name: 'Variant 2', rangeStart: '2', rangeEnd: '2', numberOfLegos: '3' },
            { name: 'Variant 3', rangeStart: '3', rangeEnd: '10', numberOfLegos: '6' }
          ]
        }
      ]
    }
  ]);

  const toggleLegoType = (legoTypeName: string) => {
    const newExpanded = new Set(expandedLegoTypes);
    if (newExpanded.has(legoTypeName)) {
      newExpanded.delete(legoTypeName);
    } else {
      newExpanded.add(legoTypeName);
    }
    setExpandedLegoTypes(newExpanded);
  };

  const handleCreateLego = () => {
    if (!formData.legoName || !formData.legoType || !formData.associatedPattern || !formData.estimationType || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const newLego: Lego = {
      id: Math.max(...legoData.flatMap(lt => lt.legos.map(l => l.id)), 0) + 1,
      name: formData.legoName,
      legoType: formData.legoType,
      associatedPattern: formData.associatedPattern,
      estimationType: formData.estimationType,
      description: formData.description,
      createdDate: new Date().toISOString().split('T')[0],
      variants: formData.variants
    };

    // Add to existing or new lego type
    const updatedLegoData = [...legoData];
    const existingType = updatedLegoData.find(lt => lt.name === formData.legoType);
    
    if (existingType) {
      existingType.legos.push(newLego);
    } else {
      updatedLegoData.push({
        name: formData.legoType,
        legos: [newLego]
      });
    }

    setLegoData(updatedLegoData);
    
    // Reset form
    setFormData({ legoName: '', legoType: '', newLegoType: '', associatedPattern: '', estimationType: '', newEstimationType: '', description: '', numberOfVariants: '', variants: [] });
    setShowCreateForm(false);
    setIsCreatingNewLegoType(false);
    setIsCreatingNewEstimationCriteria(false);

    alert('Lego created successfully!');
  };

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
                onClick={() => navigate(`/create-new-pattern/${projectId}`)}
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Patterns</span>
              </button>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl shadow-lg shadow-green-500/30">
                  🧱
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Lego Management</h1>
                  <p className="text-white/40 text-sm">Create and manage migration Legos for your patterns</p>
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
        
        {/* Create New Lego Section - Prominent */}
        <section className="mb-12">
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            
            {/* Card */}
            <div className="relative bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-green-500/10 border-2 border-green-500/30 rounded-3xl p-10">
              {!showCreateForm ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-4xl shadow-2xl shadow-green-500/40">
                      ➕
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold mb-2">Create New Lego</h2>
                      <p className="text-white/60 text-lg">
                        Build a new reusable Lego component and associate it with a migration pattern
                      </p>
                      <p className="text-white/40 text-sm mt-2">
                        💡 Note: You must create a pattern first before creating a Lego
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-2xl font-bold text-lg shadow-2xl shadow-green-500/40 hover:scale-105 transition-all flex items-center gap-3"
                  >
                    <Plus className="w-6 h-6" />
                    Create New Lego
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">New Lego Details</h2>
                    <button
                      onClick={() => {
                        setShowCreateForm(false);
                        setIsCreatingNewLegoType(false);
                      }}
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    {/* Lego Name */}
                    <div>
                      <label className="block text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        <span>Lego Name</span>
                        <span className="text-red-400 text-sm">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.legoName}
                        onChange={(e) => setFormData({ ...formData, legoName: e.target.value })}
                        placeholder="e.g., Struts to Spring Boot Converter"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>

                    {/* Associated Pattern - MUST SELECT FIRST */}
                    <div>
                      <label className="block text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        <span>Associated Pattern</span>
                        <span className="text-red-400 text-sm">*</span>
                      </label>
                      <select
                        value={formData.associatedPattern}
                        onChange={(e) => setFormData({ ...formData, associatedPattern: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                      >
                        <option value="" className="bg-gray-900">Select pattern first...</option>
                        {availablePatterns.map((pattern) => (
                          <option key={pattern.id} value={pattern.name} className="bg-gray-900">
                            {pattern.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-white/40 text-xs mt-2">💡 Select the pattern this Lego will be used with</p>
                    </div>

                    {/* Lego Type - Add to Existing or Create New */}
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Lego Type</span>
                        <span className="text-red-400 text-sm">*</span>
                      </label>
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
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                      >
                        <option value="" className="bg-gray-900">Select lego type...</option>
                        {legoData.map((legoType, index) => (
                          <option key={index} value={legoType.name} className="bg-gray-900">
                            {legoType.name}
                          </option>
                        ))}
                        <option value="CREATE_NEW" className="bg-gray-900 text-green-400 font-semibold">
                          ➕ Create New Lego Type...
                        </option>
                      </select>
                      <p className="text-white/40 text-xs mt-2">Add to an existing Lego type or create a new one</p>
                    </div>

                    {/* New Lego Type - Conditional */}
                    {isCreatingNewLegoType && (
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          <span>Enter New Lego Type Name</span>
                          <span className="text-red-400 text-sm">*</span>
                        </label>
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={formData.newLegoType}
                            onChange={(e) => setFormData({ ...formData, newLegoType: e.target.value, legoType: e.target.value })}
                            placeholder="e.g., Database Migration Lego"
                            className="flex-1 bg-white/5 border border-green-500/30 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
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

                    {/* Estimation Criteria */}
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>Estimation Criteria</span>
                        <span className="text-red-400 text-sm">*</span>
                      </label>
                      <select
                        value={isCreatingNewEstimationCriteria ? 'CREATE_NEW' : formData.estimationType}
                        onChange={(e) => {
                          if (e.target.value === 'CREATE_NEW') {
                            setIsCreatingNewEstimationCriteria(true);
                            setFormData({ ...formData, estimationType: '' });
                          } else {
                            setIsCreatingNewEstimationCriteria(false);
                            setFormData({ ...formData, estimationType: e.target.value, newEstimationType: '' });
                          }
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                      >
                        <option value="" className="bg-gray-900">Select estimation criteria...</option>
                        {estimationTypes.map((type, index) => (
                          <option key={index} value={type} className="bg-gray-900">
                            {type}
                          </option>
                        ))}
                        <option value="CREATE_NEW" className="bg-gray-900 text-green-400 font-semibold">
                          ➕ Create New Estimation Criteria...
                        </option>
                      </select>
                      <p className="text-white/40 text-xs mt-2">Select existing criteria or create a new one</p>
                    </div>

                    {/* New Estimation Criteria - Conditional */}
                    {isCreatingNewEstimationCriteria && (
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span>Enter New Estimation Criteria</span>
                          <span className="text-red-400 text-sm">*</span>
                        </label>
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={formData.newEstimationType}
                            onChange={(e) => setFormData({ ...formData, newEstimationType: e.target.value, estimationType: e.target.value })}
                            placeholder="e.g., Number of API Endpoints"
                            className="flex-1 bg-white/5 border border-green-500/30 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                            autoFocus
                          />
                          <button
                            onClick={() => {
                              setIsCreatingNewEstimationCriteria(false);
                              setFormData({ ...formData, newEstimationType: '', estimationType: '' });
                            }}
                            className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-semibold transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Variants Section */}
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Number of Variants</span>
                        <span className="text-red-400 text-sm">*</span>
                      </label>
                      <select
                        value={formData.numberOfVariants}
                        onChange={(e) => {
                          const count = parseInt(e.target.value);
                          const newVariants = Array.from({ length: count }, (_, i) => ({
                            name: formData.variants[i]?.name || `Variant ${i + 1}`,
                            rangeStart: formData.variants[i]?.rangeStart || '',
                            rangeEnd: formData.variants[i]?.rangeEnd || '',
                            numberOfLegos: formData.variants[i]?.numberOfLegos || ''
                          }));
                          setFormData({ ...formData, numberOfVariants: e.target.value, variants: newVariants });
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
                      >
                        <option value="" className="bg-gray-900">Select number of variants...</option>
                        <option value="2" className="bg-gray-900">2 Variants</option>
                        <option value="3" className="bg-gray-900">3 Variants</option>
                        <option value="4" className="bg-gray-900">4 Variants</option>
                        <option value="5" className="bg-gray-900">5 Variants</option>
                      </select>
                      <p className="text-white/40 text-xs mt-2">Define how many size variants this Lego will have</p>
                    </div>

                    {/* Variant Ranges - Dynamic based on numberOfVariants */}
                    {formData.numberOfVariants && formData.variants.length > 0 && (
                      <div className="col-span-2">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                          <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-green-400" />
                            Define Variant Ranges
                          </h4>
                          <div className="space-y-4">
                            {formData.variants.map((variant, index) => (
                              <div key={index} className="bg-black/30 border border-white/5 rounded-lg p-4">
                                <label className="block text-sm font-semibold text-white/60 mb-3">
                                  Variant {index + 1}
                                </label>
                                <div className="grid grid-cols-4 gap-3">
                                  <div>
                                    <label className="block text-xs text-white/40 mb-2">Variant Name</label>
                                    <input
                                      type="text"
                                      value={variant.name}
                                      onChange={(e) => {
                                        const newVariants = [...formData.variants];
                                        newVariants[index].name = e.target.value;
                                        setFormData({ ...formData, variants: newVariants });
                                      }}
                                      placeholder={`Variant ${index + 1}`}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 focus:outline-none focus:border-green-500/50 transition-all"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-white/40 mb-2">Range Start</label>
                                    <input
                                      type="number"
                                      value={variant.rangeStart}
                                      onChange={(e) => {
                                        const newVariants = [...formData.variants];
                                        newVariants[index].rangeStart = e.target.value;
                                        setFormData({ ...formData, variants: newVariants });
                                      }}
                                      placeholder="1"
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 focus:outline-none focus:border-green-500/50 transition-all"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-white/40 mb-2">Range End</label>
                                    <input
                                      type="number"
                                      value={variant.rangeEnd}
                                      onChange={(e) => {
                                        const newVariants = [...formData.variants];
                                        newVariants[index].rangeEnd = e.target.value;
                                        setFormData({ ...formData, variants: newVariants });
                                      }}
                                      placeholder="10"
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 focus:outline-none focus:border-green-500/50 transition-all"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-white/40 mb-2">Number of Legos</label>
                                    <input
                                      type="text"
                                      value={variant.numberOfLegos}
                                      onChange={(e) => {
                                        const newVariants = [...formData.variants];
                                        newVariants[index].numberOfLegos = e.target.value;
                                        setFormData({ ...formData, variants: newVariants });
                                      }}
                                      placeholder={index === 0 ? '2' : index === 1 ? '3' : '6'}
                                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/20 focus:outline-none focus:border-green-500/50 transition-all"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <p className="text-white/40 text-xs mt-4">💡 Add "Custom" variant for user-defined Lego count (leave range empty)</p>
                        </div>
                      </div>
                    )}

                    {/* Description - MANDATORY */}
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Description</span>
                        <span className="text-red-400 text-sm">*</span>
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe what this Lego does and how it helps in the migration process... (Required)"
                        rows={4}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleCreateLego}
                      className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl font-bold text-lg shadow-xl shadow-green-500/30 transition-all flex items-center justify-center gap-3"
                    >
                      <Plus className="w-5 h-5" />
                      Create Lego
                    </button>
                    <button
                      onClick={() => {
                        setShowCreateForm(false);
                        setIsCreatingNewLegoType(false);
                        setIsCreatingNewEstimationCriteria(false);
                      }}
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

        {/* Existing Lego Types & Legos */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">Existing Lego Types</h2>
            <p className="text-white/40 text-sm">{legoData.length} lego types with {legoData.reduce((sum, lt) => sum + lt.legos.length, 0)} total legos</p>
          </div>

          <div className="space-y-4">
            {legoData.map((legoType, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden"
              >
                {/* Lego Type Header */}
                <button
                  onClick={() => toggleLegoType(legoType.name)}
                  className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center text-xl">
                      🧱
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold">{legoType.name}</h3>
                      <p className="text-white/40 text-sm">{legoType.legos.length} lego{legoType.legos.length !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-sm font-medium text-green-400">
                      {legoType.legos.length} Lego{legoType.legos.length !== 1 ? 's' : ''}
                    </span>
                    {expandedLegoTypes.has(legoType.name) ? (
                      <ChevronUp className="w-5 h-5 text-white/40" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/40" />
                    )}
                  </div>
                </button>

                {/* Expanded Legos List */}
                {expandedLegoTypes.has(legoType.name) && (
                  <div className="border-t border-white/5 bg-black/20">
                    <div className="p-6 space-y-4">
                      {legoType.legos.map((lego) => (
                        <div
                          key={lego.id}
                          className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-green-500/20 transition-all"
                        >
                          <div className="flex items-start justify-between gap-6 mb-3">
                            <div className="flex-1">
                              <h4 className="text-lg font-bold mb-2">{lego.name}</h4>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-white/50 mb-3">
                                <span className="flex items-center gap-1 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                                  <Code className="w-3 h-3" />
                                  {lego.associatedPattern}
                                </span>
                                <span className="text-white/30">Created: {lego.createdDate}</span>
                              </div>
                              <p className="text-white/60 text-sm">{lego.description}</p>
                            </div>

                            {/* Right Column: Estimation Criteria & Variants */}
                            <div className="min-w-[320px] space-y-3">
                              {/* Estimation Criteria - Highlighted */}
                              <div className="bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <DollarSign className="w-5 h-5 text-blue-400" />
                                  <span className="text-sm font-semibold text-blue-300">Estimation Criteria</span>
                                </div>
                                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-3 rounded-lg font-bold text-center shadow-lg shadow-blue-500/30">
                                  {lego.estimationType}
                                </div>
                              </div>

                              {/* Variants Section */}
                              {lego.variants && lego.variants.length > 0 && (
                                <div className="bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-green-500/10 border-2 border-green-500/30 rounded-xl p-4">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-5 h-5 text-green-400" />
                                    <span className="text-sm font-semibold text-green-300">Variants ({lego.variants.length})</span>
                                  </div>
                                  <div className="space-y-2">
                                    {lego.variants.map((variant, idx) => (
                                      <div key={idx} className="bg-black/30 border border-green-500/20 rounded-lg px-3 py-2.5">
                                        <div className="grid grid-cols-3 gap-4 items-center">
                                          <div className="flex items-center gap-2">
                                            <span className="font-semibold text-white text-sm">{variant.name}</span>
                                          </div>
                                          <div className="flex items-center gap-1.5 justify-center">
                                            <Package className="w-3.5 h-3.5 text-white/40" />
                                            <span className="text-white/70 text-xs font-medium">{variant.numberOfLegos} Legos</span>
                                          </div>
                                          <div className="text-right">
                                            {variant.rangeStart && variant.rangeEnd ? (
                                              <span className="text-green-400 text-xs font-medium">
                                                {variant.rangeStart} - {variant.rangeEnd}
                                              </span>
                                            ) : (
                                              <span className="text-amber-400 text-xs font-medium italic">User Defined</span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 mt-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 hover:border-green-500/50 rounded-lg text-sm font-medium transition-all">
                              <Edit2 className="w-3 h-3" />
                              Edit
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 rounded-lg text-sm font-medium transition-all">
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </button>
                            <button className="ml-auto px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg text-sm font-semibold shadow-lg shadow-green-500/20 transition-all">
                              Use Lego
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
