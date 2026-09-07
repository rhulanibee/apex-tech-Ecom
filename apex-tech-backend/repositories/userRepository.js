import { User } from '../models/index.js';

class UserRepository {
  async findByEmail(email) {
    return User.findOne({ where: { email } });
  }
  async findById(id) {
    return User.findByPk(id, { attributes: { exclude: ['passwordHash'] } });
  }
  async create(userData) {
    return User.create(userData);
  }
  async update(id, updates) {
    return User.update(updates, { where: { id } });
  }
  async delete(id) {
    return User.destroy({ where: { id } });
  }
}

export default new UserRepository();
