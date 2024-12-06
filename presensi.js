'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class presensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  presensi.init(
    {
      id_presensi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Menandai id_presensi sebagai primary key
        autoIncrement: true, // Tambahkan jika menggunakan auto increment
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'presensi',
      tableName: 'presensis', // Nama tabel di database
      timestamps: false, // Jika tidak menggunakan kolom createdAt dan updatedAt
    }
  );

  return presensi;
};



// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class presensi extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   presensi.init({
//     id_presensi: DataTypes.INTEGER,
//     id: DataTypes.INTEGER,
//     date: DataTypes.DATE,
//     time: DataTypes.TIME,
//     status: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'presensi',
//   });
//   return presensi;
// };