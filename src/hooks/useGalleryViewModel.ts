import { useState, useRef, useEffect, useCallback } from 'react';
import { items } from '../constants/galleryData';
import { useGalleryAnimations } from './useGalleryAnimations';

const INTRO_DURATION_MS = 2300;
const IDLE_TIMEOUT_MS = 2000;

export const useGalleryViewModel = () => {
  const { refs, state: animationState } = useGalleryAnimations();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Controls the cream overlay — true = showing, false = faded out
  const [overlayVisible, setOverlayVisible] = useState(true);
  // Controls the drag indicator — hides on activity, returns after idle
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-dismiss cream overlay after 5 s, then enable idle tracking
  useEffect(() => {
    const timer = setTimeout(() => setOverlayVisible(false), INTRO_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  // Once overlay is gone, show indicator (first appearance)
  useEffect(() => {
    if (!overlayVisible) {
      const t = setTimeout(() => setIndicatorVisible(true), 400); // slight delay after fade
      return () => clearTimeout(t);
    }
  }, [overlayVisible]);

  // Idle timer — resets on every user activity
  const resetIdleTimer = useCallback(() => {
    if (overlayVisible) return; // don't run during intro
    setIndicatorVisible(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setIndicatorVisible(true), IDLE_TIMEOUT_MS);
  }, [overlayVisible]);

  // Attach global activity listeners
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'touchstart', 'touchmove'] as const;
    const onActivity = () => resetIdleTimer();
    events.forEach(e => window.addEventListener(e, onActivity, { passive: true }));
    return () => {
      events.forEach(e => window.removeEventListener(e, onActivity));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [resetIdleTimer]);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : '';
  }, [selectedImage]);

  const handleClick = useCallback((src: string) => {
    if (animationState.isDragging) return;
    setSelectedImage(src);
  }, [animationState.isDragging]);

  return {
    state: {
      selectedImage,
      overlayVisible,
      indicatorVisible,
      animationState,
      items
    },
    actions: {
      setSelectedImage,
      handleClick
    },
    refs
  };
};
