import React, { useEffect, useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Favourite from './components/Favourite'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('login')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      alert(`New book is added -> ${JSON.stringify(subscriptionData)}`)
    },
  })

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

      {page === 'authors' && <Authors token={token} />}

      {page === 'books' && <Books />}

      {page === 'login' && <LoginForm setToken={setToken} />}

      {page === 'add' && <NewBook />}

      {page === 'recommend' && <Favourite />}
    </div>
  )
}

export default App
