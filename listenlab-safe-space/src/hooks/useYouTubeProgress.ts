import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface UseYouTubeProgressOptions {
  videoUrl: string;
  requiredPercentage?: number; // Default 90%
  onComplete?: () => void;
}

interface UseYouTubeProgressReturn {
  progress: number;
  isComplete: boolean;
  iframeId: string;
  getEmbedUrl: () => string;
}

// Extract video ID from various YouTube URL formats
const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

export const useYouTubeProgress = ({
  videoUrl,
  requiredPercentage = 90,
  onComplete,
}: UseYouTubeProgressOptions): UseYouTubeProgressReturn => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasCalledComplete = useRef(false);
  const onCompleteRef = useRef(onComplete);
  
  // Keep onComplete ref up to date
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const videoId = extractVideoId(videoUrl);
  
  // Generate a stable unique ID for the iframe
  const iframeId = useMemo(() => `youtube-player-${videoId || 'unknown'}`, [videoId]);

  const getEmbedUrl = useCallback(() => {
    if (!videoId) return '';
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`;
  }, [videoId]);

  useEffect(() => {
    if (!videoId || typeof window === 'undefined') return;

    // Clean up any previous player
    if (playerRef.current?.destroy) {
      playerRef.current.destroy();
      playerRef.current = null;
    }

    // Load YouTube IFrame API if not already loaded
    const loadYouTubeAPI = () => {
      return new Promise<void>((resolve) => {
        if ((window as any).YT?.Player) {
          resolve();
          return;
        }
        
        // Check if script is already being loaded
        const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
        if (existingScript) {
          // Wait for it to load
          const checkInterval = setInterval(() => {
            if ((window as any).YT?.Player) {
              clearInterval(checkInterval);
              resolve();
            }
          }, 100);
          return;
        }

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        (window as any).onYouTubeIframeAPIReady = () => {
          resolve();
        };
      });
    };

    const initPlayer = async () => {
      await loadYouTubeAPI();
      
      // Small delay to ensure iframe is in DOM
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const iframeElement = document.getElementById(iframeId);
      if (!iframeElement) {
        console.warn('YouTube iframe not found:', iframeId);
        return;
      }

      try {
        playerRef.current = new (window as any).YT.Player(iframeId, {
          events: {
            onReady: () => {
              console.log('YouTube player ready');
            },
            onStateChange: (event: any) => {
              // Track progress when playing
              if (event.data === (window as any).YT.PlayerState.PLAYING) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                
                intervalRef.current = setInterval(() => {
                  if (playerRef.current?.getCurrentTime && playerRef.current?.getDuration) {
                    const currentTime = playerRef.current.getCurrentTime();
                    const duration = playerRef.current.getDuration();
                    
                    if (duration > 0) {
                      const percent = Math.round((currentTime / duration) * 100);
                      setProgress(percent);
                      
                      if (percent >= requiredPercentage && !hasCalledComplete.current) {
                        hasCalledComplete.current = true;
                        setIsComplete(true);
                        onCompleteRef.current?.();
                      }
                    }
                  }
                }, 1000);
              } else {
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                  intervalRef.current = null;
                }
              }
            },
          },
        });
      } catch (error) {
        console.error('Failed to initialize YouTube player:', error);
      }
    };

    initPlayer();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId, iframeId, requiredPercentage]);

  return {
    progress,
    isComplete,
    iframeId,
    getEmbedUrl,
  };
};
