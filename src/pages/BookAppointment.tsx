import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageTitle from '@/components/ui-components/PageTitle';
import StepIndicator from '@/components/ui-components/StepIndicator';
import DepartmentSelection from '@/components/booking/DepartmentSelection';
import DoctorSelection from '@/components/booking/DoctorSelection';
import TimeSlotSelection from '@/components/booking/TimeSlotSelection';
import AppointmentConfirmation from '@/components/booking/AppointmentConfirmation';
import { Button } from '@/components/ui/button';
import { departments, doctors } from '@/data/mockData';
import { Department, Doctor, TimeSlot } from '@/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useLanguage } from '@/contexts/LanguageContext';

const BookAppointment = () => {
  const navigate = useNavigate();
  const { translations } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  // Lấy thông tin department và doctor hiện tại
  const currentDepartment = departments.find(d => d.id === selectedDepartment);
  const currentDoctor = doctors.find(d => d.id === selectedDoctor);

  useEffect(() => {
    if (selectedDepartment) {
      const filtered = doctors.filter(doctor => doctor.departmentId === selectedDepartment);
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedDepartment]);

  useEffect(() => {
    const rescheduleData = localStorage.getItem('rescheduleAppointment');
    if (rescheduleData) {
      const appointment = JSON.parse(rescheduleData);
      setSelectedDepartment(appointment.departmentId);
      setSelectedDoctor(appointment.doctorId);
    }
  }, []);

  const handleDepartmentSelect = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    setSelectedDoctor(null);
    setSelectedTimeSlot(null);
  };

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return !!selectedDepartment;
      case 2:
        return !!selectedDoctor;
      case 3:
        return !!selectedTimeSlot;
      default:
        return false;
    }
  };

  const goToNextStep = () => {
    if (step < 4 && isStepComplete()) {
      setStep(step + 1);
    }
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleBookAppointment = () => {
    if (!selectedDepartment || !selectedDoctor || !selectedTimeSlot) {
      toast.error(translations.notifications.completeInfo);
      return;
    }

    try {
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const rescheduleData = localStorage.getItem('rescheduleAppointment');

      if (rescheduleData) {
        const oldAppointment = JSON.parse(rescheduleData);
        const updatedAppointments = existingAppointments.map(apt => 
          apt.id === oldAppointment.id 
            ? { ...apt, status: 'cancelled' }
            : apt
        );

        const newAppointment = {
          id: Date.now().toString(),
          departmentId: selectedDepartment,
          doctorId: selectedDoctor,
          startTime: selectedTimeSlot.startTime,
          endTime: selectedTimeSlot.endTime,
          status: 'scheduled',
          department: departments.find(d => d.id === selectedDepartment),
          doctor: doctors.find(d => d.id === selectedDoctor),
          createdAt: new Date().toISOString()
        };

        updatedAppointments.unshift(newAppointment);
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        localStorage.removeItem('rescheduleAppointment');
        toast.success(translations.notifications.appointmentRescheduled);
      } else {
        const newAppointment = {
          id: Date.now().toString(),
          departmentId: selectedDepartment,
          doctorId: selectedDoctor,
          startTime: selectedTimeSlot.startTime,
          endTime: selectedTimeSlot.endTime,
          status: 'scheduled',
          department: departments.find(d => d.id === selectedDepartment),
          doctor: doctors.find(d => d.id === selectedDoctor),
          createdAt: new Date().toISOString()
        };

        existingAppointments.unshift(newAppointment);
        localStorage.setItem('appointments', JSON.stringify(existingAppointments));
        toast.success(translations.notifications.appointmentBooked);
      }

      navigate('/appointments');
    } catch (error) {
      toast.error(translations.notifications.processingError);
    }
  };

  return (
    <Layout>
      <PageTitle 
        title={translations.booking.title} 
        subtitle={translations.booking.subtitle}
      />

      <StepIndicator 
        currentStep={step} 
        totalSteps={4} 
        stepTitles={[
          translations.booking.steps.department,
          translations.booking.steps.doctor,
          translations.booking.steps.time,
          translations.booking.steps.confirm
        ]} 
      />

      <div className="mt-8">
        {step === 1 && (
          <DepartmentSelection
            departments={departments}
            selectedDepartment={selectedDepartment}
            onSelectDepartment={handleDepartmentSelect}
          />
        )}

        {step === 2 && (
          <DoctorSelection
            doctors={filteredDoctors}
            selectedDoctor={selectedDoctor}
            onSelectDoctor={handleDoctorSelect}
          />
        )}

        {step === 3 && (
          <TimeSlotSelection
            doctor={currentDoctor}
            onSelectTimeSlot={handleTimeSlotSelect}
          />
        )}

        {step === 4 && currentDepartment && currentDoctor && selectedTimeSlot && (
          <AppointmentConfirmation
            department={currentDepartment}
            doctor={currentDoctor}
            timeSlot={selectedTimeSlot}
            onBookAppointment={handleBookAppointment}
          />
        )}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={step === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={20} /> {translations.common.back}
        </Button>

        {step < 4 && (
          <Button
            onClick={goToNextStep}
            disabled={!isStepComplete()}
            className="flex items-center gap-2"
          >
            {translations.common.next} <ArrowRight size={20} />
          </Button>
        )}
      </div>
    </Layout>
  );
};

export default BookAppointment;
