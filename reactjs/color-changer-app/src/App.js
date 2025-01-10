import Header from './Header';
import Footer from './Footer';
//import ColorChanger from './ColorChanger';
//import Counter from './Counter';
import { useState } from 'react';
import Square from './Square';
import Input from './Input';

function App() {

  const [color, setColor] = useState('');
  const [hexName, setHexName] = useState('');
  const [isDarkColor, setIsDarkColor] = useState(true);
 
  return (
    <div className='App'>
      <Header 
      title='Color Changer'
      />

    <Square 
    color={ color }
    hexName={hexName}
    isDarkColor={isDarkColor}
    />

    <Input 
    color={color}
    setColor={setColor}
    setHexName={setHexName}
    isDarkColor={isDarkColor}
    setIsDarkColor={setIsDarkColor}
    />
     
      {/* <ColorChanger /> */}
      <Footer />
       {/* <Counter /> */}
    </div>
  );
}

export default App;







