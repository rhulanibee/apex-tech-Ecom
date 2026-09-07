'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      categoryId: { type: Sequelize.INTEGER, allowNull: false },
      name: { type: Sequelize.STRING(255), allowNull: false },
      slug: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      description: { type: Sequelize.TEXT },
      sku: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      price: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      stockQty: { type: Sequelize.INTEGER, defaultValue: 0 },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      ratingAvg: { type: Sequelize.FLOAT, defaultValue: 0 },
      ratingCount: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};