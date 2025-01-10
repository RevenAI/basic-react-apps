import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';

const LineProducts = ({ product, handleCheck, handleDelete, textStyle }) => {
  return (
    <li className='item'>
    
    <input
    type='checkbox'
    onChange={ () => handleCheck(product.id) }
    checked={ product.checked }
    />

    <label
    style={ textStyle(product.checked) }
    onDoubleClick={ () => handleCheck(product.id) }
    >
     { product.product }
    </label>

    <FaTrashAlt 
    role='button'
    tabIndex='0'
    onClick={ () => handleDelete(product.id) }
    onKeyDown={ (e) => { if (e.key === 'Enter' || e.key === ' ') handleDelete(product.id) } }
    />
    </li>
  )
}

export default LineProducts




