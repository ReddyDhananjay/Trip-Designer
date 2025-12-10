import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import ChatWidget from './ChatWidget'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default Layout
