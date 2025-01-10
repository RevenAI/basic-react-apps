import React from 'react';
import LineProducts from './LineProducts';

const ProductsList = ({ products, handleCheck, handleDelete, textStyle }) => {
  return (
    <ul>
        {
          products.map((product) => (
            <LineProducts
            key={ product.id }
            product={ product }
            handleCheck={ handleCheck }
            handleDelete={ handleDelete }
            textStyle={ textStyle }
            />
          ))
        }
      </ul>
  )
}

export default ProductsList

