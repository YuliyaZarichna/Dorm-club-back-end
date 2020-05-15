'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Dorms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      buildingNr: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dormName: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      radius: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      qrCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Dorms');
  }
};