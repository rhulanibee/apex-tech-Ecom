import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Also missing from the uploaded project — orderRepository.js imported it
// but it was never created.
const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  productName: { type: DataTypes.STRING(255), allowNull: false }, // snapshot at purchase time
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  priceAtPurchase: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { timestamps: true });

export default OrderItem;
