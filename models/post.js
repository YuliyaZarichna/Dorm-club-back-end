'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    text: DataTypes.STRING,
    title: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
  }, {});

  Post.associate = function (models) {
    // associations can be defined here
    Post.hasMany(models.Comment, {})
    Post.belongsTo(models.User, {})
  };
  return Post;
};