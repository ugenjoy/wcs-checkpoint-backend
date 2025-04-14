import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { buildSchema } from 'type-graphql'
import { CountriesResolver } from './resolvers/countries'
import { dataSource } from './db'

async function initialize() {
  await dataSource.initialize()

  const schema = await buildSchema({
    resolvers: [CountriesResolver],
  })
  const server = new ApolloServer({ schema })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
    context: async ({ req, res }) => {
      return { req, res }
    },
  })
  console.log(`GraphQl server ready at ${url}`)
}

initialize()
