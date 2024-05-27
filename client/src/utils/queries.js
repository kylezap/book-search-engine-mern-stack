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
`

export const SEARCH_BOOKS = gql`
  query SearchBooks($title: String!) {
    searchBooks(title: $title) {
      bookId
      title
      authors
      description
      image
    }
  }
`;