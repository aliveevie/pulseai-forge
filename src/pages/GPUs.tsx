import { Cpu, MapPin, DollarSign, HardDrive } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { mockGPUs } from '@/data/mockData';

const statusColors = {
  available: 'bg-success/20 text-success border-success/30',
  busy: 'bg-primary/20 text-primary border-primary/30',
  offline: 'bg-muted/50 text-muted-foreground border-muted',
};

export default function GPUs() {
  const availableCount = mockGPUs.filter(g => g.status === 'available').length;
  const busyCount = mockGPUs.filter(g => g.status === 'busy').length;
  const totalVRAM = mockGPUs.reduce((sum, g) => sum + g.vram, 0);
  const avgUtilization = mockGPUs.filter(g => g.status !== 'offline').reduce((sum, g) => sum + g.utilization, 0) / mockGPUs.filter(g => g.status !== 'offline').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">GPU Infrastructure</h1>
        <p className="text-muted-foreground">Decentralized GPU nodes powered by Nosana Network</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Total GPUs</span>
          </div>
          <p className="text-3xl font-bold font-mono text-foreground">{mockGPUs.length}</p>
        </div>
        <div className="glass rounded-xl border border-success/30 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">Available</span>
          </div>
          <p className="text-3xl font-bold font-mono text-foreground">{availableCount}</p>
        </div>
        <div className="glass rounded-xl border border-primary/30 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">In Use</span>
          </div>
          <p className="text-3xl font-bold font-mono text-foreground">{busyCount}</p>
        </div>
        <div className="glass rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <HardDrive className="h-5 w-5 text-secondary" />
            <span className="text-sm text-muted-foreground">Total VRAM</span>
          </div>
          <p className="text-3xl font-bold font-mono text-foreground">{totalVRAM}GB</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGPUs.map((gpu) => (
          <div
            key={gpu.id}
            className={`glass rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] ${
              gpu.status === 'available' ? 'border-success/30' :
              gpu.status === 'busy' ? 'border-primary/30 glow-sm' : 'border-border/50 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${
                  gpu.status === 'available' ? 'bg-success/20' :
                  gpu.status === 'busy' ? 'bg-primary/20' : 'bg-muted/50'
                }`}>
                  <Cpu className={`h-6 w-6 ${
                    gpu.status === 'available' ? 'text-success' :
                    gpu.status === 'busy' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{gpu.name}</h3>
                  <p className="text-sm text-muted-foreground">{gpu.model}</p>
                </div>
              </div>
              <Badge variant="outline" className={statusColors[gpu.status]}>
                {gpu.status}
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Utilization</span>
                  <span className="text-foreground font-mono">{gpu.utilization}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                    style={{ width: `${gpu.utilization}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{gpu.vram}GB VRAM</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">${gpu.costPerHour}/hr</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{gpu.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
