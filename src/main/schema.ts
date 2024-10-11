const typeDefs = `#graphql

  scalar Date

  type StreamResponse {
    success: Boolean
    message: String
  }

  type Person {
    id: Int
    name: String
    age: Int
  }

  type HelloResponse {
    success: Boolean
    data: [Person]
  }

  type Query {
    hello: HelloResponse
    streamPeople: StreamResponse
  }

`;

export default typeDefs;
