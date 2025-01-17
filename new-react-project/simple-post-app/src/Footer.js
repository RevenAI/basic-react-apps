const Footer = () => {
    const today = new Date();

  return (
    <footer>
      <h6>
        Copyright &copy; { today.getFullYear() }
      </h6>
    </footer>
  )
}

export default Footer
