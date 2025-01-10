import React from 'react'
import toHex from 'colornames'

const Input = ({ color, setColor, setHexName, isDarkColor, setIsDarkColor }) => {
  return (
    <form  className='searchForm' onSubmit={ (e) => e.preventDefault() }>
        <label htmlFor='input'>Enter Color Name:</label>
        <input
        autoFocus
        type='text'
        id='input'
        placeholder='Enter Color Name'
        required
        value={ color }
        onChange={ (e) => {setColor(e.target.value); setHexName(toHex(e.target.value))} }
        />     

         <button
         type='button'
         onClick={ () => setIsDarkColor(!isDarkColor) }
         >
        X
         </button> 
    </form>

  )
}

export default Input
