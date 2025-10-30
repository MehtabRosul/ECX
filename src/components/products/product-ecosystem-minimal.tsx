'use client';

import { useState, useEffect, useRef } from "react";
import { productsData } from "@/data/products-data";
import { 
  Lock, Shield, Database, Cpu, Globe, Zap, Key, Brain, Server, FileText, Users, BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useInView, useAnimation } from "framer-motion";

// Enhanced Product Card Component with better hover effects
function SimpleProductCard({ product, isSelected, onClick }: { 
  product: any; 
  isSelected: boolean;
  onClick: () => void;
}) {
  const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    "quantum-encrypt": Lock,
    "neural-shield": Shield,
    "data-vault": Database,
    "crypto-sandbox": Cpu,
    "secure-api-gateway": Globe,
    "compliance-assistant": Zap
  };
  
  const Icon = iconMap[product.id] || Shield;

  // Completely different product names
  const productNames: Record<string, string> = {
    "quantum-encrypt": "VaultCore Enterprise",
    "neural-shield": "Sentinel Analytics",
    "data-vault": "DataStream Protector",
    "crypto-sandbox": "CodeGuard Workspace",
    "secure-api-gateway": "Perimeter Control",
    "compliance-assistant": "Governance Navigator"
  };

  // Completely different highlights
  const customHighlights: Record<string, string[]> = {
    "quantum-encrypt": ["Data Protection", "System Integrity"],
    "neural-shield": ["Threat Detection", "Behavioral Analysis"],
    "data-vault": ["Information Security", "Access Management"],
    "crypto-sandbox": ["Development Safety", "Code Integrity"],
    "secure-api-gateway": ["Network Security", "Identity Verification"],
    "compliance-assistant": ["Policy Alignment", "Audit Support"]
  };

  const displayName = productNames[product.id] || product.name;
  const highlights = customHighlights[product.id] || ["Business Focused", "Operationally Efficient"];
  
  // Parallax effect
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-center p-6 rounded-2xl border cursor-pointer transition-all duration-300 backdrop-blur-sm relative overflow-hidden",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-primary/5 before:to-accent/5 before:opacity-0 before:transition-opacity before:duration-300",
        isSelected 
          ? "border-primary bg-gradient-to-br from-surface-2/50 to-surface-1/50 shadow-lg shadow-primary/10 before:opacity-100" 
          : "border-white/20 bg-gradient-to-br from-surface-2/30 to-surface-1/30 hover:before:opacity-100 hover:border-primary/30 hover:bg-gradient-to-br hover:from-surface-2/50 hover:to-surface-1/50 hover:shadow-lg hover:shadow-primary/5"
      )}
      onClick={onClick}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 mb-4 transition-all duration-300 group-hover:scale-110">
        <Icon className="h-8 w-8 text-primary transition-all duration-300" />
      </div>
      <h3 className="font-bold text-lg text-center mb-2">{displayName}</h3>
      <p className="text-sm text-foreground text-center">{product.tagline}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {highlights.map((highlight: string, i: number) => (
          <span 
            key={i} 
            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
          >
            {highlight}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// Enhanced Product Details Panel with custom content
function SimpleProductDetails({ product, onClose }: { product: any; onClose: () => void }) {
  if (!product) return null;

  const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    "quantum-encrypt": Lock,
    "neural-shield": Shield,
    "data-vault": Database,
    "crypto-sandbox": Cpu,
    "secure-api-gateway": Globe,
    "compliance-assistant": Zap
  };
  
  const Icon = iconMap[product.id] || Shield;

  // Completely different product names
  const productNames: Record<string, string> = {
    "quantum-encrypt": "VaultCore Enterprise",
    "neural-shield": "Sentinel Analytics",
    "data-vault": "DataStream Protector",
    "crypto-sandbox": "CodeGuard Workspace",
    "secure-api-gateway": "Perimeter Control",
    "compliance-assistant": "Governance Navigator"
  };

  // Get related products based on category
  const relatedProducts = productsData
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 2);

  // Completely different feature descriptions
  const customFeatures: Record<string, {title: string, description: string}[]> = {
    "quantum-encrypt": [
      { title: "Data Encryption", description: "Robust cryptographic protection for sensitive information." },
      { title: "System Integration", description: "Seamless deployment across existing infrastructure." },
      { title: "Performance Optimization", description: "High-speed processing with minimal resource impact." }
    ],
    "neural-shield": [
      { title: "Anomaly Detection", description: "Advanced algorithms for identifying unusual patterns." },
      { title: "Real-Time Monitoring", description: "Continuous surveillance of system activities." },
      { title: "Incident Response", description: "Automated actions upon threat identification." }
    ],
    "data-vault": [
      { title: "Secure Storage", description: "Advanced protection for stored information." },
      { title: "User Permissions", description: "Granular access controls for data management." },
      { title: "Activity Logging", description: "Comprehensive records of all data interactions." }
    ],
    "crypto-sandbox": [
      { title: "Safe Environment", description: "Isolated workspace for secure development." },
      { title: "Team Collaboration", description: "Shared tools for development teams." },
      { title: "Quality Assurance", description: "Testing framework for security validation." }
    ],
    "secure-api-gateway": [
      { title: "Traffic Routing", description: "Intelligent management of network requests." },
      { title: "User Authentication", description: "Verification systems for API access." },
      { title: "Request Throttling", description: "Control mechanisms to prevent system overload." }
    ],
    "compliance-assistant": [
      { title: "Standard Alignment", description: "Mapping to industry regulations and guidelines." },
      { title: "Report Generation", description: "Automated creation of compliance documentation." },
      { title: "Compliance Auditing", description: "Identification of regulatory gaps and solutions." }
    ]
  };

  const displayName = productNames[product.id] || product.name;
  const features = customFeatures[product.id] || [
    { title: "Essential Capability", description: "Core functionality for optimal operations." },
    { title: "Advanced Feature", description: "Enhanced capabilities for complex needs." },
    { title: "Premium Offering", description: "Top-tier solution for enterprise requirements." }
  ];

  // Completely different performance data
  const customPerformance: Record<string, Record<string, string>> = {
    "quantum-encrypt": { efficiency: "Optimized", scale: "Enterprise Ready", uptime: "99.99%" },
    "neural-shield": { monitoring: "Continuous", precision: "High Accuracy", response: "Immediate" },
    "data-vault": { security: "Military Grade", capacity: "Scalable", delivery: "Global Network" },
    "crypto-sandbox": { validation: "Automated", updates: "Real-Time", users: "Unlimited" },
    "secure-api-gateway": { requests: "High Volume", delay: "Minimal", reliability: "Maximum" },
    "compliance-assistant": { frameworks: "Comprehensive", automation: "Extensive", updates: "Real-Time" }
  };

  const performance = customPerformance[product.id] || { aspect1: "Benefit 1", aspect2: "Benefit 2", aspect3: "Benefit 3" };

  return (
    <div className="mt-8 p-6 rounded-2xl border border-white/20 bg-gradient-to-br from-surface-2/50 to-surface-1/50 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold">{displayName}</h3>
              <p className="text-foreground mt-1">{product.tagline}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={cn(
                  "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                  product.status === "active" && "bg-green-500/20 text-green-300",
                  product.status === "beta" && "bg-yellow-500/20 text-yellow-300",
                  product.status === "coming-soon" && "bg-blue-500/20 text-blue-300",
                  product.status === "deprecated" && "bg-red-500/20 text-red-300"
                )}>
                  {product.status.replace("-", " ")}
                </span>
                <span className="text-xs text-muted-foreground">v{product.version}</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <p className="mt-4 text-foreground">{product.description}</p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-3">Key Benefits</h4>
              <div className="space-y-2">
                {features.map((feature: any, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-3">Operational Metrics</h4>
              <div className="space-y-2">
                {performance && Object.entries(performance).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground capitalize">{key}</span>
                    <span className="font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
              
              <h4 className="font-semibold text-lg mt-4 mb-3">Regulatory Standards</h4>
              <div className="flex flex-wrap gap-2">
                {product.compliance?.slice(0, 4).map((comp: string, i: number) => (
                  <span 
                    key={i} 
                    className="px-2 py-1 bg-surface-1/50 text-foreground text-xs rounded-full border border-white/10"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold text-lg mb-3">Technology Ecosystem</h4>
            <div className="flex flex-wrap gap-2">
              {product.integrations.slice(0, 6).map((integration: string, i: number) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 bg-surface-1/50 text-foreground text-sm rounded-full border border-white/10 hover:bg-primary/10 hover:border-primary/30 transition-colors"
                >
                  {integration}
                </span>
              ))}
            </div>
          </div>
          
          {relatedProducts.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-lg mb-3">Complementary Solutions</h4>
              <div className="flex gap-4">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="flex items-center gap-2 p-3 rounded-lg bg-surface-1/30 border border-white/10">
                    <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{productNames[relatedProduct.id] || relatedProduct.name}</p>
                      <p className="text-xs text-muted-foreground">{relatedProduct.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Simplified Ecosystem Visualization
export function ProductEcosystemMinimal() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Define the product relationships in a simple linear way
  const ecosystemProducts = [
    "quantum-encrypt",
    "neural-shield", 
    "data-vault",
    "crypto-sandbox",
    "secure-api-gateway",
    "compliance-assistant"
  ];
  
  // Get product data for ecosystem products
  const products = productsData.filter(p => ecosystemProducts.includes(p.id));

  return (
    <div className="w-full rounded-2xl border border-white/20 bg-gradient-to-br from-surface-2/30 to-surface-1/30 backdrop-blur-sm p-6">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <SimpleProductCard
            key={product.id}
            product={product}
            isSelected={selectedProduct?.id === product.id}
            onClick={() => setSelectedProduct(selectedProduct?.id === product.id ? null : product)}
          />
        ))}
      </div>
      
      {/* Product Details */}
      {selectedProduct && (
        <SimpleProductDetails 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}