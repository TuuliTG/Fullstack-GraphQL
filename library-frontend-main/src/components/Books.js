import { GETCURRENTUSER, BOOKS_BY_GENRE } from "../queries"
import { useQuery } from '@apollo/client'

const Books = (props) => {
  
  const favoriteBooks = useQuery(BOOKS_BY_GENRE,
    { 
      skip: !props.recommended, variables: { genre: props.currentUser.favoriteGenre } 
    }
  )
  if (!props.show) {
    return null
  }
  if (props.books && !props.recommended) {
    console.log('returning all books')
    return (
      <div>
        <h2>Books</h2>
      
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {props.books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
  }
  console.log('returning favourite books')
  if (favoriteBooks.loading) {
    return (<div>Loading....</div>)
  }
  console.log('favourite books', favoriteBooks)
  if (!favoriteBooks.data.allBooks) {
    return (
      <div>No books in your favourite genre</div>
    )
  }
  return (
    <div>
      {props.recommended ? 
        <div>
          <h2>Recommended books</h2> 
          <div>
            Books in you recommended genre <b>{props.currentUser.favoriteGenre}</b>
          </div>
        </div>
        :
        <h2>Books</h2>
      }
      
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favoriteBooks?.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
