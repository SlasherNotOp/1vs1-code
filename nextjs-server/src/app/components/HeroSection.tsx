'use client'; // Add this for client-side components in Next.js 13+

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ArrowRight } from 'lucide-react';
import Link from "next/link";

const HeroSection = () => {
  return (
    <div id="home" className="relative pt-24 pb-16 overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-background"></div>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary/5 rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, Math.random() * 0.3 + 1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl tracking-tight font-extrabold text-foreground sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block">Challenge. Code.</span>{' '}
                <motion.span 
                  className="block text-primary"
                  animate={{ 
                    opacity: [0.8, 1, 0.8] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  Conquer.
                </motion.span>
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Real-time 1v1 coding battles to test your skills, improve your problem-solving, and climb the global leaderboard.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Link href="/signup" legacyBehavior>
                    <motion.a
                      className="btn btn-primary group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="flex items-center">
                        Start Dueling
                        <motion.span
                          initial={{ x: 0 }}
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            repeatType: "reverse" 
                          }}
                        >
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </motion.span>
                      </span>
                    </motion.a>
                  </Link>
                  <motion.button
                    className="btn btn-outline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Watch Battles
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <motion.div 
              className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md animate-float"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="relative block w-full bg-secondary rounded-lg overflow-hidden">
                <motion.div 
                  className="absolute -inset-0.5 bg-primary/20 rounded-lg blur opacity-30"
                  animate={{ 
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <Code2 className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-foreground">Live Battle</p>
                        <p className="text-xs text-muted-foreground">JavaScript Challenge</p>
                      </div>
                    </div>
                    <motion.div 
                      className="flex items-center"
                      animate={{ 
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-xs text-muted-foreground">Live</span>
                    </motion.div>
                  </div>
                  <div className="bg-background rounded-md p-4 font-mono text-sm text-foreground/80 overflow-hidden">
                    <motion.pre 
                      className="whitespace-pre-wrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <code>
{`function findMissingNumber(nums) {
  // Your solution here
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}`}
                      </code>
                    </motion.pre>
                    <motion.div 
                      className="h-4 w-2 bg-primary inline-block ml-1"
                      animate={{ 
                        opacity: [1, 0, 1],
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        ease: "steps(1)"
                      }}
                    ></motion.div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <motion.div 
                        className="h-6 w-6 rounded-full bg-primary/80"
                        whileHover={{ scale: 1.2 }}
                      ></motion.div>
                      <span className="ml-2 text-sm text-foreground">Player 1</span>
                    </div>
                    <motion.div 
                      className="text-sm text-muted-foreground"
                      animate={{ 
                        color: ['rgb(74, 222, 128)', 'rgb(74, 222, 128)', 'rgb(239, 68, 68)'],
                      }}
                      transition={{ 
                        duration: 5,
                        times: [0, 0.8, 1],
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="text-green-500">01:45</span> / 05:00
                    </motion.div>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm text-foreground">Player 2</span>
                      <motion.div 
                        className="h-6 w-6 rounded-full bg-primary/60"
                        whileHover={{ scale: 1.2 }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;