import { motion } from 'framer-motion'
import { Linkedin, Twitter, Github, Mail } from 'lucide-react'

function Team() {
  const team = [
    {
      name: 'Arjun Mehta',
      role: 'Co-Founder & CEO',
      bio: 'Former VP at Amazon. 15+ years in retail tech. IIT Delhi, Stanford MBA.',
      image: '👨‍💼',
      linkedin: '#',
      twitter: '#',
      email: 'arjun@kai-commerce.ai',
    },
    {
      name: 'Priya Sharma',
      role: 'Co-Founder & CTO',
      bio: 'Ex-Google AI Research. PhD in Machine Learning from MIT. 50+ patents.',
      image: '👩‍💻',
      linkedin: '#',
      twitter: '#',
      email: 'priya@kai-commerce.ai',
    },
    {
      name: 'Rahul Verma',
      role: 'Head of Product',
      bio: 'Built conversational AI at Microsoft. Product leader with 10+ years experience.',
      image: '👨‍🎨',
      linkedin: '#',
      twitter: '#',
      email: 'rahul@kai-commerce.ai',
    },
    {
      name: 'Ananya Iyer',
      role: 'Head of Engineering',
      bio: 'Led engineering at Flipkart. Expert in distributed systems & scalability.',
      image: '👩‍🔬',
      linkedin: '#',
      twitter: '#',
      email: 'ananya@kai-commerce.ai',
    },
    {
      name: 'Vikram Singh',
      role: 'Head of AI/ML',
      bio: 'AI researcher from CMU. Specialized in NLP and recommendation systems.',
      image: '👨‍🔬',
      linkedin: '#',
      twitter: '#',
      email: 'vikram@kai-commerce.ai',
    },
    {
      name: 'Neha Kapoor',
      role: 'Head of Customer Success',
      bio: 'Retail veteran with 12+ years. Helped 500+ brands transform digitally.',
      image: '👩‍💼',
      linkedin: '#',
      twitter: '#',
      email: 'neha@kai-commerce.ai',
    },
  ]

  return (
    <section id="team" className="section-padding bg-white">
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
            <span className="text-sm font-medium text-navy">
              Meet the Team
            </span>
          </div>
          <h2 className="heading-lg text-navy mb-6">
            Built by{' '}
            <span className="text-gradient">Retail & AI Experts</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our team combines deep retail experience with cutting-edge AI
            expertise to transform how people shop.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="card group"
            >
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-teal/20 to-navy/20 rounded-2xl flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {member.image}
                </div>
                {/* Status Badge */}
                <div className="absolute bottom-0 right-1/2 transform translate-x-16 translate-y-2 bg-green-500 px-3 py-1 rounded-full flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-xs text-white font-medium">
                    Active
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-navy mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-teal mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center space-x-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-navy/10 rounded-lg flex items-center justify-center hover:bg-navy hover:text-white transition-all duration-300 group-hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-navy/10 rounded-lg flex items-center justify-center hover:bg-navy hover:text-white transition-all duration-300 group-hover:scale-110"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="w-9 h-9 bg-navy/10 rounded-lg flex items-center justify-center hover:bg-navy hover:text-white transition-all duration-300 group-hover:scale-110"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 card bg-gradient-to-br from-navy to-teal-dark text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Join Our Team</h3>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate
            about retail, AI, and building products that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gold text-navy font-semibold px-8 py-3 rounded-xl hover:bg-gold-dark transition-all duration-300 transform hover:scale-105">
              View Open Positions
            </button>
            <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/20 transition-all duration-300">
              Learn About Our Culture
            </button>
          </div>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '50+', label: 'Team Members' },
            { value: '100+', label: 'Retail Partners' },
            { value: '15+', label: 'Countries' },
            { value: '₹500Cr', label: 'GMV Processed' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-teal mb-2">
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

export default Team
