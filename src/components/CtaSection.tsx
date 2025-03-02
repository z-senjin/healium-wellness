
import React from 'react';
import { Button } from '@/components/ui/button';

const CtaSection: React.FC = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="glass-card p-12 md:p-16 text-center">
          <span className="inline-block bg-secondary text-dark-green px-4 py-1 rounded-full text-sm font-medium mb-6">
            Begin Your Wellness Journey Today
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary mb-6">
            Ready to Transform Your Health?
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg text-white/80 mb-6">
            Join thousands of users who have already improved their health and wellness with Healium. Our science-backed approach combines habit formation, mindfulness, and personalized guidance to help you achieve lasting results.
          </p>
          
          <p className="max-w-xl mx-auto text-md text-white/70 mb-8">
            Whether you're just beginning your wellness journey or looking to take your health to the next level, Healium provides the tools, insights, and support you need to succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-muted to-primary hover:from-muted hover:to-primary-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl button-glow w-full sm:w-auto"
            >
              Download Healium
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-secondary text-secondary hover:bg-primary-800 w-full sm:w-auto"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-muted/20 rounded-full blur-3xl opacity-60 animate-pulse-soft"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-60 animate-pulse-soft"></div>
    </section>
  );
};

export default CtaSection;
