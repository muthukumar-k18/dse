import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Sankey, ResponsiveContainer, Tooltip } from 'recharts';

const Code360 = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Dependencies data
  const externalAPIs = [
    { name: 'Payment Gateway API', provider: 'Stripe', type: 'REST', calls: 15420, status: 'active', risk: 'low' },
    { name: 'Authentication Service', provider: 'Auth0', type: 'OAuth 2.0', calls: 45230, status: 'active', risk: 'medium' },
    { name: 'Email Service', provider: 'SendGrid', type: 'REST', calls: 8940, status: 'active', risk: 'low' },
    { name: 'SMS Gateway', provider: 'Twilio', type: 'REST', calls: 2340, status: 'active', risk: 'low' },
    { name: 'Analytics API', provider: 'Google Analytics', type: 'REST', calls: 12560, status: 'deprecated', risk: 'high' },
    { name: 'Map Service', provider: 'Google Maps', type: 'REST', calls: 5670, status: 'active', risk: 'low' },
  ];

  const dataSources = [
    { name: 'Primary Database', type: 'PostgreSQL 13', tables: 87, size: '245 GB', connections: 50, status: 'healthy' },
    { name: 'Cache Layer', type: 'Redis', tables: 0, size: '12 GB', connections: 120, status: 'healthy' },
    { name: 'Document Store', type: 'MongoDB', tables: 23, size: '56 GB', connections: 15, status: 'healthy' },
    { name: 'Data Warehouse', type: 'Snowflake', tables: 145, size: '1.2 TB', connections: 8, status: 'healthy' },
    { name: 'Legacy Oracle DB', type: 'Oracle 11g', tables: 234, size: '780 GB', connections: 25, status: 'deprecated' },
  ];

  const mcpConnections = [
    { name: 'CI/CD Pipeline', type: 'Jenkins', integrations: 'GitHub, Docker, K8s', frequency: 'On commit', status: 'active' },
    { name: 'Monitoring', type: 'Datadog', integrations: 'Logs, Metrics, Traces', frequency: 'Real-time', status: 'active' },
    { name: 'Secrets Manager', type: 'HashiCorp Vault', integrations: 'All services', frequency: 'On demand', status: 'active' },
    { name: 'Service Mesh', type: 'Istio', integrations: 'Kubernetes', frequency: 'Continuous', status: 'active' },
    { name: 'Message Queue', type: 'RabbitMQ', integrations: '12 services', frequency: 'Asynchronous', status: 'active' },
  ];

  const externalLibraries = [
    { name: 'Spring Framework', version: '5.3.20', modules: 45, lastUpdate: '3 months ago', vulnerabilities: 0 },
    { name: 'Hibernate ORM', version: '5.6.9', modules: 12, lastUpdate: '2 months ago', vulnerabilities: 1 },
    { name: 'Jackson JSON', version: '2.13.3', modules: 8, lastUpdate: '1 month ago', vulnerabilities: 0 },
    { name: 'Apache Commons', version: '3.12.0', modules: 23, lastUpdate: '4 months ago', vulnerabilities: 2 },
    { name: 'Log4j', version: '2.17.2', modules: 5, lastUpdate: '5 months ago', vulnerabilities: 0 },
  ];

  const cloudServices = [
    { name: 'Azure VMs', type: 'Compute', instances: 24, cost: '$4,560/mo', usage: '78%' },
    { name: 'Azure Blob Storage', type: 'Storage', instances: 8, cost: '$890/mo', usage: '45%' },
    { name: 'Azure SQL Database', type: 'Database', instances: 6, cost: '$3,200/mo', usage: '92%' },
    { name: 'Azure Functions', type: 'Serverless', instances: 45, cost: '$234/mo', usage: '34%' },
    { name: 'Azure CDN', type: 'CDN', instances: 3, cost: '$567/mo', usage: '67%' },
  ];

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'healthy': return 'text-green-400 bg-green-500/20';
      case 'deprecated': return 'text-red-400 bg-red-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* DSE 2.0 Logo Header */}
      <div className="mb-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <span className="text-2xl text-red-500">◈</span>
          <span className="text-xl font-bold">DSE 2.0</span>
        </button>
      </div>

      {/* Header */}
      <div className="mb-8 pb-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Code 360 - Dependency Analysis
            </h1>
            <p className="text-white/50 text-sm">Complete visualization of code dependencies and external integrations</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all flex items-center gap-2 border border-white/10"
          >
            <span>←</span>
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6">
            <div className="text-4xl mb-3">🔗</div>
            <p className="text-3xl font-bold mb-1">{externalAPIs.length}</p>
            <p className="text-sm text-white/50">External APIs</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
            <div className="text-4xl mb-3">🗄️</div>
            <p className="text-3xl font-bold mb-1">{dataSources.length}</p>
            <p className="text-sm text-white/50">Data Sources</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6">
            <div className="text-4xl mb-3">⚙️</div>
            <p className="text-3xl font-bold mb-1">{mcpConnections.length}</p>
            <p className="text-sm text-white/50">MCP Services</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-6">
            <div className="text-4xl mb-3">📚</div>
            <p className="text-3xl font-bold mb-1">{externalLibraries.length}</p>
            <p className="text-sm text-white/50">Libraries</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl p-6">
            <div className="text-4xl mb-3">☁️</div>
            <p className="text-3xl font-bold mb-1">{cloudServices.length}</p>
            <p className="text-sm text-white/50">Cloud Services</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === 'all' 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' 
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            All Dependencies
          </button>
          <button
            onClick={() => setSelectedCategory('apis')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === 'apis' 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' 
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            External APIs
          </button>
          <button
            onClick={() => setSelectedCategory('data')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === 'data' 
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' 
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Data Sources
          </button>
          <button
            onClick={() => setSelectedCategory('mcp')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === 'mcp' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            MCP Services
          </button>
          <button
            onClick={() => setSelectedCategory('libraries')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === 'libraries' 
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' 
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Libraries
          </button>
          <button
            onClick={() => setSelectedCategory('cloud')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === 'cloud' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' 
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Cloud Services
          </button>
        </div>

        {/* External APIs Section */}
        {(selectedCategory === 'all' || selectedCategory === 'apis') && (
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">🔗</span>
              <span>External APIs</span>
            </h2>
            <div className="space-y-3">
              {externalAPIs.map((api, idx) => (
                <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:bg-white/[0.05] transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{api.name}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(api.status)}`}>
                          {api.status}
                        </span>
                        <span className={`text-xs px-3 py-1 rounded-full ${getRiskColor(api.risk)}`}>
                          {api.risk} risk
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-white/60">
                        <span>Provider: <span className="text-cyan-400">{api.provider}</span></span>
                        <span>Type: <span className="text-purple-400">{api.type}</span></span>
                        <span>API Calls: <span className="text-green-400">{api.calls.toLocaleString()}/day</span></span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Sources Section */}
        {(selectedCategory === 'all' || selectedCategory === 'data') && (
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">🗄️</span>
              <span>Data Sources</span>
            </h2>
            <div className="space-y-3">
              {dataSources.map((source, idx) => (
                <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:bg-white/[0.05] transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{source.name}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(source.status)}`}>
                          {source.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-white/60">
                        <span>Type: <span className="text-purple-400">{source.type}</span></span>
                        {source.tables > 0 && <span>Tables: <span className="text-cyan-400">{source.tables}</span></span>}
                        <span>Size: <span className="text-green-400">{source.size}</span></span>
                        <span>Active Connections: <span className="text-orange-400">{source.connections}</span></span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm">
                      View Schema
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MCP Connections Section */}
        {(selectedCategory === 'all' || selectedCategory === 'mcp') && (
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">⚙️</span>
              <span>MCP Services & Integrations</span>
            </h2>
            <div className="space-y-3">
              {mcpConnections.map((mcp, idx) => (
                <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:bg-white/[0.05] transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{mcp.name}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(mcp.status)}`}>
                          {mcp.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-white/60">
                        <span>Type: <span className="text-green-400">{mcp.type}</span></span>
                        <span>Integrations: <span className="text-cyan-400">{mcp.integrations}</span></span>
                        <span>Frequency: <span className="text-purple-400">{mcp.frequency}</span></span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors text-sm">
                      Configure
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* External Libraries Section */}
        {(selectedCategory === 'all' || selectedCategory === 'libraries') && (
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">📚</span>
              <span>External Libraries & Dependencies</span>
            </h2>
            <div className="space-y-3">
              {externalLibraries.map((lib, idx) => (
                <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:bg-white/[0.05] transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{lib.name}</h3>
                        <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                          v{lib.version}
                        </span>
                        {lib.vulnerabilities > 0 && (
                          <span className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-400">
                            {lib.vulnerabilities} vulnerabilities
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-white/60">
                        <span>Modules: <span className="text-orange-400">{lib.modules}</span></span>
                        <span>Last Update: <span className="text-cyan-400">{lib.lastUpdate}</span></span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors text-sm">
                      Check Updates
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cloud Services Section */}
        {(selectedCategory === 'all' || selectedCategory === 'cloud') && (
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">☁️</span>
              <span>Cloud Services</span>
            </h2>
            <div className="space-y-3">
              {cloudServices.map((service, idx) => (
                <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:bg-white/[0.05] transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                          {service.type}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-3 bg-white/[0.02] rounded-lg">
                          <p className="text-xs text-white/40 mb-1">Instances</p>
                          <p className="text-sm font-semibold text-cyan-400">{service.instances}</p>
                        </div>
                        <div className="p-3 bg-white/[0.02] rounded-lg">
                          <p className="text-xs text-white/40 mb-1">Monthly Cost</p>
                          <p className="text-sm font-semibold text-green-400">{service.cost}</p>
                        </div>
                        <div className="p-3 bg-white/[0.02] rounded-lg">
                          <p className="text-xs text-white/40 mb-1">Usage</p>
                          <p className="text-sm font-semibold text-orange-400">{service.usage}</p>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm ml-4">
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dependency Health Summary */}
        <div className="bg-gradient-to-r from-orange-900/40 via-red-900/40 to-orange-900/40 border border-orange-500/30 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">📊 Dependency Health Summary</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-black/30 rounded-xl">
              <p className="text-sm text-white/60 mb-2">Total Dependencies</p>
              <p className="text-3xl font-bold text-cyan-400">{externalAPIs.length + dataSources.length + mcpConnections.length + externalLibraries.length + cloudServices.length}</p>
            </div>
            <div className="p-4 bg-black/30 rounded-xl">
              <p className="text-sm text-white/60 mb-2">Active Integrations</p>
              <p className="text-3xl font-bold text-green-400">24</p>
            </div>
            <div className="p-4 bg-black/30 rounded-xl">
              <p className="text-sm text-white/60 mb-2">Deprecated Items</p>
              <p className="text-3xl font-bold text-red-400">2</p>
            </div>
            <div className="p-4 bg-black/30 rounded-xl">
              <p className="text-sm text-white/60 mb-2">Security Alerts</p>
              <p className="text-3xl font-bold text-yellow-400">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Code360;
