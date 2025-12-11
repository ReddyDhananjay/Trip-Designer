import { motion } from 'framer-motion'
import {
  TrendingUp,
  ShoppingCart,
  MessageSquare,
  Target,
  Package,
  DollarSign,
  Users,
  BarChart3,
} from 'lucide-react'

interface DashboardPreviewProps {
  fullPage?: boolean
}

function DashboardPreview({ fullPage = false }: DashboardPreviewProps) {
  const metrics = [
    {
      icon: TrendingUp,
      label: 'Conversion Rate',
      value: '28.5%',
      change: '+12.3%',
      positive: true,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: ShoppingCart,
      label: 'Average Order Value',
      value: '₹4,285',
      change: '+60%',
      positive: true,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: MessageSquare,
      label: 'Active Conversations',
      value: '1,248',
      change: '+245',
      positive: true,
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Target,
      label: 'Recommendation Accuracy',
      value: '94.2%',
      change: '+8.7%',
      positive: true,
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: Package,
      label: 'Inventory Queries',
      value: '5,842',
      change: '+1,234',
      positive: true,
      color: 'from-teal-500 to-green-500',
    },
    {
      icon: DollarSign,
      label: 'Revenue (This Month)',
      value: '₹12.4M',
      change: '+85%',
      positive: true,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Users,
      label: 'Customer Satisfaction',
      value: '4.8/5',
      change: '+0.6',
      positive: true,
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: BarChart3,
      label: 'AI Utilization',
      value: '87%',
      change: '+15%',
      positive: true,
      color: 'from-cyan-500 to-blue-500',
    },
  ]

  const recentActivity = [
    { time: '2 mins ago', action: 'Customer reserved blue shirt at Store #42' },
    { time: '5 mins ago', action: '3 items added to cart via chat' },
    { time: '8 mins ago', action: 'Product recommendation: 92% match success' },
    { time: '12 mins ago', action: 'Inventory check: 15 stores queried' },
    { time: '15 mins ago', action: 'Payment completed: ₹3,499' },
  ]

  const topProducts = [
    { name: 'Blue Cotton Shirt', sales: 234, revenue: '₹3.04L' },
    { name: 'Denim Jeans - Slim Fit', sales: 198, revenue: '₹4.94L' },
    { name: 'White Sneakers', sales: 156, revenue: '₹5.46L' },
    { name: 'Black Leather Jacket', sales: 89, revenue: '₹5.34L' },
  ]

  return (
    <section
      id="dashboard"
      className={`${fullPage ? 'min-h-screen py-24' : 'section-padding'} bg-gradient-to-br from-grey to-white`}
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
            <BarChart3 className="w-4 h-4 text-navy" />
            <span className="text-sm font-medium text-navy">
              Analytics & Insights
            </span>
          </div>
          <h2 className="heading-lg text-navy mb-6">
            Manager <span className="text-gradient">Dashboard</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Real-time analytics, conversation insights, and performance metrics
            to help you make data-driven decisions.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card group"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <metric.icon className="w-6 h-6 text-white" />
              </div>

              {/* Label */}
              <p className="text-sm text-gray-600 mb-1">{metric.label}</p>

              {/* Value */}
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold text-navy">
                  {metric.value}
                </h3>
                <span
                  className={`text-sm font-semibold ${
                    metric.positive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {metric.change}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-navy">Revenue Trend</h3>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm bg-teal/10 text-teal rounded-lg font-medium">
                  Week
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 rounded-lg font-medium hover:bg-gray-100">
                  Month
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 rounded-lg font-medium hover:bg-gray-100">
                  Year
                </button>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="h-64 bg-gradient-to-br from-teal/5 to-navy/5 rounded-xl flex items-center justify-center relative overflow-hidden">
              {/* Mock Chart Bars */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around px-8 pb-8 space-x-2">
                {[65, 45, 78, 85, 60, 92, 88].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex-1 bg-gradient-to-t from-teal to-navy rounded-t-lg"
                  />
                ))}
              </div>
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-sm font-semibold text-navy">
                  +85% vs last period
                </p>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="text-xl font-bold text-navy mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex space-x-3 pb-3 border-b border-gray-100 last:border-0"
                >
                  <div className="w-2 h-2 bg-teal rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-teal font-semibold hover:text-teal-dark transition-colors">
              View All Activity →
            </button>
          </motion.div>
        </div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card mt-8"
        >
          <h3 className="text-xl font-bold text-navy mb-6">
            Top Selling Products
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-teal/5 to-navy/5 rounded-xl p-4 border border-teal/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-teal">
                    #{index + 1}
                  </span>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <h4 className="font-semibold text-navy mb-2 text-sm">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{product.sales} sold</span>
                  <span className="font-semibold text-teal">
                    {product.revenue}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 mb-6">
            Want to see your own data in action?
          </p>
          <button className="btn-primary">Request Dashboard Demo</button>
        </motion.div>
      </div>
    </section>
  )
}

export default DashboardPreview
