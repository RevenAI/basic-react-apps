import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const ProductsList = ({ products, handleCheck, handleDelete, textStyle }) => {
  return (
    <ul>
        {
          products.map((product) => (
            <li className='item' key={ product.id }>
           <input
           type='checkbox'
           onChange={ () => handleCheck(product.id) }
           checked={ product.checked }
           />

           <label
           style={ textStyle(product.checked) }
           onDoubleClick={ () => handleCheck(product.id) }
           >
            { product.name }
           </label>

           <FaTrashAlt 
           role='button'
           tabIndex='0'
           onClick={ () => handleDelete(product.id) }
           onKeyDown={ (e) => { if (e.key === 'Enter' || e.key === ' ') handleDelete(product.id) } }
           />
            </li>
          ))
        }
      </ul>
  )
}

export default ProductsList
