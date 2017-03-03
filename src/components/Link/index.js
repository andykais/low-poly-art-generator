import React from 'react'
import history from '../../router/history'

const handleClick = (event) => {
  console.log(event)
}

const Link = ({ to, children }) =>
  <a href={typeof to === 'string' ? to : history.createHref(to)}
  onClick={handleClick}>
  {children}
  </a>

export default Link
