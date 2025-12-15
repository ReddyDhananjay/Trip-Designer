export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  specs: Record<string, string>;
  stock: number;
  featured: boolean;
  platform?: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  totalPrice: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: string;
  estimatedDelivery: string;
  customerName?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}
