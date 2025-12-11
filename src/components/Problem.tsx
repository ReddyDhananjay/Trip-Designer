import { motion } from 'framer-motion'
import {
  AlertCircle,
  ShoppingCart,
  Search,
  TrendingDown,
  Users,
  XCircle,
  Frown,
  Target,
} from 'lucide-react'

function Problem() {
  const problems = [
    {
      icon: AlertCircle,
      title: 'Fragmented Journeys',
      description:
        'Customers struggle with disjointed experiences across web, mobile, and in-store channels.',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: Target,
      title: 'Poor Personalization',
      description:
        'Generic recommendations fail to engage customers, leading to missed sales opportunities.',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: Search,
      title: 'Inventory Uncertainty',
      description:
        'Customers can\'t verify real-time stock availability, causing frustration and cart abandonment.',
      color: 'from-amber-500 to-yellow-500',
    },
    {
      icon: ShoppingCart,
      title: 'Checkout Friction',
      description:
        'Complex checkout processes with multiple steps result in high abandonment rates.',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'Limited In-Store Help',
      description:
        'Staff shortages and long wait times leave customers without adequate assistance.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Frown,
      title: 'Customer Frustration',
      description:
        'Poor experience across touchpoints drives customers to competitors.',
      color: 'from-rose-500 to-red-500',
    },
    {
      icon: TrendingDown,
      title: 'Lost Conversions',
      description:
        'Retailers lose 60%+ of potential sales due to poor shopping experience.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: XCircle,
      title: 'No Unified Data',
      description:
        'Siloed systems prevent retailers from understanding the complete customer journey.',
      color: 'from-amber-500 to-orange-500',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="section-padding bg-gradient-to-b from-white to-grey">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-full px-4 py-2 mb-4">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-700">
              The Retail Challenge
            </span>
          </div>
          <h2 className="heading-lg text-navy mb-6">
            Modern Retail is{' '}
            <span className="text-gradient">Broken</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Today's retailers face unprecedented challenges in delivering
            seamless shopping experiences. Customer expectations are sky-high,
            but traditional systems can't keep up.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="card group cursor-pointer"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${problem.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <problem.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-teal transition-colors">
                {problem.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-2xl font-bold text-navy text-center mb-8">
            The Cost of Poor Experience
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: '69%', label: 'Average cart abandonment rate' },
              { value: '$18B', label: 'Lost revenue annually in US retail' },
              { value: '45%', label: 'Customers expect omnichannel' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-orange-600 mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Problem
