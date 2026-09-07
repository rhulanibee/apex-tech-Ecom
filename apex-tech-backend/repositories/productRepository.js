import { Product } from '../models/index.js';

class ProductRepository {
  async findAll(filter = {}) {
    return Product.findAll({ where: filter, order: [['id', 'ASC']] });
  }
  async findById(id) {
    return Product.findByPk(id);
  }
  async create(productData) {
    return Product.create(productData);
  }
  async update(id, updates) {
    return Product.update(updates, { where: { id } });
  }
  async delete(id) {
    return Product.destroy({ where: { id } });
  }
}

export default new ProductRepository();
