import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockJobs, Job } from '@/data/mockData';

const statusColors = {
  queued: 'bg-info/20 text-info border-info/30',
  running: 'bg-primary/20 text-primary border-primary/30',
  completed: 'bg-success/20 text-success border-success/30',
  failed: 'bg-destructive/20 text-destructive border-destructive/30',
};

const typeIcons = {
  llm: '🧠',
  embeddings: '📊',
  image: '🖼️',
  speech: '🎤',
};

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<Job['status'] | 'all'>('all');

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || job.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Jobs</h1>
          <p className="text-muted-foreground">Manage and monitor your AI workloads</p>
        </div>
        <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          New Job
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass border-border/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {(['all', 'running', 'queued', 'completed', 'failed'] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
              className={filter === status ? 'bg-primary text-primary-foreground' : ''}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="glass rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-all duration-300 hover:glow-sm cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{typeIcons[job.type]}</span>
                <Badge variant="outline" className={statusColors[job.status]}>
                  {job.status}
                </Badge>
              </div>
              <span className="text-lg font-bold font-mono text-foreground">${job.cost.toFixed(2)}</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{job.name}</h3>
            <p className="text-sm text-muted-foreground font-mono mb-4">{job.id}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Model</span>
                <code className="text-foreground bg-muted/50 px-2 py-0.5 rounded">{job.model}</code>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GPU</span>
                <span className="text-foreground">{job.gpuId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="text-foreground font-mono">{Math.floor(job.duration / 60)}m {job.duration % 60}s</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
