import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';

const ImageCollage = () => (
    <div className="relative w-full h-full hidden lg:flex items-center justify-center">
         <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
            className="absolute w-52 h-36 bg-cover bg-center rounded-2xl shadow-2xl"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop)` }}
        />
        <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 100 }}
            className="absolute w-64 h-40 bg-cover bg-center rounded-2xl shadow-2xl"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop)` }}
        />
         <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6, type: "spring", stiffness: 100 }}
            className="absolute w-48 h-64 bg-cover bg-center rounded-2xl shadow-2xl"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop)` }}
        />
        <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8, type: "spring", stiffness: 100 }}
            className="absolute p-4 bg-white/20 backdrop-blur-md rounded-full shadow-lg" style={{top: '60%', left: '40%'}}>
             <BookOpen className="w-10 h-10 text-white" />
        </motion.div>
         <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1, type: "spring", stiffness: 100 }}
            className="absolute p-4 bg-white/20 backdrop-blur-md rounded-full shadow-lg" style={{top: '15%', left: '10%'}}>
             <Sparkles className="w-10 h-10 text-white" />
        </motion.div>
    </div>
);

export default ImageCollage;
