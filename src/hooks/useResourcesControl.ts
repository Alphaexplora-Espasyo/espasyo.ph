import { useState } from 'react';
import { EVENTS_DATA, PARTNER_ARTICLES } from '../constants/resourcesData';

export const useResourcesControl = () => {
    const [calendarView, setCalendarView] = useState<"daily" | "weekly" | "monthly">("weekly");
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [featureScrollIndex, setFeatureScrollIndex] = useState(0);

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

    return {
        calendarView,
        setCalendarView,
        currentEventIndex,
        featureScrollIndex,
        nextEvent,
        prevEvent,
        nextFeature,
        prevFeature,
        activeEvent: EVENTS_DATA[currentEventIndex]
    };
};
