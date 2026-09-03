import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import defineProduct from './models/Product.js';
import { createProductController } from './controllers/productController.js';
import { createProductRouter } from './routes/productRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const sequelize = new Sequelize(
  process.env.DB_NAME || 'apex_tech_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

// Initialize Models & Controllers
const Product = defineProduct(sequelize);
const productController = createProductController(Product);

// Mount Routes
app.use('/api/products', createProductRouter(productController));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

// Start Server & Sync DB
sequelize.authenticate()
  .then(() => {
    console.log('MySQL Database connected successfully.');
    app.listen(PORT, () => {
      console.log(`Apex Tech Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err.message);
  });