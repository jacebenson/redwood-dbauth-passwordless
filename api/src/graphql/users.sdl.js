export const schema = gql`
  type User {
    id: Int!
    name: String
    email: String!
    loginToken: String!
    loginTokenExpiresAt: DateTime
    salt: String
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    name: String
    email: String!
    loginToken: String!
    loginTokenExpiresAt: DateTime
    salt: String
  }

  input UpdateUserInput {
    name: String
    email: String
    loginToken: String
    loginTokenExpiresAt: DateTime
    salt: String
  }
  type userTokenResponse {
    message: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
    generateLoginToken(email: String!): userTokenResponse! @skipAuth
  }
`
