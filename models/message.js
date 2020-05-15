'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    text: DataTypes.STRING,
    ToUserId: DataTypes.INTEGER,
    FromUserId: DataTypes.INTEGER,
  }, {});
  Message.associate = function (models) {
    // associations can be defined here
  };
  return Message;
};