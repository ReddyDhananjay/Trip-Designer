import { motion } from 'framer-motion'
import {
  MessageSquare,
  Search,
  Mic,
  Globe,
  Package,
  Sparkles,
  ShoppingCart,
  GitCompare,
  MapPin,
  Truck,
  User,
  BarChart3,
  Zap,
  Shield,
  Clock,
  Languages,
} from 'lucide-react'

function Features() {
  const features = [
    {
      icon: MessageSquare,
      title: 'Conversational Commerce',
      description:
        'Natural chat interface that understands context, intent, and nuance. Chat like you\'re talking to a friend.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Search,
      title: 'Natural Language Search',
      description:
        'Find products using everyday language. "Blue cotton shirts under ₹2000" works perfectly.',
      gradient: 'from-cyan-500 to-teal-500',
    },
    {
      icon: Mic,
      title: 'Voice-Enabled Interactions',
      description:
        'Speak to shop. Perfect for in-store kiosks and hands-free mobile shopping.',
      gradient: 'from-teal-500 to-green-500',
    },
    {
      icon: Globe,
      title: 'Multi-Channel Support',
      description:
        'Web widget, WhatsApp, in-store kiosks — KAI works everywhere your customers are.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Package,
      title: 'Real-Time Inventory',
      description:
        'Live stock checks across all locations. Never show out-of-stock items to customers.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Sparkles,
      title: 'AI Recommendations',
      description:
        'Personalized product suggestions based on preferences, behavior, and purchase history.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: ShoppingCart,
      title: 'Smart Cart & Checkout',
      description:
        'Add to cart, apply coupons, and complete payment — all within the conversation.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: GitCompare,
      title: 'Product Comparison',
      description:
        'Compare features, prices, and reviews side-by-side. Make informed decisions faster.',
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      icon: MapPin,
      title: 'Store Pickup & Reservation',
      description:
        'Reserve items for try-on at your nearest store. Check in-store availability instantly.',
      gradient: 'from-amber-500 to-yellow-500',
    },
    {
      icon: Truck,
      title: 'Fulfillment Integration',
      description:
        'Real-time delivery tracking, returns management, and order status updates.',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: User,
      title: 'Customer Intelligence',
      description:
        'Build rich customer profiles with preferences, size info, and purchase patterns.',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: BarChart3,
      title: 'Manager Dashboard',
      description:
        'Analytics, conversation insights, conversion metrics, and revenue tracking.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description:
        'Sub-second response times powered by optimized LLM inference and caching.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description:
        'End-to-end encryption, GDPR compliant, and PCI DSS certified payment processing.',
      gradient: 'from-slate-500 to-gray-500',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description:
        'Never sleep. KAI handles customer queries round the clock, every day of the year.',
      gradient: 'from-sky-500 to-blue-500',
    },
    {
      icon: Languages,
      title: 'Multi-Language',
      description:
        'Support for English, Hindi, Tamil, Telugu, Bengali, and 50+ more languages.',
      gradient: 'from-rose-500 to-pink-500',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <section id="features" className="section-padding bg-gradient-to-b from-grey to-white">
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
            <Sparkles className="w-4 h-4 text-navy" />
            <span className="text-sm font-medium text-navy">
              Everything You Need
            </span>
          </div>
          <h2 className="heading-lg text-navy mb-6">
            Powerful Features for{' '}
            <span className="text-gradient">Modern Retail</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            KAI comes packed with enterprise-grade features designed to
            transform your retail operations and delight your customers.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="card group cursor-pointer relative overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-teal transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to transform your retail experience?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Start Free Trial</button>
            <button className="btn-outline">Schedule Demo</button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features
