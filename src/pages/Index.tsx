
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
            description="Take control of your nutrition with Healium's intuitive meal tracking system. Our app makes it simple to monitor what you eat, understand your nutritional intake, and make healthier food choices every day."
            features={[
              "Comprehensive Food Diary: Record all your meals, snacks, and beverages with our easy-to-use interface.",
              "Nutritional Insights: Track calories, macronutrients, and micronutrients to understand your dietary patterns.",
              "Meal Planning Tools: Create weekly meal plans based on your nutritional goals and preferences.",
              "Recipe Inspiration: Discover hundreds of healthy, delicious recipes tailored to your dietary needs.",
              "Smart Suggestions: Receive personalized recommendations based on your goals and eating habits."
            ]}
          >
            <ThreeJSScene activeModel="meal" />
          </FeatureSection>
        </div>
        
        <div ref={workoutRef}>
          <FeatureSection
            id="workout"
            title="Workout Tracking"
            description="Transform your fitness routine with Healium's comprehensive workout tracking features. Whether you're a beginner or fitness enthusiast, our app helps you log activities, monitor progress, and stay motivated on your journey."
            features={[
              "Activity Logger: Track all types of exercises from strength training to cardio, yoga, and more.",
              "Progress Visualization: See your improvement over time with intuitive charts and analytics.",
              "Custom Workout Builder: Create and save personalized workout routines tailored to your goals.",
              "Exercise Library: Access hundreds of exercises with proper form instructions and video guides.",
              "Integration with Wearables: Connect with popular fitness devices for automatic activity tracking."
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
            description="Capture your thoughts, insights, and wellness journey with Healium's thoughtful note-taking system. Document your experiences, track patterns, and gain valuable insights about your overall wellbeing."
            features={[
              "Wellness Journal: Record your daily experiences, emotions, and reflections in a secure digital journal.",
              "Mood Tracking: Monitor your emotional wellbeing and identify patterns that affect your mental health.",
              "Media Integration: Add photos, voice notes, and other media to enrich your entries and memories.",
              "Organizational Tools: Tag, categorize, and search your notes for easy reference and pattern recognition.",
              "Insight Generation: Receive periodic summaries and insights based on your journaling patterns."
            ]}
          >
            <ThreeJSScene activeModel="notes" />
          </FeatureSection>
        </div>
        
        <div ref={goalsRef}>
          <FeatureSection
            id="goals"
            title="Goals & Tasks"
            description="Achieve your wellness aspirations with Healium's powerful goal-setting and task management features. Break down ambitious health goals into manageable steps and track your progress every step of the way."
            features={[
              "Goal Framework: Set SMART (Specific, Measurable, Achievable, Relevant, Time-bound) health goals.",
              "Task Breakdown: Divide large goals into smaller, actionable tasks that build toward success.",
              "Progress Tracking: Monitor completion rates and celebrate milestones along your journey.",
              "Habit Formation: Transform one-time tasks into lasting habits with our scientifically-backed system.",
              "Accountability Tools: Set reminders, create challenges, or find accountability partners for support."
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
