import { motion } from 'framer-motion'
import { Play, MessageSquare, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

interface DemoProps {
  fullPage?: boolean
}

function Demo({ fullPage = false }: DemoProps) {
  return (
    <section
      id="demo"
      className={`${fullPage ? 'min-h-screen' : 'section-padding'} bg-gradient-to-br from-grey to-white`}
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
          <div className="inline-flex items-center space-x-2 bg-teal/10 border border-teal/30 rounded-full px-4 py-2 mb-4">
            <Play className="w-4 h-4 text-teal" />
            <span className="text-sm font-medium text-teal">
              Interactive Demo
            </span>
          </div>
          <h2 className="heading-lg text-navy mb-6">
            See KAI in <span className="text-gradient">Action</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Experience the magic of conversational commerce. Try asking KAI
            about products, check inventory, or make a reservation.
          </p>
        </motion.div>

        {/* Demo Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Demo Instructions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="card">
              <h3 className="text-2xl font-bold text-navy mb-4">
                Try These Examples:
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: '👕',
                    text: '"Show me blue cotton shirts in size M"',
                    category: 'Product Search',
                  },
                  {
                    icon: '📦',
                    text: '"Check if this is available at my nearest store"',
                    category: 'Inventory',
                  },
                  {
                    icon: '🛒',
                    text: '"Add to cart and apply my coupon"',
                    category: 'Checkout',
                  },
                  {
                    icon: '📍',
                    text: '"Reserve this for try-on at Store #42"',
                    category: 'Reservation',
                  },
                  {
                    icon: '💰',
                    text: '"Show me items under ₹2000"',
                    category: 'Price Filter',
                  },
                  {
                    icon: '🔍',
                    text: '"Compare these two products"',
                    category: 'Comparison',
                  },
                ].map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-3 p-4 bg-gradient-to-r from-teal/5 to-navy/5 rounded-xl border border-teal/10 cursor-pointer hover:border-teal/30 transition-all"
                  >
                    <div className="text-3xl">{example.icon}</div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-teal mb-1">
                        {example.category}
                      </div>
                      <p className="text-sm text-gray-700 font-medium">
                        {example.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Features Highlight */}
            <div className="card bg-gradient-to-br from-navy to-teal-dark text-white">
              <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-gold" />
                <span>What Makes KAI Special</span>
              </h4>
              <ul className="space-y-3">
                {[
                  'Understands natural language & context',
                  'Real-time inventory across all stores',
                  'Personalized recommendations',
                  'Complete checkout in chat',
                  'Works on web, WhatsApp & kiosks',
                  '24/7 availability with instant responses',
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Chat Demo Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sticky top-24"
          >
            <div className="card bg-white border-2 border-gray-200">
              {/* Chat Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal to-navy rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy">KAI Assistant</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-500">
                        Online & Ready
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-teal/10 rounded-full">
                  <span className="text-xs font-semibold text-teal">DEMO</span>
                </div>
              </div>

              {/* Sample Conversation */}
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto scrollbar-hide">
                {/* Bot Message 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-start"
                >
                  <div className="bg-grey rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-textDark">
                      Hi! 👋 I'm KAI. I can help you find products, check
                      availability, and complete purchases. What are you looking
                      for today?
                    </p>
                  </div>
                </motion.div>

                {/* User Message 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex justify-end"
                >
                  <div className="bg-navy text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm">
                      Show me blue cotton shirts in size M
                    </p>
                  </div>
                </motion.div>

                {/* Bot Message 2 with Products */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="flex justify-start"
                >
                  <div className="space-y-3 max-w-[85%]">
                    <div className="bg-grey rounded-2xl rounded-tl-sm px-4 py-3">
                      <p className="text-sm text-textDark">
                        Perfect! I found 8 blue cotton shirts in size M. Here
                        are the top matches:
                      </p>
                    </div>

                    {/* Product Preview Cards */}
                    <div className="space-y-2">
                      {[1, 2].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.7 + i * 0.2 }}
                          className="bg-gradient-to-br from-teal/10 to-navy/10 border border-teal/20 rounded-xl p-3 flex items-center space-x-3"
                        >
                          <div className="w-14 h-14 bg-teal/20 rounded-lg flex items-center justify-center text-2xl">
                            👕
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-navy">
                              Premium Cotton Shirt #{i}
                            </h4>
                            <p className="text-xs text-gray-600">₹1,299</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              <span className="text-xs text-green-600">
                                In Stock at Store #42
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* User Message 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 }}
                  className="flex justify-end"
                >
                  <div className="bg-navy text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm">Reserve the first one for me</p>
                  </div>
                </motion.div>

                {/* Bot Message 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3 }}
                  className="flex justify-start"
                >
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-textDark">
                      🎉 Great! I've reserved it for you.
                      <br />
                      <br />
                      <strong>Reservation ID:</strong> RES-2025-XYZ123
                      <br />
                      <strong>Store:</strong> Store #42, MG Road
                      <br />
                      <strong>Valid for:</strong> 24 hours
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center mb-3">
                  Click the chat button below to try it yourself! →
                </p>
                <Link to="/">
                  <button className="w-full btn-primary flex items-center justify-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Open Chat Widget</span>
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '<2s', label: 'Response Time' },
            { value: '95%', label: 'Accuracy' },
            { value: '3x', label: 'Faster Checkout' },
            { value: '24/7', label: 'Availability' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card text-center"
            >
              <div className="text-3xl font-bold text-teal mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Demo
