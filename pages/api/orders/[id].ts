import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Order } from '@/types';

const ordersFile = path.join(process.cwd(), 'data', 'orders.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(ordersFile, 'utf-8');
      const orders: Order[] = JSON.parse(data);
      
      const order = orders.find(o => o.id === id);
      
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read order' });
    }
  } else if (req.method === 'PUT') {
    // Update order (e.g., change status)
    try {
      const data = fs.readFileSync(ordersFile, 'utf-8');
      const orders: Order[] = JSON.parse(data);
      
      const index = orders.findIndex(o => o.id === id);
      
      if (index === -1) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      orders[index] = { ...orders[index], ...req.body, id: id as string };
      fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
      
      res.status(200).json(orders[index]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update order' });
    }
  } else if (req.method === 'DELETE') {
    // Cancel order
    try {
      const data = fs.readFileSync(ordersFile, 'utf-8');
      const orders: Order[] = JSON.parse(data);
      
      const index = orders.findIndex(o => o.id === id);
      
      if (index === -1) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      orders[index].status = 'Cancelled';
      fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
      
      res.status(200).json(orders[index]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to cancel order' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
