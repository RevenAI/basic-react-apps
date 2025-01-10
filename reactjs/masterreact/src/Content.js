import ProductsList from "./ProductsList";

const Content = ({ products, handleCheck, handleDelete, textStyle }) => {

  return (
    <main>
      <ProductsList 
       products={ products }
       handleCheck={ handleCheck }
       handleDelete={ handleDelete }
       textStyle={ textStyle }
      />
      { products.length === 0 && <h4>Your product cart is empty.</h4> }
    </main>
  )
}

export default Content

