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
  const { loading, error, data, refetch } = useQuery(BOOKS_BY_GENRE,
    { 
      skip: !props.genre, variables: { genre: props.currentUser?.favoriteGenre } 
    }
  )

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error}`;

  if (!props.show) {
    return null
  }
  
  const genres = !props.recommended ? getGenres(props.books) : []

  let books = props.showByGenre ? data.allBooks : props.books
  
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
          <div>
            Books in you recommended genre <b>{props.currentUser.favoriteGenre}</b>
          </div>
        </div>
        : 
        <div>
          <h2>Books</h2> 
          {genres.map((genre, index) => (
            <div key={index}>
              <button key={index} onClick = { () => changeGenre(genre)}>{genre}</button>
            </div>
          ))}
        </div>
      }
    <BookList books={books}/>
  </div>
  )
}

export default Books
