import React from 'react'

const Footer = ({ productCount }) => {
    const today = new Date();
    const countStyling = { color: 'white', textAlign: 'center', fontFamily: 'cursive' }

  return (
    <footer>
      <h5 style={ countStyling }>
       { productCount }
    </h5>
      <h6>
        Copyright &copy; { today.getFullYear() }
      </h6>
    </footer>
  )
}

export default Footer
