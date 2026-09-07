'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      status: { 
        type: Sequelize.ENUM('pending','paid','processing','shipped','delivered','cancelled'), 
        defaultValue: 'pending' 
      },
      subtotal: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      tax: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      shippingFee: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      total: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      notes: { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};