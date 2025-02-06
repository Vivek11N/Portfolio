import React, { useState } from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
<<<<<<< HEAD

=======
import { Player } from '@lottiefiles/react-lottie-player';
>>>>>>> 621168c280c6c6755cd5ae4205355cc2a8073955
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/api/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });  
    } else {
      alert('Failed to send message');
    }
  };

  return (
    <section className="container mt-5">
      <h1 className="text-center mb-4">CONTACT ME</h1>

 

<<<<<<< HEAD
      
=======
      {/* Lottie animation positioned to the right */}
      <div className="lottie-container">
        <Player
          autoplay
          loop
          src="Animation 2.json"  // Replace with your Lottie animation URL or local JSON file
          style={{ height: '200px', width: '200px' }}
        />
      </div>

      {/* Mail icon with Gmail redirect */}
>>>>>>> 621168c280c6c6755cd5ae4205355cc2a8073955
      <p className="text-center">
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=viveknarayanan117@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaEnvelope size={40} />
        </a>
        <span className="ml-2">viveknarayanan117@gmail.com</span>
      </p>

      
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '500px' }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            id="message"
            name="message"
            className="form-control"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>

      <div className="text-center mt-3">
<<<<<<< HEAD
        
=======
        {/* Social Media Icons */}
>>>>>>> 621168c280c6c6755cd5ae4205355cc2a8073955
        <a
          href="https://www.instagram.com/your-profile"  
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaInstagram size={40} />
        </a>

        <a
<<<<<<< HEAD
          href="https://www.linkedin.com/in/www.linkedin.com/in/vivek-narayanan12"  
=======
          href="https://www.linkedin.com/in/www.linkedin.com/in/vivek-narayanan12"  // Replace with your LinkedIn profile link
>>>>>>> 621168c280c6c6755cd5ae4205355cc2a8073955
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaLinkedin size={40} />
        </a>

        <a
          href="https://github.com/your-profile"  
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaGithub size={40} />
        </a>
      </div>
    </section>
  );
}

export default Contact;