import { Wishlist, WishlistItem, Product } from '../models/index.js';

class WishlistRepository {
  async findByUser(userId) {
    return Wishlist.findOne({
      where: { userId },
      include: [{ model: WishlistItem, include: [Product] }],
    });
  }

  async create(userId) {
    return Wishlist.create({ userId });
  }

  async findOrCreateForUser(userId) {
    let wishlist = await this.findByUser(userId);
    if (!wishlist) wishlist = await this.create(userId);
    return wishlist;
  }

  async addItem(wishlistId, productId) {
    const existing = await WishlistItem.findOne({ where: { wishlistId, productId } });
    if (existing) return existing;
    return WishlistItem.create({ wishlistId, productId });
  }

  async removeItem(wishlistId, productId) {
    return WishlistItem.destroy({ where: { wishlistId, productId } });
  }
}

export default new WishlistRepository();
