import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { sequelize } from './models/index.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS: allow your React dev server / deployed frontend origin(s)
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',');
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());

app.get('/', (req, res) => res.send('Apex Tech API running...'));

// Previously only userRoutes was mounted here — product/cart/order routes
// existed as files but were never wired up, so those endpoints were
// unreachable no matter how correct the controller code was.
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected successfully.');

    await sequelize.sync({ alter: true });
    console.log('Database synced.');

    app.listen(PORT, () => console.log(`Apex Tech API running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
})();
