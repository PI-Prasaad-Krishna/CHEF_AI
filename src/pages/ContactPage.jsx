import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  // --- STATE MANAGEMENT ---
  // Access the key from the environment variables
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Submission status state
  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'submitting', 'success', 'error'

  // --- EVENT HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Check if the key is missing from the .env file
    if (!accessKey) {
        setSubmissionStatus('error');
        console.error("Error: VITE_WEB3FORMS_ACCESS_KEY is not set in your .env file.");
        return;
    }

    setSubmissionStatus('submitting');

    const data = {
        ...formData,
        access_key: accessKey,
    };

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
            setSubmissionStatus('success');
            // Clear the form on successful submission
            setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            console.error('Submission Error:', result.message);
            setSubmissionStatus('error');
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        setSubmissionStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-white max-w-3xl mx-auto p-8"
    >
      <h1 className="text-5xl font-bold mb-4 text-center text-pink-400">Get In Touch</h1>
      <p className="text-lg text-gray-400 mb-12 text-center">
        Have a question, a suggestion, or a partnership inquiry? We'd love to hear from you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required className="w-full bg-white/10 p-4 rounded-lg border border-white/20 focus:outline-none focus:border-pink-400 transition-colors" />
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" required className="w-full bg-white/10 p-4 rounded-lg border border-white/20 focus:outline-none focus:border-pink-400 transition-colors" />
        </div>
        <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" required className="w-full bg-white/10 p-4 rounded-lg border border-white/20 focus:outline-none focus:border-pink-400 transition-colors" />
        <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Your Message" rows="6" required className="w-full bg-white/10 p-4 rounded-lg border border-white/20 focus:outline-none focus:border-pink-400 transition-colors"></textarea>
        
        <div className="text-center">
          <button type="submit" disabled={submissionStatus === 'submitting'} className="bg-pink-500 hover:bg-pink-600 disabled:bg-pink-800 disabled:cursor-wait text-white font-bold py-3 px-12 rounded-full transition-all duration-300">
            {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>

      {/* --- SUBMISSION STATUS MESSAGES --- */}
      {submissionStatus === 'success' && (
        <p className="text-center text-green-400 mt-4">Thank you for your message! We'll get back to you soon.</p>
      )}
      {submissionStatus === 'error' && (
        <p className="text-center text-red-400 mt-4">Something went wrong. Please check your .env file and try again.</p>
      )}

    </motion.div>
  );
};

export default ContactPage;
