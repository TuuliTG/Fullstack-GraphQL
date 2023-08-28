import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const BirthYearForm = (props) => {
  
  const [born, setBorn] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      props.setError(messages)
    }
  })
  const authors = props.authors.map(author => {
    let options = {
      "value": author.name,
      "label": author.name
    }
    return options
  })

  const submit = async (event) => {
    event.preventDefault()
    const name = selectedAuthor.value
    editAuthor({ variables: { name, born }})
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            onChange={setSelectedAuthor}
            options={authors}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target}) => setBorn(parseInt(target.value))}
          />          
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const authors = props.authors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.user && 
        <BirthYearForm setError={props.setError} authors={authors}></BirthYearForm>
      }
      
    </div>
  )
}

export default Authors
