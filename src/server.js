const { ApolloServer } = require('apollo-server')
const { schema } = require('./schema')
const { context } = require('./context')
//var cors = require('cors')

const server = new ApolloServer({
  schema: schema,
  context: context,
  cors: false 
})

server.listen({ port: process.env.PORT || 4000 }).then(async ({ url }) => {
  console.log(`\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/js/graphql#using-the-graphql-api
  `)
})
