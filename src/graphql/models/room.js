export default (sequelize, DataTypes) => {
  const room = sequelize.define(
    'room',
    {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      roomName: {
        type: DataTypes.STRING,
        unique: true
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

  room.associate = models => {
    room.hasMany(models.message, {
      foreignKey: 'roomId'
    })
  }

  return room
}
