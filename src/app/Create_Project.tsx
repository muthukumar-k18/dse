import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { projectRepository } from '../utils/projectRepository';

const NewMigrationPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [remId, setRemId] = useState('');
  const [remConnected, setRemConnected] = useState(false);
  const [selectedPatternIds, setSelectedPatternIds] = useState([]);
  const [showEffortModal, setShowEffortModal] = useState(false);
  const [showLegoPopup, setShowLegoPopup] = useState(false);
  const [activePattern, setActivePattern] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdMigrationId, setCreatedMigrationId] = useState('');
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);
  
  // Application details from form
  const [applicationName, setApplicationName] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [gitRepoUrl, setGitRepoUrl] = useState('');
  const [gitBranch, setGitBranch] = useState('main');
  const [techStack, setTechStack] = useState('');
  
  // Project details from form
  const [projectName, setProjectName] = useState('');
  const [moduleName, setModuleName] = useState('Payment Services');
  const [priority, setPriority] = useState('High');
  const [teamName, setTeamName] = useState('Platform Engineering');
  const [sourceTech, setSourceTech] = useState('Java 8, Spring Boot 2.5, JUnit 4');
  const [targetTech, setTargetTech] = useState('Java 17, Spring Boot 3.x, JUnit 5');

  // Team member states
  const [teamMembers, setTeamMembers] = useState([
    { id: '1', name: 'Sarah Chen', role: 'Tech Lead', avatar: 'SC' },
    { id: '2', name: 'Michael Roberts', role: 'Senior Developer', avatar: 'MR' },
    { id: '3', name: 'Priya Sharma', role: 'Developer', avatar: 'PS' },
    { id: '4', name: 'James Wilson', role: 'Developer', avatar: 'JW' },
    { id: '5', name: 'Emily Davis', role: 'QA Engineer', avatar: 'ED' },
    { id: '6', name: 'David Kim', role: 'DevOps', avatar: 'DK' },
    { id: '7', name: 'Lisa Anderson', role: 'Developer', avatar: 'LA' },
    { id: '8', name: 'Robert Taylor', role: 'Architect', avatar: 'RT' },
    { id: '9', name: 'Anna Martinez', role: 'Developer', avatar: 'AM' },
    { id: '10', name: 'Chris Johnson', role: 'DBA', avatar: 'CJ' },
  ]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState(['1', '2', '3', '4']); // Default first 4 selected
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [newPerson, setNewPerson] = useState({ name: '', role: '', avatar: '' });

  // Running sequence number (in real app, this would come from backend)
  const [sequenceNumber, setSequenceNumber] = useState(1);

  // Function to handle opening the Configure Migration modal
  const handleConfigureMigration = () => {
    // Set project name from application ID if available
    if (applicationId) {
      setProjectName(`${applicationId} Migration`);
    }
    setShowEffortModal(true);
  };

  const patterns = [
    // Testing & Quality Assurance
    { id: '1', name: 'QA/Regression/Functional Testing', source: 'Manual Tests', target: 'Automated Tests', effort: 'Medium', successRate: 92, risk: 'Low', legos: [
      { id: 'l1', name: 'Test Case Analyzer', description: 'Analyzes manual test cases and identifies automation opportunities.', type: 'analyze', docUrl: '/docs/legos/test-analyzer' },
      { id: 'l2', name: 'Selenium Framework Setup', description: 'Sets up Selenium WebDriver framework with best practices.', type: 'config', docUrl: '/docs/legos/selenium-setup' },
      { id: 'l3', name: 'Test Script Generator', description: 'Auto-generates test scripts from manual test cases.', type: 'generate', docUrl: '/docs/legos/script-generator' },
      { id: 'l4', name: 'Regression Suite Builder', description: 'Creates comprehensive regression test suites.', type: 'build', docUrl: '/docs/legos/regression-builder' },
    ]},
    { id: '2', name: 'JUnit Test Case Creation/Update', source: 'JUnit 4', target: 'JUnit 5', effort: 'Low', successRate: 96, risk: 'Low', legos: [
      { id: 'l5', name: 'Annotation Migrator', description: 'Updates JUnit 4 annotations to JUnit 5 equivalents.', type: 'transform', docUrl: '/docs/legos/annotation-migrator' },
      { id: 'l6', name: 'Assertion Updater', description: 'Migrates assertions to JUnit 5 style.', type: 'transform', docUrl: '/docs/legos/assertion-updater' },
      { id: 'l7', name: 'Test Generator', description: 'Auto-generates missing unit tests based on code coverage analysis.', type: 'generate', docUrl: '/docs/legos/test-generator' },
    ]},
    { id: '3', name: 'Test Pack Creation', source: 'No Tests', target: 'Full Test Suite', effort: 'High', successRate: 88, risk: 'Medium', legos: [
      { id: 'l8', name: 'Coverage Analyzer', description: 'Analyzes codebase and identifies testing gaps.', type: 'analyze', docUrl: '/docs/legos/coverage-analyzer' },
      { id: 'l9', name: 'Unit Test Pack Generator', description: 'Creates comprehensive unit test packs.', type: 'generate', docUrl: '/docs/legos/unit-test-pack' },
      { id: 'l10', name: 'Integration Test Builder', description: 'Builds integration test suites with mocking.', type: 'build', docUrl: '/docs/legos/integration-tests' },
    ]},

    // Framework Migrations
    { id: '4', name: 'Struts to Spring/Springboot', source: 'Apache Struts', target: 'Spring Boot', effort: 'High', successRate: 85, risk: 'High', legos: [
      { id: 'l11', name: 'Action to Controller Mapper', description: 'Converts Struts Actions to Spring Controllers.', type: 'transform', docUrl: '/docs/legos/struts-controller' },
      { id: 'l12', name: 'JSP to Thymeleaf Converter', description: 'Migrates JSP views to Thymeleaf templates.', type: 'transform', docUrl: '/docs/legos/jsp-converter' },
      { id: 'l13', name: 'Config Migration Tool', description: 'Converts struts.xml to Spring Boot configuration.', type: 'migrate', docUrl: '/docs/legos/struts-config' },
    ]},
    { id: '5', name: 'Springboot Vertical Upgrade', source: 'Spring Boot 2.x', target: 'Spring Boot 3.x', effort: 'High', successRate: 89, risk: 'Medium', legos: [
      { id: 'l14', name: 'Jakarta EE Migrator', description: 'Comprehensive namespace migration from javax.* to jakarta.* packages.', type: 'migrate', docUrl: '/docs/legos/jakarta-migrator' },
      { id: 'l15', name: 'Spring Security Updater', description: 'Updates Spring Security configuration to SecurityFilterChain beans.', type: 'config', docUrl: '/docs/legos/spring-security' },
      { id: 'l16', name: 'Actuator Endpoint Migrator', description: 'Updates actuator endpoints and configurations for v3.', type: 'migrate', docUrl: '/docs/legos/actuator-migrator' },
    ]},

    // Cloud & Platform Migrations
    { id: '6', name: 'Webapps to MAKS', source: 'Traditional Webapp', target: 'MAKS Platform', effort: 'High', successRate: 87, risk: 'Medium', legos: [
      { id: 'l17', name: 'MAKS Adapter Generator', description: 'Generates MAKS platform adapters and connectors.', type: 'generate', docUrl: '/docs/legos/maks-adapter' },
      { id: 'l18', name: 'Config Transformer', description: 'Transforms application configs to MAKS standards.', type: 'transform', docUrl: '/docs/legos/maks-config' },
      { id: 'l19', name: 'Deployment Packager', description: 'Packages application for MAKS deployment.', type: 'build', docUrl: '/docs/legos/maks-packager' },
    ]},
    { id: '7', name: 'OnPrem to MAKS', source: 'On-Premise', target: 'MAKS Cloud', effort: 'High', successRate: 83, risk: 'Medium', legos: [
      { id: 'l20', name: 'Infrastructure Mapper', description: 'Maps on-prem infrastructure to MAKS equivalents.', type: 'analyze', docUrl: '/docs/legos/infra-mapper' },
      { id: 'l21', name: 'Data Migration Tool', description: 'Handles secure data migration to MAKS platform.', type: 'migrate', docUrl: '/docs/legos/data-migration' },
      { id: 'l22', name: 'Network Config Generator', description: 'Generates MAKS network and security configurations.', type: 'generate', docUrl: '/docs/legos/network-config' },
    ]},

    // Architecture Transformations
    { id: '8', name: 'Monolithic to Microservices', source: 'Monolith', target: 'Microservices', effort: 'Very High', successRate: 78, risk: 'High', legos: [
      { id: 'l23', name: 'Service Boundary Analyzer', description: 'Identifies logical microservice boundaries in monolith.', type: 'analyze', docUrl: '/docs/legos/boundary-analyzer' },
      { id: 'l24', name: 'Service Extractor', description: 'Extracts identified services into separate modules.', type: 'transform', docUrl: '/docs/legos/service-extractor' },
      { id: 'l25', name: 'API Gateway Setup', description: 'Sets up API Gateway for microservice orchestration.', type: 'config', docUrl: '/docs/legos/api-gateway' },
      { id: 'l26', name: 'Service Mesh Configurator', description: 'Configures service mesh for inter-service communication.', type: 'config', docUrl: '/docs/legos/service-mesh' },
    ]},
    { id: '9', name: 'SOAP to REST API', source: 'SOAP', target: 'REST', effort: 'Medium', successRate: 91, risk: 'Low', legos: [
      { id: 'l27', name: 'WSDL Parser', description: 'Parses WSDL and generates REST endpoint specs.', type: 'analyze', docUrl: '/docs/legos/wsdl-parser' },
      { id: 'l28', name: 'REST Controller Generator', description: 'Generates RESTful controllers from SOAP operations.', type: 'generate', docUrl: '/docs/legos/rest-generator' },
      { id: 'l29', name: 'JSON Serializer', description: 'Converts XML payloads to JSON format.', type: 'transform', docUrl: '/docs/legos/json-serializer' },
    ]},

    // JDK & Language Upgrades
    { id: '10', name: 'JDK Upgrade', source: 'Java 8', target: 'Java 17', effort: 'Medium', successRate: 94, risk: 'Low', legos: [
      { id: 'l30', name: 'Syntax Transformer', description: 'Updates deprecated Java 8 syntax to modern Java 17 equivalents.', type: 'transform', docUrl: '/docs/legos/syntax-transformer' },
      { id: 'l31', name: 'API Migration', description: 'Migrates removed/deprecated APIs to their recommended replacements.', type: 'migrate', docUrl: '/docs/legos/api-migration' },
      { id: 'l32', name: 'Module System Setup', description: 'Configures Java Platform Module System (JPMS).', type: 'config', docUrl: '/docs/legos/module-system' },
      { id: 'l33', name: 'Dependency Validator', description: 'Validates and updates Maven/Gradle dependencies for Java 17.', type: 'validate', docUrl: '/docs/legos/dependency-validator' },
    ]},
    { id: '11', name: '.NET Framework 4.x to .NET 8 Core', source: '.NET Framework 4.x', target: '.NET 8', effort: 'High', successRate: 86, risk: 'Medium', legos: [
      { id: 'l34', name: 'API Analyzer', description: 'Analyzes .NET Framework APIs and finds .NET 8 equivalents.', type: 'analyze', docUrl: '/docs/legos/dotnet-analyzer' },
      { id: 'l35', name: 'Config Migrator', description: 'Migrates web.config to appsettings.json.', type: 'migrate', docUrl: '/docs/legos/config-migrator' },
      { id: 'l36', name: 'Dependency Updater', description: 'Updates NuGet packages to .NET 8 compatible versions.', type: 'update', docUrl: '/docs/legos/nuget-updater' },
    ]},

    // API & Gateway Migrations
    { id: '12', name: 'APIGEE to APIM', source: 'Apigee', target: 'Azure APIM', effort: 'Medium', successRate: 90, risk: 'Low', legos: [
      { id: 'l37', name: 'Policy Converter', description: 'Converts Apigee policies to APIM policies.', type: 'transform', docUrl: '/docs/legos/policy-converter' },
      { id: 'l38', name: 'API Definition Migrator', description: 'Migrates API definitions and schemas.', type: 'migrate', docUrl: '/docs/legos/api-migrator' },
      { id: 'l39', name: 'Backend Config Generator', description: 'Generates APIM backend configurations.', type: 'generate', docUrl: '/docs/legos/backend-config' },
    ]},

    // Security & Authentication
    { id: '13', name: 'Map Connection Cert to Token', source: 'Certificate Auth', target: 'Token Auth', effort: 'Medium', successRate: 93, risk: 'Medium', legos: [
      { id: 'l40', name: 'Auth Flow Analyzer', description: 'Analyzes certificate-based auth flows.', type: 'analyze', docUrl: '/docs/legos/auth-analyzer' },
      { id: 'l41', name: 'OAuth2 Configurator', description: 'Sets up OAuth2/JWT token-based authentication.', type: 'config', docUrl: '/docs/legos/oauth-config' },
      { id: 'l42', name: 'Token Validator', description: 'Implements token validation and refresh logic.', type: 'generate', docUrl: '/docs/legos/token-validator' },
    ]},
    { id: '14', name: 'Password Rotation Automation', source: 'Manual Rotation', target: 'Automated Rotation', effort: 'Low', successRate: 97, risk: 'Low', legos: [
      { id: 'l43', name: 'Secret Manager Setup', description: 'Configures secret management solution (Vault/Azure Key Vault).', type: 'config', docUrl: '/docs/legos/secret-manager' },
      { id: 'l44', name: 'Rotation Policy Generator', description: 'Creates automated password rotation policies.', type: 'generate', docUrl: '/docs/legos/rotation-policy' },
      { id: 'l45', name: 'Notification System', description: 'Sets up alerts for rotation events.', type: 'config', docUrl: '/docs/legos/notifications' },
    ]},
  ];

  const remMatchedPatterns = [
    { patternId: '1', confidence: 94, recommendation: 'Highly Recommended' },
    { patternId: '3', confidence: 89, recommendation: 'Recommended' },
    { patternId: '4', confidence: 92, recommendation: 'Recommended' },
  ];

  const accessItems = [
    { id: '1', name: 'Git Repository Access', url: 'github.com/enterprise/core-banking-api', status: 'pending', color: 'purple' },
    { id: '2', name: 'Jenkins CI/CD Pipeline', url: 'jenkins.enterprise.com/core-banking', status: 'granted', color: 'orange' },
    { id: '4', name: 'Database Environment', url: 'DEV/UAT PostgreSQL instances', status: 'pending', color: 'emerald' },
  ];

  const togglePattern = (id) => {
    setSelectedPatternIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleTeamMember = (id) => {
    setSelectedTeamMembers(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleAddPerson = () => {
    if (newPerson.name && newPerson.role) {
      const newId = String(teamMembers.length + 1);
      const newMember = {
        id: newId,
        name: newPerson.name,
        role: newPerson.role,
        avatar: newPerson.avatar || newPerson.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      };
      setTeamMembers(prev => [...prev, newMember]);
      setSelectedTeamMembers(prev => [...prev, newId]); // Auto-select newly added person
      setNewPerson({ name: '', role: '', avatar: '' });
      setShowAddPersonModal(false);
    }
  };

  const getPattern = (id) => patterns.find(p => p.id === id);

  const generateMigrationId = () => {
    const rem = remId || 'REM-' + Math.floor(1000 + Math.random() * 9000);
    const seq = String(sequenceNumber).padStart(3, '0');
    return `${rem}-DSM-${seq}`;
  };

  const handleCreateProject = () => {
    const migrationId = generateMigrationId();
    setCreatedMigrationId(migrationId);
    
    // Get the selected pattern names for description
    const selectedPatternNames = selectedPatternIds
      .map(id => getPattern(id)?.name)
      .filter(Boolean)
      .join(', ');
    
    // Create project data
    const newProject = {
      remId: remId || migrationId,
      name: projectName,
      description: `Migration project using patterns: ${selectedPatternNames}`,
      module: moduleName,
      progress: 0,
      status: 'In Progress' as const,
      priority: priority as 'High' | 'Medium' | 'Low',
      createdDate: new Date().toISOString().split('T')[0],
      team: teamName,
      targetTech: targetTech,
      sourceTech: sourceTech
    };
    
    // Save to repository
    projectRepository.addProject(newProject);
    
    // Automatically download updated projects.json
    projectRepository.downloadProjectsJSON();
    
    setSequenceNumber(prev => prev + 1);
    setShowEffortModal(false);
    setShowSuccessModal(true);
  };

  const handleConnectRem = () => {
    setTimeout(() => {
      setRemConnected(true);
      setSelectedPatternIds(['1']);
    }, 500);
  };

  const getEffortColor = (effort) => {
    if (effort === 'Low') return 'text-green-400 bg-green-400/10';
    if (effort === 'Medium') return 'text-yellow-400 bg-yellow-400/10';
    return 'text-red-400 bg-red-400/10';
  };

  const getTypeColor = (type) => {
    const colors = {
      transform: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
      migrate: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
      validate: 'text-green-400 bg-green-400/10 border-green-400/30',
      test: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
      config: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
    };
    return colors[type] || 'text-white/50 bg-white/5';
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/aaf-migration-expert')}
          className="flex items-center gap-2 text-white/50 hover:text-white"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </button>
        <div className="w-px h-6 bg-white/10" />
        <span className="text-xl font-semibold">⚡ New Migration</span>
      </div>

      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold mb-2">Start a New Migration</h1>
        <p className="text-white/50">Choose how you'd like to begin your migration project</p>
      </div>

      {/* Application Details Form */}
      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xl">
            📝
          </div>
          <div>
            <h2 className="text-lg font-semibold">Application Details</h2>
            <p className="text-sm text-white/50">Enter basic information about your migration</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Application Name */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Application Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={applicationName}
              onChange={(e) => setApplicationName(e.target.value)}
              placeholder="e.g., Customer Portal"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
            />
          </div>

          {/* Application ID */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Application ID <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value)}
              placeholder="e.g., APP-2024-001"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
            />
          </div>

          {/* Git Repository URL */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-white/70 mb-2">
              Git Repository URL <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={gitRepoUrl}
                onChange={(e) => setGitRepoUrl(e.target.value)}
                placeholder="https://github.com/organization/repository.git"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
              />
              <button className="px-6 py-3 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-lg transition-colors flex items-center gap-2 font-medium">
                <span>🔗</span>
                <span>Verify Access</span>
              </button>
            </div>
            <p className="text-xs text-white/40 mt-2">We'll verify repository access before proceeding</p>
          </div>

          {/* Optional: Branch Name */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Branch (Optional)
            </label>
            <input
              type="text"
              value={gitBranch}
              onChange={(e) => setGitBranch(e.target.value)}
              placeholder="e.g., main, master, develop"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
            />
          </div>

          {/* Optional: Technology Stack */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Technology Stack (Optional)
            </label>
            <input
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="e.g., Java, .NET, Python"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Group 1: Pattern-Based Migration */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-purple-500" />
          <span className="text-sm text-white/60">Pattern-Based Migration</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
        <div className="grid grid-cols-2 gap-5">
          {/* Build from REM Ticket */}
          <div
            onClick={() => setActiveSection('rem')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              activeSection === 'rem'
                ? 'bg-purple-500/10 border-purple-500/50'
                : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center mb-4 text-xl">🔗</div>
            <h3 className="font-semibold mb-2">Build from REM Ticket</h3>
            <p className="text-xs text-white/50 mb-3">Fetch project details from REM ID and auto-match patterns</p>
            <span className="text-xs text-purple-400">Existing projects ▼</span>
          </div>

          {/* Migration from Existing Pattern */}
          <div
            onClick={() => setActiveSection('pattern')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              activeSection === 'pattern'
                ? 'bg-red-500/10 border-red-500/50'
                : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-4 text-xl">📚</div>
            <h3 className="font-semibold mb-2">Migration from Existing Pattern</h3>
            <p className="text-xs text-white/50 mb-3">Browse pattern library and select proven templates</p>
            <span className="text-xs text-orange-400">Proven patterns ▼</span>
          </div>
        </div>
      </div>

      {/* Group 2: Discovery & Custom */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-cyan-500" />
          <span className="text-sm text-white/60">Discovery & Custom Build</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
        <div className="grid grid-cols-2 gap-5">
          {/* Analyze from Code */}
          <div
            onClick={() => setActiveSection('analyze')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              activeSection === 'analyze'
                ? 'bg-cyan-500/10 border-cyan-500/50'
                : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 text-xl">🔍</div>
            <h3 className="font-semibold mb-2">Analyze from Code</h3>
            <p className="text-xs text-white/50 mb-3">Let AI identify migration patterns from your codebase</p>
            <span className="text-xs text-cyan-400">AI-powered discovery ▼</span>
          </div>

          {/* Custom Migration */}
          <div
            onClick={() => setActiveSection('custom')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              activeSection === 'custom'
                ? 'bg-emerald-500/10 border-emerald-500/50'
                : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 text-xl">🔧</div>
            <h3 className="font-semibold mb-2">Custom Migration</h3>
            <p className="text-xs text-white/50 mb-3">Build a custom migration by selecting individual Legos</p>
            <span className="text-xs text-emerald-400">Advanced users ▼</span>
          </div>
        </div>
      </div>

      {/* Expanded Section */}
      {activeSection && (
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
          
          {/* REM Section */}
          {activeSection === 'rem' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">🔗</div>
                <div>
                  <h2 className="text-lg font-semibold">Build from REM Ticket</h2>
                  <p className="text-sm text-white/50">Enter REM ID to fetch project details</p>
                </div>
              </div>

              {/* Input */}
              <div className="flex gap-4 mb-6">
                <input
                  type="text"
                  placeholder="e.g., REM-4521"
                  value={remId}
                  onChange={(e) => setRemId(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none"
                />
                <button
                  onClick={handleConnectRem}
                  disabled={!remId}
                  className={`px-6 py-3 rounded-lg font-medium text-sm ${
                    remId ? 'bg-gradient-to-r from-purple-500 to-violet-500' : 'bg-white/5 text-white/30'
                  }`}
                >
                  Connect
                </button>
              </div>

              {/* Connected State */}
              {remConnected && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <span>✓</span>
                    <span>Connected to {remId}</span>
                  </div>

                  {/* Project Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                      <h4 className="text-xs text-white/40 uppercase mb-3">Project Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/50">Project</span>
                          <span>Core Banking API Modernization</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50">Module</span>
                          <span>Payment Services</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50">Priority</span>
                          <span className="text-red-400">High</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                      <h4 className="text-xs text-white/40 uppercase mb-3">Technology Stack</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-white/50">Current: </span>
                          <span>Java 8, Spring Boot 2.5, JUnit 4</span>
                        </div>
                        <div className="text-white/30">→</div>
                        <div>
                          <span className="text-white/50">Target: </span>
                          <span className="text-orange-400">Java 17, Spring Boot 3.x, JUnit 5</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Matched Patterns */}
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                    <div className="flex justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">Identified Migration Patterns</h4>
                        <p className="text-xs text-white/50">Select patterns. Click name to view Legos.</p>
                      </div>
                      <span className="text-xs text-white/40">{selectedPatternIds.length} selected</span>
                    </div>

                    <div className="space-y-3">
                      {remMatchedPatterns.map((match, idx) => {
                        const pattern = getPattern(match.patternId);
                        const isSelected = selectedPatternIds.includes(match.patternId);
                        return (
                          <div
                            key={match.patternId}
                            className={`flex items-center gap-4 p-4 rounded-xl border ${
                              isSelected ? 'bg-purple-500/10 border-purple-500/40' : 'bg-white/[0.02] border-white/[0.06]'
                            }`}
                          >
                            <button
                              onClick={() => togglePattern(match.patternId)}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                isSelected ? 'bg-purple-500 border-purple-500' : 'border-white/30'
                              }`}
                            >
                              {isSelected && <span className="text-xs">✓</span>}
                            </button>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => { setActivePattern(pattern); setShowLegoPopup(true); }}
                                  className="font-semibold text-purple-400 hover:underline"
                                >
                                  {pattern.name}
                                </button>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/50">
                                  {pattern.legos.length} Legos
                                </span>
                                {idx === 0 && (
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">Best Match</span>
                                )}
                              </div>
                              <p className="text-xs text-white/50 mt-1">{pattern.source} → {pattern.target}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-purple-400">{match.confidence}%</p>
                              <p className="text-xs text-green-400">{match.recommendation}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleConfigureMigration}
                    disabled={selectedPatternIds.length === 0}
                    className={`w-full py-4 rounded-xl font-medium ${
                      selectedPatternIds.length > 0
                        ? 'bg-gradient-to-r from-purple-500 to-violet-500'
                        : 'bg-white/5 text-white/30'
                    }`}
                  >
                    Configure Migration ({selectedPatternIds.length} patterns) →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Pattern Library Section */}
          {activeSection === 'pattern' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">📚</div>
                  <div>
                    <h2 className="text-lg font-semibold">Migration from Existing Pattern</h2>
                    <p className="text-sm text-white/50">Select patterns to start your migration</p>
                  </div>
                </div>
                <span className="text-sm text-white/40">{patterns.length} patterns</span>
              </div>

              {/* Pattern Grid - Organized by Category */}
              <div className="space-y-6 mb-6">
                {/* On-Prem to On-Prem */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🏢</span>
                    <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">On-Prem to On-Prem</h3>
                    <div className="flex-1 h-px bg-white/10"></div>
                    <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">Traditional Migrations</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {patterns.filter(p => ['1', '2', '3', '4', '5', '8', '9', '10', '11', '14'].includes(p.id)).map((pattern) => {
                      const isSelected = selectedPatternIds.includes(pattern.id);
                      return (
                        <div
                          key={pattern.id}
                          className={`p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                            isSelected ? 'bg-red-500/10 border-red-500/50' : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => togglePattern(pattern.id)}
                              className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                isSelected ? 'bg-red-500 border-red-500' : 'border-white/30 hover:border-red-400'
                              }`}
                            >
                              {isSelected && <span className="text-xs">✓</span>}
                            </button>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <button
                                    onClick={() => { setActivePattern(pattern); setShowLegoPopup(true); }}
                                    className="font-semibold hover:text-orange-400 hover:underline text-left"
                                  >
                                    {pattern.name}
                                  </button>
                                  <span className="text-xs text-white/40 ml-2">({pattern.legos.length} Legos)</span>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getEffortColor(pattern.effort)}`}>
                                  {pattern.effort}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm mb-2">
                                <span className="text-white/60 text-xs">{pattern.source}</span>
                                <span className="text-white/30">→</span>
                                <span className="text-orange-400 text-xs">{pattern.target}</span>
                              </div>
                              <div className="flex gap-4 text-xs text-white/50">
                                <span>✓ {pattern.successRate}%</span>
                                <span className={pattern.risk === 'Low' ? 'text-green-400' : pattern.risk === 'Medium' ? 'text-yellow-400' : 'text-red-400'}>
                                  {pattern.risk} risk
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* On-Prem to Cloud */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">☁️</span>
                    <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">On-Prem to Cloud</h3>
                    <div className="flex-1 h-px bg-white/10"></div>
                    <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">Cloud Migration</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {patterns.filter(p => ['6', '7', '13'].includes(p.id)).map((pattern) => {
                      const isSelected = selectedPatternIds.includes(pattern.id);
                      return (
                        <div
                          key={pattern.id}
                          className={`p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                            isSelected ? 'bg-red-500/10 border-red-500/50' : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => togglePattern(pattern.id)}
                              className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                isSelected ? 'bg-red-500 border-red-500' : 'border-white/30 hover:border-red-400'
                              }`}
                            >
                              {isSelected && <span className="text-xs">✓</span>}
                            </button>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <button
                                    onClick={() => { setActivePattern(pattern); setShowLegoPopup(true); }}
                                    className="font-semibold hover:text-orange-400 hover:underline text-left"
                                  >
                                    {pattern.name}
                                  </button>
                                  <span className="text-xs text-white/40 ml-2">({pattern.legos.length} Legos)</span>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getEffortColor(pattern.effort)}`}>
                                  {pattern.effort}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm mb-2">
                                <span className="text-white/60 text-xs">{pattern.source}</span>
                                <span className="text-white/30">→</span>
                                <span className="text-orange-400 text-xs">{pattern.target}</span>
                              </div>
                              <div className="flex gap-4 text-xs text-white/50">
                                <span>✓ {pattern.successRate}%</span>
                                <span className={pattern.risk === 'Low' ? 'text-green-400' : pattern.risk === 'Medium' ? 'text-yellow-400' : 'text-red-400'}>
                                  {pattern.risk} risk
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Cloud to Cloud */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🌐</span>
                    <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Cloud to Cloud</h3>
                    <div className="flex-1 h-px bg-white/10"></div>
                    <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">Cloud Modernization</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {patterns.filter(p => ['12'].includes(p.id)).map((pattern) => {
                      const isSelected = selectedPatternIds.includes(pattern.id);
                      return (
                        <div
                          key={pattern.id}
                          className={`p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                            isSelected ? 'bg-red-500/10 border-red-500/50' : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => togglePattern(pattern.id)}
                              className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                isSelected ? 'bg-red-500 border-red-500' : 'border-white/30 hover:border-red-400'
                              }`}
                            >
                              {isSelected && <span className="text-xs">✓</span>}
                            </button>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <button
                                    onClick={() => { setActivePattern(pattern); setShowLegoPopup(true); }}
                                    className="font-semibold hover:text-orange-400 hover:underline text-left"
                                  >
                                    {pattern.name}
                                  </button>
                                  <span className="text-xs text-white/40 ml-2">({pattern.legos.length} Legos)</span>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getEffortColor(pattern.effort)}`}>
                                  {pattern.effort}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm mb-2">
                                <span className="text-white/60 text-xs">{pattern.source}</span>
                                <span className="text-white/30">→</span>
                                <span className="text-orange-400 text-xs">{pattern.target}</span>
                              </div>
                              <div className="flex gap-4 text-xs text-white/50">
                                <span>✓ {pattern.successRate}%</span>
                                <span className={pattern.risk === 'Low' ? 'text-green-400' : pattern.risk === 'Medium' ? 'text-yellow-400' : 'text-red-400'}>
                                  {pattern.risk} risk
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>


              </div>

              {/* Selected Action */}
              {selectedPatternIds.length > 0 && (
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl">
                  <div>
                    <p className="text-sm text-white/60">Selected:</p>
                    <p className="font-semibold">{selectedPatternIds.length} pattern{selectedPatternIds.length !== 1 ? 's' : ''}</p>
                  </div>
                  <button
                    onClick={handleConfigureMigration}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg font-medium text-sm"
                  >
                    Configure Migration →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Analyze Section */}
          {activeSection === 'analyze' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">🔍</div>
                <div>
                  <h2 className="text-lg font-semibold">Analyze from Code</h2>
                  <p className="text-sm text-white/50">Connect codebase to auto-identify patterns</p>
                </div>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="https://github.com/your-org/repository.git"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none"
                />
                <div className="flex items-center justify-center h-24 border border-dashed border-white/20 rounded-xl">
                  <span className="text-white/50">📁 Drop ZIP file or click to upload</span>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-medium">
                  🔍 Start Analysis
                </button>
              </div>
            </div>
          )}

          {/* Custom Section */}
          {activeSection === 'custom' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">🔧</div>
                <div>
                  <h2 className="text-lg font-semibold">Custom Migration</h2>
                  <p className="text-sm text-white/50">Build by selecting individual Legos</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Migration Name" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none" />
                  <input placeholder="Source Technology" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none" />
                </div>
                <input placeholder="Target Technology" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none" />
                <p className="text-sm text-white/50">Select individual Legos from the patterns above to build your custom migration.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Effort Analysis Modal */}
      {showEffortModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-4xl my-8">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xl">📊</div>
                <div>
                  <h2 className="text-xl font-semibold">Estimated Effort & Risk Analysis</h2>
                  <p className="text-sm text-white/50">{selectedPatternIds.length} pattern{selectedPatternIds.length !== 1 ? 's' : ''} selected</p>
                </div>
              </div>
              <button onClick={() => setShowEffortModal(false)} className="text-white/40 hover:text-white text-2xl">×</button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Selected Patterns */}
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                <h3 className="text-sm font-medium mb-3">📚 Selected Migration Patterns</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPatternIds.map(id => {
                    const p = getPattern(id);
                    return (
                      <div key={id} className="px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                        <span className="text-sm font-medium">{p?.name}</span>
                        <span className="text-xs text-white/40 ml-2">({p?.legos.length} Legos)</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Project Name</label>
                  <input 
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder={applicationId ? `${applicationId} Migration` : 'Enter project name'}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">TUNA ID</label>
                  <input value={remId || 'TUNA-' + Math.floor(1000 + Math.random() * 9000)} readOnly className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white/50" />
                </div>
              </div>

              {/* Team Members */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm text-white/60">Team Members Assigned</label>
                  <button
                    onClick={() => setShowAddPersonModal(true)}
                    className="text-xs px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors flex items-center gap-1"
                  >
                    <span>+</span>
                    <span>Add Person</span>
                  </button>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex flex-wrap gap-2">
                    {teamMembers.map((member) => {
                      const isSelected = selectedTeamMembers.includes(member.id);
                      return (
                        <button
                          key={member.id}
                          onClick={() => toggleTeamMember(member.id)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-orange-500/20 border-orange-500/40' 
                              : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30 hover:bg-white/10'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                            isSelected 
                              ? 'bg-gradient-to-br from-red-500 to-orange-500' 
                              : 'bg-white/20'
                          }`}>
                            {member.avatar}
                          </div>
                          <span className="text-sm">{member.name}</span>
                          <span className="text-xs text-white/40">({member.role})</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-white/40 mt-2">
                    {selectedTeamMembers.length} member{selectedTeamMembers.length !== 1 ? 's' : ''} selected • Click to toggle
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Start Date</label>
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Target Completion</label>
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none" />
                </div>
              </div>

              {/* Estimates */}
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">📈 Pattern-Based Estimates</h3>
                  <span className="text-xs text-white/40">Based on historical data</span>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center mb-4">
                  <div className="p-4 bg-white/[0.03] rounded-xl">
                    <p className="text-2xl font-bold text-orange-400">8-12</p>
                    <p className="text-xs text-white/40">Weeks Duration</p>
                  </div>
                  <div className="p-4 bg-white/[0.03] rounded-xl">
                    <p className="text-2xl font-bold text-cyan-400">4-6</p>
                    <p className="text-xs text-white/40">Team Members</p>
                  </div>
                  <div className="p-4 bg-white/[0.03] rounded-xl">
                    <p className="text-2xl font-bold text-purple-400">89%</p>
                    <p className="text-xs text-white/40">Success Rate</p>
                  </div>
                  <div className="p-4 bg-white/[0.03] rounded-xl">
                    <p className="text-2xl font-bold text-yellow-400">Medium</p>
                    <p className="text-xs text-white/40">Risk Level</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center mb-4">
                  <div className="p-3 bg-white/[0.03] rounded-lg">
                    <p className="text-lg font-bold text-blue-400">~320</p>
                    <p className="text-xs text-white/40">Person Hours</p>
                  </div>
                  <div className="p-3 bg-white/[0.03] rounded-lg">
                    <p className="text-lg font-bold text-emerald-400">10</p>
                    <p className="text-xs text-white/40">Legos Involved</p>
                  </div>
                  <div className="p-3 bg-white/[0.03] rounded-lg">
                    <p className="text-lg font-bold text-green-400">Low</p>
                    <p className="text-xs text-white/40">Rollback Complexity</p>
                  </div>
                  <div className="p-3 bg-white/[0.03] rounded-lg">
                    <p className="text-lg font-bold text-amber-400">~40%</p>
                    <p className="text-xs text-white/40">Testing Effort</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-white/[0.03] rounded-lg">
                    <p className="text-lg font-bold text-violet-400">2-3</p>
                    <p className="text-xs text-white/40">Sprint Cycles</p>
                  </div>
                  <div className="p-3 bg-white/[0.03] rounded-lg">
                    <p className="text-lg font-bold text-green-400">High</p>
                    <p className="text-xs text-white/40">Automation Potential</p>
                  </div>
                  <div className="p-3 bg-white/[0.03] rounded-lg">
                    <p className="text-lg font-bold text-pink-400">1-2 Days</p>
                    <p className="text-xs text-white/40">Downtime Expected</p>
                  </div>
                </div>
              </div>

              {/* Access Requests */}
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">⚡ Git & Infrastructure Access Required</h3>
                  <span className="text-xs text-yellow-400">⚠ {accessItems.filter(item => item.status === 'pending').length} Pending</span>
                </div>
                <div className="space-y-3">
                  {accessItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg border border-white/[0.06]">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-${item.color}-500/20 flex items-center justify-center`}>
                          {item.color === 'purple' && '🔗'}
                          {item.color === 'orange' && '⚙️'}
                          {item.color === 'cyan' && '🛡️'}
                          {item.color === 'emerald' && '🗄️'}
                          {item.color === 'blue' && '☁️'}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-white/40">{item.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.status === 'granted' ? (
                          <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">✓ Granted</span>
                        ) : (
                          <>
                            <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">Pending</span>
                            <button 
                              onClick={() => alert(`Access request email sent for ${item.name}!`)}
                              className={`px-3 py-1.5 bg-${item.color}-500/20 text-${item.color}-400 rounded-lg text-xs font-medium`}
                            >
                              Request Access
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => alert('Bulk access request emails sent!')}
                  className="w-full mt-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70"
                >
                  Request All Pending Access
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-white/10">
              <button onClick={() => setShowEffortModal(false)} className="px-5 py-2.5 text-sm text-white/60">
                ← Back to Selection
              </button>
              <button 
                onClick={handleCreateProject}
                className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg font-medium text-sm"
              >
                Create Migration Project →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-lg p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 text-4xl">
              ✓
            </div>
            <h2 className="text-2xl font-semibold mb-2">Migration Project Created!</h2>
            <p className="text-white/50 mb-6">Your migration project has been successfully created and is ready to begin.</p>
            
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 mb-6">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Migration ID</p>
              <p className="text-2xl font-bold text-orange-400 font-mono">{createdMigrationId}</p>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-white/60">Progress</span>
                <span className="text-sm font-semibold text-white">0%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
              </div>
              <p className="text-xs text-white/40 mt-2">Status: Not Started</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-left text-sm mb-6">
              <div className="bg-white/[0.02] rounded-lg p-3">
                <p className="text-white/40 text-xs mb-1">Patterns</p>
                <p className="font-medium">{selectedPatternIds.length} selected</p>
              </div>
              <div className="bg-white/[0.02] rounded-lg p-3">
                <p className="text-white/40 text-xs mb-1">Team Members</p>
                <p className="font-medium">4 assigned</p>
              </div>
              <div className="bg-white/[0.02] rounded-lg p-3">
                <p className="text-white/40 text-xs mb-1">Est. Duration</p>
                <p className="font-medium">8-12 weeks</p>
              </div>
              <div className="bg-white/[0.02] rounded-lg p-3">
                <p className="text-white/40 text-xs mb-1">Risk Level</p>
                <p className="font-medium text-yellow-400">Medium</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10"
              >
                Create Another
              </button>
              <button 
                onClick={() => navigate('/aaf-migration-expert')}
                className="flex-1 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-sm font-medium"
              >
                Go to Dashboard →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lego Popup Modal */}
      {showLegoPopup && activePattern && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xl">📦</div>
                <div>
                  <h2 className="text-xl font-semibold">{activePattern.name}</h2>
                  <p className="text-sm text-white/50">{activePattern.source} → {activePattern.target} • {activePattern.legos.length} Legos</p>
                </div>
              </div>
              <button onClick={() => setShowLegoPopup(false)} className="text-white/40 hover:text-white text-2xl">×</button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white/70">Building Blocks (Legos)</h3>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-blue-400/10 text-blue-400">Transform</span>
                  <span className="px-2 py-1 rounded bg-purple-400/10 text-purple-400">Migrate</span>
                  <span className="px-2 py-1 rounded bg-orange-400/10 text-orange-400">Config</span>
                </div>
              </div>

              <div className="space-y-3">
                {activePattern.legos.map((lego, idx) => (
                  <div key={lego.id} className={`flex items-start gap-4 p-4 rounded-xl border ${getTypeColor(lego.type)}`}>
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm font-semibold text-white/50">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{lego.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded capitalize ${getTypeColor(lego.type)}`}>{lego.type}</span>
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed mb-3">{lego.description}</p>
                      <a href={lego.docUrl} className="text-xs text-cyan-400 hover:text-cyan-300">
                        🔗 View Documentation
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-6 border-t border-white/10 bg-white/[0.02]">
              <div className="text-sm text-white/50">
                <span className="text-white font-medium">{activePattern.successRate}%</span> success rate • 
                <span className={activePattern.risk === 'Low' ? 'text-green-400' : activePattern.risk === 'Medium' ? 'text-yellow-400' : 'text-red-400'}> {activePattern.risk}</span> risk
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowLegoPopup(false)} className="px-5 py-2.5 text-sm text-white/60">Close</button>
                <button 
                  onClick={() => { togglePattern(activePattern.id); setShowLegoPopup(false); }}
                  className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-medium text-sm"
                >
                  {selectedPatternIds.includes(activePattern.id) ? '✓ Selected' : 'Select Pattern'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Person Modal */}
      {showAddPersonModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Add Team Member</h3>
              <button 
                onClick={() => {
                  setShowAddPersonModal(false);
                  setNewPerson({ name: '', role: '', avatar: '' });
                }}
                className="text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g., John Doe"
                  value={newPerson.name}
                  onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/60 mb-2">Role *</label>
                <input
                  type="text"
                  placeholder="e.g., Senior Developer"
                  value={newPerson.role}
                  onChange={(e) => setNewPerson({ ...newPerson, role: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/60 mb-2">Avatar Initials (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., JD (auto-generated if blank)"
                  value={newPerson.avatar}
                  onChange={(e) => setNewPerson({ ...newPerson, avatar: e.target.value.toUpperCase().slice(0, 2) })}
                  maxLength={2}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <p className="text-xs text-white/40 mt-1">Leave blank to auto-generate from name</p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddPersonModal(false);
                  setNewPerson({ name: '', role: '', avatar: '' });
                }}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPerson}
                disabled={!newPerson.name || !newPerson.role}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                  newPerson.name && newPerson.role
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/30' 
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                Add Person
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewMigrationPage;