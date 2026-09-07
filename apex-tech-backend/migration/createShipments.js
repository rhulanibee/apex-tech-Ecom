'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shipments', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      orderId: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'Orders', key: 'id' },
        onDelete: 'CASCADE'
      },
      carrier: { type: Sequelize.STRING(100), allowNull: false },
      trackingNumber: { type: Sequelize.STRING(255) },
      status: { 
        type: Sequelize.ENUM('preparing','shipped','in_transit','delivered','returned'), 
        defaultValue: 'preparing' 
      },
      shippedAt: { type: Sequelize.DATE },
      estimatedDelivery: { type: Sequelize.DATE },
      deliveredAt: { type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Shipments');
  }
};