import React from 'react';
import { format, parseISO } from 'date-fns';
import { Doctor, Department, TimeSlot } from '@/types';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QRCode from '../ui-components/QRCode';
import { useLanguage } from '@/contexts/LanguageContext';

interface AppointmentConfirmationProps {
  doctor: Doctor;
  department: Department;
  timeSlot: TimeSlot;
  onBookAppointment: () => void;
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
  doctor,
  department,
  timeSlot,
  onBookAppointment
}) => {
  const { translations } = useLanguage();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{translations.confirmation.title}</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {/* Doctor Info */}
            <div className="flex items-start gap-3">
              <User className="mt-1 text-primary-500" size={24} />
              <div>
                <p className="text-sm text-gray-500">{translations.confirmation.doctor}</p>
                <h3 className="text-xl font-bold">{doctor.name}</h3>
                <p className="text-gray-700">{doctor.specialization}</p>
              </div>
            </div>

            {/* Department Info */}
            <div className="flex items-start gap-3">
              <Stethoscope className="mt-1 text-primary-500" size={24} />
              <div>
                <p className="text-sm text-gray-500">{translations.confirmation.department}</p>
                <h3 className="text-xl font-bold">{department.name}</h3>
              </div>
            </div>

            {/* Date Info */}
            <div className="flex items-start gap-3">
              <Calendar className="mt-1 text-primary-500" size={24} />
              <div>
                <p className="text-sm text-gray-500">{translations.confirmation.date}</p>
                <h3 className="text-xl font-bold">
                  {format(parseISO(timeSlot.startTime), 'EEEE, MMMM d, yyyy')}
                </h3>
              </div>
            </div>

            {/* Time Info */}
            <div className="flex items-start gap-3">
              <Clock className="mt-1 text-primary-500" size={24} />
              <div>
                <p className="text-sm text-gray-500">{translations.confirmation.time}</p>
                <h3 className="text-xl font-bold">
                  {timeSlot.label}
                </h3>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <QRCode 
              value={`appointment:${timeSlot.id}:${doctor.id}:${department.id}`}
              size={150}
            />
            <p className="text-sm text-gray-600 mt-2">{translations.confirmation.scanQR}</p>
          </div>
        </div>

        {/* Confirmation Section */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600">
              <p>{translations.confirmation.arriveEarly}</p>
              <p>{translations.confirmation.bringDocuments}</p>
            </div>
            <Button
              onClick={onBookAppointment}
              className="w-full md:w-auto px-8 py-3 text-lg"
            >
              {translations.confirmation.confirmButton}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
