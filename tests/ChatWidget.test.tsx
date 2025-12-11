import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ChatWidget from '../src/components/ChatWidget'

describe('ChatWidget Component', () => {
  test('renders floating chat button when closed', () => {
    render(<ChatWidget />)
    const button = screen.getByLabelText('Open chat')
    expect(button).toBeInTheDocument()
  })

  test('opens chat window when button is clicked', async () => {
    render(<ChatWidget />)
    const button = screen.getByLabelText('Open chat')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('KAI Assistant')).toBeInTheDocument()
    })
  })

  test('displays initial greeting message', async () => {
    render(<ChatWidget />)
    const button = screen.getByLabelText('Open chat')
    fireEvent.click(button)

    await waitFor(() => {
      expect(
        screen.getByText(/Hi! I'm KAI, your shopping assistant/i)
      ).toBeInTheDocument()
    })
  })

  test('can type and send a message', async () => {
    render(<ChatWidget />)
    const button = screen.getByLabelText('Open chat')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Ask me anything...')).toBeInTheDocument()
    })

    const input = screen.getByPlaceholderText('Ask me anything...')
    fireEvent.change(input, { target: { value: 'Show me blue shirts' } })
    expect(input).toHaveValue('Show me blue shirts')

    const sendButton = screen.getByLabelText('Send message')
    fireEvent.click(sendButton)

    await waitFor(() => {
      expect(screen.getByText('Show me blue shirts')).toBeInTheDocument()
    })
  })

  test('shows typing indicator while processing', async () => {
    render(<ChatWidget />)
    const button = screen.getByLabelText('Open chat')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Ask me anything...')).toBeInTheDocument()
    })

    const input = screen.getByPlaceholderText('Ask me anything...')
    fireEvent.change(input, { target: { value: 'Test message' } })

    const sendButton = screen.getByLabelText('Send message')
    fireEvent.click(sendButton)

    await waitFor(() => {
      expect(screen.getByText(/KAI is typing/i)).toBeInTheDocument()
    })
  })

  test('closes chat window when close button is clicked', async () => {
    render(<ChatWidget />)
    const openButton = screen.getByLabelText('Open chat')
    fireEvent.click(openButton)

    await waitFor(() => {
      expect(screen.getByLabelText('Close chat')).toBeInTheDocument()
    })

    const closeButton = screen.getByLabelText('Close chat')
    fireEvent.click(closeButton)

    await waitFor(() => {
      expect(screen.queryByText('KAI Assistant')).not.toBeInTheDocument()
    })
  })

  test('displays online status', async () => {
    render(<ChatWidget />)
    const button = screen.getByLabelText('Open chat')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Online')).toBeInTheDocument()
    })
  })

  test('input is disabled while message is being sent', async () => {
    render(<ChatWidget />)
    const button = screen.getByLabelText('Open chat')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Ask me anything...')).toBeInTheDocument()
    })

    const input = screen.getByPlaceholderText('Ask me anything...') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Test' } })

    const sendButton = screen.getByLabelText('Send message')
    fireEvent.click(sendButton)

    // Input should be disabled while sending
    expect(input.disabled).toBe(true)
  })
})
