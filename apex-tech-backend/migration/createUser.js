'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      passwordHash: { type: Sequelize.STRING(255), allowNull: false },
      firstName: { type: Sequelize.STRING(100), allowNull: false },
      lastName: { type: Sequelize.STRING(100), allowNull: false },
      role: { type: Sequelize.ENUM('Admin', 'User'), defaultValue: 'User' },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};