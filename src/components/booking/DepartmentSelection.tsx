import React from 'react';
import AccessibleCard from '../ui-components/AccessibleCard';
import { Department } from '@/types';
import { Brain, Heart, Bone, Baby, ScanFace, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface DepartmentSelectionProps {
  departments: Department[];
  selectedDepartment: string | null;
  onSelectDepartment: (departmentId: string) => void;
}

const DepartmentSelection: React.FC<DepartmentSelectionProps> = ({
  departments,
  selectedDepartment,
  onSelectDepartment
}) => {
  const { translations } = useLanguage();

  // Map department icons to components
  const getIcon = (iconName: string) => {
    const size = 32;
    switch (iconName) {
      case 'brain':
        return <Brain size={size} className="text-primary-600" />;
      case 'heart-pulse':
        return <Heart size={size} className="text-primary-600" />;
      case 'bone':
        return <Bone size={size} className="text-primary-600" />;
      case 'baby':
        return <Baby size={size} className="text-primary-600" />;
      case 'scan-face':
        return <ScanFace size={size} className="text-primary-600" />;
      case 'eye':
        return <Eye size={size} className="text-primary-600" />;
      default:
        return <Heart size={size} className="text-primary-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{translations.booking.chooseDepartment}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {departments.map((department) => (
          <AccessibleCard
            key={department.id}
            selected={selectedDepartment === department.id}
            onClick={() => onSelectDepartment(department.id)}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-3">{getIcon(department.icon)}</div>
            <h3 className="text-xl font-bold mb-2">{department.name}</h3>
            <p className="text-gray-600">{department.description}</p>
          </AccessibleCard>
        ))}
      </div>
    </div>
  );
};

export default DepartmentSelection;
