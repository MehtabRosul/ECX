// Product data structure for the enhanced products page
export interface ProductFeature {
  id: string;
  title: string;
  description: string;
  icon?: string;
  tags?: string[];
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  status: 'active' | 'beta' | 'deprecated' | 'coming-soon';
  releaseDate: string;
  version: string;
  pricing?: string;
  features: ProductFeature[];
  integrations: string[];
  useCases: string[];
  highlights: string[];
  imageUrl?: string;
  icon?: string;
  documentationUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  compliance?: string[];
  performance?: {
    latency?: string;
    throughput?: string;
    availability?: string;
  };
}

export const productsData: Product[] = [
  {
    id: 'quantum-encrypt',
    name: 'Quantum Encrypt',
    tagline: 'Next-Gen Post-Quantum Cryptography',
    description: 'Future-proof encryption that withstands quantum computing threats with NIST-standardized algorithms.',
    category: 'Security',
    status: 'active',
    releaseDate: '2025-03-15',
    version: 'v2.4.1',
    pricing: 'Starting at $499/month',
    features: [
      {
        id: 'pqc-algorithms',
        title: 'PQC Algorithms',
        description: 'ImplementCRYSTALS-Kyber and CRYSTALS-Dilithium for key encapsulation and digital signatures.',
        tags: ['NIST', 'FIPS-140', 'PQC']
      },
      {
        id: 'hybrid-mode',
        title: 'Hybrid Mode',
        description: 'Run classical and post-quantum cryptography simultaneously for seamless migration.',
        tags: ['Migration', 'Compatibility']
      },
      {
        id: 'sdk-integration',
        title: 'Multi-Language SDKs',
        description: 'Native SDKs for Python, JavaScript, Java, Go, and C++ with comprehensive documentation.',
        tags: ['SDK', 'API']
      }
    ],
    integrations: ['AWS KMS', 'Azure Key Vault', 'HashiCorp Vault', 'Kubernetes Secrets'],
    useCases: ['Financial Services', 'Healthcare', 'Government', 'Defense'],
    highlights: ['NIST Standardized', 'Zero Performance Impact', 'FIPS-140 Compliant'],
    imageUrl: 'https://picsum.photos/seed/quantum/800/600',
    compliance: ['NIST PQC', 'FIPS-140-3', 'GDPR', 'HIPAA'],
    performance: {
      latency: '<1ms',
      throughput: '50,000 ops/sec',
      availability: '99.99%'
    }
  },
  {
    id: 'neural-shield',
    name: 'Neural Shield',
    tagline: 'AI-Powered Threat Detection',
    description: 'Advanced behavioral analytics and anomaly detection using proprietary neural networks.',
    category: 'AI Security',
    status: 'active',
    releaseDate: '2025-01-22',
    version: 'v3.1.0',
    pricing: 'Starting at $799/month',
    features: [
      {
        id: 'behavioral-analytics',
        title: 'Behavioral Analytics',
        description: 'Detect anomalies in user behavior patterns with 99.7% accuracy.',
        tags: ['ML', 'AI', 'Analytics']
      },
      {
        id: 'real-time-detection',
        title: 'Real-Time Detection',
        description: 'Identify and respond to threats within microseconds of occurrence.',
        tags: ['Real-time', 'Detection']
      },
      {
        id: 'zero-day-protection',
        title: 'Zero-Day Protection',
        description: 'Proactively identify and mitigate previously unknown attack vectors.',
        tags: ['Zero-day', 'Protection']
      }
    ],
    integrations: ['Splunk', 'ElasticSearch', 'Datadog', 'PagerDuty'],
    useCases: ['Enterprise Security', 'SOC Operations', 'Compliance Monitoring'],
    highlights: ['99.7% Accuracy', 'Microsecond Detection', 'Zero False Positives'],
    imageUrl: 'https://picsum.photos/seed/neural/800/600',
    compliance: ['SOC 2', 'ISO 27001', 'NIST CSF'],
    performance: {
      latency: '<100μs',
      throughput: '1M events/sec',
      availability: '99.999%'
    }
  },
  {
    id: 'data-vault',
    name: 'Data Vault',
    tagline: 'Homomorphic Encryption Platform',
    description: 'Process encrypted data without decryption, enabling secure computation on sensitive information.',
    category: 'Privacy',
    status: 'beta',
    releaseDate: '2025-05-10',
    version: 'v1.0.0-beta',
    pricing: 'Contact Sales',
    features: [
      {
        id: 'homomorphic-computing',
        title: 'Homomorphic Computing',
        description: 'Perform computations on encrypted data without ever decrypting it.',
        tags: ['Privacy', 'Encryption', 'Computation']
      },
      {
        id: 'secure-ml',
        title: 'Secure Machine Learning',
        description: 'Train and deploy ML models on encrypted datasets.',
        tags: ['ML', 'AI', 'Privacy']
      },
      {
        id: 'api-access',
        title: 'RESTful API Access',
        description: 'Easily integrate homomorphic capabilities into existing applications.',
        tags: ['API', 'Integration']
      }
    ],
    integrations: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Apache Spark'],
    useCases: ['Healthcare Analytics', 'Financial Modeling', 'Research Collaboration'],
    highlights: ['True Privacy', 'No Decryption Required', 'ML-Ready'],
    imageUrl: 'https://picsum.photos/seed/vault/800/600',
    compliance: ['HIPAA', 'GDPR', 'FIPS-140-3'],
    performance: {
      latency: '<5ms',
      throughput: '10,000 ops/sec',
      availability: '99.95%'
    }
  },
  {
    id: 'crypto-sandbox',
    name: 'Crypto Sandbox',
    tagline: 'Cryptographic Development Environment',
    description: 'Secure development environment for cryptographic implementations with built-in testing and validation.',
    category: 'Developer Tools',
    status: 'active',
    releaseDate: '2024-11-05',
    version: 'v1.8.3',
    pricing: 'Free Tier Available',
    features: [
      {
        id: 'secure-ide',
        title: 'Secure IDE',
        description: 'Browser-based development environment with cryptographic libraries and tools.',
        tags: ['IDE', 'Development']
      },
      {
        id: 'automated-testing',
        title: 'Automated Testing',
        description: 'Built-in test suites for cryptographic implementations and compliance validation.',
        tags: ['Testing', 'Validation']
      },
      {
        id: 'collaboration',
        title: 'Team Collaboration',
        description: 'Real-time collaboration features for cryptographic development teams.',
        tags: ['Collaboration', 'Team']
      }
    ],
    integrations: ['GitHub', 'GitLab', 'VS Code', 'JetBrains'],
    useCases: ['Cryptographic R&D', 'Compliance Development', 'Security Research'],
    highlights: ['Zero Trust', 'Automated Validation', 'Team Ready'],
    imageUrl: 'https://picsum.photos/seed/sandbox/800/600',
    compliance: ['FIPS-140-3', 'NIST SP 800-53', 'OWASP'],
    performance: {
      latency: '<10ms',
      throughput: 'Unlimited',
      availability: '99.9%'
    }
  },
  {
    id: 'secure-api-gateway',
    name: 'Secure API Gateway',
    tagline: 'Zero-Trust API Security',
    description: 'Enterprise-grade API gateway with built-in cryptographic protection and access control.',
    category: 'Infrastructure',
    status: 'active',
    releaseDate: '2025-02-18',
    version: 'v4.2.1',
    pricing: 'Starting at $1,299/month',
    features: [
      {
        id: 'zero-trust',
        title: 'Zero-Trust Architecture',
        description: 'Every request is cryptographically verified and authenticated.',
        tags: ['Zero-Trust', 'Authentication']
      },
      {
        id: 'rate-limiting',
        title: 'Adaptive Rate Limiting',
        description: 'Intelligent rate limiting based on behavior analysis and threat intelligence.',
        tags: ['Rate Limiting', 'Security']
      },
      {
        id: 'observability',
        title: 'Full Observability',
        description: 'Comprehensive monitoring and logging with real-time dashboards.',
        tags: ['Monitoring', 'Observability']
      }
    ],
    integrations: ['Kong', 'AWS API Gateway', 'Azure API Management', 'Apigee'],
    useCases: ['Microservices Security', 'API Management', 'B2B Integrations'],
    highlights: ['Zero-Trust', 'Adaptive Security', 'Full Observability'],
    imageUrl: 'https://picsum.photos/seed/gateway/800/600',
    compliance: ['PCI DSS', 'SOC 2', 'ISO 27001'],
    performance: {
      latency: '<2ms',
      throughput: '100,000 req/sec',
      availability: '99.99%'
    }
  },
  {
    id: 'compliance-assistant',
    name: 'Compliance Assistant',
    tagline: 'Automated Compliance Management',
    description: 'AI-powered compliance assistant that maps controls, generates evidence, and tracks audit readiness.',
    category: 'Governance',
    status: 'active',
    releaseDate: '2025-04-30',
    version: 'v2.0.5',
    pricing: 'Starting at $599/month',
    features: [
      {
        id: 'control-mapping',
        title: 'Control Mapping',
        description: 'Automatically map security controls to regulatory frameworks.',
        tags: ['Compliance', 'Mapping']
      },
      {
        id: 'evidence-generation',
        title: 'Evidence Generation',
        description: 'Automatically generate compliance evidence from system logs and configurations.',
        tags: ['Evidence', 'Audit']
      },
      {
        id: 'audit-tracking',
        title: 'Audit Tracking',
        description: 'Track audit progress and readiness with real-time dashboards.',
        tags: ['Audit', 'Tracking']
      }
    ],
    integrations: ['Jira', 'Confluence', 'ServiceNow', 'Azure DevOps'],
    useCases: ['Audit Preparation', 'Regulatory Compliance', 'Risk Management'],
    highlights: ['AI-Powered', 'Automated Evidence', 'Real-Time Tracking'],
    imageUrl: 'https://picsum.photos/seed/compliance/800/600',
    compliance: ['ISO 27001', 'SOC 2', 'HIPAA', 'GDPR', 'PCI DSS'],
    performance: {
      latency: '<50ms',
      throughput: '10,000 controls/sec',
      availability: '99.9%'
    }
  }
];

export const productCategories = [
  { id: 'security', name: 'Security', count: 12 },
  { id: 'privacy', name: 'Privacy', count: 8 },
  { id: 'infrastructure', name: 'Infrastructure', count: 15 },
  { id: 'developer-tools', name: 'Developer Tools', count: 10 },
  { id: 'ai-security', name: 'AI Security', count: 6 },
  { id: 'governance', name: 'Governance', count: 7 },
  { id: 'compliance', name: 'Compliance', count: 9 },
  { id: 'research', name: 'Research', count: 4 }
];

export const productStatuses = [
  { id: 'active', name: 'Active', count: 32 },
  { id: 'beta', name: 'Beta', count: 8 },
  { id: 'coming-soon', name: 'Coming Soon', count: 5 },
  { id: 'deprecated', name: 'Deprecated', count: 3 }
];