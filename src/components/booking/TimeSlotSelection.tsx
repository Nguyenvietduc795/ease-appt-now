import React, { useState, useEffect } from 'react';
import { format, parseISO, addDays, setHours, setMinutes } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Doctor, TimeSlot } from '@/types';
import { generateTimeSlots } from '@/utils/timeUtils';
import { useLanguage } from '@/contexts/LanguageContext';

interface TimeSlotSelectionProps {
  doctor: Doctor | undefined;
  onSelectTimeSlot: (timeSlot: TimeSlot) => void;
}

const TimeSlotSelection: React.FC<TimeSlotSelectionProps> = ({
  doctor,
  onSelectTimeSlot,
}) => {
  const { translations } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots(selectedDate);
      setAvailableTimeSlots(slots);
      setSelectedTimeSlot(null);
    }
  }, [selectedDate]);

  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const currentDate = new Date();
    const isToday = date.toDateString() === currentDate.toDateString();
    const currentHour = currentDate.getHours();

    for (let hour = 8; hour < 17; hour++) {
      if (hour === 12) continue; // Skip lunch hour

      // If today, only show future time slots
      if (isToday && hour <= currentHour) continue;

      const startTime = new Date(date);
      startTime.setHours(hour, 0, 0, 0);
      const endTime = new Date(date);
      endTime.setHours(hour + 1, 0, 0, 0);

      slots.push({
        id: `${format(date, 'yyyy-MM-dd')}-${hour}`,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        label: `${hour}:00 - ${hour + 1}:00`,
        isAvailable: true
      });
    }
    return slots;
  };

  const handleTimeSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    onSelectTimeSlot(timeSlot);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{translations.booking.selectDate}</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today || date > addDays(today, 30);
              }}
              className="rounded-md border"
            />
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium">{translations.booking.selectTime}</h3>
            {selectedDate ? (
              availableTimeSlots.length > 0 ? (
                <div className="grid grid-cols-3 gap-3">
                  {availableTimeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
                      onClick={() => handleTimeSelect(slot)}
                      className="w-full"
                    >
                      {slot.label}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  {translations.booking.noTimeSlots}
                </p>
              )
            ) : (
              <p className="text-center text-gray-500">
                {translations.booking.pleaseSelectDate}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedTimeSlot && (
        <div className="bg-primary-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">{translations.booking.selectedTime}:</h4>
          <p className="text-primary-600">
            {format(selectedDate!, 'EEEE, MMMM d, yyyy')} - {selectedTimeSlot.label}
          </p>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelection;
