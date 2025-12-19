import { useEffect, useState, useRef } from 'react';
import { Terminal, Bot, Server, Zap, Globe, Cpu } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface LogEntry {
  id: string;
  timestamp: string;
  agentName: string;
  action: 'ANALYZING' | 'MATCHING' | 'DISPATCHING' | 'OPTIMIZING' | 'COMPLETED';
  details: string;
  type: 'info' | 'success' | 'warning' | 'primary';
}

const AGENT_NAMES = ['Alpha-1', 'Beta-2', 'Gamma-3', 'Delta-4', 'Epsilon-5'];
const JOB_TYPES = ['LLM Inference', 'Fine-tuning', 'Embeddings', 'Image Gen'];
const NODES = ['Node-Alpha (A100)', 'Node-Beta (H100)', 'Node-Gamma (RTX 4090)', 'Node-Delta (L40S)'];

export function AgentOrchestrator() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const agent = AGENT_NAMES[Math.floor(Math.random() * AGENT_NAMES.length)];
    
    const scenarios: Array<Omit<LogEntry, 'id' | 'timestamp' | 'agentName'>> = [
      { action: 'ANALYZING', details: `Evaluating complexity for incoming ${JOB_TYPES[Math.floor(Math.random() * JOB_TYPES.length)]} job`, type: 'info' },
      { action: 'MATCHING', details: `Found optimal hardware: ${NODES[Math.floor(Math.random() * NODES.length)]} (Cost/Perf: 0.94)`, type: 'primary' },
      { action: 'DISPATCHING', details: `Deploying container payload to decentralized node`, type: 'warning' },
      { action: 'OPTIMIZING', details: `Re-routing traffic to minimize latency (<45ms)`, type: 'info' },
      { action: 'COMPLETED', details: `Job execution verified. Proof of Compute generated on-chain`, type: 'success' },
    ];

    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    const id = Math.random().toString(36).substr(2, 9);

    setLogs(prev => {
      const newLogs = [...prev, { id, timestamp: timeString, agentName: agent, ...scenario }];
      return newLogs.slice(-20); // Keep last 20 logs
    });
  };

  useEffect(() => {
    // Initial logs
    addLog();
    addLog();
    addLog();

    const interval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance to add a log every interval
        addLog();
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass rounded-xl border border-border/50 flex flex-col h-[400px] overflow-hidden">
      <div className="p-4 border-b border-border/50 flex items-center justify-between bg-card/50">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Live Agent Orchestration</h2>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
            LIVE
          </Badge>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4 font-mono text-sm relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none" />
        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
              <span className="text-muted-foreground whitespace-nowrap text-xs py-1">[{log.timestamp}]</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                   <span className="text-primary font-bold">{log.agentName}</span>
                   <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                     log.type === 'info' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                     log.type === 'primary' ? 'bg-primary/10 border-primary/20 text-primary' :
                     log.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                     'bg-green-500/10 border-green-500/20 text-green-400'
                   }`}>
                     {log.action}
                   </span>
                </div>
                <p className="text-muted-foreground">{log.details}</p>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-border/50 bg-muted/20 flex gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Bot className="w-3.5 h-3.5" />
          <span>5 Agents Active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5" />
          <span>Global Grid</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-yellow-500" />
          <span>Real-time</span>
        </div>
      </div>
    </div>
  );
}
