'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'student'
    },
    UniversityId: DataTypes.INTEGER,
    CountryId: DataTypes.INTEGER,
    DormId: DataTypes.INTEGER,
    SpecializationId: DataTypes.INTEGER,
    /*Hobby: DataTypes.INTEGER */
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Post, {
      as: 'userPosts',
    })
    User.hasMany(models.Comment, {
      as: 'userComments'
    })
    User.belongsTo(models.Country, {
    })
    User.belongsTo(models.University, {
    })
    User.belongsTo(models.Dorm, {
    })
    User.belongsTo(models.Specialization, {
    })
    /*  User.belongsToMany(models.Hobby, {}) */
  };
  return User;
};