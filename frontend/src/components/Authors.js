import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({ token }) => {
  const result = useQuery(ALL_AUTHORS)
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [options, setOptions] = useState(null)

  useEffect(() => {
    if (result.data) {
      const temp = result.data.allAuthors.map((author) => ({
        value: author.name,
        label: author.name,
      }))
      setOptions(temp)
    }
  }, [result])

  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const submit = (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name: selectedOption.value, setBornTo: born } })

    setSelectedOption(null)
    setBorn('')
  }

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
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token && (
        <>
          <h2>set birthyear</h2>
          <form onSubmit={submit}>
            <div>
              name
              <Select
                defaultValue={selectedOption}
                options={options}
                onChange={setSelectedOption}
              />
            </div>
            <div>
              born
              <input
                value={born}
                onChange={({ target }) => setBorn(+target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </>
      )}
    </div>
  )
}

export default Authors
