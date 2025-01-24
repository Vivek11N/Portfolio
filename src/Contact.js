import React, { useState } from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { Player } from '@lottiefiles/react-lottie-player';
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

    const response = await fetch('http://localhost:8080/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });  // Clear form after submission
    } else {
      alert('Failed to send message');
    }
  };

  return (
    <section className="container mt-5">
      <h1 className="text-center mb-4">Contact Me</h1>

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

      {/* Contact form */}
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
        {/* Social Media Icons */}
        <a
          href="https://www.instagram.com/your-profile"  // Replace with your Instagram profile link
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaInstagram size={40} />
        </a>

        <a
          href="https://www.linkedin.com/in/www.linkedin.com/in/vivek-narayanan12"  // Replace with your LinkedIn profile link
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaLinkedin size={40} />
        </a>

        <a
          href="https://github.com/your-profile"  // Replace with your GitHub profile link
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
