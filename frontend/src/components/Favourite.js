import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { ME } from '../queries'
import Books from './Books'

const Favourite = () => {
  const result = useQuery(ME)
  const [userData, setUserData] = useState([])

  useEffect(() => {
    if (result?.data?.me) {
      setUserData(result.data.me)
    }
  }, [result])

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favourite genre {userData.favoriteGenre}</p>

      <Books show={true} filter={userData.favoriteGenre} />
    </div>
  )
}

export default Favourite
