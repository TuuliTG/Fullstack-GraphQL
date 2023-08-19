const BookList = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {props.books.map((a) => (
            <tr key={a.title}>
              <td style={{paddingRight: '30px'}}>{a.title}</td>
              <td style={{paddingRight: '30px'}}>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookList