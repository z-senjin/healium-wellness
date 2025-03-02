
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureSectionProps {
  id: string;
  title: string;
  description: string;
  features: string[];
  children?: React.ReactNode;
  isReversed?: boolean;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  id,
  title,
  description,
  features,
  children,
  isReversed = false,
}) => {
  return (
    <section 
      id={id} 
      className="py-24 px-6 feature-section"
    >
      <div 
        className={cn(
          "max-w-7xl mx-auto grid gap-12 items-center",
          isReversed ? "md:grid-cols-[1fr_1.2fr]" : "md:grid-cols-[1.2fr_1fr]",
          isReversed && "md:grid-flow-dense"
        )}
      >
        <div className={cn("flex flex-col space-y-6", isReversed && "md:order-2")}>
          <div className="inline-flex">
            <span className="bg-primary-100 text-primary-800 px-4 py-1 rounded-full text-sm font-medium">
              {title}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-900">
            {title}
          </h2>
          <p className="text-lg text-primary-800/80">
            {description}
          </p>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 6L5 7.5L8.5 4" stroke="#7c5fea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="text-primary-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={cn(
          "relative h-80 md:h-[500px] rounded-2xl overflow-hidden glass-card flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100/50",
          isReversed && "md:order-1"
        )}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
