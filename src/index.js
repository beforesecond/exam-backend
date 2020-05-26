import { ApolloServer, gql } from 'apollo-server'
import './env'
import { typeDefs } from './graphql/typedefs'
import { resolvers } from './graphql/resolvers'
import models from './graphql/models'
import { pubsub } from './graphql/pubsub'

const server = new ApolloServer({
  typeDefs: gql`
    ${typeDefs}
  `,
  context: contextArgs => ({
    models,
    pubsub
  }),
  resolvers
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`)
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`)
})
