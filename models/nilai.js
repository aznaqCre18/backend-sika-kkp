"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class nilai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ mapel, siswa }) {
      // define association here
      nilai.belongsTo(mapel, {
        foreignKey: "idMapel",
        as: "mapel",
      });

      nilai.belongsTo(siswa, {
        foreignKey: "idSiswa",
        as: "siswa",
      });
    }
  }
  nilai.init(
    {
      idMapel: DataTypes.INTEGER,
      idSiswa: DataTypes.INTEGER,
      uh1: DataTypes.STRING,
      uh2: DataTypes.STRING,
      uts: DataTypes.STRING,
      uas: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "nilai",
      tableName: "nilai",
    }
  );
  return nilai;
};
