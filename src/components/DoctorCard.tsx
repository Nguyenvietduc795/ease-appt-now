import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

interface DoctorCardProps {
  name: string;
  title: 'dr' | 'prof';
  specialty: string;
  isAvailable: boolean;
}

export function DoctorCard({ name, title, specialty, isAvailable }: DoctorCardProps) {
  const { t } = useTranslation();

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-medium">
          {t(`titles.${title}`)} {name}
        </h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {t(`specialties.${specialty}`)}
      </p>
      <div className="flex items-center justify-between">
        <span className={`text-sm ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
          {t(isAvailable ? 'common.available' : 'common.unavailable')}
        </span>
        <Button variant="outline" size="sm">
          {t('common.book_appointment')}
        </Button>
      </div>
    </div>
  );
} 