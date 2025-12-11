import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '../src/components/ProductCard'

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 'prod_001',
    title: 'Premium Blue Cotton Shirt',
    price: 1299,
    stock: 5,
    storeId: 'Store #42',
  }

  const mockOnReserve = jest.fn()

  test('renders product information correctly', () => {
    render(<ProductCard {...mockProduct} onReserve={mockOnReserve} />)

    expect(screen.getByText('Premium Blue Cotton Shirt')).toBeInTheDocument()
    expect(screen.getByText('₹1,299')).toBeInTheDocument()
    expect(screen.getByText('In Stock')).toBeInTheDocument()
  })

  test('displays store location when provided', () => {
    render(<ProductCard {...mockProduct} onReserve={mockOnReserve} />)

    expect(screen.getByText(/Available at Store #42/i)).toBeInTheDocument()
  })

  test('shows "Reserve Now" button when product is in stock', () => {
    render(<ProductCard {...mockProduct} onReserve={mockOnReserve} />)

    const button = screen.getByRole('button', { name: /Reserve Now/i })
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
  })

  test('shows "Sold Out" button when product is out of stock', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 }
    render(<ProductCard {...outOfStockProduct} onReserve={mockOnReserve} />)

    const button = screen.getByRole('button', { name: /Sold Out/i })
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  test('calls onReserve callback when Reserve Now is clicked', () => {
    render(<ProductCard {...mockProduct} onReserve={mockOnReserve} />)

    const button = screen.getByRole('button', { name: /Reserve Now/i })
    fireEvent.click(button)

    expect(mockOnReserve).toHaveBeenCalledWith('prod_001')
    expect(mockOnReserve).toHaveBeenCalledTimes(1)
  })

  test('displays out of stock badge correctly', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 }
    render(<ProductCard {...outOfStockProduct} onReserve={mockOnReserve} />)

    expect(screen.getByText('Out of Stock')).toBeInTheDocument()
  })

  test('displays price correctly formatted', () => {
    const expensiveProduct = { ...mockProduct, price: 12345 }
    render(<ProductCard {...expensiveProduct} onReserve={mockOnReserve} />)

    expect(screen.getByText('₹12,345')).toBeInTheDocument()
  })

  test('shows discount price when applicable', () => {
    const productWithHighPrice = { ...mockProduct, price: 1500 }
    render(<ProductCard {...productWithHighPrice} onReserve={mockOnReserve} />)

    // Should show original price as strikethrough when price > 1000
    expect(screen.getByText(/₹1,800/i)).toBeInTheDocument()
  })

  test('handles missing optional props gracefully', () => {
    const minimalProduct = {
      id: 'prod_002',
      title: 'Test Product',
      price: 999,
      stock: 3,
    }

    render(<ProductCard {...minimalProduct} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('₹999')).toBeInTheDocument()
  })
})
