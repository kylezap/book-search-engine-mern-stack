import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      _id
      username
      email
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
      bookCount
    }
  }
`;