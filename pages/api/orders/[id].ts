import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Order } from '@/types';

const ordersFile = path.join(process.cwd(), 'data', 'orders.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  try {
    const ordersData = fs.readFileSync(ordersFile, 'utf-8');
    let orders: Order[] = JSON.parse(ordersData);
    
    if (req.method === 'GET') {
      const order = orders.find(o => o.id === id);
      
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      return res.status(200).json(order);
    }
    
    if (req.method === 'PUT') {
      // Update order status
      const index = orders.findIndex(o => o.id === id);
      
      if (index === -1) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      orders[index] = { ...orders[index], ...req.body, id: id as string };
      fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
      
      return res.status(200).json(orders[index]);
    }
    
    if (req.method === 'DELETE') {
      // Cancel order
      const index = orders.findIndex(o => o.id === id);
      
      if (index === -1) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      orders[index].status = 'Cancelled';
      fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
      
      return res.status(200).json(orders[index]);
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Order API error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
