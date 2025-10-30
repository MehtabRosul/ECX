import { ProductsNav } from "@/components/products/products-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap, 
  Shield, 
  Globe,
  Database,
  Activity
} from "lucide-react";
import { FloatingParticlesBackgroundClient as FloatingParticlesBackground } from "@/components/floating-particles-background.client";

export default function ProductAnalyticsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingParticlesBackground className="opacity-20" />
      
      <div className="container relative z-10 mx-auto max-w-7xl px-4 py-12">
        {/* Breadcrumbs and Navigation */}
        <nav className="mb-4 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground">Home</a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-foreground">Products</a>
          <span className="mx-2">/</span>
          <span className="text-foreground">Analytics</span>
        </nav>
        
        <ProductsNav />
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Product <span className="text-primary">Analytics</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Real-time insights into product performance, adoption, and security metrics
          </p>
        </div>
        
        {/* Key Metrics */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,489</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-400">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42ms</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-400">-8%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Incidents</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-400">100%</span> secure
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uptime</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.98%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-400">+0.01%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts Section */}
        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                User Adoption Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 rounded-lg bg-surface-2/30 p-4">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">Interactive chart visualization</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 rounded-lg bg-surface-2/30 p-4">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">Performance dashboard</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Product Usage */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Product Usage by Category</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Security", usage: 78, color: "bg-blue-500" },
              { name: "Privacy", usage: 65, color: "bg-purple-500" },
              { name: "Infrastructure", usage: 82, color: "bg-green-500" },
              { name: "Developer Tools", usage: 45, color: "bg-yellow-500" },
              { name: "AI Security", usage: 56, color: "bg-pink-500" },
              { name: "Governance", usage: 38, color: "bg-red-500" },
            ].map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <Badge variant="secondary">{category.usage}%</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-2 w-full rounded-full bg-surface-2">
                    <div 
                      className={`h-2 rounded-full ${category.color}`} 
                      style={{ width: `${category.usage}%` }}
                    ></div>
                  </div>
                  <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                    <span>High Usage</span>
                    <span>Low Usage</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { action: "New user signup", user: "Alex Johnson", time: "2 minutes ago", product: "Quantum Encrypt" },
                  { action: "API call", user: "Sarah Chen", time: "5 minutes ago", product: "Neural Shield" },
                  { action: "Security scan", user: "System", time: "12 minutes ago", product: "Data Vault" },
                  { action: "Configuration update", user: "Michael Torres", time: "24 minutes ago", product: "Secure API Gateway" },
                  { action: "Compliance check", user: "System", time: "36 minutes ago", product: "Compliance Assistant" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.user} • {activity.product}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}