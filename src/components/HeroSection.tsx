
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-16 md:pb-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <span className="inline-block animate-fade-in bg-primary-100 text-primary-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
          Your Complete Wellness Companion
        </span>
        
        <h1 className="text-5xl md:text-7xl font-bold animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-primary-800 to-primary-600 mb-6 leading-tight">
          Transform Your Health Journey
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-800/80 animate-fade-in mb-8">
          Healium combines meal tracking, workout logging, note-taking, and goal setting in one beautiful app to help you achieve your wellness goals.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 button-glow w-full sm:w-auto"
          >
            Download Now
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary-300 text-primary-700 hover:bg-primary-50 w-full sm:w-auto"
          >
            Learn More
          </Button>
        </div>
        
        <div className="mt-12 md:mt-16 relative animate-fade-in">
          <div className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-2xl glass-card">
            <div className="aspect-[16/9] bg-gradient-to-br from-primary-100 to-primary-200/50 flex items-center justify-center">
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-primary-800 mb-4">Healium Mobile App</h3>
                <p className="text-primary-700">Your all-in-one wellness solution</p>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-20 h-20 md:w-32 md:h-32 bg-primary-300/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-20 h-20 md:w-32 md:h-32 bg-primary-400/20 rounded-full blur-2xl"></div>
        </div>
      </div>
      
      {/* Background gradient blobs */}
      <div className="absolute top-24 left-1/4 w-64 h-64 bg-primary-300/20 rounded-full blur-3xl opacity-70 animate-pulse-soft"></div>
      <div className="absolute bottom-24 right-1/4 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl opacity-70 animate-pulse-soft animation-delay-1000"></div>
    </section>
  );
};

export default HeroSection;
