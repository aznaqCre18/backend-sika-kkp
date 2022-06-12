"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class kelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ siswa, guru, jurusan, jadwal_mapel }) {
      // define association here
      kelas.hasMany(siswa, {
        foreignKey: "idKelas",
        as: "siswa",
      });

      kelas.belongsTo(guru, {
        foreignKey: "idWaliKelas",
        as: "guru",
      });

      kelas.belongsTo(jurusan, {
        foreignKey: "idJurusan",
        as: "jurusan",
      });

      kelas.hasMany(jadwal_mapel, {
        foreignKey: "idKelas",
        as: "jadwal_mapel",
      });
    }
  }
  kelas.init(
    {
      kodeKelas: DataTypes.STRING,
      namaKelas: DataTypes.STRING,
      idWaliKelas: DataTypes.INTEGER,
      idJurusan: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "kelas",
      tableName: "kelas",
    }
  );
  return kelas;
};
