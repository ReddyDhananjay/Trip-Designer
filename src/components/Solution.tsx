import { motion } from 'framer-motion'
import {
  Sparkles,
  MessageSquare,
  ShoppingBag,
  TrendingUp,
  Globe,
  Zap,
  CheckCircle,
  Users,
  BarChart3,
  Bot,
  Layers,
} from 'lucide-react'

function Solution() {
  const benefits = [
    {
      icon: MessageSquare,
      title: 'Unified Conversations',
      description:
        'Single AI assistant across web, WhatsApp, kiosk — seamless context switching.',
    },
    {
      icon: Bot,
      title: 'Agentic AI Architecture',
      description:
        'Master Agent orchestrates specialized Worker Agents for recommendations, inventory, payments, and more.',
    },
    {
      icon: Sparkles,
      title: 'Smart Personalization',
      description:
        'AI analyzes preferences, behavior, and context to deliver tailored product recommendations.',
    },
    {
      icon: ShoppingBag,
      title: 'Real-Time Inventory',
      description:
        'Instant stock checks across all stores with live availability updates.',
    },
    {
      icon: Zap,
      title: 'Frictionless Checkout',
      description:
        'Complete purchase in chat — payment, shipping, confirmation — in seconds.',
    },
    {
      icon: Globe,
      title: 'Multi-Channel Support',
      description:
        'Web widget, WhatsApp, in-store kiosks — customers choose their channel.',
    },
    {
      icon: TrendingUp,
      title: 'Higher AOV',
      description:
        'AI-powered cross-sell and upsell increase average order value by 60%.',
    },
    {
      icon: Users,
      title: 'Reduced Staff Load',
      description:
        'Automate routine queries, freeing staff for complex customer needs.',
    },
  ]

  return (
    <section id="solution" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-teal/10 border border-teal/30 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-teal" />
            <span className="text-sm font-medium text-teal">
              Introducing KAI
            </span>
          </div>
          <h2 className="heading-lg text-navy mb-6">
            Your AI-Powered{' '}
            <span className="text-gradient">Commerce Engine</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            KAI transforms retail with conversational AI that understands,
            personalizes, and delivers — across every customer touchpoint.
          </p>
        </motion.div>

        {/* Agentic Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 bg-gradient-to-br from-navy to-teal-dark rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-center mb-12">
              Agentic AI Architecture
            </h3>

            {/* Master Agent */}
            <div className="flex justify-center mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gold text-navy rounded-2xl p-6 shadow-2xl max-w-sm"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center">
                    <Layers className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Master Agent</h4>
                    <p className="text-xs opacity-80">
                      Orchestration & Routing
                    </p>
                  </div>
                </div>
                <p className="text-sm">
                  Analyzes user intent, routes to appropriate Worker Agents,
                  and synthesizes responses.
                </p>
              </motion.div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-gold text-4xl"
              >
                ↓
              </motion.div>
            </div>

            {/* Worker Agents */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  name: 'Recommendation',
                  icon: Sparkles,
                  desc: 'Product matching',
                },
                {
                  name: 'Inventory',
                  icon: BarChart3,
                  desc: 'Stock checks',
                },
                {
                  name: 'Payment',
                  icon: CheckCircle,
                  desc: 'Checkout flow',
                },
                {
                  name: 'Fulfillment',
                  icon: ShoppingBag,
                  desc: 'Delivery & pickup',
                },
                {
                  name: 'Support',
                  icon: Users,
                  desc: 'Help & FAQ',
                },
              ].map((agent, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
                >
                  <div className="w-12 h-12 bg-teal rounded-lg flex items-center justify-center mx-auto mb-3">
                    <agent.icon className="w-6 h-6 text-white" />
                  </div>
                  <h5 className="font-semibold mb-1">{agent.name}</h5>
                  <p className="text-xs text-gray-300">{agent.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="card group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal to-navy flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-br from-teal/10 to-navy/10 border border-teal/20 rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-2xl font-bold text-navy text-center mb-8">
            Proven Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: '3x', label: 'Conversion Rate', icon: TrendingUp },
              { value: '60%', label: 'Higher AOV', icon: ShoppingBag },
              { value: '24/7', label: 'Availability', icon: Zap },
              { value: '85%', label: 'Customer Satisfaction', icon: CheckCircle },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal to-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-navy mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Solution
