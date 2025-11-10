'use client';

import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { CareersParticlesBackground } from '@/components/careers/careers-particles-background';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  MapPin,
  Building2,
  Clock,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Send,
  FileText,
  Mail,
  Link as LinkIcon
} from 'lucide-react';
import Link from 'next/link';

// Job data (should match the jobs in the main careers page)
const jobs: Record<string, any> = {
  'motion-graphics-designer': {
    title: 'Motion Graphics Designer',
    department: 'Creative',
    location: 'Remote',
    type: 'Contract-Based / Freelance',
    experience: 'Portfolio Required',
    icon: 'Video',
    color: 'from-purple-500 to-pink-500',
    companyOverview: 'We are a next-generation deeptech company driving innovation in AI/ML, Cybersecurity, Digital Infrastructure, and Product Development. Our mission is to empower businesses through intelligent, secure, and visually compelling technology solutions.',
    positionSummary: 'As a Motion Graphics Designer, you will be responsible for creating visually captivating animations, explainer videos, and promotional visuals that reflect our company\'s futuristic and tech-driven identity. You\'ll work closely with the marketing and creative teams to produce dynamic visuals that effectively communicate our brand story, product features, and thought leadership content.',
    responsibilities: [
      'Conceptualize, design, and animate motion graphics for marketing campaigns, product explainers, and social media content',
      'Develop visually engaging animations for both short-form (social media, ads) and long-form (presentations, promotional videos) formats',
      'Incorporate sound effects, music, and transitions to enhance motion design',
      'Manage multiple projects simultaneously while meeting tight deadlines'
    ],
    requirements: [
      'Proven experience as a Motion Graphics Designer or Animator (Portfolio required)',
      'Proficiency in tools such as After Effects, Premiere Pro, Illustrator, Photoshop, Blender/Cinema 4D (optional but preferred)',
      'Strong sense of timing, visual storytelling, and composition',
      'Ability to translate abstract concepts into visually appealing motion pieces',
      'Familiarity with tech or cybersecurity-related themes is a plus',
      'Excellent attention to detail and ability to work independently in a fast-paced environment'
    ],
    preferred: [
      'Experience in 3D animation or visual effects',
      'Background in UI motion design or animated infographics',
      'Understanding of branding, marketing, or social media storytelling'
    ],
    benefits: [
      'Flexible remote work setup',
      'Creative freedom to experiment and showcase your visual storytelling skills',
      'Potential for long-term collaboration based on performance'
    ]
  },
  'python-ml-developer': {
    title: 'Python (Machine Learning) Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Internship',
    experience: 'Portfolio/GitHub',
    icon: 'Code',
    color: 'from-blue-500 to-cyan-500',
    companyOverview: 'We are a next-generation deeptech company driving innovation in AI/ML, Cybersecurity, Digital Infrastructure, and Product Development. Our mission is to empower businesses through intelligent, secure, and scalable technology solutions. We build production-grade ML systems that solve hard problems and deliver measurable value.',
    positionSummary: 'We\'re seeking a pragmatic, production-focused Python (Machine Learning) Developer to design, build, and deploy scalable ML systems that power our products and services. You\'ll work closely with product, data, and engineering teams to turn research prototypes into reliable, well-tested production pipelines and APIs. Ideal candidates combine strong ML fundamentals with production engineering experience and a bias for shipping.',
    responsibilities: [
      'Design, implement, and optimize machine learning models and pipelines in Python for real-world applications (classification, regression, ranking, NLP, CV, anomaly detection, etc.)',
      'Preprocess, explore, and engineer features from structured and unstructured datasets; create reproducible data pipelines',
      'Build and maintain production inference services (REST/gRPC APIs), batch jobs, and streaming pipelines',
      'Containerize models (Docker) and support deployment to cloud or on-prem environments (AWS/GCP/Azure, Kubernetes, or serverless)',
      'Implement CI/CD, model versioning, monitoring, and automated testing for ML workflows (unit tests, integration tests, data validation)',
      'Collaborate with researchers, data engineers, and product managers to translate business requirements into performant ML solutions',
      'Profile and optimize model latency, memory, and throughput for production constraints',
      'Document experiments, design decisions, and production runbooks; present results to stakeholders',
      'Troubleshoot production incidents and iterate quickly to improve model robustness and reliability'
    ],
    requirements: [
      'Proven experience building and shipping ML systems using Python. Portfolio/GitHub with examples or code samples required',
      'Strong proficiency in Python and common ML libraries (scikit-learn, pandas, NumPy). Experience with at least one deep learning framework (TensorFlow, PyTorch) preferred',
      'Solid understanding of ML fundamentals: training, validation, hyperparameter tuning, evaluation metrics, overfitting/regularization, feature engineering',
      'Experience with data pipelines and preprocessing (Airflow, Prefect, Spark, or equivalent)',
      'Experience deploying models using Docker and serving frameworks (FastAPI, Flask, TensorFlow Serving, TorchServe, or similar)',
      'Familiarity with cloud platforms (AWS/GCP/Azure) and cloud ML services',
      'Knowledge of MLOps practices: CI/CD, model monitoring, logging, alerts, and model governance',
      'Strong software engineering practices: modular code, automated tests, code reviews, and version control (git)',
      'Excellent problem-solving skills, attention to detail, and the ability to work independently on tight deadlines',
      'Strong verbal and written communication skills for cross-functional collaboration'
    ],
    preferred: [
      'Experience with NLP (transformers, Hugging Face) or computer vision workflows',
      'Experience with model compression/quantization, ONNX, or edge deployment',
      'Background in cybersecurity, privacy-preserving ML (federated learning, differential privacy), or data governance',
      'Familiarity with feature stores, experiment tracking (MLflow, Weights & Biases), and model registries',
      'Experience with real-time systems, streaming (Kafka), or time-series forecasting',
      'Advanced degree (M.S./Ph.D.) in CS, ML, statistics, or related field'
    ],
    benefits: [
      'Flexible remote work and project schedule',
      'Opportunity to work on cutting-edge ML problems with a cross-disciplinary team',
      'Creative freedom to experiment with models, architectures, and deployment strategies',
      'Potential for long-term collaboration and growth based on performance',
      'Competitive project-based compensation and performance incentives',
      'Access to mentorship from senior ML engineers and product teams'
    ]
  },
  'technical-sales-representative-intern': {
    title: 'Technical Sales Representative Intern',
    department: 'Sales',
    location: 'Remote',
    type: 'Internship (Performance based pay)',
    experience: 'Entry Level',
    icon: 'DollarSign',
    color: 'from-green-500 to-emerald-500',
    companyOverview: 'We are a next-generation DeepTech company driving innovation in AI/ML, Cybersecurity, Digital Infrastructure, and Product Development. Our mission is to empower businesses through intelligent, secure, and scalable technology solutions. As we continue to expand, we\'re seeking passionate and results-driven professionals who can blend the art of sales with the world of technology.',
    positionSummary: 'We\'re looking for a high-performing Technical Sales Representative Intern to join our growing remote sales team. The ideal candidate will be responsible for driving revenue growth by identifying new business opportunities, nurturing leads, and closing deals across our AI, cybersecurity, and product development solutions. This role is performance-oriented and ideal for a motivated self-starter who thrives in a fast-paced, tech-driven environment.',
    responsibilities: [
      'Actively identify and pursue new sales opportunities through outreach, networking, and research',
      'Generate qualified leads using LinkedIn, emails, cold calls, and social selling tactics',
      'Present and promote our AI, cybersecurity, and product development solutions to prospective clients',
      'Conduct virtual meetings, product presentations, and discovery calls',
      'Build and maintain strong, long-term client relationships',
      'Achieve or exceed assigned sales targets and KPIs',
      'Provide feedback to the product and marketing teams based on client interactions'
    ],
    requirements: [
      'Familiarity with digital tools like Apollo, HubSpot, LinkedIn Sales Navigator, or similar platforms, and email outreach tools',
      'Strong verbal and written communication skills',
      'Confidence in presenting to clients and handling objections'
    ],
    preferred: [],
    benefits: [
      'Certificate of Internship',
      'Fully Remote Work Environment',
      'Performance-Based Incentives',
      'Opportunity to work with an innovative and fast-growing deeptech company',
      'Freedom to experiment, innovate, and make a measurable impact'
    ]
  }
};

interface JobDetailClientProps {
  jobSlug: string;
}

// Memoized list item component
const ListItem = memo(({ text, index, variant = 'primary' }: { text: string; index: number; variant?: 'primary' | 'secondary' }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className={`w-5 h-5 ${variant === 'primary' ? 'text-primary' : 'text-primary/70'} mt-0.5 flex-shrink-0`} />
    <span className="text-muted-foreground">{text}</span>
  </li>
));

ListItem.displayName = 'ListItem';

// Memoized section card component
const SectionCard = memo(({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    style={{ willChange: 'transform, opacity' }}
  >
    <Card className="border-2 border-primary/10 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  </motion.div>
));

SectionCard.displayName = 'SectionCard';

export function JobDetailClient({ jobSlug }: JobDetailClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize job data
  const job = useMemo(() => jobs[jobSlug], [jobSlug]);

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-8">The job you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/careers">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Careers
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Memoize responsibilities list
  const responsibilitiesList = useMemo(() => 
    job.responsibilities.map((responsibility: string, index: number) => (
      <ListItem key={index} text={responsibility} index={index} />
    )), [job.responsibilities]
  );

  // Memoize requirements list
  const requirementsList = useMemo(() => 
    job.requirements.map((requirement: string, index: number) => (
      <ListItem key={index} text={requirement} index={index} />
    )), [job.requirements]
  );

  // Memoize preferred list
  const preferredList = useMemo(() => 
    job.preferred?.map((pref: string, index: number) => (
      <ListItem key={index} text={pref} index={index} variant="secondary" />
    )) || [], [job.preferred]
  );

  // Memoize benefits list
  const benefitsList = useMemo(() => 
    job.benefits.map((benefit: string, index: number) => (
      <li key={index} className="flex items-start gap-2 text-sm">
        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
        <span className="text-muted-foreground">{benefit}</span>
      </li>
    )), [job.benefits]
  );

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Particle Background */}
      <CareersParticlesBackground />

      {/* Back Button */}
      <div className="relative z-10 pt-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ willChange: 'transform, opacity' }}
          >
            <Button
              asChild
              variant="ghost"
              className="mb-8 hover:bg-accent/50"
            >
              <Link href="/careers">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Careers
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 px-4 z-10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
            style={{ willChange: 'transform, opacity' }}
          >
            <Badge className="mb-4 px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
              {job.department} · {job.experience}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              {job.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Badge variant="outline" className="px-4 py-2">
                <MapPin className="w-4 h-4 mr-2" />
                {job.location}
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <Building2 className="w-4 h-4 mr-2" />
                {job.department}
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                {job.type}
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <Briefcase className="w-4 h-4 mr-2" />
                {job.experience}
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Details */}
      <section className="relative py-12 px-4 z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Company Overview */}
              {job.companyOverview && (
                <SectionCard title="Company Overview" delay={0.1}>
                  <p className="text-muted-foreground leading-relaxed">
                    {job.companyOverview}
                  </p>
                </SectionCard>
              )}

              {/* Position Summary */}
              {(job.positionSummary || job.description) && (
                <SectionCard title="Position Summary" delay={0.15}>
                  <p className="text-muted-foreground leading-relaxed">
                    {job.positionSummary || job.description}
                  </p>
                </SectionCard>
              )}

              {/* Responsibilities */}
              <SectionCard title="Key Responsibilities" delay={0.2}>
                <ul className="space-y-3">
                  {responsibilitiesList}
                </ul>
              </SectionCard>

              {/* Requirements */}
              <SectionCard title="Requirements" delay={0.3}>
                <ul className="space-y-3">
                  {requirementsList}
                </ul>
              </SectionCard>

              {/* Nice to Have */}
              {job.preferred && job.preferred.length > 0 && (
                <SectionCard title="Nice to Have" delay={0.4}>
                  <ul className="space-y-3">
                    {preferredList}
                  </ul>
                </SectionCard>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Apply Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <Card className={`border-2 border-primary/20 bg-gradient-to-br ${job.color} bg-opacity-10 backdrop-blur-sm`}>
                    <CardHeader>
                      <CardTitle className="text-2xl">Ready to Apply?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Submit your application and take the next step in your career.
                      </p>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white"
                      >
                        <Link href="#apply">
                          Apply Now
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Benefits */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <Card className="border-2 border-primary/10 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl">What We Offer</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {benefitsList}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <motion.div
            id="apply"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
            style={{ willChange: 'transform, opacity' }}
          >
            <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Apply for This Position</CardTitle>
              </CardHeader>
              <CardContent>
                <form action="/api/forms/careers-apply" method="post" className="space-y-6">
                  <input type="hidden" name="job_slug" value={jobSlug} />
                  <input type="hidden" name="job_title" value={job.title} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="full_name" className="text-sm font-medium flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        required
                        className="w-full rounded-md border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full rounded-md border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="resume_url" className="text-sm font-medium flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      Resume URL
                    </label>
                    <input
                      type="url"
                      id="resume_url"
                      name="resume_url"
                      className="w-full rounded-md border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="https://..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Link to your resume (Google Drive, Dropbox, etc.)
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="cover_letter" className="text-sm font-medium">
                      Cover Letter (Optional)
                    </label>
                    <textarea
                      id="cover_letter"
                      name="cover_letter"
                      rows={6}
                      className="w-full rounded-md border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Tell us why you're interested in this position..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white"
                    size="lg"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

