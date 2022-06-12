"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class jadwal_mapel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      mapel,
      kelas,
      guru,
      tahun_ajaran,
      waktu_mengajar,
      pertemuan,
    }) {
      // define association here
      jadwal_mapel.belongsTo(mapel, {
        foreignKey: "idMapel",
        as: "mapel",
      });

      jadwal_mapel.belongsTo(kelas, {
        foreignKey: "idKelas",
        as: "kelas",
      });

      jadwal_mapel.belongsTo(guru, {
        foreignKey: "idGuru",
        as: "guru",
      });

      jadwal_mapel.belongsTo(tahun_ajaran, {
        foreignKey: "idTahunAjaran",
        as: "tahunAjaran",
      });

      jadwal_mapel.belongsTo(waktu_mengajar, {
        foreignKey: "idWaktuMengajar",
        as: "waktuMengajar",
      });

      jadwal_mapel.hasMany(pertemuan, {
        foreignKey: "idJadwalMapel",
        as: "pertemuan",
      });
    }
  }
  jadwal_mapel.init(
    {
      idMapel: DataTypes.INTEGER,
      idKelas: DataTypes.INTEGER,
      idGuru: DataTypes.INTEGER,
      idWaktuMengajar: DataTypes.INTEGER,
      idTahunAjaran: DataTypes.INTEGER,
      hari: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "jadwal_mapel",
      tableName: "jadwal_mapel",
    }
  );
  return jadwal_mapel;
};
