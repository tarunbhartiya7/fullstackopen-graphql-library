import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Favourite from './components/Favourite'

const App = () => {
  const [page, setPage] = useState('login')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    if (token) {
      setPage('authors')
    } else {
      setToken(localStorage.getItem('library-user-token'))
    }
  }, [token])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <LoginForm setToken={setToken} show={page === 'login'} />

      <NewBook show={page === 'add'} />

      <Favourite show={page === 'recommend'} />
    </div>
  )
}

export default App
