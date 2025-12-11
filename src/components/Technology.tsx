import { motion } from 'framer-motion'
import {
  Brain,
  Database,
  Lock,
  Zap,
  Cloud,
  Code,
  Layers,
  Network,
  Server,
  Shield,
  Cpu,
  GitBranch,
} from 'lucide-react'

function Technology() {
  const techStack = [
    {
      category: 'AI & Machine Learning',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      items: [
        'Large Language Models (LLMs)',
        'Natural Language Understanding',
        'Semantic Search with Embeddings',
        'Intent Classification',
        'Entity Recognition',
        'Sentiment Analysis',
      ],
    },
    {
      category: 'Backend & Infrastructure',
      icon: Server,
      color: 'from-blue-500 to-cyan-500',
      items: [
        'Microservices Architecture',
        'RESTful & GraphQL APIs',
        'Redis Caching Layer',
        'Message Queue (RabbitMQ)',
        'Load Balancing',
        'Auto-scaling Infrastructure',
      ],
    },
    {
      category: 'Data & Storage',
      icon: Database,
      color: 'from-green-500 to-teal-500',
      items: [
        'PostgreSQL for Transactional Data',
        'MongoDB for Product Catalog',
        'Vector Database (Pinecone)',
        'Data Lake for Analytics',
        'Real-time Data Sync',
        'Backup & Disaster Recovery',
      ],
    },
    {
      category: 'Security & Compliance',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      items: [
        'End-to-End Encryption',
        'OAuth 2.0 & JWT',
        'PCI DSS Compliance',
        'GDPR Compliant',
        'Data Anonymization',
        'SOC 2 Type II Certified',
      ],
    },
  ]

  const architecture = [
    {
      layer: 'User Interface Layer',
      icon: Code,
      description: 'Web, Mobile, WhatsApp, Kiosk interfaces',
      technologies: ['React', 'React Native', 'WhatsApp Business API'],
    },
    {
      layer: 'API Gateway',
      icon: Network,
      description: 'Request routing, authentication, rate limiting',
      technologies: ['Kong', 'OAuth 2.0', 'Rate Limiter'],
    },
    {
      layer: 'Master Agent',
      icon: Layers,
      description: 'Orchestration, intent routing, response synthesis',
      technologies: ['Python', 'FastAPI', 'LLM Orchestration'],
    },
    {
      layer: 'Worker Agents',
      icon: GitBranch,
      description: 'Specialized agents for each domain',
      technologies: [
        'Recommendation',
        'Inventory',
        'Payment',
        'Fulfillment',
        'Support',
      ],
    },
    {
      layer: 'AI/ML Services',
      icon: Brain,
      description: 'LLM inference, embeddings, predictions',
      technologies: ['GPT-4', 'Claude', 'Vector Search', 'Fine-tuned Models'],
    },
    {
      layer: 'Data Layer',
      icon: Database,
      description: 'Product, inventory, customer, transaction data',
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Pinecone'],
    },
    {
      layer: 'Integration Layer',
      icon: Zap,
      description: 'POS, ERP, Payment, Logistics integrations',
      technologies: ['SAP', 'Shopify', 'Stripe', 'ShipRocket'],
    },
    {
      layer: 'Security & Monitoring',
      icon: Lock,
      description: 'Authentication, encryption, logging, alerts',
      technologies: ['AWS WAF', 'CloudWatch', 'Datadog', 'Sentry'],
    },
  ]

  const workflow = [
    { step: '1', title: 'User Query', description: 'Customer sends message' },
    {
      step: '2',
      title: 'NLU Processing',
      description: 'Extract intent & entities',
    },
    {
      step: '3',
      title: 'Master Agent',
      description: 'Route to Worker Agent',
    },
    {
      step: '4',
      title: 'Worker Execution',
      description: 'Fetch data, perform action',
    },
    {
      step: '5',
      title: 'Response Generation',
      description: 'LLM creates natural response',
    },
    {
      step: '6',
      title: 'User Receives',
      description: 'Formatted message delivered',
    },
  ]

  return (
    <section
      id="technology"
      className="section-padding bg-gradient-to-b from-white to-grey"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-navy/10 border border-navy/20 rounded-full px-4 py-2 mb-4">
            <Cpu className="w-4 h-4 text-navy" />
            <span className="text-sm font-medium text-navy">
              Built for Scale
            </span>
          </div>
          <h2 className="heading-lg text-navy mb-6">
            Enterprise-Grade{' '}
            <span className="text-gradient">Technology</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            KAI is built on a robust, scalable architecture using cutting-edge
            AI and cloud technologies to deliver exceptional performance and
            reliability.
          </p>
        </motion.div>

        {/* Technology Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center`}
                >
                  <tech.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy">
                  {tech.category}
                </h3>
              </div>
              <ul className="space-y-2">
                {tech.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    className="flex items-center space-x-2 text-sm text-gray-700"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tech.color}`}
                    />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Architecture Layers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-navy text-center mb-12">
            System Architecture
          </h3>
          <div className="space-y-4">
            {architecture.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 10 }}
                className="card bg-white border-l-4 border-teal"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal to-navy flex items-center justify-center flex-shrink-0">
                    <layer.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-navy mb-1">
                      {layer.layer}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {layer.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {layer.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-teal/10 text-teal text-xs font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Conversation Workflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card bg-gradient-to-br from-navy to-teal-dark text-white"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Conversation Workflow
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {workflow.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gold text-navy font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl">
                  {step.step}
                </div>
                <h4 className="font-semibold mb-1">{step.title}</h4>
                <p className="text-xs text-gray-300">{step.description}</p>
                {index < workflow.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-3 text-gold text-2xl">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '<500ms', label: 'API Response Time' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '10K+', label: 'Concurrent Users' },
            { value: '1M+', label: 'Messages/Day' },
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="card text-center"
            >
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal to-navy mb-2">
                {metric.value}
              </div>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Integration Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-navy mb-8">
            Seamless Integrations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              'Shopify',
              'SAP',
              'Salesforce',
              'Stripe',
              'WhatsApp',
              'AWS',
              'Google Cloud',
              'Azure',
              'MongoDB',
              'PostgreSQL',
              'Redis',
              'ShipRocket',
            ].map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-center font-semibold text-gray-700 text-sm hover:border-teal transition-all"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Technology
