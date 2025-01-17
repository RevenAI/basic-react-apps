
const NotFound = () => {
  const notFoundStyle = {
    container: {
      textAlign: 'center',
      padding: '5rem',
      backgroundColor: '#f2f2f2',
      color: '#333',
      borderRadius: '10px',
      maxWidth: '800px',
      margin: '3rem auto',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#e74c3c',
      marginBottom: '1rem',
    },
    paragraph: {
      fontSize: '1.5rem',
      color: '#7f8c8d',
      lineHeight: '1.8',
      marginBottom: '1.5rem',
    },
    link: {
      display: 'inline-block',
      fontSize: '1.2rem',
      color: '#3498db',
      textDecoration: 'none',
      fontWeight: 'bold',
      padding: '0.5rem 1rem',
      border: '2px solid #3498db',
      borderRadius: '5px',
      transition: 'background-color 0.3s, color 0.3s',
    },
    linkHover: {
      backgroundColor: '#3498db',
      color: '#fff',
    }
  };

  return (
    <div style={notFoundStyle.container}>
      <h1 style={notFoundStyle.heading}>404</h1>
      <p style={notFoundStyle.paragraph}>
        Oops! The page you're looking for cannot be found. It might have been moved or deleted.
      </p>
      <a
        href="/"
        style={notFoundStyle.link}
        onMouseOver={(e) => (e.target.style.backgroundColor = notFoundStyle.linkHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = '')}
      >
        Go to Homepage
      </a>
    </div>
  );
};

export default NotFound;
