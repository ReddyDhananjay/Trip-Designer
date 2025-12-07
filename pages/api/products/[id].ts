import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Product } from '@/types';

const productsFile = path.join(process.cwd(), 'data', 'products.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(productsFile, 'utf-8');
      const products: Product[] = JSON.parse(data);
      
      const product = products.find(p => p.id === id);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read product' });
    }
  } else if (req.method === 'PUT') {
    // Admin: Update product
    try {
      const data = fs.readFileSync(productsFile, 'utf-8');
      const products: Product[] = JSON.parse(data);
      
      const index = products.findIndex(p => p.id === id);
      
      if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      products[index] = { ...products[index], ...req.body, id: id as string };
      fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
      
      res.status(200).json(products[index]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
  } else if (req.method === 'DELETE') {
    // Admin: Delete product
    try {
      const data = fs.readFileSync(productsFile, 'utf-8');
      const products: Product[] = JSON.parse(data);
      
      const filtered = products.filter(p => p.id !== id);
      
      if (filtered.length === products.length) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      fs.writeFileSync(productsFile, JSON.stringify(filtered, null, 2));
      
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
