import { useState, useEffect, useRef, useCallback } from 'react';

interface UseScrollProgressOptions {
  requiredPercentage?: number; // Default 95%
  onComplete?: () => void;
}

interface UseScrollProgressReturn {
  progress: number;
  isComplete: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const useScrollProgress = ({
  requiredPercentage = 95,
  onComplete,
}: UseScrollProgressOptions = {}): UseScrollProgressReturn => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [maxProgress, setMaxProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCalledComplete = useRef(false);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const scrollableHeight = scrollHeight - clientHeight;
    
    if (scrollableHeight <= 0) {
      // Content fits without scrolling - mark as complete
      setProgress(100);
      setMaxProgress(100);
      if (!hasCalledComplete.current) {
        hasCalledComplete.current = true;
        setIsComplete(true);
        onComplete?.();
      }
      return;
    }

    const currentProgress = Math.round((scrollTop / scrollableHeight) * 100);
    
    // Track maximum progress (don't decrease when scrolling up)
    setMaxProgress(prev => {
      const newMax = Math.max(prev, currentProgress);
      setProgress(newMax);
      
      if (newMax >= requiredPercentage && !hasCalledComplete.current) {
        hasCalledComplete.current = true;
        setIsComplete(true);
        onComplete?.();
      }
      
      return newMax;
    });
  }, [requiredPercentage, onComplete]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initial check
    handleScroll();

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    progress,
    isComplete,
    containerRef,
  };
};
