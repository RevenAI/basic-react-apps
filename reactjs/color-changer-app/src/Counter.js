import React, { useState } from 'react'

const Counter = () => {
    const [count, setCounter] = useState(0);

    const incrementCounter = () => {
        setCounter(preCount => preCount + 1);
    }

    const resetConter = () => {
        setCounter(0);
    }
    
  return (
    <div className='countID'>
      <h1>
        Counter: { count }
      </h1>

      <input className='countID2' readOnly value={ count } />

      <button type='button' onClick={ incrementCounter }>
        <b>+</b>
      </button>
      <button type='reset' onClick={ resetConter }>
        Reset
      </button>
    </div>
  );
}

export default Counter
