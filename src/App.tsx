import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DemoPage from './pages/DemoPage'
import DashboardPage from './pages/DashboardPage'
import ContactPage from './pages/ContactPage'
import PricingPage from './pages/PricingPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </Layout>
  )
}

export default App
