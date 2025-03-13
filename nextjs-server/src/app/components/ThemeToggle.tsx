// import React from 'react';
// import { motion } from 'framer-motion';
// import { Moon, Sun } from 'lucide-react';
// // import { useTheme } from '../context/ThemeContext';

// const ThemeToggle = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <motion.button
//       onClick={toggleTheme}
//       className="p-2 rounded-full bg-secondary text-foreground"
//       whileTap={{ scale: 0.95 }}
//       whileHover={{ scale: 1.05 }}
//       aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
//     >
//       <motion.div
//         initial={false}
//         animate={{ rotate: theme === 'dark' ? 0 : 180 }}
//         transition={{ duration: 0.3 }}
//       >
//         {theme === 'dark' ? (
//           <Moon className="h-5 w-5" />
//         ) : (
//           <Sun className="h-5 w-5" />
//         )}
//       </motion.div>
//     </motion.button>
//   );
// };

// export default ThemeToggle;