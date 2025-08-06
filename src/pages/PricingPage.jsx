import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const PricingCard = ({ title, price, features, popular = false }) => (
  <div className={`bg-white/10 p-8 rounded-3xl border border-white/20 relative ${popular ? 'border-pink-400' : ''}`}>
    {popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</div>}
    <h2 className="text-3xl font-bold mb-2">{title}</h2>
    <p className="text-5xl font-extrabold mb-6 text-pink-400">{price}<span className="text-lg text-gray-400">/mo</span></p>
    <ul className="space-y-4 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-pink-400 flex-shrink-0" />
          <span className="text-gray-300">{feature}</span>
        </li>
      ))}
    </ul>
    <button className={`w-full py-3 rounded-full font-bold transition-all ${popular ? 'bg-pink-500 hover:bg-pink-600' : 'bg-gray-600 hover:bg-gray-500'}`}>
      Get Started
    </button>
  </div>
);


const PricingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-white max-w-5xl mx-auto p-8 text-center"
    >
      <h1 className="text-5xl font-bold mb-4">Find the Perfect Plan</h1>
      <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
        Start for free and upgrade to unlock powerful features that will take your culinary skills to the next level.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <PricingCard 
          title="Hobby Chef"
          price="$0"
          features={['5 AI Recipes per month', 'Save up to 10 recipes', 'Basic ingredient search']}
        />
        <PricingCard 
          title="Pro Chef"
          price="$9"
          features={['Unlimited AI Recipes', 'Save unlimited recipes', 'Advanced search filters', 'Nutritional information', 'Priority support']}
          popular={true}
        />
        <PricingCard 
          title="Gourmet"
          price="$19"
          features={['All Pro features', 'Generate meal plans', 'AI-powered shopping lists', 'Exclusive community access']}
        />
      </div>
    </motion.div>
  );
};

export default PricingPage;
