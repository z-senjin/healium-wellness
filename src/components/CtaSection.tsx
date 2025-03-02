
import React from 'react';
import { Button } from '@/components/ui/button';

const CtaSection: React.FC = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="glass-card p-12 md:p-16 text-center">
          <span className="inline-block bg-primary-100 text-primary-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
            Start Your Wellness Journey Today
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-900 mb-6">
            Ready to Transform Your Health?
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg text-primary-800/80 mb-8">
            Join thousands of users who have already improved their health and wellness with Healium. Download now and take the first step toward a healthier you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 button-glow w-full sm:w-auto"
            >
              Download Healium
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary-300 text-primary-700 hover:bg-primary-50 w-full sm:w-auto"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-300/20 rounded-full blur-3xl opacity-60 animate-pulse-soft"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl opacity-60 animate-pulse-soft"></div>
    </section>
  );
};

export default CtaSection;
