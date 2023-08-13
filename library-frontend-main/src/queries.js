import { gql } from '@apollo/client'

export const ALL_BOOKS_AND_AUTHORS = gql`
query {
  allBooks {
    author {
      name
    }
    title
    published
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

export const EDIT_AUTHOR = gql`
mutation editAuthor(
  $name: String!,
  $born: Int!
) {
  editAuthor(name: $name, setBornTo: $born) {
    name
    born
  }
}
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`