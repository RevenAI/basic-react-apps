import React from 'react'
import { useState } from 'react'

const ColorChanger = () => {
    const [bgColor, setBgColor] = useState('');
 
        const changeColor = (e) => {
          setBgColor(e.target.value);
         } 

    const boxStyling = {
      width: '150px',
      height: '150px',
      backgroundColor: bgColor, 
      border: '2px solid black',
      borderRadius: '5px',
      margin: '20px auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold'
    }
    
  return (
    <main>
    <div style={ boxStyling } >
   
    </div>

    <label htmlFor='color'>Color Changer</label>

    <input
    type='text'
    className='item'
    id='item'
    placeholder='Add Color Name'
    onChange={ changeColor }
    />
    </main>
  )
}

export default ColorChanger
