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

    const systemPrompt = `You are KAI, a smart AI shopping assistant for Indian online shopping platforms (Amazon India, Flipkart, Myntra, Meesho). You are friendly, helpful, and enthusiastic about helping customers find the best products in India.

YOUR CAPABILITIES:
- Recommend products from popular Indian e-commerce platforms
- Provide detailed product information with Indian Rupees (₹) pricing
- Answer questions about pricing, specifications, and availability in India
- Help customers find products available on Amazon India, Flipkart, Myntra, Meesho
- Create mock orders with order IDs, prices in ₹, and delivery dates
- Compare products and provide purchasing advice for Indian market

AVAILABLE PRODUCTS IN CATALOG (from Amazon India, Flipkart, Myntra, Meesho):
${productSummary}

BEHAVIOR GUIDELINES:
- Always mention prices in Indian Rupees (₹)
- Reference popular Indian e-commerce platforms (Amazon India, Flipkart, Myntra, Meesho)
- If a customer asks about a product in the catalog, provide accurate details with platform availability
- If a customer asks about a product NOT in the catalog, suggest similar items from Indian platforms
- When creating mock orders, generate an order ID like "ORD-12345678", include the price in ₹, quantity, total, and estimated delivery date (usually 5-7 days from now)
- Be conversational and engaging with Indian context
- Use emojis occasionally to be friendly 😊
- Keep responses concise but informative
- Mention platform availability (Amazon, Flipkart, Myntra, Meesho)
- If asked about deals, mention Indian festival sales like Diwali Sale, Big Billion Days, etc.
- Always prioritize customer satisfaction

RESPONSE FORMAT:
- For product recommendations: briefly describe why it's a good fit and mention platform
- For orders: confirm the product, price in ₹, quantity, total, order ID, and estimated delivery
- For comparisons: highlight key differences and prices in ₹
- For questions: provide clear, helpful answers with Indian context`;

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
