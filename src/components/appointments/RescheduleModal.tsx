import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    doctor: string;
    department: string;
    currentDateTime: string;
  };
}

const RescheduleModal = ({ isOpen, onClose, appointment }: RescheduleModalProps) => {
  const { translations } = useLanguage();
  const { reschedule } = translations;
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error(reschedule.notifications.selectDateTime);
      return;
    }

    try {
      // Gọi API để cập nhật lịch hẹn
      // await rescheduleAppointment(appointment.id, selectedDate, selectedTime);
      toast.success(reschedule.notifications.success);
      onClose();
    } catch (error) {
      toast.error(reschedule.notifications.error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4">
          {reschedule.title}
        </h2>

        <div className="mb-6">
          <p className="text-gray-600">
            {reschedule.currentAppointment} {appointment.doctor} {reschedule.at} {appointment.department}
          </p>
          <p className="mt-2">
            <span className="font-medium">{reschedule.time}</span> {appointment.currentDateTime}
          </p>
        </div>

        <div className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {reschedule.selectDate}
            </label>
            <input
              type="date"
              className="form-input w-full"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {reschedule.selectTime}
            </label>
            <select
              className="form-select w-full"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">{reschedule.pleaseSelect}</option>
              {/* Thêm các time slots ở đây */}
            </select>
          </div>

          {selectedTime && (
            <div className="mt-4">
              <p className="font-medium">
                {reschedule.selectedTime} {selectedTime}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            {reschedule.cancel}
          </button>
          <button
            className="btn btn-primary"
            onClick={handleReschedule}
          >
            {reschedule.confirmChanges}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal; 