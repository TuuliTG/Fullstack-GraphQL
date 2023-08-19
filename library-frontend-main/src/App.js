import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { ALL_BOOKS_AND_AUTHORS, GETCURRENTUSER } from './queries'

import { useQuery, useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('authors')
  const [genre, setGenre] = useState(null)
  const [showByGenre, setShowByGenre] = useState(false)

  const client = useApolloClient()

  const result = useQuery(ALL_BOOKS_AND_AUTHORS, {
    pollInterval: 2000
  })

  const {data, refetch} = useQuery(GETCURRENTUSER, {
    fetchPolicy: 'no-cache'
  })
  useEffect(() => {
    if ( data !== undefined && data.me !== null ) {
      setUser(data.me)
    } else {
      setUser(null)
    }
  }) // eslint-disable-line

  useEffect(() => {
    if (page !== 'recommendations'){
      setShowByGenre(false)
    } 
  }, [page])
  
  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 1000)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    setShowByGenre(false)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const handleRecommendedPage = () => {
    setGenre(data.me.favoriteGenre)
    setPage('recommendations')
    setShowByGenre(true)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      {user ?
        <button onClick={logout}>logout</button>
        :
        <div>
          <button onClick={() => setPage('login')}>Login</button>
          
        </div>
      }
    
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {user && 
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={handleRecommendedPage} >Recommended</button>
          </>
        }
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} setError={setErrorMessage} token={token}/>
      <Books 
        show={page === 'books' || page === 'recommendations'} 
        recommended = {page === 'recommendations'}
        currentUser = {user}
        books= {page === 'recommendations' ? null : result.data.allBooks}
        setGenre={setGenre} 
        genre={genre}
        showByGenre={showByGenre}
        setShowByGenre={setShowByGenre}
      />
      <NewBook show={page === 'add'} setError={notify}/>
      <LoginForm show={page === 'login'} setToken={setToken} setError={setErrorMessage} setPage={setPage} refetch={refetch}/>    
      
    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default App
