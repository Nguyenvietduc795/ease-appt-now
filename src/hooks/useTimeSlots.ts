import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TimeSlot {
  time: string;
  period: 'morning' | 'afternoon' | 'evening';
}

export const useTimeSlots = (selectedDate: string) => {
  const { translations } = useLanguage();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!selectedDate) return;

      setLoading(true);
      try {
        // API call would go here
        // const slots = await getAvailableTimeSlots(selectedDate);
        // setTimeSlots(slots);
      } catch (error) {
        console.error('Failed to fetch time slots:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSlots();
  }, [selectedDate]);

  const groupedSlots = {
    morning: timeSlots.filter(slot => slot.period === 'morning'),
    afternoon: timeSlots.filter(slot => slot.period === 'afternoon'),
    evening: timeSlots.filter(slot => slot.period === 'evening')
  };

  return { timeSlots: groupedSlots, loading };
}; 