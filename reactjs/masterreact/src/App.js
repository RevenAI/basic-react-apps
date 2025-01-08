import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
//import Counter from './Counter';

function App() {
  const [products, setProduct] = useState(() =>{ 
    const savedProducts = localStorage.getItem('sales-products');

    if (savedProducts) {
      return JSON.parse(savedProducts);
    } else {
     return [
        { id: 1, checked: false, name: 'Red Apple' },
        { id: 2, checked: true, name: 'Blue Notebook' },
        { id: 3, checked: false, name: 'Green Bottle' },
        { id: 4, checked: true, name: 'Yellow Backpack' },
        { id: 5, checked: false, name: 'Orange Mug' },
        { id: 6, checked: true, name: 'Purple Scarf' },
        { id: 7, checked: false, name: 'Black Chair' },
        { id: 8, checked: true, name: 'White Table' },
        { id: 9, checked: false, name: 'Gray Couch' },
        { id: 10, checked: false, name: 'Samsumg Laptop' },
      ]
    }
  });

  const updateLocalStorage = (updatedData) => {
    setProduct(updatedData);
    localStorage.setItem('sales-products', JSON.stringify(updatedData));
  }

  const handleCheck = (productID) => {
    const productsList = products.map((product) => product.id === productID ? { ...product, checked: !product.checked } : product);
    updateLocalStorage(productsList);
  }

  const handleDelete = (productID) => {
    const productsList = products.filter((product) => product.id !== productID);
    updateLocalStorage(productsList);
  }

  const textStyle = (checked) => (checked ? { textDecoration: 'line-through' } : {});

 
  return (
    <div className='App'>
      <Header 
      title='Product Cart'
      />

      <Content 
      products={ products }
      handleCheck={ handleCheck }
      handleDelete={ handleDelete }
      textStyle={ textStyle }
      />

      <Footer
      productCount={ `${products.length } ${ products.length === 1 ? 'product' : 'products' } left in cart` }
      />
       {/* <Counter /> */}
    </div>
  );
}

export default App;
