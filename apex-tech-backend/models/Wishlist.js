import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Matches the schema already implied by migration/createWishlist.js.
// One default wishlist is auto-created per user the first time they save
// an item (see wishlistController.getOrCreateForUser).
const Wishlist = sequelize.define('Wishlist', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false, defaultValue: 'My Wishlist' },
  isPublic: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: true });

export default Wishlist;
