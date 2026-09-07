import { Cart, CartItem, Product } from '../models/index.js';

class CartRepository {
  async findByUser(userId) {
    return Cart.findOne({
      where: { userId },
      include: [{ model: CartItem, include: [Product] }],
    });
  }

  async create(cartData) {
    return Cart.create(cartData);
  }

  async findOrCreateForUser(userId) {
    let cart = await this.findByUser(userId);
    if (!cart) cart = await this.create({ userId });
    return cart;
  }

  async addItem(cartId, itemData) {
    const existing = await CartItem.findOne({
      where: { cartId, productId: itemData.productId },
    });
    if (existing) {
      existing.quantity += itemData.quantity;
      return existing.save();
    }
    return CartItem.create({ ...itemData, cartId });
  }

  async removeItem(cartId, productId) {
    return CartItem.destroy({ where: { cartId, productId } });
  }

  async clearCart(cartId) {
    return CartItem.destroy({ where: { cartId } });
  }
}

export default new CartRepository();
