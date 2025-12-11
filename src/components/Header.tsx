import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Technology', href: '/#technology' },
    { name: 'Demo', href: '/demo' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Team', href: '/#team' },
    { name: 'Contact', href: '/contact' },
  ]

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const element = document.getElementById(href.substring(2))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-teal rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L4 10V20H8V14H16V20H20V10L12 4Z"
                  fill="white"
                />
                <circle cx="12" cy="8" r="1.5" fill="#f6c24b" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-navy">
              KAI
              <span className="text-sm font-normal text-gray-600 ml-2 hidden md:inline">
                The Voice of Commerce
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.href
                    ? 'text-teal bg-teal/10'
                    : 'text-gray-700 hover:text-teal hover:bg-teal/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button className="btn-primary">Request Pilot</button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-navy hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="container-custom py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    location.pathname === item.href
                      ? 'text-teal bg-teal/10'
                      : 'text-gray-700 hover:text-teal hover:bg-teal/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button className="w-full btn-primary mt-4">
                Request Pilot
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
