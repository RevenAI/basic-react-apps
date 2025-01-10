import React from 'react'

const Square = ({ color, hexName, isDarkColor }) => {
  return (
    <section
    className='square'
    style={ { backgroundColor: color, color: isDarkColor ? '#000' : '#FFF' } }
    >
      <pre style={ { textAlign: 'center' } }> 
      <p>{ color ? color : 'No Color' }</p> 
      <p>{ hexName ? hexName : null }</p>
      </pre>
    </section>
  )
}

export default Square



