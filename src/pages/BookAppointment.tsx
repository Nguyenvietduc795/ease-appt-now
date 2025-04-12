
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
import { departments, doctors, timeSlots } from '@/data/mockData';
import { Department, Doctor, TimeSlot } from '@/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const BookAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState<TimeSlot[]>([]);
  
  // Filter doctors based on selected department
  useEffect(() => {
    if (selectedDepartment) {
      const filtered = doctors.filter(doctor => doctor.departmentId === selectedDepartment);
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedDepartment]);
  
  // Filter time slots based on selected doctor
  useEffect(() => {
    if (selectedDoctor) {
      const filtered = timeSlots.filter(slot => slot.doctorId === selectedDoctor);
      setFilteredTimeSlots(filtered);
    } else {
      setFilteredTimeSlots([]);
    }
  }, [selectedDoctor]);
  
  // Step handlers
  const handleDepartmentSelect = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    setSelectedDoctor(null); // Reset doctor when department changes
    setSelectedTimeSlot(null); // Reset time slot
  };
  
  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setSelectedTimeSlot(null); // Reset time slot when doctor changes
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
  
  // Check if current step is complete
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
  
  // Get current department, doctor, and time slot objects
  const currentDepartment = departments.find(dept => dept.id === selectedDepartment);
  const currentDoctor = doctors.find(doc => doc.id === selectedDoctor);
  const currentTimeSlot = timeSlots.find(slot => slot.id === selectedTimeSlot);
  
  return (
    <Layout>
      <PageTitle 
        title="Book an Appointment" 
        subtitle="Follow these simple steps to schedule your visit"
      />
      
      <StepIndicator 
        currentStep={step} 
        totalSteps={4} 
        stepTitles={['Department', 'Doctor', 'Time', 'Confirm']} 
      />
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        {/* Step 1: Department Selection */}
        {step === 1 && (
          <DepartmentSelection
            departments={departments}
            selectedDepartment={selectedDepartment}
            onSelectDepartment={handleDepartmentSelect}
          />
        )}
        
        {/* Step 2: Doctor Selection */}
        {step === 2 && (
          <DoctorSelection
            doctors={filteredDoctors}
            selectedDoctor={selectedDoctor}
            onSelectDoctor={handleDoctorSelect}
          />
        )}
        
        {/* Step 3: Time Slot Selection */}
        {step === 3 && (
          <TimeSlotSelection
            timeSlots={filteredTimeSlots}
            selectedTimeSlot={selectedTimeSlot}
            doctor={currentDoctor || null}
            onSelectTimeSlot={handleTimeSlotSelect}
          />
        )}
        
        {/* Step 4: Confirmation */}
        {step === 4 && currentDepartment && currentDoctor && currentTimeSlot && (
          <AppointmentConfirmation
            department={currentDepartment}
            doctor={currentDoctor}
            timeSlot={currentTimeSlot}
            onBookAppointment={handleBookAppointment}
          />
        )}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={step === 1}
          className="flex items-center gap-2 px-6 py-3 text-lg"
        >
          <ArrowLeft size={20} /> Back
        </Button>
        
        {step < 4 && (
          <Button
            onClick={goToNextStep}
            disabled={!isStepComplete()}
            className="flex items-center gap-2 px-6 py-3 text-lg"
          >
            Next <ArrowRight size={20} />
          </Button>
        )}
      </div>
    </Layout>
  );
};

export default BookAppointment;
