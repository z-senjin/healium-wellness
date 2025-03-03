
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ease-in-out",
        scrolled ? "bg-dark-green/90 backdrop-blur-lg shadow-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-white">
            Healium
          </span>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <button 
            className="text-white hover:text-secondary font-medium transition-colors duration-200"
          >
            Meal Tracking
          </button>
          <button 
            className="text-white hover:text-secondary font-medium transition-colors duration-200"
          >
            Workouts
          </button>
          <button 
            className="text-white hover:text-secondary font-medium transition-colors duration-200"
          >
            Notes
          </button>
          <button 
            className="text-white hover:text-secondary font-medium transition-colors duration-200"
          >
            Goals
          </button>
        </nav>
        
        <div className="flex space-x-4">
          <Button 
            variant="ghost" 
            className="hidden md:flex bg-primary/20 hover:bg-primary/30 text-white"
          >
            Sign In
          </Button>
          <Button 
            className="bg-gradient-to-r from-muted to-primary hover:from-muted hover:to-primary-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl button-glow"
          >
            Download App
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
