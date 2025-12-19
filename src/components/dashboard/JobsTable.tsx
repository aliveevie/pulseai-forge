import { Job } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

interface JobsTableProps {
  jobs: Job[];
}

const statusColors = {
  queued: 'bg-info/20 text-info border-info/30',
  running: 'bg-primary/20 text-primary border-primary/30 animate-pulse',
  completed: 'bg-success/20 text-success border-success/30',
  failed: 'bg-destructive/20 text-destructive border-destructive/30',
};

const typeIcons = {
  llm: '🧠',
  embeddings: '📊',
  image: '🖼️',
  speech: '🎤',
};

export function JobsTable({ jobs }: JobsTableProps) {
  return (
    <div className="glass rounded-xl border border-border/50 overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <h3 className="text-lg font-semibold text-foreground">Recent Jobs</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Job</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Model</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Cost</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">{job.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{job.id}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-lg mr-2">{typeIcons[job.type]}</span>
                  <span className="text-sm text-muted-foreground capitalize">{job.type}</span>
                </td>
                <td className="p-4">
                  <code className="text-sm text-foreground bg-muted/50 px-2 py-1 rounded font-mono">{job.model}</code>
                </td>
                <td className="p-4">
                  <Badge variant="outline" className={statusColors[job.status]}>
                    {job.status}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <span className="font-mono text-foreground">${job.cost.toFixed(2)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
