// const { gql } = require('apollo-server-express');

const typeDefs = `
  type Book {
    _id: ID
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Auth {
    token: String!
    user: User
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    getUser(userId: ID!): User
  }

  type Mutation {
    createUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveBook(userId: ID!, bookInput: BookInput!): User
    deleteBook(userId: ID!, bookId: ID!): User
  }
`;

module.exports = typeDefs;