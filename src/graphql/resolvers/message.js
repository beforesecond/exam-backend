import { v4 as uuidv4 } from 'uuid'

export default {
  Query: {
    messages: async (parent, { roomName }, { models }) => {
      try {
        const room = await models.room.findOne({
          where: {
            roomName
          }
        })
        if (room) {
          const message = await models.message.findAll({
            where: {
              roomId: room?.id ?? ''
            }
          })
          return message
        }
        return null
      } catch (e) {
        console.error(e)
        return null
      }
    }
  },
  Mutation: {
    sendMessage: async (
      parent,
      { sender, roomName, message },
      { models, pubsub }
    ) => {
      try {
        const room = await models.room.findOne({
          where: {
            roomName
          }
        })
        const roomId = room?.id ?? uuidv4()
        if (!room) {
          await models.room.create({
            id: roomId,
            roomName: roomName
          })
        }
        const create = {
          id: uuidv4(),
          roomId,
          body: message,
          from: sender
        }
        await models.message.create(create)
        await pubsub.publish(roomName, {
          newMessage: create
        })
        return {
          successful: true
        }
      } catch (e) {
        console.error(e)
        return {
          successful: false
        }
      }
    }
  },
  Subscription: {
    newMessage: {
      subscribe: (parent, { roomName }, { pubsub }) => {
        console.log(roomName)
        return pubsub.asyncIterator(roomName)
      }
    }
  },
  Message: {
    async from({ id }, args, { models }) {
      const message = await models.message.findOne({
        where: { id }
      })
      return { name: message.from }
    }
  }
}
