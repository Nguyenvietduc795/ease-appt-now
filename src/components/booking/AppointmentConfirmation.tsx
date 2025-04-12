
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Doctor, Department, TimeSlot } from '@/types';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QRCode from '../ui-components/QRCode';
import { toast } from '@/components/ui/sonner';

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
  const startTime = parseISO(timeSlot.startTime);
  const endTime = parseISO(timeSlot.endTime);

  const handleBooking = () => {
    // Here you would typically make an API call to save the appointment
    onBookAppointment();
    toast.success("Appointment booked successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Confirm Your Appointment</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-3">
              <User className="mt-1 text-primary-500 flex-shrink-0" size={24} />
              <div>
                <p className="text-sm text-gray-500 mb-1">Doctor</p>
                <h3 className="text-xl font-bold">{doctor.name}</h3>
                <p className="text-gray-700">{doctor.specialization}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Stethoscope className="mt-1 text-primary-500 flex-shrink-0" size={24} />
              <div>
                <p className="text-sm text-gray-500 mb-1">Department</p>
                <h3 className="text-xl font-bold">{department.name}</h3>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Calendar className="mt-1 text-primary-500 flex-shrink-0" size={24} />
              <div>
                <p className="text-sm text-gray-500 mb-1">Date</p>
                <h3 className="text-xl font-bold">{format(startTime, 'EEEE, MMMM d, yyyy')}</h3>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="mt-1 text-primary-500 flex-shrink-0" size={24} />
              <div>
                <p className="text-sm text-gray-500 mb-1">Time</p>
                <h3 className="text-xl font-bold">
                  {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
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
            <p className="text-gray-600 text-center mt-2 text-sm">
              Your appointment QR code
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-gray-600">
                Please arrive 15 minutes before your appointment time.
                <br />Don't forget to bring your identification and insurance card.
              </p>
            </div>
            
            <Button
              onClick={handleBooking}
              className="w-full md:w-auto text-lg py-6 px-8"
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
