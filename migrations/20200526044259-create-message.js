'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('message', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      roomId: {
        type: Sequelize.UUID,
        references: {
          model: 'room',
          key: 'id'
        }
      },
      body: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      from: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('message')
  }
}
