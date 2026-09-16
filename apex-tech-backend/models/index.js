import sequelize from '../config/db.js';
import User from './User.js';
import Product from './Product.js';
import Cart from './Cart.js';
import CartItem from './CartItem.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Wishlist from './Wishlist.js';
import WishlistItem from './WishlistItem.js';

// Associations (none of these existed before, which is why repository
// `include: [CartItem]` / `include: [OrderItem]` calls would have failed
// even once the require/import crashes were fixed).
User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

export { sequelize, User, Product, Cart, CartItem, Order, OrderItem, Wishlist, WishlistItem };
