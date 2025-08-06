import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Key, User, ExternalLink } from 'lucide-react';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from './firebase';

const AuthModal = ({ show, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    const error = await signInWithGoogle();
    if (error) {
      setError(error);
    } else {
      onClose(); // Close modal on successful sign-in
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const authError = isSignUp
      ? await signUpWithEmail(email, password)
      : await signInWithEmail(email, password);
    
    if (authError) {
      setError(authError);
    } else {
      onClose(); // Close modal on success
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-gray-800/50 backdrop-blur-xl border border-pink-500/20 rounded-3xl w-full max-w-md shadow-2xl shadow-pink-500/10 relative text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>

            <div className="p-8">
              <h2 className="text-3xl font-bold mb-2 text-pink-400">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
              <p className="text-gray-400 mb-6">{isSignUp ? 'Join ChefAI to save your favorite recipes.' : 'Sign in to continue.'}</p>

              <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 p-3 rounded-lg font-semibold transition-colors mb-6">
                <img src="https://www.google.com/favicon.ico" alt="Google icon" className="w-5 h-5" />
                Sign in with Google
              </button>

              <div className="flex items-center gap-4 mb-6">
                <hr className="w-full border-gray-600" />
                <span className="text-gray-500 text-sm">OR</span>
                <hr className="w-full border-gray-600" />
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full bg-white/10 pl-10 p-3 rounded-lg border border-white/20 focus:outline-none focus:border-pink-400 transition-colors" />
                </div>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full bg-white/10 pl-10 p-3 rounded-lg border border-white/20 focus:outline-none focus:border-pink-400 transition-colors" />
                </div>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg transition-all">
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
              </form>

              <p className="text-center text-gray-400 text-sm mt-6">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button onClick={() => { setIsSignUp(!isSignUp); setError(''); }} className="font-semibold text-pink-400 hover:text-pink-300 ml-1">
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
