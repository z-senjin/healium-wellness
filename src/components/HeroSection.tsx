
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-16 md:pb-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <span className="inline-block animate-fade-in bg-secondary text-dark-green px-4 py-1 rounded-full text-sm font-medium mb-6">
          Your Holistic Wellness Companion
        </span>
        
        <h1 className="text-5xl md:text-7xl font-bold animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary mb-6 leading-tight">
          Transform Your Health & Wellness Journey
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 animate-fade-in mb-8">
          Healium integrates all aspects of your wellness journey in one beautiful app. Track meals, log workouts, capture insights, and achieve your goals—all with a mindful, personalized approach.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary-500 to-muted hover:from-primary-600 hover:to-muted text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 button-glow w-full sm:w-auto"
          >
            Download Now
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-secondary text-secondary hover:bg-primary-800 w-full sm:w-auto"
          >
            Learn More
          </Button>
        </div>
        
        <div className="mt-12 md:mt-16 relative animate-fade-in">
          <div className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-2xl glass-card">
            <div className="aspect-[16/9] bg-gradient-to-br from-primary-800 to-primary-900/50 flex items-center justify-center">
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Healium Mobile App</h3>
                <p className="text-secondary mb-2">Your all-in-one wellness solution</p>
                <p className="text-white/70 text-sm max-w-md mx-auto">Designed with mindfulness at its core, Healium helps you create sustainable wellness habits that last a lifetime.</p>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-20 h-20 md:w-32 md:h-32 bg-muted/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-20 h-20 md:w-32 md:h-32 bg-accent/20 rounded-full blur-2xl"></div>
        </div>
      </div>
      
      {/* Background gradient blobs */}
      <div className="absolute top-24 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-70 animate-pulse-soft"></div>
      <div className="absolute bottom-24 right-1/4 w-80 h-80 bg-muted/20 rounded-full blur-3xl opacity-70 animate-pulse-soft animation-delay-1000"></div>
    </section>
  );
};

export default HeroSection;
