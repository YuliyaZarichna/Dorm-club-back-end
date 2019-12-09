'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    University: DataTypes.INTEGER,
    Country: DataTypes.INTEGER,
    Hobby: DataTypes.INTEGER

  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Comment, {
      as: 'userComments'
    })
   /*  User.belongsToMany(models.Hobby, {
      as: 'userHobbies'
    }) */
  };
  return User;
};