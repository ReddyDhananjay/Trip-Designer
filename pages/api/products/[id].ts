import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Product } from '@/types';

const productsFile = path.join(process.cwd(), 'data', 'products.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  try {
    const productsData = fs.readFileSync(productsFile, 'utf-8');
    let products: Product[] = JSON.parse(productsData);
    
    if (req.method === 'GET') {
      const product = products.find(p => p.id === id);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      return res.status(200).json(product);
    }
    
    if (req.method === 'PUT') {
      // Update product (admin only)
      const index = products.findIndex(p => p.id === id);
      
      if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      products[index] = { ...products[index], ...req.body, id: id as string };
      fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
      
      return res.status(200).json(products[index]);
    }
    
    if (req.method === 'DELETE') {
      // Delete product (admin only)
      products = products.filter(p => p.id !== id);
      fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
      
      return res.status(200).json({ message: 'Product deleted successfully' });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Product API error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
