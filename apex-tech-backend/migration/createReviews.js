'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      productId: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'Products', key: 'id' },
        onDelete: 'CASCADE'
      },
      userId: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      },
      rating: { type: Sequelize.INTEGER, allowNull: false },
      title: { type: Sequelize.STRING(255) },
      body: { type: Sequelize.TEXT },
      isVerified: { type: Sequelize.BOOLEAN, defaultValue: false },
      createdAt: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.addConstraint('Reviews', {
      fields: ['productId','userId'],
      type: 'unique',
      name: 'unique_review_per_user_product'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};