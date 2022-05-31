"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("jadwal_mapel", {
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
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      idGuru: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "guru",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      idKelas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "kelas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      idWaktuMengajar: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "waktu_mengajar",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      idTahunAjaran: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tahun_ajaran",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      hari: {
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
    await queryInterface.dropTable("jadwal_mapel");
  },
};
