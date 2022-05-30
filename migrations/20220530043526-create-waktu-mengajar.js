"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("waktu_mengajar", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      kodeWaktuMengajar: {
        type: Sequelize.STRING,
      },
      jamMapel: {
        type: Sequelize.STRING,
      },
      waktuMapel: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("waktu_mengajar");
  },
};
