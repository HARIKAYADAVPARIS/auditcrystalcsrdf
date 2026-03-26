
import React, { useState } from 'react';
import { ApiKey, Webhook, AuditResult } from '../types';
import { Key, Globe, Code2, Terminal, Copy, Check, Plus, Trash2, ExternalLink, Zap, Shield, Server, Database, Network, SearchCheck, RefreshCcw } from 'lucide-react';

interface IntegrationHubProps {
  data: AuditResult;
}

const IntegrationHub: React.FC<IntegrationHubProps> = ({ data }) => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: '1', key: 'ac_live_8f2k9l3m1n0p7q5r', name: 'Production ERP Sync', created: '2026-03-20', lastUsed: '2026-03-25' }
  ]);
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    { id: '1', url: 'https://api.corporate-erp.com/webhooks/audit', events: ['audit.completed'], status: 'active', lastFired: '2026-03-25' }
  ]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'keys' | 'webhooks' | 'docs'>('keys');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const generateKey = () => {
    const newKey: ApiKey = {
      id: Math.random().toString(36).substr(2, 9),
      key: `ac_live_${Math.random().toString(36).substr(2, 16)}`,
      name: 'New Integration Key',
      created: new Date().toISOString().split('T')[0]
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const addWebhook = () => {
    const newWebhook: Webhook = {
      id: Math.random().toString(36).substr(2, 9),
      url: 'https://your-api.com/webhook',
      events: ['audit.completed'],
      status: 'active'
    };
    setWebhooks([...webhooks, newWebhook]);
  };

  const curlExample = `curl -X POST https://api.auditcrystal.ai/v1/audit \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "company": "${data.companyName}",
    "frameworks": ["ESRS", "GRI"],
    "deep_scan": true
  }'`;

  const pythonExample = `import requests

url = "https://api.auditcrystal.ai/v1/audit"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "company": "${data.companyName}",
    "frameworks": ["ESRS", "GRI"]
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 bg-slate-900 text-white">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <Network size={14} /> Institutional API Strategy
            </div>
            <h2 className="text-3xl font-black tracking-tight">Integration Hub</h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Connect AuditCrystal to your ERP, GRC, or ESG data lake. Automate assurance workflows with our high-performance REST API and real-time webhooks.
            </p>
          </div>
          <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
            <button 
              onClick={() => setActiveTab('keys')}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === 'keys' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              API Keys
            </button>
            <button 
              onClick={() => setActiveTab('webhooks')}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === 'webhooks' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Webhooks
            </button>
            <button 
              onClick={() => setActiveTab('docs')}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === 'docs' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              API Docs
            </button>
          </div>
        </div>
      </div>

      <div className="p-8">
        {activeTab === 'keys' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-slate-900">API Access Keys</h3>
                <p className="text-xs text-slate-500 font-medium">Use these keys to authenticate your requests to the AuditCrystal API.</p>
              </div>
              <button 
                onClick={generateKey}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <Plus size={14} /> Create New Key
              </button>
            </div>

            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div key={key.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200">
                      <Key size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900">{key.name}</div>
                      <div className="flex items-center gap-3 mt-1">
                        <code className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {key.key.replace(/(.{4}).*(.{4})/, '$1****************$2')}
                        </code>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Created {key.created}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleCopy(key.key, key.id)}
                      className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-indigo-600"
                    >
                      {copiedKey === key.id ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-all text-slate-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Terminal size={14} /> cURL Example
                </div>
                <div className="relative group">
                  <pre className="p-6 bg-slate-950 text-slate-300 rounded-2xl text-xs font-mono overflow-x-auto border border-slate-800 shadow-2xl">
                    {curlExample}
                  </pre>
                  <button 
                    onClick={() => handleCopy(curlExample, 'curl')}
                    className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"
                  >
                    {copiedKey === 'curl' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Code2 size={14} /> Python SDK
                </div>
                <div className="relative group">
                  <pre className="p-6 bg-slate-950 text-slate-300 rounded-2xl text-xs font-mono overflow-x-auto border border-slate-800 shadow-2xl">
                    {pythonExample}
                  </pre>
                  <button 
                    onClick={() => handleCopy(pythonExample, 'python')}
                    className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"
                  >
                    {copiedKey === 'python' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'webhooks' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-slate-900">Outgoing Webhooks</h3>
                <p className="text-xs text-slate-500 font-medium">Receive real-time notifications when audits are completed or scores change.</p>
              </div>
              <button 
                onClick={addWebhook}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <Plus size={14} /> Add Webhook
              </button>
            </div>

            <div className="space-y-4">
              {webhooks.map((webhook) => (
                <div key={webhook.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200">
                        <Globe size={20} className="text-indigo-500" />
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900">{webhook.url}</div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[9px] font-black uppercase tracking-widest">Active</span>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last fired: {webhook.lastFired || 'Never'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-indigo-600">
                        <RefreshCcw size={16} />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-all text-slate-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {webhook.events.map(event => (
                      <span key={event} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-black text-slate-600 uppercase tracking-widest">
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-6">
              <div className="p-3 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-200">
                <Shield size={24} className="text-white" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest">Webhook Security</h4>
                <p className="text-xs text-indigo-700/70 leading-relaxed font-medium">
                  All webhook payloads are signed with an <code>X-AuditCrystal-Signature</code> header. Use your Webhook Secret to verify the HMAC-SHA256 signature and ensure the request originated from our servers.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900">API Reference</h3>
                <div className="space-y-4">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-emerald-500 text-white rounded text-[10px] font-black uppercase">POST</span>
                        <code className="text-sm font-black text-slate-900">/v1/audit</code>
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Initiate Audit</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Upload a document or provide a company name to trigger a deep-scan audit. Returns an <code>audit_id</code> for status polling.
                    </p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-blue-500 text-white rounded text-[10px] font-black uppercase">GET</span>
                        <code className="text-sm font-black text-slate-900">/v1/audit/&#123;id&#125;</code>
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Retrieve Result</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Fetch the full structured audit result, including materiality matrix, ESRS gaps, and financial impact analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-slate-900 rounded-2xl text-white space-y-4">
                <h4 className="text-[10px] font-black text-amber-400 uppercase tracking-widest">System Status</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">API Uptime</span>
                    <span className="text-xs font-black text-emerald-400">99.99%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Avg Latency</span>
                    <span className="text-xs font-black text-emerald-400">142ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Rate Limit</span>
                    <span className="text-xs font-black text-amber-400">10k / min</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    <ExternalLink size={14} /> Full Status Page
                  </button>
                </div>
              </div>

              <div className="p-6 border border-slate-100 rounded-2xl space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Integrations</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-pointer">
                    <Server size={20} className="text-slate-600" />
                    <span className="text-[8px] font-black uppercase">SAP S/4HANA</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-pointer">
                    <Database size={20} className="text-slate-600" />
                    <span className="text-[8px] font-black uppercase">Snowflake</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-pointer">
                    <Zap size={20} className="text-slate-600" />
                    <span className="text-[8px] font-black uppercase">ServiceNow</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-pointer">
                    <SearchCheck size={20} className="text-slate-600" />
                    <span className="text-[8px] font-black uppercase">Workiva</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegrationHub;
