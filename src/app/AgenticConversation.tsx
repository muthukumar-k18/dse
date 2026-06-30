import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { projectRepository } from '../utils/projectRepository';
import dseAgentLogo from 'figma:asset/730a8cd473c4c4efdb2c8cc25201e605372613c3.png';
import copilotLogo from 'figma:asset/105bbd5ef82f7e9c35413389367da61238f8efba.png';

interface Message {
  id: number;
  type: 'agent' | 'user' | 'system' | 'code';
  content: string;
  oldCode?: string;
  newCode?: string;
  timestamp: Date;
  requiresInput?: boolean;
  question?: string;
}

const AgenticConversation = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const location = useLocation();
  const { activityId, activityName, documentType, method, returnPath, stageId } = location.state || {};
  
  const [project, setProject] = useState(null);
  const [autonomyLevel, setAutonomyLevel] = useState(3); // 1-5 scale: 1=Manual, 3=Guided, 5=Autonomous
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [awaitingUserResponse, setAwaitingUserResponse] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Debug logging
  useEffect(() => {
    console.log('AgenticConversation - Location State:', {
      activityId,
      activityName,
      documentType,
      method,
      returnPath,
      stageId
    });
  }, []);

  useEffect(() => {
    if (projectId) {
      const foundProject = projectRepository.getProjectById(parseInt(projectId));
      if (foundProject) {
        setProject(foundProject);
        console.log('AgenticConversation - Project:', foundProject);
      }
    }
  }, [projectId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAgentIcon = () => {
    if (method === 'GHCP Agent') return copilotLogo;
    if (method === 'DSE 2.0 Agents') return dseAgentLogo;
    return dseAgentLogo;
  };

  const getAgentName = () => {
    return method || 'AI Agent';
  };

  const getAutonomyLabel = (level: number) => {
    switch(level) {
      case 1: return 'Manual';
      case 2: return 'Manual-Guided';
      case 3: return 'Guided';
      case 4: return 'Guided-Autonomous';
      case 5: return 'Autonomous';
      default: return 'Guided';
    }
  };

  const getAutonomyColor = (level: number) => {
    if (level === 1) return 'from-orange-500 to-red-500';
    if (level === 2) return 'from-orange-400 to-yellow-500';
    if (level === 3) return 'from-cyan-500 to-blue-500';
    if (level === 4) return 'from-green-400 to-cyan-500';
    if (level === 5) return 'from-green-500 to-emerald-500';
    return 'from-cyan-500 to-blue-500';
  };

  // Get proper activity heading
  const getActivityHeading = () => {
    // Priority 1: Use activityName if it exists
    if (activityName) return activityName;
    
    // Priority 2: Use documentType with "Creation" suffix if appropriate
    if (documentType) {
      // Don't add "Creation" if it already contains these words
      if (documentType.includes('Creation') || documentType.includes('Assessment') || documentType.includes('Check') || documentType.includes('Summary')) {
        return documentType;
      }
      return `${documentType} Creation`;
    }
    
    // Fallback
    return 'Document Creation';
  };

  // Generate conversation steps based on document type and project
  const generateConversationSteps = () => {
    const projectName = project?.name || 'the project';
    const sourceTech = project?.sourceTech || 'current technology';
    const targetTech = project?.targetTech || 'target technology';
    const module = project?.module || 'the application';
    
    // Scope Documentation Creation specific conversation
    if (documentType === 'Project Scope' || activityName === 'Scope Documentation Creation') {
      return [
        {
          agentMessage: `Hello! I'm ${getAgentName()} and I'll help you create the **Project Scope Document** for \"${projectName}\". Let me start by analyzing the project context...`,
          systemMessage: 'Agent initialized • Loading project data',
          delay: 1000
        },
        {
          agentMessage: `I've identified this is a **${sourceTech} to ${targetTech}** upgrade for your ${module}. Let me gather the key scope elements. First, I'll analyze the current codebase and identify the scope boundaries.`,
          systemMessage: 'Analyzing codebase and Java version dependencies...',
          delay: 1500
        },
        {
          agentMessage: `Based on the project data, I've identified:\n\n📊 **Module**: ${module}\n🎯 **Upgrade Path**: ${sourceTech} → ${targetTech}\n📦 **Code Size**: ~85,000 lines of Java code\n⏱️ **Timeline**: Q2-Q3 2026\n💼 **Stakeholders**: Engineering, Platform, QA Teams\n\nShould I proceed with this scope definition?`,
          requiresInput: autonomyLevel <= 3,
          question: 'Does this scope align with your expectations?',
          delay: 2000
        },
        {
          agentMessage: `Great! Now let me define the technical scope. Analyzing Java 8 features and ${targetTech} upgrade requirements...`,
          systemMessage: 'Scanning deprecated APIs and new language features...',
          delay: 1500
        },
        {
          agentMessage: `I've categorized the technical scope:\n\n**In Scope:**\n✓ Update all Java 8 code to ${targetTech} standards\n✓ Replace deprecated APIs (Date/Time API, etc.)\n✓ Adopt new language features (var, switch expressions)\n✓ Update dependencies and libraries\n✓ Modernize build configuration (Maven/Gradle)\n\n**Out of Scope:**\n✗ Architecture refactoring\n✗ Business logic changes\n✗ UI/Frontend modifications\n\nShall I document these boundaries?`,
          requiresInput: autonomyLevel <= 2,
          question: 'Are these technical boundaries correct?',
          delay: 2000
        },
        {
          agentMessage: `Excellent! Now defining success criteria and constraints...`,
          systemMessage: 'Establishing project success metrics...',
          delay: 1500
        },
        {
          agentMessage: `**Success Criteria:**\n✓ 100% code compatibility with ${targetTech}\n✓ All unit tests passing\n✓ No performance degradation\n✓ Zero business logic changes\n\n**Constraints:**\n⚠️ Timeline: 4 months\n⚠️ Zero downtime requirement\n⚠️ Backward compatibility during transition\n⚠️ Team: 6 engineers maximum\n\nProject Scope Document is now complete!`,
          delay: 2000
        }
      ];
    }
    
    // Scope Summary specific conversation
    if (documentType === 'Scope Summary' || activityName === 'Scope Summary and Access Check') {
      return [
        {
          agentMessage: `Hello! I'm ${getAgentName()} and I'll help you create the **Scope Summary** for \"${projectName}\". Let me start by analyzing the project context...`,
          systemMessage: 'Agent initialized • Loading project data',
          delay: 1000
        },
        {
          agentMessage: `I've detected this is a **${sourceTech} to ${targetTech}** migration for ${module}. Let me verify repository access and gather scope information...`,
          systemMessage: 'Checking repository access and scanning Java codebase...',
          delay: 1500
        },
        {
          agentMessage: `✅ Repository access confirmed!\n\nI've analyzed the codebase and identified:\n\n📦 **Module**: ${module}\n📊 **Lines of Code**: ~85,000 Java files\n🔧 **Current Version**: ${sourceTech}\n🎯 **Target Version**: ${targetTech}\n⚙️ **Build Tool**: Maven 3.8\n🧪 **Test Coverage**: 78%\n\nShould I proceed with the scope summary?`,
          requiresInput: autonomyLevel <= 3,
          question: 'Does this inventory look correct?',
          delay: 2000
        },
        {
          agentMessage: `Perfect! Generating executive summary with key upgrade objectives...`,
          systemMessage: 'Analyzing Java version compatibility and migration complexity...',
          delay: 1500
        },
        {
          agentMessage: `**Scope Summary Complete:**\n\n📝 **Executive Overview**: Modernizing ${module} from ${sourceTech} to ${targetTech}\n🎯 **Primary Goal**: Leverage modern Java features and improve performance\n📈 **Expected Benefits**: \n   • 15-20% performance improvement\n   • Access to modern language features\n   • Long-term Oracle support\n   • Enhanced security patches\n⏰ **Duration**: 4 months\n💼 **Team Size**: 6 engineers\n\nScope Summary document is ready for stakeholder review!`,
          delay: 2000
        }
      ];
    }

    // Technical Assessment specific conversation
    if (documentType === 'Technical Assessment' || activityName === 'Technical Assessment') {
      return [
        {
          agentMessage: `Hello! I'm ${getAgentName()} and I'll conduct a comprehensive **360-Degree Technical Assessment** for \"${projectName}\". This assessment will analyze the entire ${module} application from architecture to code quality. Let me begin...`,
          systemMessage: 'Agent initialized • Starting 360° application analysis',
          delay: 1000
        },
        {
          agentMessage: `**Phase 1: Application Architecture Analysis**\n\nScanning ${module} architecture patterns, design principles, and structural organization...`,
          systemMessage: 'Analyzing application layers and component architecture...',
          delay: 1500
        },
        {
          agentMessage: `**Architecture Analysis Complete:**\n\n🏗️ **Application Type**: Microservices-based Banking API\n📦 **Modules Identified**: 8 core modules\n   • Account Management\n   • Transaction Processing\n   • Customer Data Service\n   • Authentication & Authorization\n   • Payment Gateway Integration\n   • Reporting Engine\n   • Audit & Compliance\n   • Notification Service\n\n🔧 **Design Patterns**: MVC, Repository, Factory, Strategy\n📊 **Lines of Code**: ~85,000 Java files\n\nShall I proceed with dependency analysis?`,
          requiresInput: autonomyLevel <= 3,
          question: 'Does this architecture match your understanding?',
          delay: 2500
        },
        {
          agentMessage: `**Phase 2: Dependency & Library Analysis**\n\nScanning all third-party libraries, frameworks, and internal dependencies...`,
          systemMessage: 'Analyzing Maven/Gradle dependencies and version compatibility...',
          delay: 1500
        },
        {
          agentMessage: `**Dependency Analysis:**\n\n📚 **Core Frameworks:**\n   • Spring Boot 2.7.x → Needs upgrade to 3.x for ${targetTech}\n   • Hibernate 5.6 → Compatible, minor config changes\n   • Apache Commons → All compatible\n\n⚠️ **Deprecated Libraries (${sourceTech} specific):**\n   • javax.* packages → Migrate to jakarta.*\n   • Date/Time API (java.util.Date) → Use java.time\n   • JAXB → Add explicit dependency for ${targetTech}\n\n✅ **Build Tool**: Maven 3.8.4 → Ready for ${targetTech}\n\nMoving to code quality analysis...`,
          delay: 2500
        },
        {
          agentMessage: `**Phase 3: Code Quality & Technical Debt Assessment**\n\nAnalyzing code complexity, maintainability, and technical debt across ${module}...`,
          systemMessage: 'Running SonarQube analysis and code quality metrics...',
          delay: 1500
        },
        {
          agentMessage: `**Code Quality Metrics:**\n\n📊 **Overall Code Quality**: B+ Grade\n   • Code Coverage: 78%\n   • Cyclomatic Complexity: Average 12 (Good)\n   • Code Duplication: 4.2% (Acceptable)\n   • Technical Debt: 45 days (Medium)\n\n🔍 **Key Findings:**\n   ✓ Well-structured codebase\n   ⚠️ 127 instances of deprecated ${sourceTech} APIs\n   ⚠️ 43 files using old Date/Time API\n   ⚠️ 18 files with potential null pointer issues\n\n🎯 **${targetTech} Readiness**: 65% (Requires remediation)\n\nShould I analyze security vulnerabilities?`,
          requiresInput: autonomyLevel <= 2,
          question: 'Shall I proceed with security assessment?',
          delay: 2500
        },
        {
          agentMessage: `**Phase 4: Security & Vulnerability Scan**\n\nScanning ${module} for security vulnerabilities, CVEs, and compliance issues...`,
          systemMessage: 'Running OWASP dependency check and security audit...',
          delay: 1500
        },
        {
          agentMessage: `**Security Assessment:**\n\n🔐 **Vulnerability Scan Results:**\n   • Critical: 0\n   • High: 2 (Outdated Log4j, Spring vulnerabilities)\n   • Medium: 8\n   • Low: 15\n\n🛡️ **Security Practices:**\n   ✓ OAuth 2.0 / JWT authentication\n   ✓ HTTPS/TLS 1.2+ encryption\n   ✓ SQL injection prevention (Prepared Statements)\n   ⚠️ Some hardcoded credentials in config files\n   ⚠️ Weak password hashing in legacy modules\n\n📋 **Compliance Status:**\n   ✓ PCI-DSS: Partially compliant (needs review)\n   ✓ GDPR: Data encryption present\n\nProceeding to performance analysis...`,
          delay: 2500
        },
        {
          agentMessage: `**Phase 5: Performance & Scalability Analysis**\n\nProfiling ${module} performance, resource usage, and scalability patterns...`,
          systemMessage: 'Analyzing API response times, throughput, and bottlenecks...',
          delay: 1500
        },
        {
          agentMessage: `**Performance Metrics:**\n\n⚡ **Current Performance:**\n   • Average Response Time: 285ms\n   • Peak Throughput: 5,200 req/min\n   • Database Queries: 12-18 per request\n   • Memory Usage: 2.4 GB average\n\n📈 **Expected ${targetTech} Performance Improvements:**\n   • Response Time: ~240ms (15% faster)\n   • Memory Footprint: -20% (better GC)\n   • Startup Time: -30% (faster JVM)\n\n🚧 **Bottlenecks Identified:**\n   ⚠️ N+1 query problem in Transaction Service\n   ⚠️ Inefficient caching in Customer Data Service\n   ⚠️ No connection pooling optimization\n\nMoving to database assessment...`,
          delay: 2500
        },
        {
          agentMessage: `**Phase 6: Database & Data Layer Assessment**\n\nAnalyzing database schema, queries, ORM mappings, and data access patterns...`,
          systemMessage: 'Scanning database entities, migrations, and query performance...',
          delay: 1500
        },
        {
          agentMessage: `**Database Analysis:**\n\n🗄️ **Database Stack:**\n   • PostgreSQL 13.x (Primary)\n   • Redis 6.2 (Cache)\n   • MongoDB 4.4 (Logs/Audit)\n\n📊 **Schema Analysis:**\n   • Tables: 67\n   • Stored Procedures: 23\n   • Indexes: 145\n   • Foreign Keys: 89\n\n✅ **JPA/Hibernate Compatibility:**\n   • Entity mappings: ${targetTech} compatible\n   • Minor query syntax updates needed\n   • Connection pool configuration ready\n\nProceeding to testing framework analysis...`,
          delay: 2500
        },
        {
          agentMessage: `**Phase 7: Testing Framework & Coverage Assessment**\n\nAnalyzing test suites, coverage, and ${targetTech} compatibility...`,
          systemMessage: 'Scanning JUnit tests, integration tests, and test coverage...',
          delay: 1500
        },
        {
          agentMessage: `**Testing Analysis:**\n\n🧪 **Test Framework:**\n   • JUnit 5 (Jupiter) → ${targetTech} compatible ✓\n   • Mockito 4.x → Compatible ✓\n   • Spring Test → Needs minor updates\n\n📊 **Test Coverage:**\n   • Unit Tests: 1,247 tests (78% coverage)\n   • Integration Tests: 89 tests\n   • End-to-End Tests: 34 scenarios\n   • Total Test Execution Time: 12 minutes\n\n⚠️ **Action Items:**\n   • Update 23 tests using deprecated assertions\n   • Fix 8 flaky integration tests\n   • Add tests for ${targetTech} new features\n\nMoving to DevOps & deployment assessment...`,
          delay: 2500
        },
        {
          agentMessage: `**Phase 8: DevOps, CI/CD & Infrastructure Analysis**\n\nAnalyzing build pipelines, deployment processes, and infrastructure...`,
          systemMessage: 'Scanning Jenkins/Azure DevOps pipelines and deployment configs...',
          delay: 1500
        },
        {
          agentMessage: `**DevOps Assessment:**\n\n🔄 **CI/CD Pipeline:**\n   • Build Tool: Maven 3.8.4\n   • CI Platform: Azure DevOps\n   • Deployment: Docker + Kubernetes\n   • Build Time: ~8 minutes\n\n📦 **Docker Configuration:**\n   • Base Image: openjdk:8-jdk-alpine\n   • **Action Required**: Update to openjdk:17-jdk-alpine\n   • Multi-stage build: Yes ✓\n\n☸️ **Kubernetes:**\n   • JVM Memory Limits: 2 GB\n   • **Recommendation**: Increase to 2.5 GB for ${targetTech}\n   • Health Checks: Configured ✓\n\nFinal phase - generating migration recommendations...`,
          delay: 2500
        },
        {
          agentMessage: `**Phase 9: Migration Risk & Effort Estimation**\n\nCalculating migration complexity, effort, and risk assessment...`,
          systemMessage: 'Generating comprehensive migration roadmap...',
          delay: 1500
        },
        {
          agentMessage: `**🎯 360-Degree Technical Assessment Complete!**\n\n**Migration Complexity**: MEDIUM-HIGH\n\n**Effort Estimation:**\n   • Code Remediation: 120 person-hours\n   • Dependency Updates: 40 person-hours\n   • Testing & Validation: 80 person-hours\n   • Infrastructure Updates: 24 person-hours\n   • **Total**: 264 person-hours (~6 weeks with 4 engineers)\n\n**Risk Assessment:**\n   🔴 HIGH: Spring Boot upgrade (breaking changes)\n   🟡 MEDIUM: Deprecated API replacements (127 instances)\n   🟡 MEDIUM: Security vulnerabilities (2 high, 8 medium)\n   🟢 LOW: Database compatibility\n   🟢 LOW: Testing framework updates\n\n**Migration Phases:**\n   1. **Preparation** (Week 1): Environment setup, dependency analysis\n   2. **Code Migration** (Week 2-3): API updates, Spring Boot 3 upgrade\n   3. **Testing** (Week 4): Unit, integration, regression testing\n   4. **Security Fixes** (Week 5): Vulnerability remediation\n   5. **Performance Tuning** (Week 6): Optimization and validation\n\n📄 **Comprehensive Report**: 87-page technical assessment ready!\n   ✓ Architecture Analysis (12 pages)\n   ✓ Dependency Matrix (8 pages)\n   ✓ Code Quality Report (15 pages)\n   ✓ Security Audit (10 pages)\n   ✓ Performance Benchmarks (9 pages)\n   ✓ Database Assessment (7 pages)\n   ✓ Testing Strategy (11 pages)\n   ✓ DevOps Recommendations (8 pages)\n   ✓ Migration Roadmap (7 pages)`,
          delay: 3000
        }
      ];
    }
    
    // Resource Plan specific conversation
    if (documentType === 'Resource Plan' || activityName === 'Resource Plan') {
      return [
        {
          agentMessage: `I'll help you create the **Resource Plan** for \"${projectName}\". Analyzing project requirements to determine optimal team composition...`,
          systemMessage: 'Agent initialized • Calculating resource requirements',
          delay: 1000
        },
        {
          agentMessage: `Based on the project scope (${module}, ${sourceTech} to ${targetTech}), I recommend the following team structure:\n\n**Java Architects**: 2 FTE\n**Backend Developers**: 4 FTE\n**DevOps Engineers**: 2 FTE\n**QA Engineers**: 2 FTE\n**Project Manager**: 1 FTE\n\nTotal: 11 FTE. Does this align with your expectations?`,
          requiresInput: autonomyLevel <= 3,
          question: 'Is this team size appropriate for your organization?',
          delay: 2000
        },
        {
          agentMessage: `Perfect! Now let me create the detailed resource allocation timeline...`,
          systemMessage: 'Generating resource ramp-up and allocation schedule...',
          delay: 1500
        },
        {
          agentMessage: `**Phase-wise Resource Allocation:**\n\n**Phase 1 - Planning (Month 1)**: 5 FTE\n- 2 Architects, 1 PM, 2 Developers\n\n**Phase 2 - Migration (Month 2-3)**: 11 FTE (Full team)\n\n**Phase 3 - Testing & Validation (Month 4)**: 8 FTE\n- Focus on QA, DevOps, and support\n\nResource plan is complete with skill matrix and RACI chart!`,
          delay: 2000
        }
      ];
    }
    
    // Risk Register specific conversation  
    if (documentType === 'Risk Register' || activityName === 'Risk Register') {
      return [
        {
          agentMessage: `I'll create the **Risk Register** for "${projectName}". Let me identify potential risks across technical, operational, and business dimensions...`,
          systemMessage: 'Agent initialized • Scanning for project risks',
          delay: 1000
        },
        {
          agentMessage: `I've identified 15 key risks. Let me walk through the critical ones:\n\n**🔴 HIGH RISK:**\n1. Data migration complexity (Probability: High, Impact: Critical)\n2. Integration points with external systems (Probability: Medium, Impact: High)\n\n**🟡 MEDIUM RISK:**\n3. Resource availability (Probability: Medium, Impact: Medium)\n4. Technology learning curve (Probability: High, Impact: Low)\n\nShould I proceed with mitigation strategies?`,
          requiresInput: autonomyLevel <= 3,
          question: 'Do these risks match your concerns?',
          delay: 2000
        },
        {
          agentMessage: `Creating mitigation and contingency plans...`,
          systemMessage: 'Generating risk mitigation strategies...',
          delay: 1500
        },
        {
          agentMessage: `**Mitigation Strategies:**\n\n📋 Data Migration Risk:\n- Conduct 3 pilot migrations\n- Implement automated validation scripts\n- Create rollback procedures\n- Assign dedicated data migration team\n\n📋 Integration Risk:\n- Early API contract validation\n- Establish integration test environment\n- Create fallback integration patterns\n\nRisk register complete with 15 risks, owners, and mitigation plans!`,
          delay: 2000
        }
      ];
    }
    
    // Default/Generic document conversation
    return [
      {
        agentMessage: `Hello! I'm ${getAgentName()} and I'll assist with \"${activityName || documentType || 'this task'}\" for \"${projectName}\". Analyzing the ${sourceTech} to ${targetTech} upgrade requirements...`,
        systemMessage: 'Agent initialized and project context loaded',
        delay: 1000
      },
      {
        agentMessage: `I've detected this is a **${sourceTech} to ${targetTech}** upgrade project. Let me start by analyzing your current codebase and dependencies...`,
        systemMessage: 'Scanning codebase for dependencies...',
        delay: 2000
      },
      {
        agentMessage: `Found several components requiring upgrades. Analyzing migration patterns for ${module}...`,
        systemMessage: `Identified components requiring ${targetTech} upgrade`,
        delay: 2000
      },
      {
        agentMessage: `Perfect! All analysis completed successfully.`,
        systemMessage: '✅ Analysis complete',
        delay: 1500
      }
    ];
  };

  const initializeConversation = async () => {
    const taskName = activityName || documentType || 'Task';
    const initialMessage: Message = {
      id: Date.now(),
      type: 'system',
      content: `${taskName} • Autonomy: ${getAutonomyLabel(autonomyLevel)}`,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    setCurrentStep(0);
    setProgress(0);
    setIsComplete(false);
    setConversationStarted(true);
    
    const steps = generateConversationSteps();
    setTimeout(() => processNextStep(0, [initialMessage], steps), 1000);
  };

  const processNextStep = async (stepIndex: number, currentMessages: Message[], steps: any[]) => {
    if (stepIndex >= steps.length) {
      // Task complete
      const taskName = activityName || documentType || 'Task';
      const completeMessage: Message = {
        id: Date.now(),
        type: 'system',
        content: `✅ ${taskName} completed successfully!`,
        timestamp: new Date()
      };
      setMessages([...currentMessages, completeMessage]);
      setProgress(100);
      setIsComplete(true);
      
      // Don't auto-save here - only save when user clicks "Complete & Return"
      return;
    }

    const step = steps[stepIndex];
    setIsProcessing(true);
    
    // Add system message if exists
    if (step.systemMessage) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const sysMsg: Message = {
        id: Date.now(),
        type: 'system',
        content: step.systemMessage,
        timestamp: new Date()
      };
      currentMessages = [...currentMessages, sysMsg];
      setMessages(currentMessages);
    }

    // Add agent message
    await new Promise(resolve => setTimeout(resolve, step.delay));
    const agentMsg: Message = {
      id: Date.now() + 1,
      type: 'agent',
      content: step.agentMessage,
      timestamp: new Date()
    };
    currentMessages = [...currentMessages, agentMsg];
    setMessages(currentMessages);

    // Add code transformation if exists
    if (step.codeTransformation) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const codeMsg: Message = {
        id: Date.now() + 2,
        type: 'code',
        content: 'Code Transformation',
        oldCode: step.codeTransformation.old,
        newCode: step.codeTransformation.new,
        timestamp: new Date()
      };
      currentMessages = [...currentMessages, codeMsg];
      setMessages(currentMessages);
    }

    // Update progress
    const newProgress = ((stepIndex + 1) / steps.length) * 100;
    setProgress(newProgress);
    setCurrentStep(stepIndex);

    // Check if this step requires user input
    const needsInput = step.requiresInput !== undefined ? step.requiresInput : false;
    
    if (needsInput && step.question) {
      const questionMsg: Message = {
        id: Date.now() + 3,
        type: 'agent',
        content: step.question,
        timestamp: new Date(),
        requiresInput: true
      };
      currentMessages = [...currentMessages, questionMsg];
      setMessages(currentMessages);
      setAwaitingUserResponse(true);
      setIsProcessing(false);
    } else {
      // Auto-proceed
      setIsProcessing(false);
      const delay = autonomyLevel === 5 ? 1000 : autonomyLevel >= 3 ? 1500 : 2000;
      setTimeout(() => processNextStep(stepIndex + 1, currentMessages, steps), delay);
    }
  };

  const handleUserResponse = () => {
    if (!userInput.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setUserInput('');
    setAwaitingUserResponse(false);

    const steps = generateConversationSteps();
    setTimeout(() => processNextStep(currentStep + 1, updatedMessages, steps), 1000);
  };

  const completeActivity = () => {
    const activitiesKey = `activities_${projectId}_${stageId}`;
    const savedActivities = localStorage.getItem(activitiesKey);
    
    console.log('🔍 Completing Activity:', {
      projectId,
      stageId,
      activityId,
      method,
      documentType,
      activityName,
      activitiesKey
    });
    
    if (savedActivities) {
      const activities = JSON.parse(savedActivities);
      console.log('📋 Current Activities:', activities);
      
      const updatedActivities = activities.map(act =>
        act.id === parseInt(activityId) 
          ? { ...act, status: 'Completed', selectedMethod: method } 
          : act
      );
      
      console.log('✅ Updated Activities:', updatedActivities);
      localStorage.setItem(activitiesKey, JSON.stringify(updatedActivities));

      const newDocument = {
        id: Date.now(),
        activityId: parseInt(activityId),
        name: documentType || activityName,
        method: method,
        createdAt: new Date().toISOString(),
        type: 'pdf'
      };
      
      console.log('📄 Creating Document:', newDocument);
      
      const documentsKey = `createdDocuments_${projectId}_${stageId}`;
      const savedDocuments = localStorage.getItem(documentsKey);
      const documents = savedDocuments ? JSON.parse(savedDocuments) : [];
      documents.push(newDocument);
      
      console.log('📚 All Documents:', documents);
      localStorage.setItem(documentsKey, JSON.stringify(documents));
      
      console.log('💾 Saved to localStorage successfully!');
    } else {
      console.error('❌ No activities found in localStorage for key:', activitiesKey);
    }
  };

  const handleComplete = () => {
    // Only save completion when explicitly clicking Complete button
    if (isComplete) {
      console.log('🎯 handleComplete called - saving activity completion...');
      completeActivity();
      
      // Small delay to ensure localStorage write completes before navigation
      setTimeout(() => {
        console.log('🔙 Navigating back to:', returnPath || `/initiation-screen/${projectId}`);
        navigate(returnPath || `/initiation-screen/${projectId}`);
      }, 100);
    } else {
      console.log('⚠️ handleComplete called but isComplete is false');
      navigate(returnPath || `/initiation-screen/${projectId}`);
    }
  };

  const handleBack = () => {
    // Back button does NOT save completion
    navigate(returnPath || `/initiation-screen/${projectId}`);
  };

  const handleStartConversation = () => {
    initializeConversation();
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-r from-black via-gray-900 to-black sticky top-0 z-10">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            >
              <span>←</span>
              <span>Back</span>
            </button>
            {isComplete && (
              <button
                onClick={handleComplete}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all"
              >
                ✓ Complete & Return
              </button>
            )}
          </div>

          {/* Project Info - Prominent */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {project.name}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold">
                REM ID: {project.remId || project.tunaId}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                {project.targetPlatform || 'Azure'} Migration
              </span>
            </div>
          </div>

          {/* Task Info */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-xl shadow-cyan-500/20 flex-shrink-0">
              {getAgentIcon() && (
                <img src={getAgentIcon()} alt={getAgentName()} className="w-8 h-8 object-contain" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white/90">{getActivityHeading()}</h2>
              <p className="text-sm text-white/50">Using {getAgentName()}</p>
            </div>
          </div>

          {/* Compact Autonomy Level Selector */}
          {!conversationStarted && (
            <div className="bg-white/[0.02] border border-white/10 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-white/80">Autonomy Level</p>
                <p className={`text-xs font-bold px-2 py-0.5 rounded bg-gradient-to-r ${getAutonomyColor(autonomyLevel)} text-white`}>
                  {getAutonomyLabel(autonomyLevel)}
                </p>
              </div>
              
              {/* Compact slider */}
              <div className="flex items-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    onClick={() => setAutonomyLevel(level)}
                    className={`flex-1 h-8 rounded flex items-center justify-center text-xs font-medium transition-all ${
                      autonomyLevel === level
                        ? `bg-gradient-to-r ${getAutonomyColor(level)} text-white shadow-md`
                        : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              <p className="text-[10px] text-white/40 mb-3">
                {autonomyLevel === 1 && '1 = Manual control with approval at each step'}
                {autonomyLevel === 2 && '2 = Manual-Guided with key decision confirmations'}
                {autonomyLevel === 3 && '3 = Guided mode with occasional check-ins'}
                {autonomyLevel === 4 && '4 = Guided-Autonomous with critical confirmations'}
                {autonomyLevel === 5 && '5 = Fully autonomous execution'}
              </p>

              <button
                onClick={handleStartConversation}
                className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                Start Agent Conversation →
              </button>
            </div>
          )}

          {/* Progress Bar */}
          {conversationStarted && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-white/50 uppercase tracking-wider">Progress</p>
                <p className="text-xs font-semibold text-cyan-400">{Math.round(progress)}%</p>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Conversation Area */}
      {conversationStarted && (
        <div className="p-6 max-w-5xl mx-auto">
          <div className="space-y-4 mb-24">
            {messages.map((message) => (
              <div key={message.id}>
                {message.type === 'system' && (
                  <div className="flex justify-center">
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white/50">
                      {message.content}
                    </div>
                  </div>
                )}

                {message.type === 'agent' && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30">
                      {getAgentIcon() && (
                        <img src={getAgentIcon()} alt="Agent" className="w-6 h-6 object-contain" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="bg-white/[0.03] border border-white/10 rounded-2xl rounded-tl-none p-4">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <p className="text-xs text-white/30 mt-1 ml-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                )}

                {message.type === 'user' && (
                  <div className="flex gap-4 justify-end">
                    <div className="flex-1 max-w-2xl">
                      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl rounded-tr-none p-4">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <p className="text-xs text-white/30 mt-1 mr-2 text-right">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 text-lg">
                     
                    </div>
                  </div>
                )}

                {message.type === 'code' && (
                  <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">⚡</span>
                      <p className="font-semibold text-sm">Code Transformation</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <p className="text-xs text-white/50 uppercase font-semibold">Before</p>
                        </div>
                        <div className="bg-black/50 border border-red-500/20 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                          <pre className="text-white/70">{message.oldCode}</pre>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <p className="text-xs text-white/50 uppercase font-semibold">After ({project.targetPlatform || 'Azure'})</p>
                        </div>
                        <div className="bg-black/50 border border-green-500/20 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                          <pre className="text-white/70">{message.newCode}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isProcessing && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  {getAgentIcon() && (
                    <img src={getAgentIcon()} alt="Agent" className="w-6 h-6 object-contain" />
                  )}
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl rounded-tl-none p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {awaitingUserResponse && (
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-6">
              <div className="max-w-5xl mx-auto">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleUserResponse()}
                    placeholder="Type your response (yes/no or provide details)..."
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500/50 transition-colors"
                    autoFocus
                  />
                  <button
                    onClick={handleUserResponse}
                    disabled={!userInput.trim()}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      userInput.trim()
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/30'
                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgenticConversation;