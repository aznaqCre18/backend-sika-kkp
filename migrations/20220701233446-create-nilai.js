"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("nilai", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idMapel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "mapel",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      idSiswa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "siswa",
          key: "id",
        },
        onDelete: "CASCADE",
        onDelete: "CASCADE",
      },
      uh1: {
        type: Sequelize.STRING,
      },
      uh2: {
        type: Sequelize.STRING,
      },
      uts: {
        type: Sequelize.STRING,
      },
      uas: {
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
    await queryInterface.dropTable("nilai");
  },
};
