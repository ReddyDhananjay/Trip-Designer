import axios from 'axios'

const API_BASE_URL = '/api'

interface MessageResponse {
  message: string
  products?: Array<{
    id: string
    title: string
    price: number
    stock: number
    storeId?: string
  }>
}

interface ReservationResponse {
  reservationId: string
  storeId: string
  status: string
}

export const sendMessage = async (message: string): Promise<MessageResponse> => {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock response based on message content
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes('shirt') || lowerMessage.includes('cotton') || lowerMessage.includes('blue')) {
      return {
        message: "I found 8 blue cotton shirts in your size! Here are my top recommendations:",
        products: [
          {
            id: 'prod_001',
            title: 'Premium Blue Cotton Shirt - Size M',
            price: 1299,
            stock: 5,
            storeId: 'Store #42',
          },
          {
            id: 'prod_002',
            title: 'Classic Blue Oxford Shirt',
            price: 1599,
            stock: 3,
            storeId: 'Store #42',
          },
          {
            id: 'prod_003',
            title: 'Slim Fit Blue Dress Shirt',
            price: 1799,
            stock: 2,
            storeId: 'Store #15',
          },
        ],
      }
    }

    if (lowerMessage.includes('jeans') || lowerMessage.includes('denim')) {
      return {
        message: "Great choice! Here are some premium denim options:",
        products: [
          {
            id: 'prod_011',
            title: 'Classic Blue Jeans - Slim Fit',
            price: 2499,
            stock: 8,
            storeId: 'Store #42',
          },
          {
            id: 'prod_012',
            title: 'Dark Wash Denim Jeans',
            price: 2799,
            stock: 4,
            storeId: 'Store #15',
          },
        ],
      }
    }

    if (lowerMessage.includes('shoe') || lowerMessage.includes('sneaker')) {
      return {
        message: "Here are some stylish footwear options:",
        products: [
          {
            id: 'prod_021',
            title: 'White Leather Sneakers',
            price: 3499,
            stock: 6,
            storeId: 'Store #42',
          },
          {
            id: 'prod_022',
            title: 'Running Shoes - Black',
            price: 4299,
            stock: 3,
            storeId: 'Store #8',
          },
        ],
      }
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return {
        message: "I can help you find products within your budget. What's your price range?",
      }
    }

    if (lowerMessage.includes('stock') || lowerMessage.includes('available')) {
      return {
        message: "Yes! I can check real-time inventory across all our stores. Which product are you interested in?",
      }
    }

    if (lowerMessage.includes('thank')) {
      return {
        message: "You're welcome! Is there anything else I can help you with? 😊",
      }
    }

    // Default response
    return {
      message: "I'd be happy to help you find the perfect products! You can ask me about:\n• Products (shirts, jeans, shoes, etc.)\n• Sizes and colors\n• Store availability\n• Price ranges\n• Reservations\n\nWhat would you like to explore?",
    }
  } catch (error) {
    console.error('API Error:', error)
    throw new Error('Failed to send message')
  }
}

export const reserveProduct = async (
  productId: string
): Promise<ReservationResponse> => {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock reservation response
    const reservationId = `RES-${Date.now()}-${productId.slice(-4).toUpperCase()}`

    return {
      reservationId,
      storeId: 'Store #42',
      status: 'success',
    }
  } catch (error) {
    console.error('Reservation Error:', error)
    throw new Error('Failed to reserve product')
  }
}

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

export const getInventory = async (productId: string, storeId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/inventory?productId=${productId}&storeId=${storeId}`
    )
    return response.data
  } catch (error) {
    console.error('Failed to fetch inventory:', error)
    return null
  }
}
