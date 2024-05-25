import { gql } from '@apollo/client';

export const GET_USER = gql`
query GetUser($userId: ID!) {
  getUser(userId: $userId) {
    username
    bookCount
    savedBooks {
      bookId
      authors
      title
      description
      image
    }
  }
}
`;