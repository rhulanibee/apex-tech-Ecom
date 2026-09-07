import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Cart = sequelize.define('Cart', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: true }, // null = guest cart
  sessionId: { type: DataTypes.STRING(128), allowNull: true },
}, { timestamps: true });

export default Cart;
