"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pertemuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ jadwal_mapel, absen }) {
      // define association here
      pertemuan.belongsTo(jadwal_mapel, {
        foreignKey: "idJadwalMapel",
        as: "jadwalMapel",
      });

      pertemuan.hasMany(absen, {
        foreignKey: "idPertemuan",
        as: "absen",
      });
    }
  }
  pertemuan.init(
    {
      idJadwalMapel: DataTypes.INTEGER,
      pertemuan: DataTypes.STRING,
      tanggal: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "pertemuan",
      tableName: "pertemuan",
    }
  );
  return pertemuan;
};
