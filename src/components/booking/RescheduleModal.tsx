import React, { useState, useEffect } from 'react';
import { format, parseISO, addDays, isBefore, startOfToday, startOfDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { generateTimeSlots, TimeSlot } from '@/utils/timeUtils';
import { useLanguage } from '@/contexts/LanguageContext';

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    id: string;
    doctorName: string;
    departmentName: string;
    startTime: string;
    endTime: string;
  } | null;
  onReschedule: (appointmentId: string, newStartTime: string, newEndTime: string) => void;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  isOpen,
  onClose,
  appointment,
  onReschedule
}) => {
  const { translations } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots(selectedDate);
      setAvailableTimeSlots(slots);
      setSelectedTimeSlot(null);
    }
  }, [selectedDate]);

  const handleConfirmReschedule = () => {
    if (!selectedDate || !selectedTimeSlot || !appointment) {
      toast.error(translations.notifications.completeInfo);
      return;
    }

    try {
      onReschedule(
        appointment.id,
        selectedTimeSlot.startTime.toISOString(),
        selectedTimeSlot.endTime.toISOString()
      );

      setSelectedDate(null);
      setSelectedTimeSlot(null);
      onClose();
      
      toast.success(translations.notifications.rescheduleSuccess);
    } catch (error) {
      toast.error(translations.notifications.error);
    }
  };

  if (!appointment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Đổi Lịch Hẹn</DialogTitle>
          <DialogDescription>
            Lịch hẹn hiện tại với Bác sĩ {appointment.doctorName} tại {appointment.departmentName}<br />
            Thời gian: {format(parseISO(appointment.startTime), 'EEEE, MMMM d, yyyy HH:mm')} - 
            {format(parseISO(appointment.endTime), 'HH:mm')}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="date" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="date" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Chọn Ngày
            </TabsTrigger>
            <TabsTrigger value="time" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Chọn Giờ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="date" className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => {
                const today = startOfDay(new Date());
                return isBefore(date, today) || 
                       isBefore(addDays(today, 30), date);
              }}
              className="rounded-md border"
            />
          </TabsContent>

          <TabsContent value="time" className="space-y-4">
            {selectedDate ? (
              <div className="grid grid-cols-3 gap-3">
                {availableTimeSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className="w-full"
                  >
                    {slot.label}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">Vui lòng chọn ngày trước</p>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Thời gian đã chọn:</h4>
          {selectedDate && selectedTimeSlot ? (
            <div className="space-y-1">
              <p className="text-primary-600">
                Ngày: {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </p>
              <p className="text-primary-600">
                Giờ: {selectedTimeSlot.label}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 italic">Vui lòng chọn ngày và giờ cho lịch hẹn</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {translations.common.cancel}
          </Button>
          <Button
            onClick={handleConfirmReschedule}
            disabled={!selectedDate || !selectedTimeSlot}
          >
            Xác Nhận Thay Đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleModal; 