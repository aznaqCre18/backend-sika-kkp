"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class absen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ pertemuan, siswa }) {
      // define association here
      absen.belongsTo(pertemuan, {
        foreignKey: "idPertemuan",
        as: "pertemuan",
      });

      absen.belongsTo(siswa, {
        foreignKey: "idSiswa",
        as: "siswa",
      });
    }
  }
  absen.init(
    {
      idPertemuan: DataTypes.INTEGER,
      idSiswa: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "absen",
      tableName: "absen",
    }
  );
  return absen;
};
