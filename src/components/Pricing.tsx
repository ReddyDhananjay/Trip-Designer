import { motion } from 'framer-motion'
import { Check, Sparkles, Zap, Crown } from 'lucide-react'

function Pricing() {
  const plans = [
    {
      name: 'Startup',
      subtitle: 'Free Trial',
      price: 'Free',
      period: '30 days',
      description: 'Perfect for testing KAI with a single store',
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      features: [
        '500 messages per month',
        'Single store location',
        'Basic analytics',
        'Web widget only',
        'Email support',
        'Product catalog up to 100 items',
        'Basic AI recommendations',
        'Community access',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Retail',
      subtitle: 'Most Popular',
      price: '₹29,999',
      period: 'per month',
      description: 'Ideal for growing retail businesses',
      icon: Zap,
      color: 'from-teal-500 to-green-500',
      features: [
        'Unlimited messages',
        'Up to 10 store locations',
        'Full dashboard & analytics',
        'Web + WhatsApp + Kiosk',
        'Priority support (24/7)',
        'Unlimited product catalog',
        'Advanced AI recommendations',
        'Inventory sync across stores',
        'Custom branding',
        'API access',
        'Multi-language support',
        'Reservation system',
      ],
      cta: 'Get Started',
      popular: true,
    },
    {
      name: 'Enterprise',
      subtitle: 'Custom Solution',
      price: 'Custom',
      period: 'contact us',
      description: 'For large retailers with complex needs',
      icon: Crown,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Everything in Retail plan',
        'Unlimited stores & locations',
        'Dedicated account manager',
        'Custom AI model training',
        'White-label solution',
        'SLA guarantees (99.9% uptime)',
        'Custom integrations',
        'On-premise deployment option',
        'Advanced security features',
        'Compliance certifications',
        'Data residency options',
        'Dedicated infrastructure',
        'Custom workflow automation',
        'Priority feature requests',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="section-padding bg-gradient-to-b from-white to-grey">
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
            <Zap className="w-4 h-4 text-teal" />
            <span className="text-sm font-medium text-teal">
              Simple, Transparent Pricing
            </span>
          </div>
          <h2 className="heading-lg text-navy mb-6">
            Choose Your <span className="text-gradient">Perfect Plan</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Start free, scale as you grow. No hidden fees, no surprises. Cancel
            anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative ${
                plan.popular
                  ? 'card ring-2 ring-teal shadow-2xl'
                  : 'card'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-teal to-navy text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    ⭐ MOST POPULAR
                  </div>
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6 mx-auto`}
              >
                <plan.icon className="w-8 h-8 text-white" />
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-navy text-center mb-1">
                {plan.name}
              </h3>
              <p className="text-sm text-gray-600 text-center mb-6">
                {plan.subtitle}
              </p>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center space-x-2">
                  <span
                    className={`text-5xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}
                  >
                    {plan.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{plan.period}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 text-center mb-6">
                {plan.description}
              </p>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-xl font-semibold mb-8 transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-teal to-navy text-white shadow-lg hover:shadow-xl'
                    : 'bg-navy/10 text-navy hover:bg-navy hover:text-white'
                }`}
              >
                {plan.cta}
              </button>

              {/* Features List */}
              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.03 }}
                    className="flex items-start space-x-3"
                  >
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.popular ? 'text-teal' : 'text-gray-400'
                      }`}
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card bg-gradient-to-br from-teal/10 to-navy/10 border border-teal/20"
        >
          <h3 className="text-2xl font-bold text-navy text-center mb-8">
            Available Add-ons
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Additional Store',
                price: '₹2,999/month',
                description: 'Add more store locations to your account',
              },
              {
                name: 'Custom AI Training',
                price: '₹49,999 one-time',
                description: 'Fine-tune AI on your specific product catalog',
              },
              {
                name: 'Dedicated Support',
                price: '₹19,999/month',
                description: '24/7 dedicated engineer with <1hr response time',
              },
            ].map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6"
              >
                <h4 className="font-bold text-navy mb-2">{addon.name}</h4>
                <p className="text-2xl font-bold text-teal mb-2">
                  {addon.price}
                </p>
                <p className="text-sm text-gray-600">{addon.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-navy mb-4">
            Questions about pricing?
          </h3>
          <p className="text-gray-600 mb-6">
            Our team is here to help you find the perfect plan for your
            business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Schedule a Call</button>
            <button className="btn-outline">View Full Comparison</button>
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 card bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 text-center"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-navy">
              30-Day Money Back Guarantee
            </h4>
          </div>
          <p className="text-gray-700">
            Try KAI risk-free. If you're not completely satisfied within the
            first 30 days, we'll refund your money — no questions asked.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
