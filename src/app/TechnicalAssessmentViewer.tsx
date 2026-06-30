import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { projectRepository } from '../utils/projectRepository';

const TechnicalAssessmentViewer = () => {
  const navigate = useNavigate();
  const { projectId, stageId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const project = projectRepository.getProjectById(parseInt(projectId));

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Mock comprehensive technical assessment data
  const technicalData = {
    overview: {
      applicationType: 'Legacy On-Premise Java Application',
      sourceEnvironment: 'On-Premise Data Center',
      targetEnvironment: 'Java 17 (Modernized)',
      assessmentScore: 78,
      complexity: 'High',
      readinessLevel: 'Moderate',
      estimatedDuration: '18-24 months',
      criticalityRating: 'High',
      technicalDebt: 'Significant',
      assessmentSummary: 'The technical assessment reveals a high-complexity Java 8 to Java 17 modernization for a legacy on-premise banking application. The current system shows significant technical debt with critical security vulnerabilities and deprecated API usage. The application runs on outdated infrastructure with WebLogic 12c and Oracle 11g, requiring comprehensive updates to leverage modern Java 17 features, improved performance, and enhanced security. Key focus areas include deprecated API replacement, dependency upgrades, code quality improvements, and infrastructure modernization.'
    },
    infrastructure: {
      current: [
        { component: 'Application Servers', technology: 'WebLogic 12c (Java 8)', count: 8, status: 'Legacy', risk: 'High' },
        { component: 'JDK Version', technology: 'Oracle JDK 8 (1.8.0_202)', count: 8, status: 'EOL', risk: 'Critical' },
        { component: 'Database', technology: 'Oracle 11g RAC', count: 2, status: 'EOL Soon', risk: 'Critical' },
        { component: 'Web Servers', technology: 'Apache HTTP Server 2.4', count: 4, status: 'Stable', risk: 'Low' },
        { component: 'Load Balancer', technology: 'F5 BIG-IP (On-Premise)', count: 2, status: 'Active', risk: 'Medium' },
        { component: 'Cache Layer', technology: 'Hazelcast 3.x', count: 3, status: 'Outdated', risk: 'Medium' },
        { component: 'Message Queue', technology: 'IBM MQ 9.0', count: 2, status: 'Legacy', risk: 'High' },
        { component: 'Build Tool', technology: 'Maven 3.6.3', count: 1, status: 'Stable', risk: 'Low' }
      ],
      target: [
        { component: 'JDK Version', technology: 'OpenJDK 17 LTS', provisioning: 'Updated', benefit: 'Long-term support & modern features' },
        { component: 'Application Servers', technology: 'Spring Boot 3.x (Embedded Tomcat)', provisioning: 'Containerized', benefit: 'Cloud-native architecture' },
        { component: 'Build Tool', technology: 'Maven 3.9+ / Gradle 8+', provisioning: 'Updated', benefit: 'Java 17 compatibility' },
        { component: 'Frameworks', technology: 'Spring Framework 6.x', provisioning: 'Upgraded', benefit: 'Jakarta EE 9+ support' },
        { component: 'Cache Layer', technology: 'Hazelcast 5.x / Redis 7.x', provisioning: 'Modernized', benefit: 'Better performance' },
        { component: 'Database Access', technology: 'Hibernate 6.x / JPA 3.0', provisioning: 'Updated', benefit: 'Jakarta persistence' },
        { component: 'Testing', technology: 'JUnit 5 Jupiter', provisioning: 'Modernized', benefit: 'Enhanced testing features' }
      ],
      dependencies: [
        { name: 'Customer Identity Service', type: 'Internal API', criticality: 'Critical', sla: '99.95%' },
        { name: 'Payment Gateway', type: 'External API', criticality: 'Critical', sla: '99.99%' },
        { name: 'Email Service', type: 'External SaaS', criticality: 'Medium', sla: '99.5%' },
        { name: 'Analytics Platform', type: 'Internal Service', criticality: 'Low', sla: '99.0%' },
        { name: 'Document Storage', type: 'Azure Blob Storage', criticality: 'High', sla: '99.99%' },
        { name: 'CDN', type: 'Azure CDN', criticality: 'High', sla: '99.9%' }
      ]
    },
    architecture: {
      currentPattern: 'Monolithic Java EE Application',
      targetPattern: 'Modernized Java 17 with Modular Architecture',
      layers: [
        { name: 'Presentation Layer', services: 8, pattern: 'JSP/Servlets + REST APIs', status: 'To Modernize' },
        { name: 'Business Logic Layer', services: 24, pattern: 'EJB 3.x + Spring Services', status: 'To Refactor' },
        { name: 'Data Access Layer', services: 12, pattern: 'JPA 2.x + Hibernate 5.x', status: 'To Upgrade' },
        { name: 'Integration Layer', services: 6, pattern: 'SOAP/REST Clients', status: 'To Modernize' }
      ],
      modules: [
        { name: 'Account Management', complexity: 'High', linesOfCode: 25000, apis: 14, dependencies: 8, javaVersion: 'Java 8' },
        { name: 'Transaction Processing', complexity: 'Critical', linesOfCode: 32000, apis: 18, dependencies: 12, javaVersion: 'Java 8' },
        { name: 'Customer Service', complexity: 'Medium', linesOfCode: 18000, apis: 10, dependencies: 6, javaVersion: 'Java 8' },
        { name: 'Payment Gateway Integration', complexity: 'High', linesOfCode: 15000, apis: 8, dependencies: 5, javaVersion: 'Java 8' },
        { name: 'Notification Engine', complexity: 'Low', linesOfCode: 8000, apis: 4, dependencies: 2, javaVersion: 'Java 8' },
        { name: 'Reporting Module', complexity: 'Medium', linesOfCode: 12000, apis: 6, dependencies: 4, javaVersion: 'Java 8' }
      ],
      communicationPatterns: [
        { pattern: 'Synchronous REST', usage: '45%', latency: '120ms avg', recommendation: 'Keep for simple queries' },
        { pattern: 'Asynchronous Events', usage: '30%', latency: 'N/A', recommendation: 'Expand for workflows' },
        { pattern: 'Message Queue', usage: '15%', latency: '50ms avg', recommendation: 'Use for critical ops' },
        { pattern: 'GraphQL', usage: '10%', latency: '200ms avg', recommendation: 'Frontend aggregation' }
      ]
    },
    security: {
      currentControls: [
        { control: 'Authentication', method: 'LDAP + Session Cookies', strength: 'Weak', compliance: 'Non-Compliant' },
        { control: 'Authorization', method: 'Role-Based (Custom)', strength: 'Medium', compliance: 'Partial' },
        { control: 'Data Encryption', method: 'TLS 1.2 in-transit only', strength: 'Medium', compliance: 'Partial' },
        { control: 'API Security', method: 'Basic Auth', strength: 'Weak', compliance: 'Non-Compliant' },
        { control: 'Secrets Management', method: 'Config Files', strength: 'Critical Risk', compliance: 'Non-Compliant' },
        { control: 'Network Security', method: 'Firewall Rules', strength: 'Medium', compliance: 'Partial' }
      ],
      targetControls: [
        { control: 'Authentication', method: 'OAuth 2.0 + OIDC (Cognito)', strength: 'Strong', compliance: 'Compliant' },
        { control: 'Authorization', method: 'RBAC + ABAC (IAM Policies)', strength: 'Strong', compliance: 'Compliant' },
        { control: 'Data Encryption', method: 'TLS 1.3 + KMS at-rest', strength: 'Strong', compliance: 'Compliant' },
        { control: 'API Security', method: 'JWT + API Keys + WAF', strength: 'Strong', compliance: 'Compliant' },
        { control: 'Secrets Management', method: 'Azure Key Vault', strength: 'Strong', compliance: 'Compliant' },
        { control: 'Network Security', method: 'Security Groups + NACLs + WAF', strength: 'Strong', compliance: 'Compliant' }
      ],
      vulnerabilities: [
        { id: 'VULN-001', severity: 'Critical', category: 'Java Version', description: 'Java 8 EOL - No security updates', status: 'Open', cve: 'N/A' },
        { id: 'VULN-002', severity: 'Critical', category: 'Dependencies', description: 'Log4j 2.14.1 vulnerability (Log4Shell)', status: 'Open', cve: 'CVE-2021-44228' },
        { id: 'VULN-003', severity: 'High', category: 'Deprecated API', description: 'Using deprecated java.util.Date API', status: 'Open', cve: 'N/A' },
        { id: 'VULN-004', severity: 'High', category: 'Injection', description: 'SQL Injection in legacy JDBC queries', status: 'Open', cve: 'N/A' },
        { id: 'VULN-005', severity: 'Medium', category: 'Dependencies', description: 'Outdated Spring libraries (43)', status: 'Open', cve: 'Multiple' },
        { id: 'VULN-006', severity: 'Medium', category: 'Serialization', description: 'Unsafe Java deserialization', status: 'In Progress', cve: 'N/A' },
        { id: 'VULN-007', severity: 'Low', category: 'Code Quality', description: 'Missing null checks (potential NPE)', status: 'Open', cve: 'N/A' }
      ],
      compliance: [
        { framework: 'SOC 2 Type II', status: 'Non-Compliant', gaps: 12, priority: 'Critical' },
        { framework: 'PCI-DSS', status: 'Partial', gaps: 8, priority: 'High' },
        { framework: 'GDPR', status: 'Partial', gaps: 15, priority: 'High' },
        { framework: 'HIPAA', status: 'Not Required', gaps: 0, priority: 'N/A' },
        { framework: 'ISO 27001', status: 'Non-Compliant', gaps: 22, priority: 'Medium' }
      ]
    },
    deployment: {
      currentPipeline: {
        buildTime: '45 minutes',
        deploymentFrequency: 'Monthly',
        rollbackTime: '4-6 hours',
        automationLevel: '30%',
        testCoverage: '42%',
        approvalSteps: 8
      },
      targetPipeline: {
        buildTime: '8 minutes',
        deploymentFrequency: 'Multiple per day',
        rollbackTime: '< 5 minutes',
        automationLevel: '95%',
        testCoverage: '85%',
        approvalSteps: 2
      },
      environments: [
        { name: 'Development', instances: 4, uptime: '95%', deployFreq: 'Daily', autoScaling: false },
        { name: 'QA/Testing', instances: 3, uptime: '98%', deployFreq: 'Weekly', autoScaling: false },
        { name: 'Staging', instances: 6, uptime: '99.5%', deployFreq: 'Bi-weekly', autoScaling: true },
        { name: 'Production', instances: 12, uptime: '99.95%', deployFreq: 'Monthly', autoScaling: true }
      ],
      cicdTools: [
        { current: 'Jenkins (self-hosted)', target: 'Azure DevOps Pipelines + GitHub Actions', status: 'Migration Planned' },
        { current: 'Manual Testing', target: 'Automated Testing (Jest, Cypress)', status: 'To Implement' },
        { current: 'Manual Deployments', target: 'GitOps (ArgoCD)', status: 'To Implement' },
        { current: 'Manual Rollbacks', target: 'Automated Canary Deployments', status: 'To Implement' }
      ]
    },
    integrations: {
      touchpoints: [
        { 
          name: 'CRM System (Salesforce)', 
          type: 'Bidirectional API', 
          protocol: 'REST', 
          frequency: 'Real-time',
          dataVolume: '50K requests/day',
          criticality: 'High',
          changes: 'OAuth migration required'
        },
        { 
          name: 'ERP System (SAP)', 
          type: 'Batch Integration', 
          protocol: 'File Transfer', 
          frequency: 'Nightly',
          dataVolume: '2M records/day',
          criticality: 'Critical',
          changes: 'API modernization needed'
        },
        { 
          name: 'Marketing Platform', 
          type: 'Webhook', 
          protocol: 'HTTP POST', 
          frequency: 'Event-driven',
          dataVolume: '10K events/day',
          criticality: 'Medium',
          changes: 'No changes required'
        },
        { 
          name: 'Analytics Warehouse', 
          type: 'Data Pipeline', 
          protocol: 'JDBC', 
          frequency: 'Hourly',
          dataVolume: '500GB/day',
          criticality: 'High',
          changes: 'Migrate to S3 + Athena'
        },
        { 
          name: 'Legacy Mainframe', 
          type: 'SOAP Service', 
          protocol: 'SOAP/XML', 
          frequency: 'On-demand',
          dataVolume: '5K requests/day',
          criticality: 'Critical',
          changes: 'Adapter layer required'
        },
        { 
          name: 'Mobile Apps', 
          type: 'REST API', 
          protocol: 'JSON/HTTPS', 
          frequency: 'Real-time',
          dataVolume: '200K requests/day',
          criticality: 'High',
          changes: 'GraphQL gateway recommended'
        }
      ],
      dataFlow: [
        { source: 'Web Application', destination: 'User Service', protocol: 'HTTPS', encryption: 'TLS 1.3', volume: 'High' },
        { source: 'User Service', destination: 'Order Service', protocol: 'gRPC', encryption: 'mTLS', volume: 'High' },
        { source: 'Order Service', destination: 'Payment Gateway', protocol: 'REST', encryption: 'TLS 1.3', volume: 'Medium' },
        { source: 'Payment Service', destination: 'Event Bus', protocol: 'AMQP', encryption: 'TLS', volume: 'High' },
        { source: 'Event Bus', destination: 'Notification Service', protocol: 'AMQP', encryption: 'TLS', volume: 'Medium' },
        { source: 'All Services', destination: 'Azure Monitor Logs', protocol: 'Azure SDK', encryption: 'Azure Key Vault', volume: 'Very High' }
      ]
    },
    cloud: {
      provider: 'Azure',
      regions: [
        { region: 'us-east-1', role: 'Primary', services: 45, cost: '$78K/month', compliance: 'SOC 2' },
        { region: 'us-west-2', role: 'DR/Backup', services: 22, cost: '$35K/month', compliance: 'SOC 2' },
        { region: 'eu-west-1', role: 'Regional', services: 18, cost: '$28K/month', compliance: 'GDPR' }
      ],
      services: [
        { service: 'Azure Kubernetes Service', purpose: 'Container Orchestration', instances: 3, cost: '$12K/mo', utilization: 'N/A' },
        { service: 'Azure SQL Database', purpose: 'Managed Database', instances: 6, cost: '$18K/mo', utilization: '65%' },
        { service: 'Azure Blob Storage', purpose: 'Object Storage', instances: 'N/A', cost: '$8K/mo', utilization: '45TB' },
        { service: 'Azure Functions', purpose: 'Serverless Compute', instances: '250 functions', cost: '$5K/mo', utilization: '80M invocations' },
        { service: 'Azure CDN', purpose: 'CDN', instances: 4, cost: '$15K/mo', utilization: '12TB/mo' },
        { service: 'Azure AD B2C', purpose: 'Authentication', instances: 1, cost: '$3K/mo', utilization: '500K users' },
        { service: 'Azure Cache for Redis', purpose: 'Caching', instances: 4, cost: '$6K/mo', utilization: '78%' },
        { service: 'Azure Service Bus', purpose: 'Message Queue', instances: 'N/A', cost: '$2K/mo', utilization: '50M msgs/mo' }
      ],
      costAnalysis: {
        currentMonthly: '$145K',
        targetMonthly: '$118K',
        savings: '$27K/month',
        savingsPercentage: '18.6%',
        optimizationPotential: 'Additional 15% via reserved instances'
      },
      dataResidency: [
        { region: 'North America', requirement: 'General Data', status: 'Compliant', storage: 'us-east-1, us-west-2' },
        { region: 'Europe', requirement: 'GDPR Data', status: 'Compliant', storage: 'eu-west-1' },
        { region: 'Asia Pacific', requirement: 'Future Expansion', status: 'Planned', storage: 'ap-southeast-1 (Planned)' }
      ],
      disasterRecovery: {
        rpo: '4 hours → 15 minutes',
        rto: '8 hours → 1 hour',
        backupFrequency: 'Daily → Continuous',
        backupRetention: '30 days → 90 days',
        failoverType: 'Manual → Automated',
        drTesting: 'Yearly → Quarterly'
      }
    },
    dataAnalysis: {
      volumeMetrics: {
        totalRecords: '2.5 Billion',
        dailyGrowth: '8.5 Million',
        totalStorage: '145 TB',
        monthlyGrowth: '4.2 TB'
      },
      databases: [
        { name: 'Customer DB', type: 'Oracle 11g', size: '45 TB', records: '850M', tps: 12000, migration: 'RDS PostgreSQL' },
        { name: 'Transaction DB', type: 'Oracle 11g', size: '62 TB', records: '1.2B', tps: 25000, migration: 'Aurora PostgreSQL' },
        { name: 'Analytics DB', type: 'Teradata', size: '28 TB', records: '350M', tps: 5000, migration: 'Redshift' },
        { name: 'Session Store', type: 'Redis 4.x', size: '250 GB', records: '50M', tps: 45000, migration: 'ElastiCache' }
      ],
      migrationStrategy: [
        { phase: 'Phase 1 - Reference Data', approach: 'Snapshot + Replay', downtime: '2 hours', riskLevel: 'Low' },
        { phase: 'Phase 2 - Customer Data', approach: 'CDC + Dual Write', downtime: '30 mins', riskLevel: 'Medium' },
        { phase: 'Phase 3 - Transaction Data', approach: 'Blue-Green', downtime: '0 mins', riskLevel: 'High' },
        { phase: 'Phase 4 - Historical Data', approach: 'Async Archive to S3', downtime: '0 mins', riskLevel: 'Low' }
      ],
      dataQuality: [
        { aspect: 'Completeness', score: 78, issues: 'Missing customer emails (12%)', remediation: 'Data enrichment' },
        { aspect: 'Accuracy', score: 85, issues: 'Address validation errors (8%)', remediation: 'Validation rules' },
        { aspect: 'Consistency', score: 72, issues: 'Duplicate records (15%)', remediation: 'Deduplication pipeline' },
        { aspect: 'Timeliness', score: 92, issues: 'Delayed sync from ERP (4h lag)', remediation: 'Real-time CDC' }
      ]
    },
    performance: {
      currentMetrics: {
        avgResponseTime: '850ms',
        p95ResponseTime: '2.3s',
        p99ResponseTime: '4.8s',
        throughput: '1,200 req/s',
        errorRate: '2.3%',
        uptime: '99.2%'
      },
      targetMetrics: {
        avgResponseTime: '120ms',
        p95ResponseTime: '350ms',
        p99ResponseTime: '800ms',
        throughput: '10,000 req/s',
        errorRate: '0.1%',
        uptime: '99.95%'
      },
      bottlenecks: [
        { component: 'Legacy Database Queries', impact: 'Critical', avgDelay: '1.2s', recommendation: 'Query optimization + caching' },
        { component: 'Single-threaded Processing', impact: 'High', avgDelay: '650ms', recommendation: 'Async processing' },
        { component: 'External API Calls', impact: 'High', avgDelay: '420ms', recommendation: 'Circuit breakers + fallbacks' },
        { component: 'Session Serialization', impact: 'Medium', avgDelay: '180ms', recommendation: 'JWT stateless auth' },
        { component: 'Large Payload Transfers', impact: 'Medium', avgDelay: '220ms', recommendation: 'Compression + pagination' }
      ],
      scalability: [
        { aspect: 'Horizontal Scaling', current: 'Manual (weeks)', target: 'Auto (seconds)', improvement: '99.9%' },
        { aspect: 'Vertical Scaling', current: 'Downtime required', target: 'Zero-downtime', improvement: '100%' },
        { aspect: 'Database Scaling', current: 'Not supported', target: 'Read replicas + sharding', improvement: 'New capability' },
        { aspect: 'Cache Scaling', current: 'Manual restart', target: 'Cluster mode', improvement: '95%' }
      ]
    },
    risks: {
      technical: [
        { risk: 'Data migration complexity', probability: 'High', impact: 'Critical', mitigation: 'Phased approach with rollback plan', owner: 'Data Team' },
        { risk: 'Integration breaking changes', probability: 'Medium', impact: 'High', mitigation: 'API versioning + adapter pattern', owner: 'Integration Team' },
        { risk: 'Performance degradation', probability: 'Medium', impact: 'High', mitigation: 'Load testing + performance baseline', owner: 'Platform Team' },
        { risk: 'Security vulnerabilities', probability: 'High', impact: 'Critical', mitigation: 'Security audit + penetration testing', owner: 'Security Team' },
        { risk: 'Vendor lock-in to Azure', probability: 'Low', impact: 'Medium', mitigation: 'Use open standards + container abstraction', owner: 'Architecture Team' },
        { risk: 'Skills gap in new tech stack', probability: 'High', impact: 'Medium', mitigation: 'Training program + hiring', owner: 'HR + Engineering' }
      ]
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🎯' },
    { id: 'infrastructure', label: 'Infrastructure', icon: '🏗️' },
    { id: 'architecture', label: 'Architecture', icon: '🏛️' },
    { id: 'security', label: 'Security', icon: '🔐' },
    { id: 'deployment', label: 'Deployment', icon: '🚀' },
    { id: 'integrations', label: 'Integrations', icon: '🔌' },
    { id: 'cloud', label: 'Cloud Strategy', icon: '☁️' },
    { id: 'data', label: 'Data Analysis', icon: '💾' },
    { id: 'performance', label: 'Performance', icon: '⚡' },
    { id: 'risks', label: 'Technical Risks', icon: '⚠️' }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-white/10 text-white/50 border-white/20';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => navigate(`/stage/${projectId}/${stageId}`)}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-4"
        >
          <span>←</span>
          <span>Back to Stage</span>
        </button>
        
        {/* Title Section */}
        <div className="flex items-start gap-6 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl shadow-xl">
            🔬
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-orange-500/20 text-orange-400">
                REM ID: {project.remId}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">
                Technical Assessment
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Technical Deep Dive Assessment</h1>
            <p className="text-xl font-semibold text-white mb-1">{project.module}</p>
            <p className="text-sm text-white/40">Legacy On-Premise Java Application • Comprehensive Technical Analysis</p>
          </div>
          
          {/* Assessment Score */}
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 text-center">
            <p className="text-xs text-white/40 uppercase mb-2">Assessment Score</p>
            <p className={`text-5xl font-black mb-1 ${getScoreColor(technicalData.overview.assessmentScore)}`}>
              {technicalData.overview.assessmentScore}
            </p>
            <p className="text-xs text-white/50">/100</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-6 gap-4">
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/40 uppercase mb-1">Complexity</p>
            <p className="text-xl font-bold text-orange-400">{technicalData.overview.complexity}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/40 uppercase mb-1">Readiness</p>
            <p className="text-xl font-bold text-yellow-400">{technicalData.overview.readinessLevel}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/40 uppercase mb-1">Duration</p>
            <p className="text-xl font-bold text-cyan-400">{technicalData.overview.estimatedDuration}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/40 uppercase mb-1">Criticality</p>
            <p className="text-xl font-bold text-red-400">{technicalData.overview.criticalityRating}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/40 uppercase mb-1">Tech Debt</p>
            <p className="text-xl font-bold text-purple-400">{technicalData.overview.technicalDebt}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/40 uppercase mb-1">Target Cloud</p>
            <p className="text-xl font-bold text-green-400">Azure</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-lg font-medium whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] text-white/70'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Assessment Summary - First */}
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span>✨</span>
                <span>Assessment Summary</span>
              </h3>
              <p className="text-white/80 leading-relaxed">
                {technicalData.overview.assessmentSummary}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span>📊</span>
                <span>Application Overview</span>
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4 text-cyan-400">Source Environment</h3>
                  <p className="text-2xl font-bold mb-2">{technicalData.overview.sourceEnvironment}</p>
                  <p className="text-sm text-white/60">{technicalData.overview.applicationType}</p>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4 text-green-400">Target Environment</h3>
                  <p className="text-2xl font-bold mb-2">{technicalData.overview.targetEnvironment}</p>
                  <p className="text-sm text-white/60">Modern Java platform with enhanced features</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'infrastructure' && (
          <div className="space-y-8">
            {/* Current Infrastructure */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span>🏗️</span>
                <span>Current Infrastructure</span>
              </h2>
              <div className="space-y-3">
                {technicalData.infrastructure.current.map((infra, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-semibold text-lg">{infra.component}</p>
                        <span className={`text-xs px-2.5 py-1 rounded-full border ${getSeverityColor(infra.risk)}`}>
                          {infra.risk} Risk
                        </span>
                      </div>
                      <p className="text-sm text-white/60">{infra.technology}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-cyan-400">{infra.count}</p>
                      <p className="text-xs text-white/50">instances</p>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <p className="text-sm font-medium text-yellow-400">{infra.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Infrastructure */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span>🎯</span>
                <span>Target Infrastructure (Azure)</span>
              </h2>
              <div className="space-y-3">
                {technicalData.infrastructure.target.map((infra, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-500/30 rounded-xl p-4 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="font-semibold text-lg mb-1">{infra.component}</p>
                      <p className="text-sm text-white/60">{infra.technology}</p>
                    </div>
                    <div className="text-right min-w-[120px]">
                      <p className="text-sm font-medium text-purple-400">{infra.provisioning}</p>
                      <p className="text-xs text-white/50">provisioning</p>
                    </div>
                    <div className="text-right min-w-[150px]">
                      <p className="text-sm font-medium text-green-400">✓ {infra.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dependencies */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span>🔗</span>
                <span>Infrastructure Dependencies</span>
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {technicalData.infrastructure.dependencies.map((dep, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold mb-1">{dep.name}</p>
                        <p className="text-xs text-white/50">{dep.type}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${getSeverityColor(dep.criticality)}`}>
                        {dep.criticality}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: dep.sla }} />
                      </div>
                      <p className="text-xs font-mono text-green-400">{dep.sla}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-8">
            {/* Architecture Patterns */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span>🏛️</span>
                <span>Architecture Transformation</span>
              </h2>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white/[0.03] border border-orange-500/30 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-3 text-orange-400">Current Pattern</h3>
                  <p className="text-3xl font-bold mb-2">{technicalData.architecture.currentPattern}</p>
                  <p className="text-sm text-white/60">Legacy monolithic architecture with tight coupling</p>
                </div>
                <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-500/30 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-3 text-green-400">Target Pattern</h3>
                  <p className="text-3xl font-bold mb-2">{technicalData.architecture.targetPattern}</p>
                  <p className="text-sm text-white/60">Modern event-driven microservices with loose coupling</p>
                </div>
              </div>
            </div>

            {/* Architecture Layers */}
            <div>
              <h3 className="font-semibold text-xl mb-4">Architecture Layers</h3>
              <div className="space-y-3">
                {technicalData.architecture.layers.map((layer, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-semibold text-lg">{layer.name}</p>
                          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                            {layer.services} services
                          </span>
                        </div>
                        <p className="text-sm text-white/60">{layer.pattern}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm px-3 py-1.5 rounded-lg font-medium ${
                          layer.status === 'New Build' ? 'bg-green-500/20 text-green-400' :
                          layer.status === 'To Refactor' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {layer.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Modules Breakdown */}
            <div>
              <h3 className="font-semibold text-xl mb-4">Application Modules</h3>
              <div className="grid grid-cols-2 gap-4">
                {technicalData.architecture.modules.map((module, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-lg mb-1">{module.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2.5 py-1 rounded-full border ${getSeverityColor(module.complexity)}`}>
                            {module.complexity} Complexity
                          </span>
                          <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                            {module.javaVersion}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-xs text-white/50 mb-1">Lines of Code</p>
                        <p className="text-sm font-bold text-cyan-400">{module.linesOfCode.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50 mb-1">APIs</p>
                        <p className="text-sm font-bold text-purple-400">{module.apis}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50 mb-1">Dependencies</p>
                        <p className="text-sm font-bold text-orange-400">{module.dependencies}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Communication Patterns */}
            <div>
              <h3 className="font-semibold text-xl mb-4">Communication Patterns</h3>
              <div className="space-y-3">
                {technicalData.architecture.communicationPatterns.map((pattern, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-6">
                      <div className="flex-1">
                        <p className="font-semibold mb-1">{pattern.pattern}</p>
                        <p className="text-sm text-green-400">{pattern.recommendation}</p>
                      </div>
                      <div className="text-center min-w-[100px]">
                        <p className="text-2xl font-bold text-cyan-400">{pattern.usage}</p>
                        <p className="text-xs text-white/50">current usage</p>
                      </div>
                      <div className="text-center min-w-[100px]">
                        <p className="text-lg font-bold text-purple-400">{pattern.latency}</p>
                        <p className="text-xs text-white/50">latency</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-8">
            {/* Security Controls Comparison */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span>🔐</span>
                <span>Security Controls Transformation</span>
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-red-400">Current Controls</h3>
                  <div className="space-y-3">
                    {technicalData.security.currentControls.map((control, idx) => (
                      <div key={idx} className="bg-white/[0.03] border border-red-500/20 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-semibold">{control.control}</p>
                          <span className={`text-xs px-2.5 py-1 rounded-full border ${getSeverityColor(control.strength)}`}>
                            {control.strength}
                          </span>
                        </div>
                        <p className="text-sm text-white/60 mb-2">{control.method}</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          control.compliance === 'Compliant' ? 'bg-green-500/20 text-green-400' : 
                          control.compliance === 'Partial' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {control.compliance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-green-400">Target Controls</h3>
                  <div className="space-y-3">
                    {technicalData.security.targetControls.map((control, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-500/30 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-semibold">{control.control}</p>
                          <span className="text-xs px-2.5 py-1 rounded-full border border-green-500/30 bg-green-500/20 text-green-400">
                            {control.strength}
                          </span>
                        </div>
                        <p className="text-sm text-white/60 mb-2">{control.method}</p>
                        <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">
                          ✓ {control.compliance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Vulnerabilities */}
            <div>
              <h3 className="font-semibold text-xl mb-4">Identified Vulnerabilities</h3>
              <div className="space-y-3">
                {technicalData.security.vulnerabilities.map((vuln, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-mono px-2 py-1 bg-white/10 rounded">{vuln.id}</span>
                          <span className={`text-xs px-2.5 py-1 rounded-full border ${getSeverityColor(vuln.severity)}`}>
                            {vuln.severity}
                          </span>
                          <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400">
                            {vuln.category}
                          </span>
                          {vuln.cve !== 'N/A' && (
                            <span className="text-xs font-mono px-2 py-1 bg-orange-500/20 text-orange-400 rounded">
                              {vuln.cve}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/80">{vuln.description}</p>
                      </div>
                      <div className="text-right min-w-[120px]">
                        <span className={`text-xs px-3 py-1.5 rounded-lg font-medium ${
                          vuln.status === 'Remediated' ? 'bg-green-500/20 text-green-400' :
                          vuln.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {vuln.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Status */}
            <div>
              <h3 className="font-semibold text-xl mb-4">Compliance Frameworks</h3>
              <div className="grid grid-cols-2 gap-4">
                {technicalData.security.compliance.map((comp, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-lg mb-1">{comp.framework}</p>
                        <span className={`text-xs px-2.5 py-1 rounded-full border ${
                          comp.status === 'Compliant' ? getSeverityColor('low') :
                          comp.status === 'Partial' ? getSeverityColor('medium') :
                          comp.status === 'Not Required' ? 'bg-white/10 text-white/50 border-white/20' :
                          getSeverityColor('critical')
                        }`}>
                          {comp.status}
                        </span>
                      </div>
                      {comp.gaps > 0 && (
                        <div className="text-right">
                          <p className="text-2xl font-bold text-red-400">{comp.gaps}</p>
                          <p className="text-xs text-white/50">gaps</p>
                        </div>
                      )}
                    </div>
                    {comp.priority !== 'N/A' && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-xs text-white/50 mb-1">Priority Level</p>
                        <p className={`text-sm font-semibold ${
                          comp.priority === 'Critical' ? 'text-red-400' :
                          comp.priority === 'High' ? 'text-orange-400' :
                          'text-yellow-400'
                        }`}>
                          {comp.priority}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deployment' && (
          <div className="space-y-8">
            {/* Pipeline Comparison */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span>🚀</span>
                <span>CI/CD Pipeline Transformation</span>
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/[0.03] border border-orange-500/30 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4 text-orange-400">Current Pipeline</h3>
                  <div className="space-y-3">
                    {Object.entries(technicalData.deployment.currentPipeline).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-sm text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-semibold text-red-400">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-500/30 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4 text-green-400">Target Pipeline</h3>
                  <div className="space-y-3">
                    {Object.entries(technicalData.deployment.targetPipeline).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-sm text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-semibold text-green-400">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Environments */}
            <div>
              <h3 className="font-semibold text-xl mb-4">Deployment Environments</h3>
              <div className="space-y-3">
                {technicalData.deployment.environments.map((env, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-6">
                      <div className="flex-1">
                        <p className="font-semibold text-lg mb-1">{env.name}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded">
                            {env.instances} instances
                          </span>
                          <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                            {env.deployFreq}
                          </span>
                          {env.autoScaling && (
                            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                              ✓ Auto-scaling
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-green-400">{env.uptime}</p>
                        <p className="text-xs text-white/50">uptime</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CI/CD Tools */}
            <div>
              <h3 className="font-semibold text-xl mb-4">CI/CD Tooling Evolution</h3>
              <div className="space-y-3">
                {technicalData.deployment.cicdTools.map((tool, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-6">
                      <div className="flex-1">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs text-white/50 mb-1">Current</p>
                            <p className="font-semibold text-red-400">{tool.current}</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/50 mb-1">Target</p>
                            <p className="font-semibold text-green-400">{tool.target}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right min-w-[150px]">
                        <span className="text-xs px-3 py-1.5 rounded-lg bg-yellow-500/20 text-yellow-400 font-medium">
                          {tool.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-8">
            {/* Integration Touchpoints */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span>🔌</span>
                <span>Integration Touchpoints</span>
              </h2>
              <div className="space-y-4">
                {technicalData.integrations.touchpoints.map((integration, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-semibold text-lg">{integration.name}</p>
                          <span className={`text-xs px-2.5 py-1 rounded-full border ${getSeverityColor(integration.criticality)}`}>
                            {integration.criticality}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span>{integration.type}</span>
                          <span>•</span>
                          <span className="text-cyan-400">{integration.protocol}</span>
                          <span>•</span>
                          <span>{integration.frequency}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/10">
                      <div>
                        <p className="text-xs text-white/50 mb-1">Data Volume</p>
                        <p className="font-semibold text-cyan-400">{integration.dataVolume}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-white/50 mb-1">Required Changes</p>
                        <p className="font-semibold text-orange-400">{integration.changes}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Flow */}
            <div>
              <h3 className="font-semibold text-xl mb-4">Data Flow Architecture</h3>
              <div className="space-y-3">
                {technicalData.integrations.dataFlow.map((flow, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 flex items-center gap-4">
                        <div className="text-center min-w-[140px]">
                          <p className="text-sm font-semibold text-cyan-400">{flow.source}</p>
                          <p className="text-xs text-white/50">Source</p>
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                          <div className="flex-1 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded" />
                          <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">{flow.protocol}</span>
                          <div className="flex-1 h-1 bg-gradient-to-r from-purple-500 to-green-500 rounded" />
                        </div>
                        <div className="text-center min-w-[140px]">
                          <p className="text-sm font-semibold text-green-400">{flow.destination}</p>
                          <p className="text-xs text-white/50">Destination</p>
                        </div>
                      </div>
                      <div className="text-right min-w-[120px]">
                        <p className="text-xs text-white/50 mb-1">Encryption</p>
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                          🔒 {flow.encryption}
                        </span>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <p className="text-xs text-white/50 mb-1">Volume</p>
                        <p className="text-sm font-semibold text-orange-400">{flow.volume}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cloud' && (
          <div className="space-y-8">
            {/* Cloud Strategy Overview */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span>☁️</span>
                <span>Azure Cloud Strategy</span>
              </h2>
              
              {/* Regions */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4">Multi-Region Deployment</h3>
                <div className="grid grid-cols-3 gap-4">
                  {technicalData.cloud.regions.map((region, idx) => (
                    <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-lg mb-1">{region.region}</p>
                          <span className={`text-xs px-2.5 py-1 rounded-full ${
                            region.role === 'Primary' ? 'bg-green-500/20 text-green-400' :
                            region.role === 'DR/Backup' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-cyan-500/20 text-cyan-400'
                          }`}>
                            {region.role}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/50">Services</span>
                          <span className="font-semibold text-cyan-400">{region.services}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50">Monthly Cost</span>
                          <span className="font-semibold text-orange-400">{region.cost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50">Compliance</span>
                          <span className="font-semibold text-purple-400">{region.compliance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Azure Services */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Azure Services Utilization</h3>
                <div className="space-y-3">
                  {technicalData.cloud.services.map((service, idx) => (
                    <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-6">
                        <div className="flex-1">
                          <p className="font-semibold mb-1">{service.service}</p>
                          <p className="text-sm text-white/60">{service.purpose}</p>
                        </div>
                        <div className="text-center min-w-[100px]">
                          <p className="text-sm font-semibold text-cyan-400">{service.instances}</p>
                          <p className="text-xs text-white/50">instances</p>
                        </div>
                        <div className="text-center min-w-[100px]">
                          <p className="text-lg font-bold text-orange-400">{service.cost}</p>
                          <p className="text-xs text-white/50">monthly</p>
                        </div>
                        <div className="text-right min-w-[120px]">
                          <p className="text-sm font-semibold text-purple-400">{service.utilization}</p>
                          <p className="text-xs text-white/50">utilization</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cost Analysis */}
            <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border border-green-500/30 rounded-xl p-6">
              <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
                <span>💰</span>
                <span>Cost Optimization Analysis</span>
              </h3>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-white/60 mb-1">Current Monthly</p>
                  <p className="text-3xl font-bold text-red-400">{technicalData.cloud.costAnalysis.currentMonthly}</p>
                </div>
                <div>
                  <p className="text-sm text-white/60 mb-1">Target Monthly</p>
                  <p className="text-3xl font-bold text-cyan-400">{technicalData.cloud.costAnalysis.targetMonthly}</p>
                </div>
                <div>
                  <p className="text-sm text-white/60 mb-1">Monthly Savings</p>
                  <p className="text-3xl font-bold text-green-400">{technicalData.cloud.costAnalysis.savings}</p>
                </div>
                <div>
                  <p className="text-sm text-white/60 mb-1">Savings %</p>
                  <p className="text-3xl font-bold text-green-400">{technicalData.cloud.costAnalysis.savingsPercentage}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm text-green-400">
                  💡 {technicalData.cloud.costAnalysis.optimizationPotential}
                </p>
              </div>
            </div>

            {/* Data Residency */}
            <div>
              <h3 className="font-semibold text-xl mb-4">Data Residency & Compliance</h3>
              <div className="space-y-3">
                {technicalData.cloud.dataResidency.map((residency, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-semibold">{residency.region}</p>
                          <span className={`text-xs px-2.5 py-1 rounded-full ${
                            residency.status === 'Compliant' ? 'bg-green-500/20 text-green-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {residency.status}
                          </span>
                        </div>
                        <p className="text-sm text-white/60">{residency.requirement}</p>
                      </div>
                      <div className="text-right min-w-[200px]">
                        <p className="text-sm font-semibold text-cyan-400">{residency.storage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disaster Recovery */}
            <div>
              <h3 className="font-semibold text-xl mb-4">Disaster Recovery Improvements</h3>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(technicalData.cloud.disasterRecovery).map(([key, value]) => (
                  <div key={key} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <p className="text-sm text-white/60 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="text-lg font-bold text-green-400">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="space-y-8">
            {/* Data Volume Metrics */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span>💾</span>
                <span>Data Analysis & Migration</span>
              </h2>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {Object.entries(technicalData.dataAnalysis.volumeMetrics).map(([key, value]) => (
                  <div key={key} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 text-center">
                    <p className="text-xs text-white/40 uppercase mb-2">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="text-3xl font-bold text-cyan-400">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div>
              <h3 className="font-semibold text-xl mb-4">Database Inventory & Migration</h3>
              <div className="space-y-3">
                {technicalData.dataAnalysis.databases.map((db, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="font-semibold text-lg mb-2">{db.name}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-red-400">{db.type}</span>
                          <span className="text-white/50">→</span>
                          <span className="text-green-400">{db.migration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 pt-3 border-t border-white/10">
                      <div className="text-center">
                        <p className="text-xs text-white/50 mb-1">Size</p>
                        <p className="font-semibold text-cyan-400">{db.size}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-white/50 mb-1">Records</p>
                        <p className="font-semibold text-purple-400">{db.records}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-white/50 mb-1">TPS</p>
                        <p className="font-semibold text-orange-400">{db.tps.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-white/50 mb-1">Status</p>
                        <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">
                          Planning
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Migration Strategy */}
            <div>
              <h3 className="font-semibold text-xl mb-4">Phased Migration Strategy</h3>
              <div className="space-y-3">
                {technicalData.dataAnalysis.migrationStrategy.map((phase, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xl font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg mb-1">{phase.phase}</p>
                        <p className="text-sm text-white/60">{phase.approach}</p>
                      </div>
                      <div className="text-center min-w-[100px]">
                        <p className="text-xs text-white/50 mb-1">Downtime</p>
                        <p className="font-semibold text-orange-400">{phase.downtime}</p>
                      </div>
                      <div className="text-right min-w-[100px]">
                        <span className={`text-xs px-3 py-1.5 rounded-lg border ${getSeverityColor(phase.riskLevel)}`}>
                          {phase.riskLevel} Risk
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Quality */}
            <div>
              <h3 className="font-semibold text-xl mb-4">Data Quality Assessment</h3>
              <div className="space-y-3">
                {technicalData.dataAnalysis.dataQuality.map((quality, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                    <div className="flex items-start gap-6 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-semibold text-lg">{quality.aspect}</p>
                          <span className={`text-lg font-bold ${getScoreColor(quality.score)}`}>
                            {quality.score}%
                          </span>
                        </div>
                        <p className="text-sm text-white/60 mb-2">{quality.issues}</p>
                        <p className="text-sm text-green-400">💡 {quality.remediation}</p>
                      </div>
                      <div className="w-24">
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              quality.score >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                              quality.score >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                              'bg-gradient-to-r from-red-500 to-pink-500'
                            }`}
                            style={{ width: `${quality.score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-8">
            {/* Performance Metrics Comparison */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span>⚡</span>
                <span>Performance Transformation</span>
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/[0.03] border border-red-500/30 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4 text-red-400">Current Metrics</h3>
                  <div className="space-y-3">
                    {Object.entries(technicalData.performance.currentMetrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-sm text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-semibold text-red-400">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-500/30 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4 text-green-400">Target Metrics</h3>
                  <div className="space-y-3">
                    {Object.entries(technicalData.performance.targetMetrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-sm text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-semibold text-green-400">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottlenecks */}
            <div>
              <h3 className="font-semibold text-xl mb-4">Identified Performance Bottlenecks</h3>
              <div className="space-y-3">
                {technicalData.performance.bottlenecks.map((bottleneck, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-semibold text-lg">{bottleneck.component}</p>
                          <span className={`text-xs px-2.5 py-1 rounded-full border ${getSeverityColor(bottleneck.impact)}`}>
                            {bottleneck.impact} Impact
                          </span>
                        </div>
                        <p className="text-sm text-green-400 mb-2">💡 {bottleneck.recommendation}</p>
                      </div>
                      <div className="text-right min-w-[100px]">
                        <p className="text-2xl font-bold text-red-400">{bottleneck.avgDelay}</p>
                        <p className="text-xs text-white/50">avg delay</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scalability Improvements */}
            <div>
              <h3 className="font-semibold text-xl mb-4">Scalability Improvements</h3>
              <div className="space-y-3">
                {technicalData.performance.scalability.map((scale, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-6">
                      <div className="flex-1">
                        <p className="font-semibold text-lg mb-3">{scale.aspect}</p>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs text-white/50 mb-1">Current</p>
                            <p className="text-sm font-semibold text-red-400">{scale.current}</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/50 mb-1">Target</p>
                            <p className="text-sm font-semibold text-green-400">{scale.target}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right min-w-[120px]">
                        <p className="text-xs text-white/50 mb-1">Improvement</p>
                        <p className="text-2xl font-bold text-green-400">{scale.improvement}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span>⚠️</span>
                <span>Technical Risk Assessment</span>
              </h2>
              <div className="space-y-4">
                {technicalData.risks.technical.map((risk, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                    <div className="flex items-start gap-6 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xl font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-xl mb-2">{risk.risk}</p>
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-xs px-2.5 py-1 rounded-full border ${
                            risk.probability === 'High' ? getSeverityColor('high') :
                            risk.probability === 'Medium' ? getSeverityColor('medium') :
                            getSeverityColor('low')
                          }`}>
                            {risk.probability} Probability
                          </span>
                          <span className={`text-xs px-2.5 py-1 rounded-full border ${getSeverityColor(risk.impact)}`}>
                            {risk.impact} Impact
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4 mb-3">
                      <p className="text-xs text-white/50 uppercase mb-1">Mitigation Strategy</p>
                      <p className="text-sm text-green-400">{risk.mitigation}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white/50 mb-1">Risk Owner</p>
                        <p className="text-sm font-semibold text-cyan-400">{risk.owner}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => navigate(`/stage/${projectId}/${stageId}`)}
          className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-all"
        >
          Back to Stage
        </button>
        <button className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-medium hover:shadow-2xl hover:shadow-orange-500/40 transition-all">
          Export Technical Report
        </button>
      </div>
    </div>
  );
};

export default TechnicalAssessmentViewer;
