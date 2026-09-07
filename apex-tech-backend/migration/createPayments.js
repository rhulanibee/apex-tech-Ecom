'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      orderId: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'Orders', key: 'id' },
        onDelete: 'CASCADE'
      },
      method: { type: Sequelize.ENUM('card','paypal','bank_transfer','other'), allowNull: false },
      status: { type: Sequelize.ENUM('pending','succeeded','failed','refunded'), defaultValue: 'pending' },
      amount: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      transactionId: { type: Sequelize.STRING(255) },
      paidAt: { type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};