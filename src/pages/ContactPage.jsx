import React from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
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

      <form className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <input type="text" placeholder="Your Name" className="w-full bg-white/10 p-4 rounded-lg border border-white/20 focus:outline-none focus:border-pink-400 transition-colors" />
          <input type="email" placeholder="Your Email" className="w-full bg-white/10 p-4 rounded-lg border border-white/20 focus:outline-none focus:border-pink-400 transition-colors" />
        </div>
        <input type="text" placeholder="Subject" className="w-full bg-white/10 p-4 rounded-lg border border-white/20 focus:outline-none focus:border-pink-400 transition-colors" />
        <textarea placeholder="Your Message" rows="6" className="w-full bg-white/10 p-4 rounded-lg border border-white/20 focus:outline-none focus:border-pink-400 transition-colors"></textarea>
        <div className="text-center">
          <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-12 rounded-full transition-all duration-300">
            Send Message
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactPage;

