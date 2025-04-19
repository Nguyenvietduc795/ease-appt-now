
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageTitle from '@/components/ui-components/PageTitle';
import StepIndicator from '@/components/ui-components/StepIndicator';
import { useLanguage } from '@/contexts/LanguageContext';
import DepartmentSelection from '@/components/booking/DepartmentSelection';
import DoctorSelection from '@/components/booking/DoctorSelection';
import TimeSlotSelection from '@/components/booking/TimeSlotSelection';
import AppointmentConfirmation from '@/components/booking/AppointmentConfirmation';
import { Button } from '@/components/ui/button';
import { departments, doctors, timeSlots } from '@/data/mockData';
import { Department, Doctor, TimeSlot } from '@/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const BookAppointment = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState<TimeSlot[]>([]);
  
  useEffect(() => {
    if (selectedDepartment) {
      const filtered = doctors.filter(doctor => doctor.departmentId === selectedDepartment);
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedDepartment]);
  
  useEffect(() => {
    if (selectedDoctor) {
      const filtered = timeSlots.filter(slot => slot.doctorId === selectedDoctor);
      setFilteredTimeSlots(filtered);
    } else {
      setFilteredTimeSlots([]);
    }
  }, [selectedDoctor]);
  
  const handleDepartmentSelect = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    setSelectedDoctor(null);
    setSelectedTimeSlot(null);
  };
  
  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setSelectedTimeSlot(null);
  };
  
  const handleTimeSlotSelect = (timeSlotId: string) => {
    setSelectedTimeSlot(timeSlotId);
  };
  
  const handleBookAppointment = () => {
    navigate('/appointments');
  };
  
  const goToNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
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
  
  const currentDepartment = departments.find(dept => dept.id === selectedDepartment);
  const currentDoctor = doctors.find(doc => doc.id === selectedDoctor);
  const currentTimeSlot = timeSlots.find(slot => slot.id === selectedTimeSlot);
  
  return (
    <Layout>
      <PageTitle 
        title={t('book.appointment.title')} 
        subtitle={t('book.appointment.subtitle')}
      />
      
      <StepIndicator 
        currentStep={step} 
        totalSteps={4} 
        stepTitles={['Department', 'Doctor', 'Time', 'Confirm']} 
      />
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
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
            timeSlots={filteredTimeSlots}
            selectedTimeSlot={selectedTimeSlot}
            doctor={currentDoctor || null}
            onSelectTimeSlot={handleTimeSlotSelect}
          />
        )}
        
        {step === 4 && currentDepartment && currentDoctor && currentTimeSlot && (
          <AppointmentConfirmation
            department={currentDepartment}
            doctor={currentDoctor}
            timeSlot={currentTimeSlot}
            onBookAppointment={handleBookAppointment}
          />
        )}
      </div>
      
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={step === 1}
          className="flex items-center gap-2 px-6 py-3 text-lg"
        >
          <ArrowLeft size={20} /> {t('back')}
        </Button>
        
        {step < 4 && (
          <Button
            onClick={goToNextStep}
            disabled={!isStepComplete()}
            className="flex items-center gap-2 px-6 py-3 text-lg"
          >
            {t('next')} <ArrowRight size={20} />
          </Button>
        )}
      </div>
    </Layout>
  );
};

export default BookAppointment;
