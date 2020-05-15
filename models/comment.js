'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER,
  }, {});

  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.Post, {})
    Comment.belongsTo(models.User, {})
  };
  return Comment;
};