import React from 'react';
import { FaPlus } from 'react-icons/fa';

const AddProduct = ({ newProduct, setNewProduct, handleSubmit, inputRef }) => {
  return (
    <form className='addForm' onSubmit={ handleSubmit }>
      <label htmlFor='addForm'>Add Product</label>
      
      <input
      autoFocus
      ref={ inputRef }
      required
      id='addForm'
      type='text'
      placeholder='Add new product'
      value={ newProduct }
      onChange={ (e) => setNewProduct(e.target.value) }
      />

      <button
      type='submit'
      tabIndex='0'
      aria-label={ `Add New Product` }
      onClick={ () => inputRef.current.focus() }
      >
        <FaPlus />
      </button>
    </form>
  )
}

export default AddProduct
