import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      token
      user {
        _id
        username
        email
        savedBooks {
          authors
          description
          bookId
          image
          title
        }
        bookCount
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        bookCount
        username
      }
      token
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($userId: ID!, $bookInput: BookInput!) {
    saveBook(userId: $userId, bookInput: $bookInput) {
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        title
      }
      bookCount
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($userId: ID!, $bookId: ID!) {
    deleteBook(userId: $userId, bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        
        authors
        description
        bookId
        image
        
        title
      }
      
    }
  }
`;
