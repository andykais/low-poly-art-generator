import React from 'react'
import { Link } from 'react-router-dom'

const App = ({ children }) =>
  <div>
    <li>
      <Link to='/'>
        Home
      </Link>
    </li>
    <li>
      <Link to='/test'>test</Link>
    </li>
    { children }
  </div>

export default App
