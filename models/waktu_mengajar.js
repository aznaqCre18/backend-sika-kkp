"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class waktu_mengajar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ jadwal_mapel }) {
      // define association here
      waktu_mengajar.hasMany(jadwal_mapel, {
        foreignKey: "idWaktuMengajar",
        as: "jadwal_mapel",
      });
    }
  }
  waktu_mengajar.init(
    {
      kodeWaktuMengajar: DataTypes.STRING,
      jamMapel: DataTypes.STRING,
      waktuMapel: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "waktu_mengajar",
      tableName: "waktu_mengajar",
    }
  );
  return waktu_mengajar;
};
