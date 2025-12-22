import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Level {
  level: number;
  required_xp: number;
  name: string;
  description: string | null;
}

export const useLevelProgress = (currentXp: number) => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLevels = async () => {
      const { data, error } = await supabase
        .from("levels")
        .select("*")
        .order("level", { ascending: true });

      if (!error && data) {
        setLevels(data);
      }
      setLoading(false);
    };

    fetchLevels();
  }, []);

  // Calculate current level info
  const getCurrentLevel = () => {
    if (levels.length === 0) return null;
    
    let current = levels[0];
    for (const level of levels) {
      if (currentXp >= level.required_xp) {
        current = level;
      } else {
        break;
      }
    }
    return current;
  };

  // Calculate next level info
  const getNextLevel = () => {
    if (levels.length === 0) return null;
    
    for (const level of levels) {
      if (currentXp < level.required_xp) {
        return level;
      }
    }
    return null; // Max level reached
  };

  // Calculate progress percentage to next level
  const getProgressToNextLevel = () => {
    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();
    
    if (!currentLevel || !nextLevel) {
      return 100; // Max level reached
    }

    const xpInCurrentLevel = currentXp - currentLevel.required_xp;
    const xpNeededForNextLevel = nextLevel.required_xp - currentLevel.required_xp;
    
    return Math.min(100, Math.floor((xpInCurrentLevel / xpNeededForNextLevel) * 100));
  };

  // Get XP needed for next level
  const getXpToNextLevel = () => {
    const nextLevel = getNextLevel();
    if (!nextLevel) return 0;
    return nextLevel.required_xp - currentXp;
  };

  return {
    levels,
    loading,
    currentLevel: getCurrentLevel(),
    nextLevel: getNextLevel(),
    progressPercent: getProgressToNextLevel(),
    xpToNextLevel: getXpToNextLevel(),
  };
};
