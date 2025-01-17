
const About = () => {
  const aboutStyle = {
    container: {
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: '#f9f9f9',
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
    emphasis: {
      color: '#3498db',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={aboutStyle.container}>
      <h1 style={aboutStyle.heading}>About Us</h1>
      <p style={aboutStyle.paragraph}>
        Welcome to <span style={aboutStyle.emphasis}>Our Platform</span>! We are a team of dedicated professionals passionate about delivering exceptional web and app development solutions. Our mission is to empower individuals and businesses with cutting-edge technology, ensuring their success in the digital world.
      </p>
      <p style={aboutStyle.paragraph}>
        With expertise in <span style={aboutStyle.emphasis}>full-stack development</span>, <span style={aboutStyle.emphasis}>graphics design</span>, and <span style={aboutStyle.emphasis}>ICT solutions</span>, we take pride in crafting experiences that leave a lasting impact. Join us on this journey to create, innovate, and achieve greatness together!
      </p>
    </div>
  );
};

export default About;
