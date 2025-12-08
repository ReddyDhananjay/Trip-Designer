import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Order } from '@/types';

const ordersFile = path.join(process.cwd(), 'data', 'orders.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const ordersData = fs.readFileSync(ordersFile, 'utf-8');
      const orders: Order[] = JSON.parse(ordersData);
      
      // Sort by date (newest first)
      orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
      
      return res.status(200).json(orders);
    }
    
    if (req.method === 'POST') {
      // Create new order
      const newOrder = req.body;
      const ordersData = fs.readFileSync(ordersFile, 'utf-8');
      const orders: Order[] = JSON.parse(ordersData);
      
      // Generate order ID if not provided
      if (!newOrder.id) {
        newOrder.id = `ORD-${Math.floor(10000000 + Math.random() * 90000000)}`;
      }
      
      // Set dates if not provided
      if (!newOrder.orderDate) {
        newOrder.orderDate = new Date().toISOString();
      }
      
      if (!newOrder.estimatedDelivery) {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7); // 7 days from now
        newOrder.estimatedDelivery = deliveryDate.toISOString();
      }
      
      // Set default status
      if (!newOrder.status) {
        newOrder.status = 'Processing';
      }
      
      orders.push(newOrder);
      fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
      
      return res.status(201).json(newOrder);
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Orders API error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
