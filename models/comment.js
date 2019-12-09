'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER,
  }, {});
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.Post, {
      foreignKey: 'PostId',
      onDelete: 'CASCADE',
      constraints: false
    }) 
    Comment.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE',
      constraints: false
    }) 
  };
  return Comment;
};