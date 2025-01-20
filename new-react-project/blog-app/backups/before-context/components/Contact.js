
const Contact = ({ contactEmail, setContactEmail, handleContactForm }) => {
  const contactStyle = {
    container: {
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: '#fafafa',
      color: '#333',
      borderRadius: '10px',
      maxWidth: '800px',
      margin: '2rem auto',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      color: '#2c3e50',
    },
    paragraph: {
      fontSize: '1.2rem',
      lineHeight: '1.8',
      color: '#555',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '2rem',
    },
    input: {
      padding: '0.8rem',
      margin: '0.5rem',
      width: '80%',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '1rem',
    },
    button: {
      padding: '0.8rem 1.5rem',
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1rem',
      cursor: 'pointer',
      marginTop: '1rem',
    },
    buttonHover: {
      backgroundColor: '#2980b9',
    }
  };

  return (
    <form style={contactStyle.container} onSubmit={ handleContactForm }>
      <h1 style={contactStyle.heading}>Contact Us</h1>
      <p style={contactStyle.paragraph}>
        We would love to hear from you! If you have any questions, feedback, or need support, feel free to reach out to us. 
        Our team is always here to help!
      </p>
      <div style={contactStyle.form}>
        <input
          type="text"
          placeholder="Your Name"
          required
          style={contactStyle.input}
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          style={contactStyle.input}
          value={ contactEmail }
          onChange={ (e) => setContactEmail(e.target.value) }
        />
        <textarea
          placeholder="Your Message"
          rows="4"
          required
          style={contactStyle.input}
        ></textarea>
        <button
          style={contactStyle.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = contactStyle.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = contactStyle.button.backgroundColor)}
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default Contact;
