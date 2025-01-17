
const Footer = () => {
  const today = new Date();

    return (
      <footer className='Footer'>
        <h4>Copywright &copy; { today.getFullYear() }</h4>
      </footer>
    )
  }
  
  export default Footer
  