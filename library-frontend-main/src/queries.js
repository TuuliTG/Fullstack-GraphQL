import { gql } from '@apollo/client'

export const ALL_BOOKS_AND_AUTHORS = gql`
query {
  allBooks {
    title
    published
    author
  }
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook(
  $title: String!,
  $author: String!,
  $published: Int!
  $genres: [String]
) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    published
    author
    genres
  }
}
`
