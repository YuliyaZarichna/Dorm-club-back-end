'use strict';
module.exports = (sequelize, DataTypes) => {
  const Universiy = sequelize.define('University', {
    name: DataTypes.STRING,
    
    }, {});
  Universiy.associate = function (models) {
    // associations can be defined here
    Universiy.hasMany(models.User,{
      as: 'userStudent'
    })
  };
  return Universiy;
};