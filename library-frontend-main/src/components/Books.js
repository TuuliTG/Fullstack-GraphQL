import { useState } from "react"
import { BOOKS_BY_GENRE } from "../queries"
import { useQuery } from '@apollo/client'
import BookList from "./BookList"

const Books = (props) => {
  const [showByGenre, setShowByGenre] = useState(false)
  const { loading, error, data, refetch } = useQuery(BOOKS_BY_GENRE,
    { 
      skip: !props.genre, variables: { genre: props.currentUser.favoriteGenre } 
    }
  )
  if (loading) return null;
  if (error) return `Error! ${error}`;

  if (!props.show) {
    return null
  }

  if (props.books && !props.recommended) {
    console.log('returning all books')

    let genres = []
    props.books.map(b => {
      b.genres.map(g => {
        if (genres.indexOf(g) === -1) {
          genres.push(g)
        }
      })
    })

    let books = showByGenre ? data.allBooks : props.books
    
    const changeGenre = (genre) => {
      props.setGenre(genre)
      setShowByGenre(true)
      refetch({genre: genre})
    }

    return (
      <div>
        <h2>Books</h2>
        {genres.map((genre, index) => (
          <div key={index}>
            <button key={index} onClick = { () => changeGenre(genre)}>{genre}</button>
          </div>
        ))}  
      <BookList books={books}/>
    </div>
    )
  }
  // Recommendations: 

  console.log('returning favourite books')
  
  if (!data.allBooks) {
    return (
      <div>No books in your favourite genre</div>
    )
  }
  return (
    <div>  
      <h2>Recommended books</h2> 
      <div>
        Books in you recommended genre <b>{props.currentUser.favoriteGenre}</b>
      </div>
      <BookList books={data.allBooks}/>
    </div>
  )
}

export default Books
