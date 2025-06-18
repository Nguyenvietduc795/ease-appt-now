import { useTranslation } from 'react-i18next';

export const ExampleComponent = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h1>{t('common.book_appointment')}</h1>
      
      <div>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('vi')}>Tiếng Việt</button>
      </div>

      <div>
        <p>{t('specialties.cardiology')}</p>
        <p>{t('common.available')}</p>
      </div>
    </div>
  );
}; 