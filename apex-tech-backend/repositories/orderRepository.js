import { Order, OrderItem, Product } from '../models/index.js';

class OrderRepository {
  async create(orderData, items) {
    const order = await Order.create(orderData);
    if (items && items.length > 0) {
      await Promise.all(
        items.map((item) => OrderItem.create({ ...item, orderId: order.id }))
      );
    }
    return this.findById(order.id);
  }

  async findById(id) {
    return Order.findByPk(id, { include: [{ model: OrderItem, include: [Product] }] });
  }

  async findByUser(userId) {
    return Order.findAll({
      where: { userId },
      include: [{ model: OrderItem, include: [Product] }],
      order: [['createdAt', 'DESC']],
    });
  }

  async updateStatus(id, status) {
    return Order.update({ status }, { where: { id } });
  }
}

export default new OrderRepository();
