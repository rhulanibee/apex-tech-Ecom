import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import { sequelize, Product } from './models/index.js';

const products = [
  {
    name: 'ViewSonic VA240A-H 24" Monitor',
    category: 'monitors',
    price: 2099.00,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
    description: '24" 100Hz IPS Gaming & Productivity Display',
    badgeText: '24" 120Hz FHD 1ms',
    isFlashDeal: false,
  },
  {
    name: 'LG UltraGear 24GS60F 24" FHD IPS',
    category: 'monitors',
    price: 1999.00,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&q=80',
    description: 'Ultra-fast 180Hz gaming display with HDR10',
    badgeText: '24" 180Hz FHD 1ms',
    isFlashDeal: false,
  },
  {
    name: 'MSI PRO MP275 E2 27" 120Hz Monitor',
    category: 'monitors',
    price: 2399.00,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
    description: '27 inch high refresh workspace monitor',
    badgeText: 'FLASH DEAL',
    isFlashDeal: true,
  },
  {
    name: 'Logitech G502 Hero RGB Gaming Mouse',
    category: 'accessories',
    price: 699.00,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80',
    description: 'High-performance 25K DPI optical sensor mouse',
    badgeText: 'HOT DEAL',
    isFlashDeal: true,
  },
  {
    name: 'GeForce RTX 4070 Ti Super 16GB',
    category: 'gpu',
    price: 16499.00,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
    description: 'High-end 1440p and 4K DLSS 3 ray tracing graphics card',
    badgeText: '16GB GDDR6X',
    isFlashDeal: false,
  },
  {
    name: 'Apex Horizon Custom Pre-Built Gaming PC',
    category: 'pcs',
    price: 24999.00,
    stock: 3,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    description: 'Ryzen 7 7800X3D, RTX 4070 Ti, 32GB DDR5, 2TB NVMe',
    badgeText: 'RTX 4070 Ti',
    isFlashDeal: false,
  },
];

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  await connection.end();

  await sequelize.sync({ force: true }); // wipes and recreates all tables (dev only)
  await Product.bulkCreate(products);

  console.log(`Seeded ${products.length} products.`);
  await sequelize.close();
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
