import { v4 as uuidv4 } from 'uuid'

export default {
  Mutation: {
    createRoom: async (parent, { roomName }, { models }) => {
      try {
        await models.room.create({
          id: uuidv4(),
          roomName: roomName
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
  }
}
