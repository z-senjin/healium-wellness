
import React, { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import ThreeJSScene from '@/components/ThreeJSScene';
import { ModelType } from '@/utils/threeScene';

const Index = () => {
  const [activeModel, setActiveModel] = useState<ModelType>('meal');
  const mealRef = useRef<HTMLDivElement>(null);
  const workoutRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const goalsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Handle navigation from header
  const handleNavigation = (section: string) => {
    let ref: React.RefObject<HTMLDivElement> | null = null;
    
    switch (section) {
      case 'meal':
        ref = mealRef;
        setActiveModel('meal');
        break;
      case 'workout':
        ref = workoutRef;
        setActiveModel('workout');
        break;
      case 'notes':
        ref = notesRef;
        setActiveModel('notes');
        break;
      case 'goals':
        ref = goalsRef;
        setActiveModel('goals');
        break;
      default:
        break;
    }
    
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active model based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      const sections = [
        { ref: mealRef, type: 'meal' },
        { ref: workoutRef, type: 'workout' },
        { ref: notesRef, type: 'notes' },
        { ref: goalsRef, type: 'goals' },
      ];
      
      for (const { ref, type } of sections) {
        if (ref.current) {
          const offsetTop = ref.current.offsetTop;
          const height = ref.current.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveModel(type as ModelType);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Add Three.js script dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-green to-primary-900">
      <Header onNavigate={handleNavigation} />
      
      <main>
        <HeroSection />
        
        <div ref={mealRef}>
          <FeatureSection
            id="meal"
            title="Meal Tracking"
            description="Track your nutrition and plan your meals with ease. Keep a detailed food diary and monitor your caloric intake."
            features={[
              "Log your daily meals and snacks",
              "Track calories and macronutrients",
              "Create custom meal plans",
              "Discover healthy recipes",
              "Set nutrition goals and track progress"
            ]}
          >
            <ThreeJSScene activeModel="meal" />
          </FeatureSection>
        </div>
        
        <div ref={workoutRef}>
          <FeatureSection
            id="workout"
            title="Workout Tracking"
            description="Log your fitness activities and monitor your progress over time. Customize workouts to fit your routine."
            features={[
              "Record workout duration and intensity",
              "Track weights, sets, and reps",
              "Monitor cardio and strength training",
              "View progress with detailed analytics",
              "Set fitness goals and celebrate achievements"
            ]}
            isReversed
          >
            <ThreeJSScene activeModel="workout" />
          </FeatureSection>
        </div>
        
        <div ref={notesRef}>
          <FeatureSection
            id="notes"
            title="Note Taking"
            description="Capture your thoughts, insights, and wellness journey. Keep track of how you feel and what works for you."
            features={[
              "Create wellness journals and diaries",
              "Add mood tracking to your entries",
              "Organize notes with custom tags",
              "Add photos to document your progress",
              "Search through your past entries"
            ]}
          >
            <ThreeJSScene activeModel="notes" />
          </FeatureSection>
        </div>
        
        <div ref={goalsRef}>
          <FeatureSection
            id="goals"
            title="Goals & Tasks"
            description="Set health and wellness goals, break them into manageable tasks, and track your progress along the way."
            features={[
              "Create short and long-term health goals",
              "Break goals into actionable tasks",
              "Set reminders for important activities",
              "Track completion and success rates",
              "View progress with visual dashboards"
            ]}
            isReversed
          >
            <ThreeJSScene activeModel="goals" />
          </FeatureSection>
        </div>
        
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
