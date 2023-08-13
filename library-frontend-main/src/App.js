import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { ALL_BOOKS_AND_AUTHORS } from './queries'

import { useQuery, useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const result = useQuery(ALL_BOOKS_AND_AUTHORS, {
    pollInterval: 2000
  })
  const [page, setPage] = useState('authors')
  
  if (result.loading) {
    return <div>loading...</div>
  }
  console.log("result", result.data)
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 1000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      {token ?
        <button onClick={logout}>logout</button>
        :
        <div>
          <button onClick={() => setPage('login')}>Login</button>
          
        </div>
      }
    
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} setError={setErrorMessage} token={token}/>
      <Books show={page === 'books'} books={result.data.allBooks}/>
      <NewBook show={page === 'add'} setError={notify}/>
      <LoginForm show={page === 'login'} setToken={setToken} setError={setErrorMessage} setPage={setPage}/>    
      
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
