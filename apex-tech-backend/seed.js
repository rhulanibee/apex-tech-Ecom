import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import { sequelize, Product } from './models/index.js';

// NOTE: these are generic stock photos, not your actual product photography.
// The previous seed had the ViewSonic AND MSI monitor sharing the exact same
// image URL, which is the "images don't match the product" bug you flagged.
// Every product below now has its own distinct primary image, plus a small
// `images` gallery array for the thumbnail rail on ProductDetailPage.
// Swap these for real product shots before your final submission if you
// have them - the field names/shape won't need to change.

const products = [
  // ---------- MONITORS ----------
  {
    name: 'ViewSonic VA240A-H 24" Monitor',
    category: 'monitors',
    price: 2099.00,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80',
      'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=600&q=80',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&q=80',
    ],
    description: '24" 100Hz IPS Gaming & Productivity Display',
    badgeText: '24" 120Hz FHD 1ms',
    isFlashDeal: false,
    specs: {
      'Screen Size': '24"',
      'Panel Type': 'IPS',
      'Refresh Rate': '100Hz',
      'Response Time': '1ms',
      'Resolution': '1920 x 1080 (FHD)',
      'Ports': 'HDMI, DisplayPort, VGA',
    },
  },
  {
    name: 'LG UltraGear 24GS60F 24" FHD IPS',
    category: 'monitors',
    price: 1999.00,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&q=80',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&q=80',
    ],
    description: 'Ultra-fast 180Hz gaming display with HDR10',
    badgeText: '24" 180Hz FHD 1ms',
    isFlashDeal: false,
    specs: {
      'Screen Size': '24"',
      'Panel Type': 'IPS',
      'Refresh Rate': '180Hz',
      'Response Time': '1ms',
      'Resolution': '1920 x 1080 (FHD)',
      'HDR': 'HDR10',
    },
  },
  {
    name: 'MSI PRO MP275 E2 27" 120Hz Monitor',
    category: 'monitors',
    price: 2399.00,
    compareAtPrice: 3199.00, // ~25% off - drives the Flash Deals badge
    stock: 20,
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&q=80',
      'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=600&q=80',
    ],
    description: '27 inch high refresh workspace and gaming monitor',
    badgeText: 'FLASH DEAL',
    isFlashDeal: true,
    specs: {
      'Screen Size': '27"',
      'Panel Type': 'IPS',
      'Refresh Rate': '120Hz',
      'Resolution': '1920 x 1080 (FHD)',
    },
  },
  {
    name: 'AOC 27G42E 27" 180Hz Ultra-Fast Gaming Monitor',
    category: 'monitors',
    price: 2899.00,
    compareAtPrice: 4999.00, // ~42% off
    stock: 12,
    image: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=600&q=80',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80',
    ],
    description: '27" 180Hz Fast IPS, 0.5ms, Adaptive Sync, 3-sided frameless design',
    badgeText: 'FLASH DEAL',
    isFlashDeal: true,
    specs: {
      'Screen Size': '27"',
      'Panel Type': 'Fast IPS',
      'Refresh Rate': '180Hz',
      'Response Time': '0.5ms',
      'Resolution': '1920 x 1080 (FHD)',
      'Adaptive Sync': 'Yes',
      'Warranty': '3 Years Local Warranty',
    },
  },

  // ---------- LAPTOPS (previously zero - this is the empty-category bug) ----------
  {
    name: 'ASUS TUF Gaming A15 Ryzen 7 / RTX 4060',
    category: 'laptops',
    price: 22999.00,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    ],
    description: '15.6" 144Hz gaming laptop, Ryzen 7 7735HS, RTX 4060 8GB, 16GB DDR5',
    badgeText: 'RTX 4060',
    isFlashDeal: false,
    specs: {
      'Processor': 'AMD Ryzen 7 7735HS',
      'Graphics': 'RTX 4060 8GB',
      'RAM': '16GB DDR5',
      'Storage': '512GB NVMe SSD',
      'Display': '15.6" FHD 144Hz',
    },
  },
  {
    name: 'Lenovo IdeaPad Slim 5 Intel Core i5',
    category: 'laptops',
    price: 12499.00,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&q=80',
    ],
    description: 'Everyday productivity laptop, Intel Core i5-1335U, 16GB RAM, 512GB SSD',
    badgeText: null,
    isFlashDeal: false,
    specs: {
      'Processor': 'Intel Core i5-1335U',
      'RAM': '16GB',
      'Storage': '512GB NVMe SSD',
      'Display': '15.6" FHD',
    },
  },
  {
    name: 'Apple MacBook Air M2 13"',
    category: 'laptops',
    price: 19999.00,
    compareAtPrice: 24999.00, // 20% off
    stock: 4,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    ],
    description: 'Apple M2 chip, 8GB unified memory, 256GB SSD, all-day battery life',
    badgeText: 'FLASH DEAL',
    isFlashDeal: true,
    specs: {
      'Chip': 'Apple M2',
      'RAM': '8GB unified',
      'Storage': '256GB SSD',
      'Display': '13.6" Liquid Retina',
    },
  },

  // ---------- GPUs ----------
  {
    name: 'GeForce RTX 4070 Ti Super 16GB',
    category: 'gpu',
    price: 16499.00,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&q=80'],
    description: 'High-end 1440p and 4K DLSS 3 ray tracing graphics card',
    badgeText: '16GB GDDR6X',
    isFlashDeal: false,
  },
  {
    name: 'AMD Radeon RX 7600 8GB',
    category: 'gpu',
    price: 6999.00,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&q=80'],
    description: '1080p high-refresh graphics card, great value for esports titles',
    badgeText: null,
    isFlashDeal: false,
  },

  // ---------- PRE-BUILT PCs ----------
  {
    name: 'Apex Horizon Custom Pre-Built Gaming PC',
    category: 'pcs',
    price: 24999.00,
    stock: 3,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80'],
    description: 'Ryzen 7 7800X3D, RTX 4070 Ti, 32GB DDR5, 2TB NVMe',
    badgeText: 'RTX 4070 Ti',
    isFlashDeal: false,
  },
  {
    name: 'Apex Starter Office & Study PC',
    category: 'pcs',
    price: 8999.00,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&q=80'],
    description: 'Ryzen 5 5600G, 16GB RAM, 512GB SSD - ideal for school and office work',
    badgeText: null,
    isFlashDeal: false,
  },

  // ---------- ACCESSORIES ----------
  {
    name: 'Logitech G502 Hero RGB Gaming Mouse',
    category: 'accessories',
    price: 699.00,
    compareAtPrice: 999.00, // 30% off
    stock: 45,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&q=80'],
    description: 'High-performance 25K DPI optical sensor mouse',
    badgeText: 'FLASH DEAL',
    isFlashDeal: true,
  },
  {
    name: 'Redragon K552 Mechanical Keyboard',
    category: 'accessories',
    price: 899.00,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80'],
    description: 'Compact RGB mechanical keyboard, blue switches',
    badgeText: null,
    isFlashDeal: false,
  },
  {
    name: 'HyperX Cloud II Gaming Headset',
    category: 'accessories',
    price: 1299.00,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80'],
    description: '7.1 virtual surround sound, memory foam ear cushions',
    badgeText: null,
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

  console.log(`Seeded ${products.length} products across ${new Set(products.map(p => p.category)).size} categories.`);
  await sequelize.close();
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
