import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Product } from '@/types';

const productsFile = path.join(process.cwd(), 'data', 'products.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(productsFile, 'utf-8');
      const products: Product[] = JSON.parse(data);
      
      const { category, featured } = req.query;
      
      let filtered = products;
      
      if (category && typeof category === 'string') {
        filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
      
      if (featured === 'true') {
        filtered = filtered.filter(p => p.featured);
      }
      
      res.status(200).json(filtered);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read products' });
    }
  } else if (req.method === 'POST') {
    // Admin: Add new product
    try {
      const data = fs.readFileSync(productsFile, 'utf-8');
      const products: Product[] = JSON.parse(data);
      
      const newProduct: Product = {
        ...req.body,
        id: String(Date.now()),
      };
      
      products.push(newProduct);
      fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
      
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create product' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
