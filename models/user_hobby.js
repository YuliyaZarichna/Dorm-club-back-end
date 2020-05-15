'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Hobby = sequelize.define('User_Hobby', {
    UserId: DataTypes.INTEGER,
    HobbyId: DataTypes.INTEGER,
  }, {});
  User_Hobby.associate = function (models) {
    // associations can be defined here
  };
  return User_Hobby;
};