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