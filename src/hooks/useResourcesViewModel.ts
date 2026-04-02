import { useState } from 'react';
import { useResourcesAnimations } from './useResourcesAnimations';
import { 
  DAILY_SCHEDULE, 
  MONTHLY_GRID, 
  MONTHLY_EVENTS, 
  WEEKLY_DATA, 
  EVENTS_DATA, 
  PARTNER_ARTICLES 
} from '../constants/resourcesData';

export const useResourcesViewModel = () => {
  const animations = useResourcesAnimations();

  // --- STATE ---
  const [calendarView, setCalendarView] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [featureScrollIndex, setFeatureScrollIndex] = useState(0);

  // --- HANDLERS ---
  const nextEvent = () => setCurrentEventIndex((prev) => (prev + 1) % EVENTS_DATA.length);
  const prevEvent = () => setCurrentEventIndex((prev) => (prev - 1 + EVENTS_DATA.length) % EVENTS_DATA.length);

  const nextFeature = () => {
    const maxIndex = Math.max(0, PARTNER_ARTICLES.length - 1);
    setFeatureScrollIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };
  const prevFeature = () => {
    const maxIndex = Math.max(0, PARTNER_ARTICLES.length - 1);
    setFeatureScrollIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const activeEvent = EVENTS_DATA[currentEventIndex];

  return {
    state: {
      calendarView,
      currentEventIndex,
      featureScrollIndex,
      activeEvent,
      data: {
        dailySchedule: DAILY_SCHEDULE,
        monthlyGrid: MONTHLY_GRID,
        monthlyEvents: MONTHLY_EVENTS,
        weeklyData: WEEKLY_DATA,
        eventsData: EVENTS_DATA,
        partnerArticles: PARTNER_ARTICLES
      }
    },
    actions: {
      setCalendarView,
      nextEvent,
      prevEvent,
      nextFeature,
      prevFeature
    },
    animations
  };
};
