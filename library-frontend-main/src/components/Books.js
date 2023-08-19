import { useEffect, useState } from "react"
import { BOOKS_BY_GENRE } from "../queries"
import { useQuery } from '@apollo/client'
import BookList from "./BookList"

const getGenres = (books) => {
  let genres = []
  books.map(b => {
    b.genres.map(g => {
      if (genres.indexOf(g) === -1) {
        genres.push(g)
      }
    })
  })
  return genres
}

const Books = (props) => {
  const recommendedBooks = useQuery(BOOKS_BY_GENRE,
    { 
      skip: props.recommended === false, variables: { genre: props.currentUser?.favoriteGenre },
    }
  )

  const { loading, error, data, refetch } = useQuery(BOOKS_BY_GENRE,
    { 
      skip: !props.genre, variables: { genre: props.currentUser?.favoriteGenre },
    }
  )
  
  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error}`;

  if (!props.show) {
    return null
  }
  
  const genres = !props.recommended ? getGenres(props.books) : []

  let books = props.recommended ? recommendedBooks.data.allBooks : props.showByGenre ? data.allBooks : props.books
  
  const changeGenre = (genre) => {
    props.setGenre(genre)
    props.setShowByGenre(true)
    refetch({genre: genre})
  }
  return (
    <div>
      {props.recommended ? 
        <div>
          <h2>Recommended books</h2>
          <h3>Books in you recommended genre <b>{props.currentUser.favoriteGenre}</b></h3>
        </div>
        : 
        <div>
          <h2>Books</h2> 
          {genres.map((genre, index) => (
            <div key={index}>
              <button key={index} onClick = {() => changeGenre(genre)}>{genre}</button>
            </div>
          ))}
          <button onClick ={() => props.setShowByGenre(false)}>All genres</button>
          {props.showByGenre ? <h3>Books in genre <b>{props.genre}</b></h3> : <h3>Showing books in all genres</h3>}
        </div>
        
      }
    <BookList books={books}/>
  </div>
  )
}

export default Books
