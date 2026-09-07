import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// This model did not exist in the uploaded project — cartRepository.js
// imported it but the file was never created, which crashed the server.
const CartItem = sequelize.define('CartItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cartId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  priceAtAdd: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { timestamps: true });

export default CartItem;
