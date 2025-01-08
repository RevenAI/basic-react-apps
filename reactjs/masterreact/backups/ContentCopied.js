import React, { useState } from 'react'

const Content = () => {
  const [randomize, setRandomize] = useState('Eniola');

  const handleNameChange = () => {
    const names = ['Ibrahim','Mubarakah','Hassan','Moses','Eniola'];
    const index = Math.floor(Math.random()*names.length);
    const randomName = names[index];
    setRandomize(randomName);
  }

  const handleEvent = (e) => {
     console.log(e);
  }

  return (
    <main>
      <p onDoubleClick={handleEvent}>
        It is awesome that <b>"{ randomize }"</b> is learning to master react.js
      </p>
      <button type='button' onClick={ handleNameChange }>Change Name</button>
      <button type='button' onClick={ (e) => handleEvent(e) }>Get Event</button>
    </main>
  );
}

export default Content

    /* const handleNameChange = () => {
        const names = ['Ibrahim','Mubarakah','Hassan','Moses'];
        const index = Math.floor(Math.random()*names.length);
        return names[index];
      } 
        
       return (
    <main>
      <p>
        It is awesome that <b>"{ handleNameChange() }"</b> is learning to master react.js
      </p>
    </main>
  )
      
      */
     