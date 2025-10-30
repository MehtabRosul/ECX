// Comprehensive services data based on specification

export interface SubService {
	id: string;
	title: string;
	description: string;
	deliverables: string[];
	clientInputs: string[];
	successCriteria: string[];
	kpis: string[];
	securityNotes?: string[];
}

export interface ServiceDomain {
	id: string;
	name: string;
	icon: string;
	purpose: string;
	summary: string;
	subServices: SubService[];
}

export interface EngagementStep {
	id: string;
	label: string;
	description: string;
	outputs: string[];
}

export const servicesData: ServiceDomain[] = [
	{
		id: 'cybersecurity',
		name: 'Cybersecurity',
		icon: '🛡️',
		purpose: 'Secure infrastructure, applications, and data through advisory, assessments, testing, and monitoring',
		summary: 'Comprehensive security solutions from zero-trust architecture to active threat detection',
		subServices: [
			{
				id: 'security-consulting',
				title: 'Cybersecurity Consulting',
				description: 'Security posture assessment, policy & compliance advisory, incident response planning, Zero Trust strategy',
				deliverables: [
					'Security posture assessment report',
					'Policy documents (acceptable use, incident response)',
					'Architectural recommendations & diagrams',
					'Zero Trust implementation plan',
					'Risk-ranked remediation roadmap'
				],
				clientInputs: [
					'Architecture diagrams',
					'Current policies',
					'Log access (read-only)',
					'Asset inventory'
				],
				successCriteria: [
					'Risk reduction index measurable',
					'Critical issues remediated',
					'Alignment to standards (NIST, ISO)'
				],
				kpis: ['Risk reduction %', 'Critical issues resolved', 'Controls mapped to standards']
			},
			{
				id: 'vulnerability-assessment',
				title: 'Vulnerability Assessment & Risk Management',
				description: 'Network scans, app vulnerability analysis, risk scoring, patch management guidance',
				deliverables: [
					'Vulnerability assessment report',
					'Risk register & prioritization matrix',
					'Patching & configuration recommendations',
					'Proof-of-concept documentation'
				],
				clientInputs: [
					'Network topology',
					'App endpoints',
					'Staging/test credentials',
					'Test environment access'
				],
				successCriteria: [
					'Critical vulnerabilities identified',
					'Risk reduction roadmap defined',
					'False positive rate < 5%'
				],
				kpis: ['Vulnerabilities found', 'Risk score reduction', 'False positive rate', 'Remediation timeline']
			},
			{
				id: 'penetration-testing',
				title: 'Penetration Testing & Red Team Exercises',
				description: 'Simulated attacks, social engineering, physical security testing, and red team exercises',
				deliverables: [
					'Penetration test report',
					'Exploit proof-of-concepts',
					'Social engineering assessment',
					'Remediation recommendations',
					'Executive summary'
				],
				clientInputs: [
					'Target systems/applications',
					'Test environment access',
					'Employee contact lists',
					'Physical access permissions'
				],
				successCriteria: [
					'Critical vulnerabilities exploited',
					'Attack paths documented',
					'Social engineering success rate measured'
				],
				kpis: ['Critical findings', 'Exploit success rate', 'Time to compromise', 'Social engineering success %']
			},
			{
				id: 'security-monitoring',
				title: 'Security Monitoring & Incident Response',
				description: 'SIEM implementation, threat hunting, incident response planning, and security operations center setup',
				deliverables: [
					'SIEM configuration & rules',
					'Incident response playbooks',
					'Threat hunting procedures',
					'Security monitoring dashboard',
					'Training materials'
				],
				clientInputs: [
					'Log sources',
					'Network infrastructure',
					'Security team availability',
					'Incident response requirements'
				],
				successCriteria: [
					'Mean time to detection < 15 minutes',
					'False positive rate < 10%',
					'Incident response time improved'
				],
				kpis: ['MTTD', 'MTTR', 'False positive rate', 'Threats detected', 'Incidents resolved']
			},
			{
				id: 'compliance-audit',
				title: 'Compliance & Audit Services',
				description: 'Regulatory compliance assessment, audit preparation, and certification support',
				deliverables: [
					'Compliance gap analysis',
					'Audit preparation documentation',
					'Certification support materials',
					'Remediation action plans',
					'Compliance monitoring framework'
				],
				clientInputs: [
					'Regulatory requirements',
					'Current compliance documentation',
					'Audit schedules',
					'Certification goals'
				],
				successCriteria: [
					'Compliance score > 95%',
					'Audit findings minimized',
					'Certification achieved'
				],
				kpis: ['Compliance score', 'Audit findings', 'Certification status', 'Remediation timeline']
			},
			{
				id: 'security-training',
				title: 'Security Awareness & Training',
				description: 'Employee security training, phishing simulation, and security culture development',
				deliverables: [
					'Security training curriculum',
					'Phishing simulation campaigns',
					'Security awareness materials',
					'Training effectiveness metrics',
					'Security culture assessment'
				],
				clientInputs: [
					'Employee roster',
					'Training requirements',
					'Security policies',
					'Training schedules'
				],
				successCriteria: [
					'Training completion rate > 90%',
					'Phishing click rate < 5%',
					'Security awareness score improved'
				],
				kpis: ['Training completion %', 'Phishing click rate', 'Awareness score', 'Incident reduction %']
			}
		]
	},
	{
		id: 'ai-ml',
		name: 'AI & Machine Learning',
		icon: '🧠',
		purpose: 'Apply ML/AI to product features, automation, intelligence and analytics',
		summary: 'Deliver production-grade models, pipelines, and user interfaces for chatbots, dashboards, and intelligent automation',
		subServices: [
			{
				id: 'conversational-ai',
				title: 'Conversational AI & Automation',
				description: 'Design and implementation of bots and automated flows for support, FAQ triage, and workflow automation',
				deliverables: [
					'Bot design artifact (intents & utterances catalog, conversation flows)',
					'NLP models & pipelines for intent classification',
					'Integration components (helpdesk, CRM, voice platforms)',
					'Automation scripts for end-to-end workflows',
					'Monitoring dashboard for accuracy & latency metrics',
					'Multilingual deployment resources',
					'Operational guide with retraining schedule'
				],
				clientInputs: [
					'Sample conversation logs',
					'FAQ knowledge base',
					'API access to systems to be automated',
					'Success criteria (e.g., reduce resolution time)'
				],
				successCriteria: [
					'Intent accuracy > 90%',
					'Reduction in resolution time by defined target',
					'Positive deflection rate',
					'SLA attainment for conversational latency'
				],
				kpis: ['Intent accuracy %', 'Average resolution time', 'Deflection rate', 'Conversational latency', 'Fallback rate'],
				securityNotes: ['PII handling in conversations', 'Encryption of logs', 'GDPR compliance']
			},
			{
				id: 'custom-ai',
				title: 'Custom Specialized AI Solutions',
				description: 'Tailored ML solutions for vision, NLP, forecasting, anomaly detection, and embedding advanced LLMs',
				deliverables: [
					'Data strategy & pipeline documentation',
					'Model prototypes with validation metrics',
					'Production-ready containerized models',
					'Inference API & integration SDKs',
					'Model governance documentation',
					'Model cards with metadata and lineage'
				],
				clientInputs: [
					'Labeled/unlabeled datasets',
					'Evaluation criteria',
					'Production environment constraints',
					'Data access protocols'
				],
				successCriteria: [
					'Model accuracy meets defined thresholds',
					'Inference latency within SLA',
					'False positive/negative rates acceptable'
				],
				kpis: ['Model accuracy/precision/recall', 'Inference latency', 'Throughput', 'False positive rate', 'Edge deployment success']
			},
			{
				id: 'business-intelligence',
				title: 'AI-Powered Business Intelligence',
				description: 'Build intelligent dashboards and data products with predictive analytics and natural language reporting',
				deliverables: [
					'ETL pipelines & data cleansing rules',
					'Analytics models (predictive, anomaly detection)',
					'Smart dashboards with AI-powered insights',
					'Automated report generation',
					'Data lineage documentation'
				],
				clientInputs: [
					'Data sources & schemas',
					'Business metrics definitions',
					'Reporting requirements',
					'Data quality standards'
				],
				successCriteria: [
					'Dashboard adoption rate > 80%',
					'Prediction accuracy > 85%',
					'Report generation time reduced by 70%'
				],
				kpis: ['Dashboard usage', 'Prediction accuracy', 'Report generation time', 'Data freshness', 'User satisfaction']
			},
			{
				id: 'computer-vision',
				title: 'Computer Vision & Image Processing',
				description: 'Advanced image recognition, object detection, and visual analytics solutions',
				deliverables: [
					'Computer vision model architecture',
					'Image preprocessing pipelines',
					'Object detection & classification models',
					'Visual analytics dashboard',
					'Model performance metrics',
					'Integration APIs for image processing'
				],
				clientInputs: [
					'Image datasets',
					'Annotation requirements',
					'Processing performance needs',
					'Integration requirements'
				],
				successCriteria: [
					'Detection accuracy > 95%',
					'Processing speed < 100ms per image',
					'False positive rate < 2%'
				],
				kpis: ['Detection accuracy', 'Processing speed', 'False positive rate', 'Model inference time', 'Throughput']
			},
			{
				id: 'natural-language-processing',
				title: 'Natural Language Processing',
				description: 'Text analysis, sentiment analysis, document processing, and language understanding solutions',
				deliverables: [
					'NLP model pipelines',
					'Text preprocessing components',
					'Sentiment analysis models',
					'Document classification system',
					'Language understanding APIs',
					'Text analytics dashboard'
				],
				clientInputs: [
					'Text corpora',
					'Language requirements',
					'Analysis objectives',
					'Performance benchmarks'
				],
				successCriteria: [
					'Classification accuracy > 90%',
					'Sentiment analysis precision > 85%',
					'Processing throughput > 1000 docs/min'
				],
				kpis: ['Classification accuracy', 'Sentiment precision', 'Processing throughput', 'Language coverage', 'Model latency']
			},
			{
				id: 'predictive-analytics',
				title: 'Predictive Analytics & Forecasting',
				description: 'Time series forecasting, demand prediction, and predictive maintenance solutions',
				deliverables: [
					'Forecasting model architecture',
					'Time series analysis pipelines',
					'Predictive maintenance algorithms',
					'Demand forecasting models',
					'Analytics visualization tools',
					'Model monitoring dashboard'
				],
				clientInputs: [
					'Historical time series data',
					'Forecasting requirements',
					'Business constraints',
					'Accuracy thresholds'
				],
				successCriteria: [
					'Forecast accuracy > 85%',
					'Prediction horizon meets requirements',
					'Model stability over time'
				],
				kpis: ['Forecast accuracy', 'Prediction horizon', 'Model stability', 'Business impact', 'Deployment success']
			}
		]
	},
	{
		id: 'tech-solutions',
		name: 'Tech Solutions',
		icon: '⚙️',
		purpose: 'End-to-end development from concept to production for web, mobile, and enterprise applications',
		summary: 'Build scalable, secure, and maintainable software solutions with modern architectures and best practices',
		subServices: [
			{
				id: 'web-development',
				title: 'Web Application Development',
				description: 'Modern web applications with responsive design, API integration, and cloud deployment',
				deliverables: [
					'Responsive web application',
					'API documentation',
					'Deployment scripts',
					'Testing suite',
					'Performance optimization report'
				],
				clientInputs: [
					'Design mockups',
					'Functional requirements',
					'Brand guidelines',
					'Integration requirements'
				],
				successCriteria: [
					'Page load time < 3 seconds',
					'Mobile responsiveness score > 95',
					'Cross-browser compatibility'
				],
				kpis: ['Page load time', 'Mobile score', 'Browser compatibility', 'User engagement', 'Bug count']
			},
			{
				id: 'mobile-development',
				title: 'Mobile Application Development',
				description: 'Native and cross-platform mobile apps with offline capabilities and push notifications',
				deliverables: [
					'Mobile application (iOS/Android)',
					'App store assets',
					'Push notification setup',
					'Offline sync implementation',
					'Performance analytics'
				],
				clientInputs: [
					'App requirements',
					'Design assets',
					'Backend API access',
					'Device testing requirements'
				],
				successCriteria: [
					'App store approval',
					'Crash rate < 1%',
					'User rating > 4.0'
				],
				kpis: ['Crash rate', 'User rating', 'Download count', 'Retention rate', 'Performance metrics']
			},
			{
				id: 'api-development',
				title: 'API Development & Integration',
				description: 'RESTful APIs, microservices architecture, and third-party integrations',
				deliverables: [
					'API specification documentation',
					'Microservices architecture',
					'Integration connectors',
					'API testing suite',
					'Performance monitoring setup'
				],
				clientInputs: [
					'Integration requirements',
					'Third-party API access',
					'Performance requirements',
					'Security specifications'
				],
				successCriteria: [
					'API response time < 200ms',
					'99.9% uptime',
					'Zero security vulnerabilities'
				],
				kpis: ['Response time', 'Uptime %', 'Security score', 'Throughput', 'Error rate']
			},
			{
				id: 'database-design',
				title: 'Database Design & Optimization',
				description: 'Database architecture, optimization, and data management solutions',
				deliverables: [
					'Database schema design',
					'Performance optimization report',
					'Data migration scripts',
					'Backup & recovery procedures',
					'Monitoring dashboard'
				],
				clientInputs: [
					'Data requirements',
					'Performance benchmarks',
					'Compliance requirements',
					'Existing data sources'
				],
				successCriteria: [
					'Query performance improved by 50%',
					'Data integrity maintained',
					'Backup recovery time < 1 hour'
				],
				kpis: ['Query performance', 'Data integrity', 'Recovery time', 'Storage efficiency', 'Concurrent users']
			},
			{
				id: 'devops-automation',
				title: 'DevOps & Automation',
				description: 'CI/CD pipelines, infrastructure automation, and deployment strategies',
				deliverables: [
					'CI/CD pipeline configuration',
					'Infrastructure as Code templates',
					'Automated testing framework',
					'Deployment automation scripts',
					'Monitoring & alerting setup'
				],
				clientInputs: [
					'Deployment requirements',
					'Infrastructure specifications',
					'Testing requirements',
					'Monitoring needs'
				],
				successCriteria: [
					'Deployment time reduced by 80%',
					'Zero-downtime deployments',
					'Automated testing coverage > 90%'
				],
				kpis: ['Deployment time', 'Downtime duration', 'Test coverage', 'Automation rate', 'Error rate']
			},
			{
				id: 'legacy-modernization',
				title: 'Legacy System Modernization',
				description: 'Modernizing legacy applications with cloud migration and architecture updates',
				deliverables: [
					'Modernization strategy document',
					'Cloud migration plan',
					'Updated application architecture',
					'Data migration procedures',
					'Training materials'
				],
				clientInputs: [
					'Legacy system documentation',
					'Business requirements',
					'Migration constraints',
					'User training needs'
				],
				successCriteria: [
					'System performance improved by 60%',
					'Zero data loss during migration',
					'User adoption rate > 95%'
				],
				kpis: ['Performance improvement', 'Migration success rate', 'User adoption', 'Downtime reduction', 'Cost savings']
			}
		]
	},
	{
		id: 'cloud-services',
		name: 'Cloud Services',
		icon: '☁️',
		purpose: 'Complete cloud transformation with security-first architecture and cost optimization',
		summary: 'Migrate, optimize, and manage cloud infrastructure with enterprise-grade security and scalability',
		subServices: [
			{
				id: 'cloud-migration',
				title: 'Cloud Migration & Strategy',
				description: 'Assessment, planning, and execution of cloud migration with minimal downtime and risk',
				deliverables: [
					'Cloud readiness assessment',
					'Migration strategy document',
					'Infrastructure as Code templates',
					'Migration execution plan',
					'Post-migration optimization report'
				],
				clientInputs: [
					'Current infrastructure inventory',
					'Application dependencies',
					'Compliance requirements',
					'Budget constraints'
				],
				successCriteria: [
					'Zero data loss',
					'Downtime < 4 hours',
					'Cost reduction > 20%'
				],
				kpis: ['Migration success rate', 'Downtime duration', 'Cost savings', 'Performance improvement', 'Security compliance']
			},
			{
				id: 'cloud-optimization',
				title: 'Cloud Infrastructure Optimization',
				description: 'Performance tuning, cost optimization, and security hardening of cloud environments',
				deliverables: [
					'Performance analysis report',
					'Cost optimization recommendations',
					'Security hardening guide',
					'Monitoring & alerting setup',
					'Automation scripts'
				],
				clientInputs: [
					'Current cloud usage data',
					'Performance requirements',
					'Security policies',
					'Budget targets'
				],
				successCriteria: [
					'Performance improvement > 30%',
					'Cost reduction > 25%',
					'Security score > 95%'
				],
				kpis: ['Performance metrics', 'Cost reduction %', 'Security score', 'Uptime %', 'Resource utilization']
			},
			{
				id: 'multi-cloud-strategy',
				title: 'Multi-Cloud Strategy & Management',
				description: 'Multi-cloud architecture design, vendor management, and workload distribution',
				deliverables: [
					'Multi-cloud architecture design',
					'Vendor comparison analysis',
					'Workload distribution strategy',
					'Cost management framework',
					'Governance policies'
				],
				clientInputs: [
					'Business requirements',
					'Vendor preferences',
					'Compliance needs',
					'Budget allocation'
				],
				successCriteria: [
					'Vendor lock-in avoided',
					'Cost optimization achieved',
					'High availability maintained'
				],
				kpis: ['Vendor diversity', 'Cost efficiency', 'Availability %', 'Performance consistency', 'Risk mitigation']
			},
			{
				id: 'cloud-security',
				title: 'Cloud Security & Compliance',
				description: 'Cloud security architecture, compliance frameworks, and threat protection',
				deliverables: [
					'Security architecture design',
					'Compliance framework mapping',
					'Threat protection implementation',
					'Security monitoring setup',
					'Incident response procedures'
				],
				clientInputs: [
					'Security requirements',
					'Compliance standards',
					'Threat landscape analysis',
					'Security policies'
				],
				successCriteria: [
					'Security score > 95%',
					'Compliance requirements met',
					'Zero security incidents'
				],
				kpis: ['Security score', 'Compliance %', 'Threat detection rate', 'Incident response time', 'Vulnerability count']
			},
			{
				id: 'cloud-native-development',
				title: 'Cloud-Native Application Development',
				description: 'Containerization, microservices, and serverless application development',
				deliverables: [
					'Container orchestration setup',
					'Microservices architecture',
					'Serverless function deployment',
					'CI/CD pipeline configuration',
					'Monitoring & observability tools'
				],
				clientInputs: [
					'Application requirements',
					'Performance specifications',
					'Scaling requirements',
					'Development team capabilities'
				],
				successCriteria: [
					'Auto-scaling implemented',
					'Deployment time < 5 minutes',
					'Zero-downtime deployments'
				],
				kpis: ['Deployment frequency', 'Lead time', 'Mean time to recovery', 'Change failure rate', 'Performance metrics']
			},
			{
				id: 'cloud-monitoring',
				title: 'Cloud Monitoring & Observability',
				description: 'Comprehensive monitoring, logging, and observability solutions for cloud environments',
				deliverables: [
					'Monitoring dashboard setup',
					'Log aggregation system',
					'Alerting configuration',
					'Performance analytics',
					'Capacity planning reports'
				],
				clientInputs: [
					'Monitoring requirements',
					'Alert thresholds',
					'Reporting needs',
					'Integration requirements'
				],
				successCriteria: [
					'99.9% monitoring coverage',
					'Alert response time < 5 minutes',
					'Proactive issue detection'
				],
				kpis: ['Monitoring coverage', 'Alert response time', 'Issue detection rate', 'False positive rate', 'System uptime']
			}
		]
	}
];

export const engagementSteps: EngagementStep[] = [
	{
		id: 'discovery',
		label: 'Discovery & Assessment',
		description: 'Understand requirements, assess current state, and define project scope',
		outputs: ['Requirements document', 'Current state assessment', 'Project charter', 'Stakeholder analysis', 'Risk identification']
	},
	{
		id: 'planning',
		label: 'Planning & Design',
		description: 'Create detailed project plan, architecture design, and resource allocation',
		outputs: ['Project plan', 'Architecture diagrams', 'Resource allocation', 'Risk assessment', 'Timeline & milestones']
	},
	{
		id: 'implementation',
		label: 'Implementation & Development',
		description: 'Execute development, testing, and integration according to plan',
		outputs: ['Working solution', 'Test results', 'Documentation', 'Training materials', 'Quality assurance reports']
	},
	{
		id: 'testing',
		label: 'Testing & Validation',
		description: 'Comprehensive testing, validation, and quality assurance processes',
		outputs: ['Test execution reports', 'Performance validation', 'Security testing', 'User acceptance testing', 'Bug fixes']
	},
	{
		id: 'deployment',
		label: 'Deployment & Handover',
		description: 'Deploy solution, conduct training, and transfer knowledge',
		outputs: ['Deployed solution', 'User training', 'Support documentation', 'Knowledge transfer', 'Go-live support']
	}
];

export const crossCuttingCapabilities = [
	{
		title: 'Security-First Approach',
		description: 'Every solution is designed with security as a core principle, not an afterthought',
		icon: '🛡️'
	},
	{
		title: 'Agile Methodology',
		description: 'Iterative development with regular feedback and continuous improvement',
		icon: '🔄'
	},
	{
		title: 'DevOps Integration',
		description: 'Seamless integration of development and operations for faster delivery',
		icon: '⚡'
	},
	{
		title: 'Quality Assurance',
		description: 'Comprehensive testing and quality control throughout the development process',
		icon: '✅'
	},
	// Adding 4 more capabilities to reach a total of 8
	{
		title: 'Cloud-Native Architecture',
		description: 'Design and implementation of scalable, resilient systems leveraging cloud technologies',
		icon: '☁️'
	},
	{
		title: 'Data-Driven Insights',
		description: 'Transforming raw data into actionable intelligence for informed decision-making',
		icon: '📊'
	},
	{
		title: 'Continuous Innovation',
		description: 'Ongoing research and implementation of cutting-edge technologies and methodologies',
		icon: '💡'
	},
	{
		title: 'Sustainable Solutions',
		description: 'Environmentally conscious development practices for long-term operational efficiency',
		icon: '🌱'
	}
];

export const standardDeliverables = [
	'Assessment reports (executive summary + detailed findings)',
	'Remediation roadmaps & prioritized tickets',
	'Architecture diagrams (context, deployment, data flow)',
	'Security policy templates & governance docs',
	'Code repositories & container images',
	'IaC templates (Terraform, CloudFormation)',
	'Model artifacts (training code, weights, evaluation notebooks)',
	'APIs & SDKs for product consumption',
	'Dashboards & monitoring (Grafana/Kibana/BI)',
	'Playbooks & runbooks (incident response, on-call)',
	'Training materials & recordings',
	'Compliance mappings and audit evidence packages',
	'Signed reports and acceptance documents'
];

export const faqs = [
	{
		q: 'What is the first step?',
		a: 'We start with a discovery call to understand your requirements, current state, and objectives. This helps us create a tailored proposal with clear deliverables and timelines.'
	},
	{
		q: 'How long do projects typically take?',
		a: 'Project duration varies based on scope and complexity. Simple assessments can take 2-4 weeks, while comprehensive implementations may take 3-6 months. We provide detailed timelines in our proposals.'
	},
	{
		q: 'Do you work with existing teams?',
		a: 'Yes, we often collaborate with internal teams, providing expertise and guidance while working alongside your existing resources. We can also work independently when needed.'
	},
	{
		q: 'What about ongoing support?',
		a: 'We offer various support models including 24/7 monitoring, regular maintenance, and on-demand consulting. Support terms are defined in each engagement.'
	},
	{
		q: 'How do you ensure security?',
		a: 'Security is built into every solution from the ground up. We follow industry best practices, conduct regular security assessments, and maintain compliance with relevant standards.'
	}
];