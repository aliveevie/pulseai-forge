import { Bot, Activity, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { mockAgents } from '@/data/mockData';

const statusColors = {
  active: 'bg-success/20 text-success border-success/30',
  idle: 'bg-warning/20 text-warning border-warning/30',
  offline: 'bg-muted/50 text-muted-foreground border-muted',
};

const specialtyIcons = {
  llm: '🧠',
  embeddings: '📊',
  image: '🖼️',
  speech: '🎤',
  general: '⚡',
};

export default function Agents() {
  const activeCount = mockAgents.filter(a => a.status === 'active').length;
  const totalJobs = mockAgents.reduce((sum, a) => sum + a.jobsProcessed, 0);
  const avgSuccess = mockAgents.reduce((sum, a) => sum + a.successRate, 0) / mockAgents.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Compute Agents</h1>
        <p className="text-muted-foreground">Autonomous agents managing your AI workloads</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Bot className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Total Agents</span>
          </div>
          <p className="text-3xl font-bold font-mono text-foreground">{mockAgents.length}</p>
        </div>
        <div className="glass rounded-xl border border-success/30 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="h-5 w-5 text-success" />
            <span className="text-sm text-muted-foreground">Active</span>
          </div>
          <p className="text-3xl font-bold font-mono text-foreground">{activeCount}</p>
        </div>
        <div className="glass rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-5 w-5 text-info" />
            <span className="text-sm text-muted-foreground">Jobs Processed</span>
          </div>
          <p className="text-3xl font-bold font-mono text-foreground">{totalJobs.toLocaleString()}</p>
        </div>
        <div className="glass rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="h-5 w-5 text-warning" />
            <span className="text-sm text-muted-foreground">Avg Success Rate</span>
          </div>
          <p className="text-3xl font-bold font-mono text-foreground">{avgSuccess.toFixed(1)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAgents.map((agent) => (
          <div
            key={agent.id}
            className={`glass rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] ${
              agent.status === 'active' ? 'border-success/30 glow-sm' : 'border-border/50'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${
                  agent.status === 'active' ? 'bg-success/20' :
                  agent.status === 'idle' ? 'bg-warning/20' : 'bg-muted/50'
                }`}>
                  <Bot className={`h-6 w-6 ${
                    agent.status === 'active' ? 'text-success' :
                    agent.status === 'idle' ? 'text-warning' : 'text-muted-foreground'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{agent.name}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{agent.id}</p>
                </div>
              </div>
              <Badge variant="outline" className={statusColors[agent.status]}>
                {agent.status}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Specialty</span>
                <span className="flex items-center gap-2">
                  <span>{specialtyIcons[agent.specialty]}</span>
                  <span className="text-foreground capitalize">{agent.specialty}</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Jobs Processed</span>
                <span className="text-foreground font-mono">{agent.jobsProcessed.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Success Rate</span>
                <span className={`font-mono ${agent.successRate >= 98 ? 'text-success' : 'text-foreground'}`}>
                  {agent.successRate}%
                </span>
              </div>
              {agent.currentJob && (
                <div className="pt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Currently processing</p>
                  <code className="text-sm text-primary">{agent.currentJob}</code>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
