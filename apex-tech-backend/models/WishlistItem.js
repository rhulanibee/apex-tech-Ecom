import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const WishlistItem = sequelize.define('WishlistItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  wishlistId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: true });

export default WishlistItem;
