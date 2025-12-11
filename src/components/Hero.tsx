import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare, ShoppingBag, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-navy-light to-teal-dark">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-teal/20"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-teal/20 backdrop-blur-sm border border-teal/30 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium">
                Powered by Agentic AI
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="heading-xl text-white mb-6"
            >
              KAI — The Voice of{' '}
              <span className="text-gold">Commerce</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-200 mb-8 leading-relaxed"
            >
              Seamless conversational shopping across Web, WhatsApp, and
              in-store kiosks. Personalized recommendations, real-time
              inventory checks, and frictionless checkout — all in one unified
              AI-driven experience.
            </motion.p>

            {/* Key Features Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {[
                { icon: MessageSquare, text: 'AI Conversations' },
                { icon: ShoppingBag, text: 'Smart Shopping' },
                { icon: Sparkles, text: 'Personalized' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
                >
                  <feature.icon className="w-4 h-4 text-teal" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/demo">
                <button className="btn-primary flex items-center space-x-2 group">
                  <span>Try Demo</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300">
                Request Pilot
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20"
            >
              {[
                { value: '3x', label: 'Conversion Rate' },
                { value: '60%', label: 'Higher AOV' },
                { value: '24/7', label: 'AI Support' },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-gold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card - Chat Interface Mockup */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
              {/* Chat Header */}
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-teal to-navy rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy">KAI Assistant</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-navy text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs">
                    <p className="text-sm">
                      Show me blue cotton shirts in size M
                    </p>
                  </div>
                </div>

                {/* Bot Message */}
                <div className="flex justify-start">
                  <div className="bg-grey rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs">
                    <p className="text-sm text-textDark">
                      I found 8 blue cotton shirts in size M. Here are the top
                      3 matches based on your preferences:
                    </p>
                  </div>
                </div>

                {/* Product Cards */}
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="bg-gradient-to-br from-teal/10 to-navy/10 rounded-xl p-3 flex items-center space-x-3 border border-teal/20"
                    >
                      <div className="w-16 h-16 bg-teal/20 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-teal" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-navy">
                          Premium Cotton Shirt
                        </h4>
                        <p className="text-xs text-gray-600">₹1,299</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          <span className="text-xs text-green-600">
                            In Stock
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="flex items-center space-x-2 bg-grey rounded-full px-4 py-3">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent outline-none text-sm text-textDark"
                  disabled
                />
                <button className="w-8 h-8 bg-teal rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 bg-gold text-navy font-bold px-6 py-3 rounded-full shadow-xl"
            >
              🎯 85% Match
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-4 -left-4 bg-white text-navy font-semibold px-5 py-3 rounded-full shadow-xl flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-teal" />
              <span className="text-sm">AI-Powered</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/60 text-center"
        >
          <div className="text-xs mb-2">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1.5 h-1.5 bg-white/60 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
