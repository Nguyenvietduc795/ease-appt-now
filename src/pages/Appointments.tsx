import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageTitle from '@/components/ui-components/PageTitle';
import AccessibleCard from '@/components/ui-components/AccessibleCard';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CheckCircle, XCircle, Info } from 'lucide-react';
import { format, parseISO, isPast } from 'date-fns';
import { toast } from '@/components/ui/sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Mock appointment data with available time slots
const mockAppointments = [
  {
    id: '1',
    doctorName: 'Dr. John Smith',
    departmentName: 'Cardiology',
    date: '2025-04-15T10:00:00.000Z',
    endTime: '2025-04-15T11:00:00.000Z',
    status: 'scheduled',
  },
  {
    id: '2',
    doctorName: 'Dr. Emily Johnson',
    departmentName: 'Dermatology',
    date: '2025-04-20T14:00:00.000Z',
    endTime: '2025-04-20T15:00:00.000Z',
    status: 'scheduled',
  }
];

// Mock available time slots for rescheduling
const mockAvailableTimeSlots = [
  {
    id: 't1',
    startTime: '2025-04-22T09:00:00.000Z',
    endTime: '2025-04-22T10:00:00.000Z',
  },
  {
    id: 't2',
    startTime: '2025-04-22T10:00:00.000Z',
    endTime: '2025-04-22T11:00:00.000Z',
  },
  {
    id: 't3',
    startTime: '2025-04-22T14:00:00.000Z',
    endTime: '2025-04-22T15:00:00.000Z',
  },
];

const Appointments = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [isReschedulingOpen, setIsReschedulingOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<typeof mockAppointments[0] | null>(null);
  
  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.map(app => 
      app.id === id ? {...app, status: 'cancelled'} : app
    ));
    toast.success('Appointment cancelled successfully');
  };
  
  const handleReschedule = (appointment: typeof mockAppointments[0]) => {
    setSelectedAppointment(appointment);
    setIsReschedulingOpen(true);
  };

  const handleTimeSlotSelect = (newTimeSlot: typeof mockAvailableTimeSlots[0]) => {
    if (selectedAppointment) {
      setAppointments(appointments.map(app =>
        app.id === selectedAppointment.id
          ? {
              ...app,
              date: newTimeSlot.startTime,
              endTime: newTimeSlot.endTime,
            }
          : app
      ));
      setIsReschedulingOpen(false);
      setSelectedAppointment(null);
      toast.success('Appointment rescheduled successfully');
    }
  };
  
  // Group appointments by status
  const upcomingAppointments = appointments.filter(app => app.status === 'scheduled');
  const pastAndCancelledAppointments = appointments.filter(
    app => app.status === 'cancelled' || isPast(parseISO(app.date))
  );
  
  const AppointmentCard = ({ appointment }: { appointment: typeof mockAppointments[0] }) => {
    const appointmentDate = parseISO(appointment.date);
    const endTime = parseISO(appointment.endTime);
    const isPastAppointment = isPast(appointmentDate);
    const isCancelled = appointment.status === 'cancelled';
    
    return (
      <AccessibleCard
        className="mb-4"
        hoverable={false}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">{appointment.doctorName}</h3>
            <p className="text-gray-600 mb-2">{appointment.departmentName}</p>
            
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <Calendar size={18} className="text-primary-500 mr-2" />
                <span>{format(appointmentDate, 'EEEE, MMMM d, yyyy')}</span>
              </div>
              
              <div className="flex items-center">
                <Clock size={18} className="text-primary-500 mr-2" />
                <span>
                  {format(appointmentDate, 'h:mm a')} - {format(endTime, 'h:mm a')}
                </span>
              </div>
              
              <div className="flex items-center">
                {isCancelled ? (
                  <XCircle size={18} className="text-red-500 mr-2" />
                ) : isPastAppointment ? (
                  <CheckCircle size={18} className="text-green-500 mr-2" />
                ) : (
                  <Info size={18} className="text-blue-500 mr-2" />
                )}
                <span className={`
                  ${isCancelled ? 'text-red-500' : ''}
                  ${isPastAppointment && !isCancelled ? 'text-green-500' : ''}
                  ${!isPastAppointment && !isCancelled ? 'text-blue-500' : ''}
                  font-medium
                `}>
                  {isCancelled ? 'Cancelled' : isPastAppointment ? 'Completed' : 'Scheduled'}
                </span>
              </div>
            </div>
          </div>
          
          {!isPastAppointment && !isCancelled && (
            <div className="flex flex-col space-y-3">
              <Button 
                variant="outline"
                className="w-full md:w-auto"
                onClick={() => handleReschedule(appointment)}
              >
                Reschedule
              </Button>
              <Button 
                variant="destructive"
                className="w-full md:w-auto"
                onClick={() => handleCancelAppointment(appointment.id)}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </AccessibleCard>
    );
  };
  
  return (
    <Layout>
      <PageTitle title="My Appointments" />
      
      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">No appointments yet</h2>
          <p className="text-gray-600 mb-8">
            You haven't booked any appointments yet.
          </p>
          <Link to="/book">
            <Button size="lg" className="text-lg px-6 py-3">
              Book an Appointment
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
              <Link to="/book">
                <Button>Book New Appointment</Button>
              </Link>
            </div>
            
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <p className="text-gray-600">No upcoming appointments</p>
                <Link to="/book" className="text-primary-600 underline mt-2 inline-block">
                  Book an appointment
                </Link>
              </div>
            )}
          </div>
          
          {pastAndCancelledAppointments.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Past & Cancelled Appointments</h2>
              {pastAndCancelledAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Rescheduling Dialog */}
      <Dialog open={isReschedulingOpen} onOpenChange={setIsReschedulingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div className="text-sm text-gray-600 mb-4">
              Please select a new time slot for your appointment with {selectedAppointment?.doctorName}
            </div>
            
            <div className="space-y-3">
              {mockAvailableTimeSlots.map((slot) => (
                <AccessibleCard
                  key={slot.id}
                  onClick={() => handleTimeSlotSelect(slot)}
                  className="cursor-pointer hover:border-primary-500 transition-colors"
                >
                  <div className="flex items-center justify-between p-2">
                    <div>
                      <div className="font-medium">
                        {format(parseISO(slot.startTime), 'EEEE, MMMM d, yyyy')}
                      </div>
                      <div className="text-gray-600">
                        {format(parseISO(slot.startTime), 'h:mm a')} - {format(parseISO(slot.endTime), 'h:mm a')}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Select
                    </Button>
                  </div>
                </AccessibleCard>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Appointments;
