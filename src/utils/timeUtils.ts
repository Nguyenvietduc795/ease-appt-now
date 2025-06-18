import { format, isSameDay, isAfter, setHours, setMinutes, startOfHour } from 'date-fns';

export interface TimeSlot {
  id: string;
  time: string;
  label: string;
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
}

export const generateTimeSlots = (selectedDate: Date | null): TimeSlot[] => {
  if (!selectedDate) return [];

  const now = new Date();
  const currentHour = now.getHours();
  const isToday = isSameDay(selectedDate, now);
  const slots: TimeSlot[] = [];

  // Giờ làm việc từ 8:00 đến 17:00
  for (let hour = 8; hour < 17; hour++) {
    // Bỏ qua giờ nghỉ trưa
    if (hour === 12) continue;

    const startTime = setHours(setMinutes(selectedDate, 0), hour);
    const endTime = setHours(setMinutes(selectedDate, 0), hour + 1);

    // Kiểm tra xem time slot có hợp lệ không
    const isAvailable = !isToday || isAfter(startTime, startOfHour(now));

    if (isAvailable) {
      slots.push({
        id: `${format(selectedDate, 'yyyy-MM-dd')}-${hour}`,
        time: `${hour.toString().padStart(2, '0')}:00`,
        label: `${hour}:00 - ${hour + 1}:00`,
        startTime,
        endTime,
        isAvailable: true
      });
    }
  }

  return slots;
}; 