import React from 'react';
import { motion } from 'framer-motion';
import { Users, BrainCircuit, ChefHat } from 'lucide-react';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-white max-w-4xl mx-auto p-8"
    >
      <h1 className="text-5xl font-bold mb-4 text-pink-400">About GetChef</h1>
      <p className="text-lg text-gray-300 mb-12">
        GetChef was born from a simple idea: what if you could create amazing meals with just the ingredients you already have? We're a passionate team of foodies, developers, and AI enthusiasts dedicated to making cooking more creative, less wasteful, and a lot more fun.
      </p>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
          <ChefHat className="w-12 h-12 mx-auto mb-4 text-pink-400" />
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-400">To inspire culinary creativity and reduce food waste by transforming everyday ingredients into delicious, easy-to-make recipes.</p>
        </div>
        <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
          <BrainCircuit className="w-12 h-12 mx-auto mb-4 text-pink-400" />
          <h2 className="text-2xl font-semibold mb-2">Our Technology</h2>
          <p className="text-gray-400">We leverage cutting-edge generative AI to understand ingredients, flavor pairings, and cooking techniques, delivering unique recipes in seconds.</p>
        </div>
        <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
          <Users className="w-12 h-12 mx-auto mb-4 text-pink-400" />
          <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
          <p className="text-gray-400">A diverse group of innovators united by a love for great food and powerful technology, working together to build the future of home cooking.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
