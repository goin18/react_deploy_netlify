import React from 'react'
import { Link } from 'react-router-dom'

const Missting = () => {
  return (
    <main className='Missing'>
      <h2>Page Not Found</h2>
      <p>Well, that's disappoinging.</p>
      <p>
        <Link to='/'>Visit Our Homepage</Link>
      </p>
    </main>
  )
}

export default Missting