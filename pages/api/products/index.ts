import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Product } from '@/types';

const productsFile = path.join(process.cwd(), 'data', 'products.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const productsData = fs.readFileSync(productsFile, 'utf-8');
      const products: Product[] = JSON.parse(productsData);
      
      // Support filtering by category
      const { category, featured } = req.query;
      
      let filteredProducts = products;
      
      if (category && category !== 'All') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
      }
      
      if (featured === 'true') {
        filteredProducts = filteredProducts.filter(p => p.featured);
      }
      
      return res.status(200).json(filteredProducts);
    }
    
    if (req.method === 'POST') {
      // Add new product (admin only)
      const newProduct = req.body;
      const productsData = fs.readFileSync(productsFile, 'utf-8');
      const products: Product[] = JSON.parse(productsData);
      
      // Generate new ID
      const maxId = Math.max(...products.map(p => parseInt(p.id)), 0);
      newProduct.id = String(maxId + 1);
      
      products.push(newProduct);
      fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
      
      return res.status(201).json(newProduct);
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Products API error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
