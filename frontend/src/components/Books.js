import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = ({ filter }) => {
  const result = useQuery(ALL_BOOKS, { variables: { genre: filter } })
  const [books, setBooks] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    if (result?.data?.allBooks) {
      setData(result.data.allBooks)
      setBooks(result.data.allBooks)
    }
  }, [result])

  // useEffect(() => {
  //   if (filter) {
  //     const filteredBooks = data.filter((book) =>
  //       book.genres.includes(filter.toLowerCase())
  //     )
  //     setBooks(filteredBooks)
  //   }
  // }, [filter, data])

  if (result.loading) {
    return <div>loading...</div>
  }

  const filterBooks = (filterString) => {
    if (filterString === 'all') {
      setBooks(data)
    } else {
      const filteredBooks = data.filter((book) =>
        book.genres.includes(filterString.toLowerCase())
      )
      setBooks(filteredBooks)
    }
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!filter && (
        <>
          <button onClick={() => filterBooks('refactoring')}>
            refactoring
          </button>
          <button onClick={() => filterBooks('agile')}>agile</button>
          <button onClick={() => filterBooks('scifi')}>scifi</button>
          <button onClick={() => filterBooks('crime')}>crime</button>
          <button onClick={() => filterBooks('drama')}>drama</button>
          <button onClick={() => filterBooks('design')}>design</button>
          <button onClick={() => filterBooks('all')}>all genres</button>
        </>
      )}
    </div>
  )
}

export default Books
