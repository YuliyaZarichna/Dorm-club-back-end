'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        }
    },
      PostId: {
      type: Sequelize.INTEGER,
      // foreignKey: true,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Posts',
        key: 'id',
      },
    } 
    });
},
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};