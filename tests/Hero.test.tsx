import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Hero from '../src/components/Hero'

describe('Hero Component', () => {
  const renderHero = () => {
    return render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    )
  }

  test('renders hero headline', () => {
    renderHero()
    expect(screen.getByText(/KAI — The Voice of/i)).toBeInTheDocument()
    expect(screen.getByText(/Commerce/i)).toBeInTheDocument()
  })

  test('renders hero subheadline with key information', () => {
    renderHero()
    expect(
      screen.getByText(/Seamless conversational shopping/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/Web, WhatsApp, and in-store kiosks/i)).toBeInTheDocument()
  })

  test('renders CTA buttons', () => {
    renderHero()
    expect(screen.getByRole('button', { name: /Try Demo/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Request Pilot/i })).toBeInTheDocument()
  })

  test('displays key statistics', () => {
    renderHero()
    expect(screen.getByText('3x')).toBeInTheDocument()
    expect(screen.getByText('60%')).toBeInTheDocument()
    expect(screen.getByText('24/7')).toBeInTheDocument()
  })

  test('renders chat interface mockup', () => {
    renderHero()
    expect(screen.getByText('KAI Assistant')).toBeInTheDocument()
    expect(screen.getByText(/Online/i)).toBeInTheDocument()
  })

  test('displays example conversation', () => {
    renderHero()
    expect(
      screen.getByText(/Show me blue cotton shirts in size M/i)
    ).toBeInTheDocument()
  })

  test('renders feature badges', () => {
    renderHero()
    expect(screen.getByText(/AI Conversations/i)).toBeInTheDocument()
    expect(screen.getByText(/Smart Shopping/i)).toBeInTheDocument()
    expect(screen.getByText(/Personalized/i)).toBeInTheDocument()
  })

  test('shows "Powered by Agentic AI" badge', () => {
    renderHero()
    expect(screen.getByText(/Powered by Agentic AI/i)).toBeInTheDocument()
  })
})
