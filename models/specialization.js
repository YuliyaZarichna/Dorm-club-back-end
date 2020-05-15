'use strict';
module.exports = (sequelize, DataTypes) => {
  const Specialization = sequelize.define('Specialization', {
    name: DataTypes.STRING
  }, {});
  Specialization.associate = function (models) {
    // associations can be defined here
    Specialization.hasMany(models.User, {
    })
  };
  return Specialization;
};