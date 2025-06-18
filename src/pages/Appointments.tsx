import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageTitle from '@/components/ui-components/PageTitle';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Building, User, Pencil, Trash2, Plus } from 'lucide-react';
import { format, parseISO, isPast, addHours } from 'date-fns';
import { toast } from '@/components/ui/sonner';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RescheduleModal from '@/components/booking/RescheduleModal';
import { useLanguage } from '@/contexts/LanguageContext';

interface Appointment {
  id: string;
  departmentId: string;
  doctorId: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  department: {
    id: string;
    name: string;
  };
  doctor: {
    id: string;
    name: string;
    specialization: string;
  };
  createdAt: string;
}

const Appointments = () => {
  const { translations } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadAppointments();
    window.addEventListener('storage', loadAppointments);
    return () => window.removeEventListener('storage', loadAppointments);
  }, []);

  const loadAppointments = () => {
    try {
      const savedAppointments = localStorage.getItem('appointments');
      if (savedAppointments) {
        const parsed = JSON.parse(savedAppointments);
        const sorted = parsed.sort((a: Appointment, b: Appointment) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setAppointments(sorted);
      }
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
  };

  const handleCancelAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCancelDialogOpen(true);
  };

  const confirmCancelAppointment = () => {
    if (selectedAppointment) {
      try {
        const updatedAppointments = appointments.map(apt => 
          apt.id === selectedAppointment.id 
            ? { ...apt, status: 'cancelled' }
            : apt
        );
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        setAppointments(updatedAppointments);
        toast.success(translations.notifications.appointmentCancelled);
      } catch (error) {
        toast.error(translations.notifications.error);
      }
    }
    setCancelDialogOpen(false);
  };

  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsRescheduleModalOpen(true);
  };

  const handleConfirmReschedule = (
    appointmentId: string,
    newStartTime: string,
    newEndTime: string
  ) => {
    try {
      const updatedAppointments = appointments.map(apt =>
        apt.id === appointmentId
          ? {
              ...apt,
              startTime: newStartTime,
              endTime: newEndTime,
            }
          : apt
      );

      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      setAppointments(updatedAppointments);
      toast.success(translations.notifications.rescheduleSuccess);
    } catch (error) {
      toast.error(translations.notifications.rescheduleError);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 17; hour++) {
      if (hour !== 12) { // Skip lunch hour
        slots.push(`${hour.toString().padStart(2, '0')}:00`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <PageTitle title={translations.appointments.title} />
        <Button 
          onClick={() => navigate('/book-appointment')}
          className="bg-primary hover:bg-primary/90 flex items-center gap-2"
        >
          <Plus size={20} />
          {translations.appointments.bookNewAppointment}
        </Button>
      </div>

      {appointments.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500 mb-4">{translations.appointments.noAppointments}</p>
            <Button 
              onClick={() => navigate('/book-appointment')}
              className="bg-primary hover:bg-primary/90"
            >
              {translations.appointments.bookFirstAppointment}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    {translations.appointments.appointmentNumber}{appointment.id.slice(-4)}
                  </CardTitle>
                  <Badge 
                    className={
                      appointment.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }
                  >
                    {translations.appointments.status[appointment.status]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building className="text-gray-500" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">{translations.appointments.department}</p>
                        <p className="font-medium">{appointment.department.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="text-gray-500" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">{translations.appointments.doctor}</p>
                        <p className="font-medium">{appointment.doctor.name}</p>
                        <p className="text-sm text-gray-500">{appointment.doctor.specialization}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-gray-500" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">{translations.appointments.date}</p>
                        <p className="font-medium">
                          {format(parseISO(appointment.startTime), 'EEEE, MMMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-gray-500" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">{translations.appointments.time}</p>
                        <p className="font-medium">
                          {format(parseISO(appointment.startTime), 'HH:mm')} - {format(parseISO(appointment.endTime), 'HH:mm')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 pt-4">
                <div className="flex gap-2 w-full">
                  {appointment.status === 'scheduled' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReschedule(appointment)}
                        className="flex items-center gap-2"
                      >
                        <Pencil size={16} />
                        {translations.appointments.actions.reschedule}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelAppointment(appointment)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                        {translations.appointments.actions.cancel}
                      </Button>
                    </>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{translations.appointments.cancelDialog.title}</DialogTitle>
            <DialogDescription>
              {translations.appointments.cancelDialog.message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              {translations.appointments.cancelDialog.cancel}
            </Button>
            <Button onClick={confirmCancelAppointment} className="bg-red-600 hover:bg-red-700">
              {translations.appointments.cancelDialog.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reschedule Modal */}
      {selectedAppointment && (
        <RescheduleModal
          isOpen={isRescheduleModalOpen}
          onClose={() => setIsRescheduleModalOpen(false)}
          appointment={selectedAppointment}
          onConfirm={handleConfirmReschedule}
        />
      )}
    </Layout>
  );
};

export default Appointments;
