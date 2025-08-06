import React from 'react';
import { motion } from 'framer-motion';

const BlogPostCard = ({ title, excerpt, date, imageUrl }) => (
    <div className="bg-white/10 rounded-2xl overflow-hidden border border-white/20 transform hover:-translate-y-2 transition-transform duration-300">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <p className="text-sm text-gray-400 mb-2">{date}</p>
            <h2 className="text-2xl font-bold mb-3 text-pink-400">{title}</h2>
            <p className="text-gray-300">{excerpt}</p>
        </div>
    </div>
);

const BlogPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-white max-w-6xl mx-auto p-8"
    >
      <h1 className="text-5xl font-bold mb-4 text-center">The ChefAI Blog</h1>
      <p className="text-lg text-gray-400 mb-12 text-center">
        Tips, tricks, and culinary inspiration from our kitchen to yours.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogPostCard 
            title="5 Ingredients, 3 Delicious Meals"
            excerpt="Discover how a few simple staples can be transformed into a trio of mouth-watering dishes with a little AI magic."
            date="August 05, 2025"
            imageUrl="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1887&auto=format&fit=crop"
        />
        <BlogPostCard 
            title="The Science of Flavor Pairing"
            excerpt="Ever wondered why certain ingredients taste so good together? We dive into the data behind delicious combinations."
            date="July 28, 2025"
            imageUrl="https://images.unsplash.com/photo-1484723051597-62b8a788a660?q=80&w=2070&auto=format&fit=crop"
        />
        <BlogPostCard 
            title="Reducing Food Waste, One Recipe at a Time"
            excerpt="Learn how using an AI recipe generator can help you use up what's in your fridge and contribute to a more sustainable kitchen."
            date="July 19, 2025"
            imageUrl="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop"
        />
      </div>
    </motion.div>
  );
};

export default BlogPage;
