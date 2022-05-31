"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tahun_ajaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ jadwal_mapel }) {
      // define association here
      tahun_ajaran.hasMany(jadwal_mapel, {
        foreignKey: "idTahunAjaran",
        as: "jadwal_mapel",
      });
    }
  }
  tahun_ajaran.init(
    {
      thnAjaran: DataTypes.STRING,
      semester: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tahun_ajaran",
      tableName: "tahun_ajaran",
    }
  );
  return tahun_ajaran;
};
