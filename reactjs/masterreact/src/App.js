import { useState, useRef, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import AddProduct from './AddProduct';
import SearchProduct from './SearchProduct';
import apiRequest from './apiRequest';

function App() {
  const API_URL = 'http://localhost:5000/products';

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');
  const [search, setSearch] = useState('');
  const inputRef = useRef();
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error: Something went wrong while fetching products');
        const fetchedProducts = await response.json();
        setProducts(fetchedProducts);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    setTimeout(() => {
      (async () => await fetchProducts())();
    }, 2000);
  }, []);

  const addNewProduct = async (product) => {
    const id = products.length ? (parseInt(products[products.length -1].id, 10) + 1).toString() : '1';
    const addedProduct = { id, checked: false, product };
    const productsList = [...products, addedProduct];
    setProducts(productsList);

    const createdOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addedProduct),
    }
    const result = await apiRequest(API_URL, createdOptions);
    if (result) setFetchError(result);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct) return;
    addNewProduct(newProduct);
    setNewProduct('');
  }

  const handleCheck = async (productID) => {
    const productsList = products.map((product) => product.id === productID ? { ...product, checked: !product.checked } : product);
    setProducts(productsList);

    const updatedProduct = productsList.find((prod) => prod.id === productID);

    const updatedOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: updatedProduct.checked })
    }

    const prodToUpdateURL = `${ API_URL }/${ productID }`

    const result = await apiRequest(prodToUpdateURL, updatedOptions);
    if (result) setFetchError(result);
  }

  const handleDelete = async (productID) => {
    const productsList = products.filter((product) => product.id !== productID);
    setProducts(productsList);

    const deletedOptions = { method: 'DELETE' };
    const prodToDeleteURL = `${ API_URL }/${ productID }`
    const result = await apiRequest(prodToDeleteURL, deletedOptions);
    if (result) setFetchError(result);
    
  }

  const textStyle = (checked) => (checked ? { textDecoration: 'line-through' } : {});

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

      <main>
        { isLoading && <p style={{ color: 'green', textAlign: 'center', fontSize: '15px' }}>Loading Products...</p> }
        { fetchError && <p style={{ color: 'red', textAlign: 'center', fontSize: '15px' }}>'Error: Something went wrong while fetching products'</p> }
      { !fetchError && !isLoading && 
        <Content 
        products={ products.filter(product => ((product.product).toLowerCase()).includes(search.toLocaleLowerCase())) }
        handleCheck={ handleCheck }
        handleDelete={ handleDelete }
        textStyle={ textStyle }
        /> 
      }
      </main>

        <Footer
        productCount={ `${products.length } ${ products.length <= 1 ? 'product' : 'products' } left in cart` }
        />
    </div>
  );
}

export default App;
