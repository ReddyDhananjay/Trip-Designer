import { motion } from 'framer-motion'
import {
  MessageCircle,
  Brain,
  ShoppingBag,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from 'lucide-react'

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Start a Conversation',
      description:
        'Customers open KAI on your website, WhatsApp, or in-store kiosk. They can type or speak naturally.',
      icon: MessageCircle,
      color: 'from-blue-500 to-cyan-500',
      image: '💬',
      details: [
        'Web widget integration',
        'WhatsApp Business API',
        'In-store kiosk touchpoints',
        'Voice and text input',
      ],
    },
    {
      number: '02',
      title: 'AI Understands & Personalizes',
      description:
        'KAI analyzes intent, preferences, and context. Master Agent routes to specialized Worker Agents for recommendations and inventory.',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      image: '🧠',
      details: [
        'Natural language understanding',
        'Intent classification',
        'Product matching with embeddings',
        'Real-time inventory lookup',
      ],
    },
    {
      number: '03',
      title: 'Checkout or Reserve',
      description:
        'Customers complete purchase or reserve items for try-on. Session continues seamlessly across devices.',
      icon: ShoppingBag,
      color: 'from-green-500 to-teal-500',
      image: '🛍️',
      details: [
        'In-chat payment processing',
        'Store pickup reservation',
        'Cross-device continuity',
        'Order confirmation & tracking',
      ],
    },
  ]

  return (
    <section
      id="how-it-works"
      className="section-padding bg-gradient-to-br from-navy via-navy-light to-teal-dark text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium">Simple 3-Step Process</span>
          </div>
          <h2 className="heading-lg mb-6">
            How <span className="text-gold">KAI Works</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            From conversation to conversion in three seamless steps. Watch how
            KAI transforms the shopping experience.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content Side */}
                <div
                  className={`${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  {/* Step Number Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className={`inline-block bg-gradient-to-br ${step.color} text-white text-4xl font-bold px-6 py-3 rounded-2xl mb-6 shadow-xl`}
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold">{step.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                        <span className="text-gray-300">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Visual Side */}
                <div
                  className={`${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="relative"
                  >
                    {/* Card */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
                      {/* Large Emoji/Icon */}
                      <div className="text-9xl text-center mb-6">
                        {step.image}
                      </div>

                      {/* Example Interaction */}
                      {index === 0 && (
                        <div className="space-y-3">
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-sm">
                            👤 "Show me blue cotton shirts in size M"
                          </div>
                          <div className="bg-teal/30 backdrop-blur-sm rounded-xl p-3 text-sm">
                            🤖 "I found 8 matches! Here are the top picks..."
                          </div>
                        </div>
                      )}

                      {index === 1 && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-xl p-3">
                            <span className="text-sm">Analyzing intent...</span>
                            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                          </div>
                          <div className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-xl p-3">
                            <span className="text-sm">Checking inventory...</span>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </div>
                          <div className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-xl p-3">
                            <span className="text-sm">Personalizing...</span>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </div>
                        </div>
                      )}

                      {index === 2 && (
                        <div className="space-y-3">
                          <div className="bg-green-500/30 backdrop-blur-sm rounded-xl p-4 border border-green-400/30">
                            <div className="flex items-center space-x-2 mb-2">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                              <span className="font-semibold">
                                Order Confirmed!
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">
                              Your items are ready for pickup at Store #42
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className={`absolute -top-4 -right-4 bg-gradient-to-br ${step.color} text-white font-bold px-4 py-2 rounded-full shadow-xl text-sm`}
                    >
                      Step {step.number}
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Arrow Between Steps */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center my-12"
                >
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-xl">
                    <ArrowRight className="w-8 h-8 text-navy rotate-90" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-xl text-gray-300 mb-6">
            Experience the magic yourself
          </p>
          <button className="bg-gold text-navy font-bold px-8 py-4 rounded-xl hover:bg-gold-dark transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-2 mx-auto">
            <span>Try Interactive Demo</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
