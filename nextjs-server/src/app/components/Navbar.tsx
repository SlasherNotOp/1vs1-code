'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = isLandingPage 
    ? [
        { name: 'Home', path: '#home' },
        { name: 'Features', path: '#features' },
        { name: 'How It Works', path: '#how-it-works' },
        { name: 'Testimonials', path: '#testimonials' }
      ]
    : [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Challenges', path: '/dashboard?tab=challenges' },
        { name: 'Leaderboard', path: '/dashboard?tab=leaderboard' },
        { name: 'Profile', path: '/dashboard?tab=profile' }
      ];

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || !isLandingPage
          ? 'bg-background/90 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" passHref>
              <motion.div 
                className="flex-shrink-0 flex items-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Code2 className="h-8 w-8 text-primary" />
                </motion.div>
                <span className="ml-2 text-xl font-bold">CodeDuel</span>
              </motion.div>
            </Link>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-4">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  custom={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {isLandingPage ? (
                    <motion.a
                      href={link.path}
                      className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-foreground/80 transition-all relative"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.name}
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 bg-primary"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  ) : (
                    <Link href={link.path} passHref>
                      <motion.span
                        className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-foreground/80 transition-all relative cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.name}
                        <motion.span
                          className="absolute bottom-0 left-0 h-0.5 bg-primary"
                          initial={{ width: 0 }}
                          whileHover={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.span>
                    </Link>
                  )}
                </motion.div>
              ))}
              
              {/* <ThemeToggle /> */}
              
              {pathname === '/' ? (
                <>
                  <Link href="/signin" passHref>
                    <motion.button
                      className="btn btn-outline"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Sign In
                    </motion.button>
                  </Link>
                  <Link href="/signup" passHref>
                    <motion.button
                      className="btn btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </>
              ) : (
                <motion.button
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Start Duel
                </motion.button>
              )}
            </motion.div>
          </div>
          
          <div className="md:hidden flex items-center space-x-2">
            {/* <ThemeToggle /> */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-secondary focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/90 backdrop-blur-md border-b border-border">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {isLandingPage ? (
                    <a
                      href={link.path}
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      href={link.path}
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              
              {pathname === '/' ? (
                <>
                  <Link href="/signin" onClick={() => setIsOpen(false)} passHref>
                    <motion.button 
                      className="mt-4 w-full btn btn-outline"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign In
                    </motion.button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)} passHref>
                    <motion.button 
                      className="mt-2 w-full btn btn-primary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </>
              ) : (
                <motion.button 
                  className="mt-4 w-full btn btn-primary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Duel
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;