import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Product } from '@/types';

const productsFile = path.join(process.cwd(), 'data', 'products.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Load products to provide context to KAI
    const productsData = fs.readFileSync(productsFile, 'utf-8');
    const products: Product[] = JSON.parse(productsData);

    // Create product catalog summary for AI context
    const productSummary = products.map(p => 
      `${p.name} (ID: ${p.id}) - ${p.category} - ₹${p.price} - ${p.description} - Available on: ${(p as any).platform || 'Amazon, Flipkart'}`
    ).join('\n');

    const systemPrompt = `You are KAI, a smart AI shopping assistant for product discovery, guidance, and ordering support. You are friendly, helpful, and enthusiastic about helping customers find the best products.

YOUR CAPABILITIES:
- Understand ANY user message and respond intelligently
- Recommend products from the catalog or suggest realistic alternatives
- Provide detailed product information with pricing, specifications, and availability
- Compare products and help with purchasing decisions
- Create mock orders with order IDs, prices, quantities, and delivery dates
- Answer questions about products, deals, shipping, and more

AVAILABLE PRODUCTS IN CATALOG:
${productSummary}

IMPORTANT BEHAVIOR RULES:
1. PRODUCT QUERIES:
   - If user asks about a product that EXISTS in the catalog → provide accurate details (name, price ₹, category, description, specs, stock, platform)
   - If user asks about a product that DOES NOT exist in catalog → generate a realistic sample product with:
     * Realistic name and brand
     * Appropriate category
     * Reasonable price in ₹ (Indian market range)
     * Detailed description
     * Technical specifications
     * Mention it's available on popular platforms (Amazon, Flipkart, Myntra, Meesho)
     * Example: "I found the [Product Name] - it's a [category] priced at ₹[price]. [Description]. Available on Amazon and Flipkart."

2. MOCK ORDER CREATION:
   When user wants to create an order (e.g., "I want to order X", "Create order for Y", "Buy Z"):
   - Identify the product (from catalog or generated)
   - Confirm product name, price in ₹, and quantity
   - Generate a realistic order ID format: "ORD-[8-digit-number]" (e.g., ORD-12345678)
   - Calculate total price (price × quantity)
   - Provide estimated delivery date (typically 5-7 days from today)
   - Format response clearly with all order details
   - Example format:
     "✅ Order Created Successfully!
     Order ID: ORD-12345678
     Product: [Product Name]
     Quantity: [X]
     Unit Price: ₹[price]
     Total Price: ₹[total]
     Estimated Delivery: [Date in 5-7 days]
     Status: Processing
     
     You can view this order in the Orders page!"

3. GENERAL GUIDELINES:
   - Always use Indian Rupees (₹) for pricing
   - Be conversational, friendly, and helpful
   - Use emojis occasionally to make responses engaging 😊
   - Keep responses concise but informative
   - If asked about deals, mention sales like Diwali Sale, Big Billion Days, etc.
   - For product recommendations, explain why it's a good fit
   - For comparisons, highlight key differences clearly
   - Always prioritize helping the customer

RESPONSE STYLE:
- Be natural and conversational
- Show enthusiasm when recommending products
- Be clear and specific with numbers and details
- Use bullet points or formatting for order confirmations
- Ask follow-up questions when helpful`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://kai-website.com',
        'X-Title': 'KAI Shopping Assistant'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API error:', errorData);
      return res.status(response.status).json({ 
        error: 'AI service error', 
        details: errorData 
      });
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    res.status(200).json({ message: aiMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Failed to process chat request' });
  }
}
