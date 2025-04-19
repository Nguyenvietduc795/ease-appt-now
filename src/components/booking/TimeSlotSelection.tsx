
import React, { useState } from 'react';
import { format, parseISO, isSameDay, isPast, isAfter, setHours, setMinutes } from 'date-fns';
import { TimeSlot, Doctor } from '@/types';
import AccessibleCard from '../ui-components/AccessibleCard';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/components/ui/sonner';

interface TimeSlotSelectionProps {
  timeSlots: TimeSlot[];
  selectedTimeSlot: string | null;
  doctor: Doctor | null;
  onSelectTimeSlot: (timeSlotId: string) => void;
  currentAppointmentTime?: string;
  isRescheduling?: boolean;
}

const HOSPITAL_HOURS = {
  start: 8,
  end: 18,
};

const isWithinWorkingHours = (date: Date): boolean => {
  const hour = date.getHours();
  return hour >= HOSPITAL_HOURS.start && hour < HOSPITAL_HOURS.end;
};

const TimeSlotSelection: React.FC<TimeSlotSelectionProps> = ({
  timeSlots,
  selectedTimeSlot,
  doctor,
  onSelectTimeSlot,
  currentAppointmentTime,
  isRescheduling = false
}) => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const availableTimeSlots = timeSlots.filter(slot => {
    const slotTime = parseISO(slot.startTime);
    const isPastSlot = isPast(slotTime);
    const isCurrentSlot = currentAppointmentTime && slot.startTime === currentAppointmentTime;
    const isAvailable = slot.available;
    const isWorkingHours = isWithinWorkingHours(slotTime);

    return isAvailable && !isPastSlot && (!isRescheduling || !isCurrentSlot) && isWorkingHours;
  });

  const timeSlotsByDate = availableTimeSlots.reduce((acc, slot) => {
    const date = parseISO(slot.startTime);
    const dateKey = format(date, 'yyyy-MM-dd');
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    
    acc[dateKey].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  const availableDates = Object.keys(timeSlotsByDate)
    .map(dateStr => parseISO(dateStr))
    .sort((a, b) => a.getTime() - b.getTime());

  React.useEffect(() => {
    if (availableDates.length > 0 && !timeSlotsByDate[format(selectedDate, 'yyyy-MM-dd')]) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates.length]);

  // Only get slots for the specifically selected date
  const slotsForSelectedDate = timeSlotsByDate[format(selectedDate, 'yyyy-MM-dd')] || [];

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

  const handleTimeSlotSelection = (slotId: string) => {
    const selectedSlot = timeSlots.find(slot => slot.id === slotId);
    if (!selectedSlot) return;

    const slotTime = parseISO(selectedSlot.startTime);

    if (isPast(slotTime)) {
      toast.error(t('slot.past'));
      return;
    }

    if (!isWithinWorkingHours(slotTime)) {
      toast.error(t('slot.outside.hours'));
      return;
    }

    onSelectTimeSlot(slotId);
  };

  const renderTimeSlot = (slot: TimeSlot) => {
    const startTime = parseISO(slot.startTime);
    const endTime = parseISO(slot.endTime);
    const isCurrentAppointment = currentAppointmentTime === slot.startTime;
    const isWorkingHours = isWithinWorkingHours(startTime);
    const isPastTime = isPast(startTime);
    
    if (!isWorkingHours || isPastTime) {
      return null;
    }
    
    return (
      <AccessibleCard
        key={slot.id}
        selected={selectedTimeSlot === slot.id}
        onClick={() => handleTimeSlotSelection(slot.id)}
        hoverable={true}
        className={`text-center cursor-pointer ${isCurrentAppointment ? 'border-primary-500' : ''}`}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock size={18} className="text-primary-500" />
          <p className="text-lg font-bold">
            {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
          </p>
        </div>
        <p className={`text-sm ${isCurrentAppointment ? 'text-primary-600' : 'text-green-600'}`}>
          {isCurrentAppointment ? t('current.slot') : t('available')}
        </p>
      </AccessibleCard>
    );
  };

  if (availableDates.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          {isRescheduling ? t('no.slots.reschedule') : t('no.slots')}
        </h3>
        <p className="text-gray-600">
          {t('no.slots.message')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {isRescheduling ? t('choose.new.slot') : t('choose.slot')}
      </h2>
      
      {doctor && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-lg text-blue-900">
            {t('selected.doctor')}: {doctor.name}
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
          aria-label={t('previous.date')}
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
          aria-label={t('next.date')}
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
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
          slotsForSelectedDate.map(slot => renderTimeSlot(slot))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-8">
            {t('no.slots.date')}
          </p>
        )}
      </div>
    </div>
  );
};

export default TimeSlotSelection;
