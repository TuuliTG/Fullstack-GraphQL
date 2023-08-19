import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { GETCURRENTUSER, LOGIN } from '../queries'

const LoginForm = ( props ) => {
  
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    },
    // refetchQueries: [  {query: GETCURRENTUSER, fetchPolicy: 'no-cache'} ],
  })
  
  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('books-and-authors-user-token', token)
      props.refetch()
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
    props.setPage('authors')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>LOGIN</h2>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm