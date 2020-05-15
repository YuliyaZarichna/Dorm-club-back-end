'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'student'
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      UniversityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'universities',
          key: 'id',
        }
      },
      CountryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'countries',
          key: 'id',
        }
      },
      DormId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'dorms',
          key: 'id',
        }
      },
      SpecializationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'specializations',
          key: 'id',
        }
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
    return queryInterface.dropTable('Users');
  }
};