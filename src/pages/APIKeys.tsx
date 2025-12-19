import { useState } from 'react';
import { Key, Plus, Eye, EyeOff, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockAPIKeys } from '@/data/mockData';
import { toast } from 'sonner';

export default function APIKeys() {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('API key copied to clipboard');
  };

  const maskKey = (key: string) => {
    return key.slice(0, 12) + '••••••••••••••••••';
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">API Keys</h1>
          <p className="text-muted-foreground">Manage your API access credentials</p>
        </div>
        <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Generate New Key
        </Button>
      </div>

      <div className="glass rounded-xl border border-border/50 p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">API Endpoints</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <code className="text-sm text-primary">POST /api/v1/jobs</code>
              <p className="text-xs text-muted-foreground mt-1">Submit a new AI job</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <code className="text-sm text-primary">GET /api/v1/jobs/:id</code>
              <p className="text-xs text-muted-foreground mt-1">Check job status</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <code className="text-sm text-primary">GET /api/v1/jobs/:id/results</code>
              <p className="text-xs text-muted-foreground mt-1">Fetch job results</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {mockAPIKeys.map((apiKey) => (
          <div
            key={apiKey.id}
            className="glass rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Key className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{apiKey.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    Created {apiKey.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleKeyVisibility(apiKey.id)}
                >
                  {visibleKeys.has(apiKey.id) ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyKey(apiKey.key)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg font-mono text-sm mb-4">
              {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>
                <strong className="text-foreground">{apiKey.requests.toLocaleString()}</strong> requests
              </span>
              {apiKey.lastUsed && (
                <span>
                  Last used <strong className="text-foreground">{apiKey.lastUsed.toLocaleDateString()}</strong>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
