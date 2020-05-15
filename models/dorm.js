'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dorm = sequelize.define('Dorm', {
    buildingNr: DataTypes.INTEGER,
    dormName: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    radius: DataTypes.INTEGER,
    qrCode: DataTypes.STRING,
  }, {});
  Dorm.associate = function (models) {
    // associations can be defined here
    Dorm.hasMany(models.User, {
    })
  };
  return Dorm;
};