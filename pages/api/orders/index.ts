import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Order } from '@/types';

const ordersFile = path.join(process.cwd(), 'data', 'orders.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(ordersFile, 'utf-8');
      const orders: Order[] = JSON.parse(data);
      
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read orders' });
    }
  } else if (req.method === 'POST') {
    try {
      const data = fs.readFileSync(ordersFile, 'utf-8');
      const orders: Order[] = JSON.parse(data);
      
      const orderId = `ORD-${Math.floor(10000000 + Math.random() * 90000000)}`;
      const newOrder: Order = {
        id: orderId,
        productId: req.body.productId,
        productName: req.body.productName,
        price: req.body.price,
        quantity: req.body.quantity || 1,
        totalPrice: req.body.price * (req.body.quantity || 1),
        status: 'Processing',
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        customerName: req.body.customerName || 'Guest',
      };
      
      orders.push(newOrder);
      fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
      
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create order' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
