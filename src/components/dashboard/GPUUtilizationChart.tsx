import { GPU } from '@/data/mockData';

interface GPUUtilizationChartProps {
  gpus: GPU[];
}

export function GPUUtilizationChart({ gpus }: GPUUtilizationChartProps) {
  return (
    <div className="glass rounded-xl border border-border/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">GPU Utilization</h3>
      <div className="space-y-4">
        {gpus.map((gpu) => (
          <div key={gpu.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  gpu.status === 'available' ? 'bg-success' :
                  gpu.status === 'busy' ? 'bg-primary animate-pulse' : 'bg-muted-foreground'
                }`} />
                <span className="text-sm font-medium text-foreground">{gpu.name}</span>
                <span className="text-xs text-muted-foreground">({gpu.model})</span>
              </div>
              <span className="text-sm font-mono text-foreground">{gpu.utilization}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                style={{ width: `${gpu.utilization}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
