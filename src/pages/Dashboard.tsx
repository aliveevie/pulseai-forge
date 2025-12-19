import { Activity, Cpu, Bot, DollarSign, CheckCircle, Clock } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { JobsTable } from '@/components/dashboard/JobsTable';
import { GPUUtilizationChart } from '@/components/dashboard/GPUUtilizationChart';
import { mockJobs, mockGPUs, dashboardStats } from '@/data/mockData';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Monitor your AI workloads and GPU infrastructure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Active Jobs"
          value={dashboardStats.activeJobs}
          icon={Activity}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Available GPUs"
          value={`${dashboardStats.availableGPUs}/${dashboardStats.totalGPUs}`}
          icon={Cpu}
          variant="success"
        />
        <StatCard
          title="Active Agents"
          value={`${dashboardStats.activeAgents}/${dashboardStats.totalAgents}`}
          icon={Bot}
        />
        <StatCard
          title="Cost Today"
          value={`$${dashboardStats.totalCostToday.toFixed(2)}`}
          icon={DollarSign}
          variant="warning"
        />
        <StatCard
          title="Jobs Completed"
          value={dashboardStats.jobsCompleted}
          icon={CheckCircle}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Avg Response"
          value={`${dashboardStats.avgResponseTime}ms`}
          icon={Clock}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <JobsTable jobs={mockJobs} />
        </div>
        <div>
          <GPUUtilizationChart gpus={mockGPUs} />
        </div>
      </div>
    </div>
  );
}
