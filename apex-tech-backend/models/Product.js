import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Simple enum category (matches your real product catalog: monitors, laptops,
// gpu, pcs, accessories). This replaces the two conflicting Product schemas
// that existed across your two backend zips (one used categoryId -> Categories
// table with no seed data, the other used this enum with real seed data).
// If you need a full Categories table later (M5+), it's a straightforward
// migration, but this is the fastest path to a working demo by Friday.
const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  category: {
    type: DataTypes.ENUM('monitors', 'laptops', 'gpu', 'pcs', 'accessories'),
    allowNull: false,
  },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  image: { type: DataTypes.STRING(500), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  badgeText: { type: DataTypes.STRING(100), allowNull: true },
  isFlashDeal: { type: DataTypes.BOOLEAN, defaultValue: false },
  // Key/value spec matrix for ProductDetailPage, e.g.
  // { "Panel Type": "Fast IPS", "Refresh Rate": "180Hz" }. Optional/nullable
  // so existing seed rows without specs still work.
  specs: { type: DataTypes.JSON, allowNull: true },
}, {
  tableName: 'products',
  timestamps: true,
});

export default Product;

