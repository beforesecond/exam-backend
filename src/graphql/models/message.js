export default (sequelize, DataTypes) => {
  const message = sequelize.define(
    'message',
    {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      roomId: {
        type: DataTypes.UUID
      },
      body: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      from: {
        type: DataTypes.STRING
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    { freezeTableName: true }
  )

  message.associate = models => {
    message.belongsTo(models.room, {
      foreignKey: 'roomId'
    })
  }

  return message
}
