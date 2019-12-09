'use strict';
module.exports = (sequelize, DataTypes) => {
  const FAQ = sequelize.define('FAQ', {
    question: DataTypes.STRING,
    answer: DataTypes.STRING
  }, {});
  FAQ.associate = function(models) {
    // associations can be defined here
  };
  return FAQ;
};