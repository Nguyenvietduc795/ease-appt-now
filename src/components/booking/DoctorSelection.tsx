
import React from 'react';
import AccessibleCard from '../ui-components/AccessibleCard';
import { Doctor } from '@/types';

interface DoctorSelectionProps {
  doctors: Doctor[];
  selectedDoctor: string | null;
  onSelectDoctor: (doctorId: string) => void;
}

const DoctorSelection: React.FC<DoctorSelectionProps> = ({
  doctors,
  selectedDoctor,
  onSelectDoctor
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Choose Doctor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map((doctor) => (
          <AccessibleCard
            key={doctor.id}
            selected={selectedDoctor === doctor.id}
            onClick={() => onSelectDoctor(doctor.id)}
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
              <p className="text-gray-700 mb-2">{doctor.specialization}</p>
              <p className="text-gray-600 text-sm">{doctor.experience} experience</p>
            </div>
          </AccessibleCard>
        ))}
      </div>
    </div>
  );
};

export default DoctorSelection;
