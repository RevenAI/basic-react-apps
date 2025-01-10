//This is App.js version that uses localStorage to handle data population before I impliment the use of json server to create fake api endpoints.

import { useState, useRef, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import AddProduct from './AddProduct';
import SearchProduct from './SearchProduct';

function App() {
 const [products, setProduct] = useState(() =>{ 
    const savedProducts = localStorage.getItem('sales-products');
   return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [newProduct, setNewProduct] = useState('');
  const [search, setSearch] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    localStorage.setItem('sales-products', JSON.stringify(products));
  }, [products]);

  const handleCheck = (productID) => {
    const productsList = products.map((product) => product.id === productID ? { ...product, checked: !product.checked } : product);
    setProduct(productsList);
  }

  const handleDelete = (productID) => {
    const productsList = products.filter((product) => product.id !== productID);
    setProduct(productsList);
  }

  const textStyle = (checked) => (checked ? { textDecoration: 'line-through' } : {});

  const addNewProduct = (product) => {
    const id = products.length ? products[products.length -1].id +1 : 1;
    const addedProduct = { id, checked: false, product };
    const productsList = [...products, addedProduct];
    setProduct(productsList);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct) return;
    addNewProduct(newProduct);
    setNewProduct('');
  }

  return (
    <div className='App'>

      <Header 
      title='Product Cart'
      />

      <AddProduct 
      newProduct={ newProduct }
      setNewProduct={ setNewProduct }
      handleSubmit={ handleSubmit }
      inputRef={ inputRef }
      />

      <SearchProduct 
      search={ search }
      setSearch={ setSearch }
      />

      <Content 
      products={ products.filter(product => ((product.product).toLowerCase()).includes(search.toLocaleLowerCase())) }
      handleCheck={ handleCheck }
      handleDelete={ handleDelete }
      textStyle={ textStyle }
      />

      <Footer
      productCount={ `${products.length } ${ products.length <= 1 ? 'product' : 'products' } left in cart` }
      />
    </div>
  );
}

export default App;
