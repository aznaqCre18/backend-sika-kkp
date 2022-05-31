"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mapel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ jadwal_mapel }) {
      // define association here
      mapel.hasMany(jadwal_mapel, {
        foreignKey: "idMapel",
        as: "jadwal_mapel",
      });
    }
  }
  mapel.init(
    {
      namaMapel: DataTypes.STRING,
      kodeMapel: DataTypes.STRING,
      kkm: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "mapel",
      tableName: "mapel",
    }
  );
  return mapel;
};
