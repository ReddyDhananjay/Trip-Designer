import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Order, Product } from '@/types';
import { formatINR } from '@/lib/format';

const productsFile = path.join(process.cwd(), 'data', 'products.json');
const ordersFile = path.join(process.cwd(), 'data', 'orders.json');

type ChatRole = 'user' | 'assistant' | 'system';
type IncomingMessage = { role: ChatRole; content: string };

function safeJsonParse<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

function tokenize(s: string) {
  return normalize(s)
    .split(' ')
    .map((t) => t.replace(/[^a-z0-9]+/g, ''))
    .filter(Boolean);
}

function bestProductMatch(products: Product[], query: string): Product | null {
  const q = normalize(query);
  const qTokens = tokenize(q);
  if (!qTokens.length) return null;

  let best: { score: number; product: Product } | null = null;
  for (const p of products) {
    const name = normalize(p.name);
    const desc = normalize(p.description);

    // Exact ID match
    if (String(p.id) === q) {
      return p;
    }

    let score = 0;
    if (name.includes(q)) score += 8;
    if (desc.includes(q)) score += 3;
    for (const t of qTokens) {
      if (t.length <= 2) continue;
      if (name.includes(t)) score += 2;
      else if (desc.includes(t)) score += 1;
    }
    if (!best || score > best.score) best = { score, product: p };
  }

  if (!best || best.score <= 1) return null;
  return best.product;
}

function pickTopByCategory(products: Product[], category: string, limit = 5) {
  const c = normalize(category);
  return products
    .filter((p) => normalize(p.category) === c)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.stock - a.stock)
    .slice(0, limit);
}

function parseQuantity(text: string) {
  const m = text.match(/\b(?:qty|quantity)\s*[:=]?\s*(\d{1,2})\b/i);
  if (m) return Math.max(1, Math.min(99, parseInt(m[1], 10)));

  // Fallback: a standalone small number in the message
  const n = text.match(/\b(\d{1,2})\b/);
  if (n) return Math.max(1, Math.min(99, parseInt(n[1], 10)));

  return 1;
}

function parseCustomerName(text: string) {
  // very lightweight: "my name is X" / "i am X"
  const m =
    text.match(/\bmy name is\s+([a-z][a-z .'-]{1,40})/i) ||
    text.match(/\bi am\s+([a-z][a-z .'-]{1,40})/i) ||
    text.match(/\bname\s*[:=]\s*([a-z][a-z .'-]{1,40})/i);
  return m?.[1]?.trim();
}

function createMockOrder(args: { product: Product; quantity: number; customerName?: string }): Order {
  const { product, quantity } = args;
  const safeQty = Math.max(1, Math.min(quantity, Math.max(1, product.stock)));
  const ordersRaw = fs.readFileSync(ordersFile, 'utf-8');
  const orders = safeJsonParse<Order[]>(ordersRaw, []);

  const now = Date.now();
  const id = `ORD-${Math.floor(10000000 + Math.random() * 90000000)}`;
  const order: Order = {
    id,
    productId: product.id,
    productName: product.name,
    price: product.price,
    quantity: safeQty,
    totalPrice: product.price * safeQty,
    status: 'Processing',
    orderDate: new Date().toISOString(),
    estimatedDelivery: new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString(),
    customerName: args.customerName?.trim() || 'Guest',
  };

  orders.push(order);
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
  return order;
}

function localAssistantReply(messages: IncomingMessage[], products: Product[]) {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
  const text = normalize(lastUser);

  if (!text) {
    return "Hi — I’m KAI. Tell me what you’re shopping for (e.g., “show me electronics”, “recommend a smartwatch”).";
  }

  const categories = Array.from(new Set(products.map((p) => p.category))).sort();

  // Deals / popular / featured
  if (/\b(deal|discount|offer|sale|today)\b/.test(text)) {
    const picks = products.filter((p) => p.featured).slice(0, 4);
    if (!picks.length) return 'No deals are configured in the demo catalog yet.';
    return [
      'Today’s demo “deals” (featured picks):',
      ...picks.map((p) => `- ${p.name} — ${formatINR(p.price)} (${p.platform || 'Amazon / Flipkart'})`),
      '',
      'Want me to create a mock order for any of these? Say: “create an order for <product> qty 1”.',
    ].join('\n');
  }

  if (/\b(popular|featured|trending|top)\b/.test(text)) {
    const picks = products.filter((p) => p.featured).slice(0, 6);
    return [
      'Popular items in the catalog:',
      ...picks.map((p) => `- ${p.name} — ${formatINR(p.price)} (${p.platform || 'Amazon / Flipkart'})`),
    ].join('\n');
  }

  // Category browse
  const mentionedCategory = categories.find((c) => text.includes(normalize(c)));
  if (mentionedCategory && /\b(show|list|browse|see)\b/.test(text)) {
    const picks = pickTopByCategory(products, mentionedCategory, 8);
    if (!picks.length) return `I couldn’t find items for category “${mentionedCategory}”.`;
    return [
      `Here are ${mentionedCategory} picks:`,
      ...picks.map((p) => `- ${p.name} — ${formatINR(p.price)} (stock: ${p.stock})`),
      '',
      'Want details on one? Say: “tell me about <product name>”.',
    ].join('\n');
  }

  // Order intent
  if (/\b(create|place)\b.*\border\b|\b(order|buy|purchase)\b/.test(text)) {
    const qty = parseQuantity(lastUser);
    const customerName = parseCustomerName(lastUser) || 'Guest';

    const product =
      bestProductMatch(products, lastUser.replace(/\b(?:qty|quantity)\b[\s:=]*\d{1,2}\b/gi, '')) ||
      bestProductMatch(products, lastUser);

    if (!product) {
      return [
        'I can create a mock order, but I couldn’t match the product.',
        'Try: “create an order for boAt Rockerz 450 qty 2”.',
      ].join('\n');
    }

    const order = createMockOrder({ product, quantity: qty, customerName });
    return [
      'Mock order created.',
      `- Order ID: ${order.id}`,
      `- Customer: ${order.customerName}`,
      `- Product: ${order.productName}`,
      `- Quantity: ${order.quantity}`,
      `- Total: ${formatINR(order.totalPrice)}`,
      `- ETA: ${new Date(order.estimatedDelivery).toLocaleDateString('en-IN')}`,
      '',
      'You can view it on the Orders page.',
    ].join('\n');
  }

  // Compare intent
  if (/\bcompare\b|\bvs\b/.test(text)) {
    const parts =
      lastUser.split(/\bvs\b/i).map((s) => s.trim()).filter(Boolean) ||
      lastUser.split(/,| and /i).map((s) => s.trim()).filter(Boolean);

    const a = parts[0] ? bestProductMatch(products, parts[0]) : null;
    const b = parts[1] ? bestProductMatch(products, parts[1]) : null;

    if (!a || !b) {
      return 'Tell me two product names to compare, e.g. “compare boAt Rockerz 450 vs boAt Stone 350”.';
    }

    const aKey = Object.keys(a.specs || {}).slice(0, 3);
    const bKey = Object.keys(b.specs || {}).slice(0, 3);
    return [
      `Comparison: ${a.name} vs ${b.name}`,
      `- Price: ${formatINR(a.price)} vs ${formatINR(b.price)}`,
      `- Category: ${a.category} vs ${b.category}`,
      `- Stock: ${a.stock} vs ${b.stock}`,
      aKey.length ? `- ${a.name} specs: ${aKey.map((k) => `${k}: ${a.specs[k]}`).join(', ')}` : '',
      bKey.length ? `- ${b.name} specs: ${bKey.map((k) => `${k}: ${b.specs[k]}`).join(', ')}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  }

  // Recommendation intent
  if (/\b(recommend|suggest)\b/.test(text)) {
    const c = mentionedCategory || categories.find((cat) => tokenize(cat).some((t) => text.includes(t)));
    const pool = c ? pickTopByCategory(products, c, 6) : products.filter((p) => p.featured).slice(0, 6);
    if (!pool.length) return 'I couldn’t find enough items to recommend from the catalog.';
    return [
      `Recommendations${c ? ` for ${c}` : ''}:`,
      ...pool.slice(0, 4).map((p) => `- ${p.name} — ${formatINR(p.price)} (${p.platform || 'Amazon / Flipkart'})`),
      '',
      'If you share your budget and use-case, I can narrow it down.',
    ].join('\n');
  }

  // Product details intent (by name match)
  const product = bestProductMatch(products, lastUser);
  if (product) {
    return [
      `${product.name}`,
      `- Price: ${formatINR(product.price)}`,
      `- Category: ${product.category}`,
      `- Stock: ${product.stock}`,
      `- Platforms: ${product.platform || 'Amazon / Flipkart'}`,
      `- About: ${product.description}`,
      '',
      'Want a mock order? Say: “create an order for this qty 1 (name: <your name>)”.',
    ].join('\n');
  }

  // Help / fallback
  if (/\b(help|what can you do|capabilities)\b/.test(text)) {
    return [
      'I can help you with:',
      `- Browse categories: ${categories.join(', ')}`,
      '- Recommendations: “recommend a product under ₹2000”',
      '- Product details: “tell me about Mi Smart Band 6”',
      '- Comparisons: “compare A vs B”',
      '- Mock orders: “create an order for <product> qty 2 (name: Rahul)”',
    ].join('\n');
  }

  return [
    "I can help you browse the catalog, compare products, or create a mock order.",
    `Try: “show me electronics”, “recommend something”, or “create an order for ${products[0]?.name} qty 1”.`,
  ].join('\n');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body as { messages?: IncomingMessage[] };

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Load products to provide context to KAI
    let products: Product[] = [];
    try {
      const productsData = fs.readFileSync(productsFile, 'utf-8');
      products = safeJsonParse<Product[]>(productsData, []);
    } catch {
      products = [];
    }

    // Prefer hosted LLM if configured; always fallback to local assistant.
    const hasOpenRouterKey = Boolean(process.env.OPENROUTER_API_KEY);
    if (hasOpenRouterKey) {
      try {
        const productSummary = products
          .map(
            (p) =>
              `${p.name} (ID: ${p.id}) - ${p.category} - ${formatINR(p.price)} - ${p.description} - Platforms: ${
                p.platform || 'Amazon, Flipkart'
              }`
          )
          .join('\n');

        const systemPrompt = `You are KAI — The Voice of Commerce — an AI-driven conversational retail assistant for the Indian market.

Use the catalog below as the source of truth. Keep responses concise, helpful, and action-oriented.
Always format prices in INR and mention platform availability when relevant.

CATALOG:
${productSummary}
`;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://kai-website.com',
            'X-Title': 'KAI Shopping Assistant',
          },
          body: JSON.stringify({
            model: 'anthropic/claude-3.5-sonnet',
            messages: [{ role: 'system', content: systemPrompt }, ...messages],
            temperature: 0.7,
            max_tokens: 800,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiMessage = data?.choices?.[0]?.message?.content;
          if (aiMessage) return res.status(200).json({ message: aiMessage, mode: 'openrouter' });
        } else {
          const errorData = await response.text();
          console.error('OpenRouter API error (falling back to local):', errorData);
        }
      } catch (e) {
        console.error('OpenRouter request failed (falling back to local):', e);
      }
    }

    const local = localAssistantReply(messages, products);
    return res.status(200).json({ message: local, mode: 'local' });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Failed to process chat request' });
  }
}
