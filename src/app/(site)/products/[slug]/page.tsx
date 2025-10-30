import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productsData } from "@/data/products-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Zap, 
  Shield, 
  Eye, 
  Download, 
  ArrowRight, 
  CheckCircle, 
  GitBranch,
  Server,
  Globe,
  Lock,
  Cpu,
  Database
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FloatingParticlesBackground } from "@/components/floating-particles-background";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { EffectCard } from "@/components/ui/effect-card";
import { ProductFeedback } from "@/components/products/product-feedback";

type Params = { params: { slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = productsData.find(p => p.id === params.slug);
  
  if (!product) {
    return {
      title: "Product Not Found — EncryptArx",
      description: "The requested product could not be found.",
    };
  }
  
  return {
    title: `${product.name} — EncryptArx`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: Params) {
  if (!params?.slug) return notFound();
  
  const product = productsData.find(p => p.id === params.slug);
  
  if (!product) return notFound();
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Particles */}
      <FloatingParticlesBackground className="opacity-20" />
      
      <div className="container relative z-10 mx-auto max-w-7xl px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <a href="/products" className="hover:text-foreground">Products</a>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
        
        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge 
                  variant={product.status === "active" ? "default" : product.status === "beta" ? "secondary" : "outline"}
                  className={cn(
                    "px-3 py-1 text-sm",
                    product.status === "active" && "bg-green-500/20 text-green-300 hover:bg-green-500/30",
                    product.status === "beta" && "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30",
                    product.status === "coming-soon" && "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30",
                    product.status === "deprecated" && "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                  )}
                >
                  {product.status.replace("-", " ")}
                </Badge>
                <span className="text-sm text-muted-foreground">v{product.version}</span>
                <span className="text-sm text-muted-foreground">Released {product.releaseDate}</span>
              </div>
              
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {product.name}
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">{product.tagline}</p>
              <p className="mt-4 max-w-3xl text-lg">{product.description}</p>
              
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <GradientButton size="lg" className="gap-2">
                  <Eye className="h-5 w-5" />
                  Request Demo
                </GradientButton>
                <Button size="lg" variant="outline" className="gap-2">
                  <Download className="h-5 w-5" />
                  Download Datasheet
                </Button>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <EffectCard>
                <div className="flex h-full items-center justify-center p-8">
                  <div className="text-8xl">{product.icon || "🔒"}</div>
                </div>
              </EffectCard>
            </div>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <NeonGradientCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Latency</p>
                <p className="text-xl font-bold">{product.performance?.latency || "N/A"}</p>
              </div>
            </div>
          </NeonGradientCard>
          
          <NeonGradientCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Server className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Throughput</p>
                <p className="text-xl font-bold">{product.performance?.throughput || "N/A"}</p>
              </div>
            </div>
          </NeonGradientCard>
          
          <NeonGradientCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Availability</p>
                <p className="text-xl font-bold">{product.performance?.availability || "N/A"}</p>
              </div>
            </div>
          </NeonGradientCard>
          
          <NeonGradientCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="text-xl font-bold">4.8/5.0</p>
              </div>
            </div>
          </NeonGradientCard>
        </div>
        
        {/* Features and Details */}
        <Tabs defaultValue="features" className="mb-16">
          <TabsList className="mb-8 grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="usecases">Use Cases</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {product.features.map((feature) => (
                <Card key={feature.id} className="overflow-hidden">
                  <CardHeader className="bg-surface-2/50">
                    <CardTitle className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-muted-foreground">{feature.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {feature.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {product.integrations.map((integration, index) => (
                <NeonGradientCard key={integration} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2">
                      <Globe className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{integration}</span>
                  </div>
                </NeonGradientCard>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="usecases" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {product.useCases.map((useCase, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Lock className="h-5 w-5 text-primary" />
                      </div>
                      {useCase}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {product.name} is specifically designed to address security challenges in the {useCase} sector, 
                      providing robust protection and compliance features tailored to this domain.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="compliance" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {product.compliance?.map((standard, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-surface-2/50">
                    <CardTitle className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      {standard}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-muted-foreground">
                      {product.name} is fully compliant with {standard} standards, ensuring your organization meets 
                      regulatory requirements while maintaining the highest level of security.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Configuration Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">Configure {product.name}</h2>
        </div>
        
        {/* Highlights */}
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">Key Highlights</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {product.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg border border-white/10 bg-surface-2/30 p-4">
                <CheckCircle className="mt-1 h-5 w-5 text-green-400" />
                <span className="font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Customer Feedback */}
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">Customer Reviews</h2>
          <ProductFeedback />
        </div>
        
        {/* CTA Section */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-surface-2/30 to-surface-1/30 p-8 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="text-2xl font-bold">Ready to get started with {product.name}?</h3>
              <p className="mt-2 text-muted-foreground">
                Contact our team for a personalized demonstration and implementation plan
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Download Brochure</Button>
              <GradientButton>
                Contact Sales
                <ArrowRight className="ml-2 h-5 w-5" />
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}