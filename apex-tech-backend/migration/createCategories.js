'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      parentId: { type: Sequelize.INTEGER, allowNull: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      slug: { type: Sequelize.STRING(160), allowNull: false, unique: true },
      description: { type: Sequelize.TEXT },
      sortOrder: { type: Sequelize.INTEGER, defaultValue: 0 }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};