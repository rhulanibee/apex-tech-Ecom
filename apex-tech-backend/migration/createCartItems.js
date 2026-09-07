'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartItems', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      cartId: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'Carts', key: 'id' },
        onDelete: 'CASCADE'
      },
      productId: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'Products', key: 'id' },
        onDelete: 'CASCADE'
      },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      priceAtAdd: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      addedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CartItems');
  }
};