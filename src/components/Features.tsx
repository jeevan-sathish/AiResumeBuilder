
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Sparkles, FileText } from 'lucide-react';

const features = [
  {
    title: "ATS-Friendly Templates",
    description: "Our resume layouts are designed to pass Applicant Tracking Systems with ease, ensuring your resume gets seen by human recruiters.",
    icon: CheckCircle2,
  },
  {
    title: "AI-Powered Content Suggestions",
    description: "Get smart recommendations to improve your resume's language and highlight your skills more effectively.",
    icon: Sparkles,
  },
  {
    title: "Multiple Export Options",
    description: "Download your resume in various formats including PDF, ready to be submitted to your dream job applications.",
    icon: FileText,
  },
];

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setActiveIndex(prev => (prev === features.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex(prev => (prev === 0 ? features.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Designed to help you create the perfect resume that showcases your talents and gets you noticed.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="carousel-container overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-full flex-shrink-0 px-6 py-10">
                  <div className="feature-card h-full flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-6">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 dark:bg-black/50 text-foreground shadow-md hover:bg-white dark:hover:bg-black/80 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 dark:bg-black/50 text-foreground shadow-md hover:bg-white dark:hover:bg-black/80 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="flex justify-center mt-6 gap-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index ? "w-8 bg-primary" : "w-2 bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
