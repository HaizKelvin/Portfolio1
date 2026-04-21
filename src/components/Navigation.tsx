import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navigation({ isDark, toggleTheme: toggleThemeProp }: NavigationProps) {
  const location = useLocation();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/work" },
    { name: "Journal", path: "/about" },
    { name: "Connect", path: "/contact" },
  ];

  const toggleTheme = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 3) {
      window.location.href = "/admin";
      return;
    }
    toggleThemeProp();
    setTimeout(() => setClickCount(0), 2000); // Reset after 2s
  };

  const [clickCount, setClickCount] = useState(0);

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center glass p-1 rounded-full px-1 shadow-2xl group/nav">
      <div className="hidden lg:flex items-center gap-2 px-4 border-r border-white/10 mr-1 group-hover/nav:opacity-30 transition-opacity">
        <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
        <span className="font-mono text-[8px] uppercase tracking-tighter text-secondary">ID_0445_EAT</span>
      </div>
      {navLinks.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <motion.div
            key={link.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link
              to={link.path}
              className={`relative block px-3 sm:px-6 py-2.5 rounded-full text-[12px] sm:text-[13px] font-medium transition-all duration-300 group-hover/nav:[&:not(:hover)]:opacity-50 ${
                isActive 
                ? "text-black dark:text-black" 
                : "text-secondary hover:text-primary dark:text-secondary dark:hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white dark:bg-white rounded-full z-[-1] shadow-[0_0_20px_rgba(255,255,255,0.3)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              {link.name}
            </Link>
          </motion.div>
        );
      })}
      
      <div className="w-[1px] h-4 bg-white/10 mx-2" />
      
      <button 
        onClick={toggleTheme}
        className="p-2.5 rounded-full text-secondary hover:text-white transition-colors flex items-center justify-center hover:bg-white/5"
        aria-label="Toggle Theme"
      >
        {isDark ? <Sun size={11} strokeWidth={2.5} /> : <Moon size={11} strokeWidth={2.5} />}
      </button>
    </nav>
  );
}
