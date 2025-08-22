import { useState, useEffect, useCallback } from 'react';
import type { ProctoringEvent } from '../types';

export const useProctoring = (isActive: boolean) => {
  const [violations, setViolations] = useState<ProctoringEvent[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const addViolation = useCallback((type: ProctoringEvent['type']) => {
    const violation: ProctoringEvent = {
      type,
      timestamp: new Date().toISOString(),
    };
    setViolations(prev => [...prev, violation]);
  }, []);

  const enterFullscreen = useCallback(async () => {
    try {
      await document.documentElement.requestFullscreen();
    } catch (error) {
      console.error('Failed to enter fullscreen:', error);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Failed to exit fullscreen:', error);
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
      
      if (!isFs && isActive) {
        addViolation('fullscreen_exit');
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        addViolation('tab_change');
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      addViolation('right_click');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent common copy/paste shortcuts
      if (
        (e.ctrlKey || e.metaKey) && 
        ['c', 'v', 'a', 'x', 's', 'f', 'p', 'r'].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
        addViolation('copy_paste');
      }
      
      // Prevent F12, F5, etc.
      if ([112, 116, 123].includes(e.keyCode)) {
        e.preventDefault();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, addViolation]);

  return {
    violations,
    violationCount: violations.length,
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
  };
};