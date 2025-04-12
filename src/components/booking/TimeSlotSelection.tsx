
import React, { useState } from 'react';
import { format, parseISO, isSameDay } from 'date-fns';
import { TimeSlot, Doctor } from '@/types';
import AccessibleCard from '../ui-components/AccessibleCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TimeSlotSelectionProps {
  timeSlots: TimeSlot[];
  selectedTimeSlot: string | null;
  doctor: Doctor | null;
  onSelectTimeSlot: (timeSlotId: string) => void;
}

const TimeSlotSelection: React.FC<TimeSlotSelectionProps> = ({
  timeSlots,
  selectedTimeSlot,
  doctor,
  onSelectTimeSlot
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Group time slots by date
  const timeSlotsByDate = timeSlots.reduce((acc, slot) => {
    const date = parseISO(slot.startTime);
    const dateKey = format(date, 'yyyy-MM-dd');
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    
    acc[dateKey].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  // Generate unique dates
  const availableDates = Object.keys(timeSlotsByDate).map(dateStr => 
    parseISO(dateStr)
  ).sort((a, b) => a.getTime() - b.getTime());

  // Filter slots for selected date
  const slotsForSelectedDate = timeSlotsByDate[format(selectedDate, 'yyyy-MM-dd')] || [];
  
  // Navigate to previous/next date
  const goToPreviousDate = () => {
    const currentIndex = availableDates.findIndex(date => 
      isSameDay(date, selectedDate)
    );
    if (currentIndex > 0) {
      setSelectedDate(availableDates[currentIndex - 1]);
    }
  };
  
  const goToNextDate = () => {
    const currentIndex = availableDates.findIndex(date => 
      isSameDay(date, selectedDate)
    );
    if (currentIndex < availableDates.length - 1) {
      setSelectedDate(availableDates[currentIndex + 1]);
    }
  };

  // Function to render time slot
  const renderTimeSlot = (slot: TimeSlot) => {
    const startTime = parseISO(slot.startTime);
    const endTime = parseISO(slot.endTime);
    
    return (
      <AccessibleCard
        key={slot.id}
        selected={selectedTimeSlot === slot.id}
        onClick={() => slot.available ? onSelectTimeSlot(slot.id) : null}
        hoverable={slot.available}
        className={`text-center ${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <p className="text-lg font-bold">
          {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
        </p>
        <p className="text-sm mt-2">
          {slot.available ? 'Available' : 'Booked'}
        </p>
      </AccessibleCard>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Choose Time Slot</h2>
      
      {doctor && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-lg text-blue-900">
            Selected Doctor: {doctor.name}
          </h3>
          <p className="text-blue-800">
            {doctor.specialization}
          </p>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={goToPreviousDate}
          disabled={availableDates.findIndex(date => isSameDay(date, selectedDate)) === 0}
          className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
          aria-label="Previous date"
        >
          <ChevronLeft size={24} />
        </button>
        <h3 className="text-xl font-bold">
          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </h3>
        <button 
          onClick={goToNextDate}
          disabled={availableDates.findIndex(date => 
            isSameDay(date, selectedDate)) === availableDates.length - 1}
          className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
          aria-label="Next date"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Date Selector Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {availableDates.map((date, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(date)}
            className={`whitespace-nowrap px-4 py-2 rounded-full font-medium ${
              isSameDay(date, selectedDate) 
                ? 'bg-primary-500 text-white' 
                : 'bg-white border border-gray-200 hover:bg-gray-100'
            }`}
          >
            {format(date, 'EEE, MMM d')}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {slotsForSelectedDate.length > 0 ? (
          slotsForSelectedDate.map(renderTimeSlot)
        ) : (
          <p className="col-span-full text-center text-gray-500 py-8">
            No time slots available for this date
          </p>
        )}
      </div>
    </div>
  );
};

export default TimeSlotSelection;
