export interface Job {
  id: string;
  name: string;
  type: 'llm' | 'embeddings' | 'image' | 'speech';
  status: 'queued' | 'running' | 'completed' | 'failed';
  model: string;
  gpuId: string;
  cost: number;
  duration: number;
  createdAt: Date;
  completedAt?: Date;
}

export interface Agent {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'offline';
  jobsProcessed: number;
  successRate: number;
  currentJob?: string;
  specialty: 'llm' | 'embeddings' | 'image' | 'speech' | 'general';
}

export interface GPU {
  id: string;
  name: string;
  model: string;
  vram: number;
  utilization: number;
  status: 'available' | 'busy' | 'offline';
  costPerHour: number;
  location: string;
  provider: string;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  createdAt: Date;
  lastUsed?: Date;
  requests: number;
}

export const mockJobs: Job[] = [
  { id: 'job-001', name: 'GPT-4 Inference Batch', type: 'llm', status: 'running', model: 'llama-3.1-70b', gpuId: 'gpu-001', cost: 2.45, duration: 1200, createdAt: new Date('2024-01-15T10:30:00') },
  { id: 'job-002', name: 'Document Embeddings', type: 'embeddings', status: 'completed', model: 'text-embedding-3-large', gpuId: 'gpu-002', cost: 0.85, duration: 450, createdAt: new Date('2024-01-15T09:00:00'), completedAt: new Date('2024-01-15T09:07:30') },
  { id: 'job-003', name: 'Image Generation', type: 'image', status: 'queued', model: 'stable-diffusion-xl', gpuId: 'gpu-003', cost: 1.20, duration: 0, createdAt: new Date('2024-01-15T11:00:00') },
  { id: 'job-004', name: 'Speech-to-Text', type: 'speech', status: 'completed', model: 'whisper-large-v3', gpuId: 'gpu-001', cost: 0.55, duration: 180, createdAt: new Date('2024-01-15T08:00:00'), completedAt: new Date('2024-01-15T08:03:00') },
  { id: 'job-005', name: 'Fine-tuning Run', type: 'llm', status: 'failed', model: 'mistral-7b', gpuId: 'gpu-004', cost: 5.00, duration: 3600, createdAt: new Date('2024-01-14T20:00:00') },
  { id: 'job-006', name: 'Batch Inference', type: 'llm', status: 'running', model: 'llama-3.1-8b', gpuId: 'gpu-002', cost: 1.80, duration: 600, createdAt: new Date('2024-01-15T11:15:00') },
];

export const mockAgents: Agent[] = [
  { id: 'agent-001', name: 'Alpha-1', status: 'active', jobsProcessed: 1247, successRate: 98.5, currentJob: 'job-001', specialty: 'llm' },
  { id: 'agent-002', name: 'Beta-2', status: 'active', jobsProcessed: 892, successRate: 97.2, currentJob: 'job-006', specialty: 'embeddings' },
  { id: 'agent-003', name: 'Gamma-3', status: 'idle', jobsProcessed: 654, successRate: 99.1, specialty: 'image' },
  { id: 'agent-004', name: 'Delta-4', status: 'offline', jobsProcessed: 421, successRate: 95.8, specialty: 'speech' },
  { id: 'agent-005', name: 'Epsilon-5', status: 'active', jobsProcessed: 1089, successRate: 96.9, currentJob: 'job-003', specialty: 'general' },
];

export const mockGPUs: GPU[] = [
  { id: 'gpu-001', name: 'Node-Alpha', model: 'NVIDIA A100', vram: 80, utilization: 87, status: 'busy', costPerHour: 2.50, location: 'US-East', provider: 'Nosana Network' },
  { id: 'gpu-002', name: 'Node-Beta', model: 'NVIDIA H100', vram: 80, utilization: 65, status: 'busy', costPerHour: 3.20, location: 'EU-West', provider: 'Nosana Network' },
  { id: 'gpu-003', name: 'Node-Gamma', model: 'NVIDIA RTX 4090', vram: 24, utilization: 0, status: 'available', costPerHour: 0.80, location: 'US-West', provider: 'Nosana Network' },
  { id: 'gpu-004', name: 'Node-Delta', model: 'NVIDIA A100', vram: 40, utilization: 0, status: 'offline', costPerHour: 2.00, location: 'Asia-Pacific', provider: 'Nosana Network' },
  { id: 'gpu-005', name: 'Node-Epsilon', model: 'NVIDIA L40S', vram: 48, utilization: 45, status: 'busy', costPerHour: 1.80, location: 'US-Central', provider: 'Nosana Network' },
];

export const mockAPIKeys: APIKey[] = [
  { id: 'key-001', name: 'Production API', key: 'pulse_live_sk_1a2b3c4d5e6f7g8h9i0j', createdAt: new Date('2024-01-01'), lastUsed: new Date('2024-01-15T10:30:00'), requests: 125000 },
  { id: 'key-002', name: 'Development', key: 'pulse_test_sk_9z8y7x6w5v4u3t2s1r0q', createdAt: new Date('2024-01-10'), lastUsed: new Date('2024-01-14T15:00:00'), requests: 8500 },
  { id: 'key-003', name: 'Staging Environment', key: 'pulse_stag_sk_0p9o8i7u6y5t4r3e2w1q', createdAt: new Date('2024-01-12'), requests: 2100 },
];

export const dashboardStats = {
  activeJobs: 3,
  totalGPUs: 5,
  availableGPUs: 1,
  totalAgents: 5,
  activeAgents: 3,
  totalCostToday: 12.85,
  jobsCompleted: 847,
  avgResponseTime: 245,
};
