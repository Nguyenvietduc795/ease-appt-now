import { useLanguage } from '@/contexts/LanguageContext';

const BookingSteps = () => {
  const { translations } = useLanguage();
  const { booking } = translations;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{booking.steps.title}</h1>
        <p className="text-gray-600">{booking.steps.subtitle}</p>
      </div>

      {/* Step 1: Department Selection */}
      <div className="booking-step">
        <h2 className="text-xl font-semibold mb-4">{booking.steps.step1.title}</h2>
        <p className="text-gray-600 mb-4">{booking.steps.step1.description}</p>
        <select className="form-select w-full">
          <option value="">{booking.steps.step1.departmentPlaceholder}</option>
          {/* Department options */}
        </select>
      </div>

      {/* Step 2: Doctor Selection */}
      <div className="booking-step">
        <h2 className="text-xl font-semibold mb-4">{booking.steps.step2.title}</h2>
        <p className="text-gray-600 mb-4">{booking.steps.step2.description}</p>
        <div className="doctor-list">
          {/* Doctor cards */}
        </div>
      </div>

      {/* Step 3: Time Selection */}
      <div className="booking-step">
        <h2 className="text-xl font-semibold mb-4">{booking.steps.step3.title}</h2>
        <p className="text-gray-600 mb-4">{booking.steps.step3.description}</p>
        <div className="time-selection">
          <div className="date-picker">
            <h3 className="font-medium mb-2">{booking.steps.step3.selectDate}</h3>
            {/* Date picker component */}
          </div>
          <div className="time-slots">
            <h3 className="font-medium mb-2">{booking.steps.step3.selectTime}</h3>
            {/* Time slots */}
          </div>
        </div>
      </div>

      {/* Step 4: Confirmation */}
      <div className="booking-step">
        <h2 className="text-xl font-semibold mb-4">{booking.steps.step4.title}</h2>
        <p className="text-gray-600 mb-4">{booking.steps.step4.description}</p>
        
        <div className="confirmation-details">
          <h3 className="font-medium mb-4">{booking.steps.step4.appointmentDetails}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600">{booking.steps.step4.department}</label>
              <p className="font-medium">...</p>
            </div>
            <div>
              <label className="text-gray-600">{booking.steps.step4.doctor}</label>
              <p className="font-medium">...</p>
            </div>
            <div>
              <label className="text-gray-600">{booking.steps.step4.date}</label>
              <p className="font-medium">...</p>
            </div>
            <div>
              <label className="text-gray-600">{booking.steps.step4.time}</label>
              <p className="font-medium">...</p>
            </div>
          </div>

          <h3 className="font-medium mt-6 mb-4">{booking.steps.step4.patientInfo}</h3>
          <form className="grid gap-4">
            <div>
              <label>{booking.steps.step4.name}</label>
              <input type="text" className="form-input w-full" />
            </div>
            <div>
              <label>{booking.steps.step4.phone}</label>
              <input type="tel" className="form-input w-full" />
            </div>
            <div>
              <label>{booking.steps.step4.email}</label>
              <input type="email" className="form-input w-full" />
            </div>
            <div>
              <label>{booking.steps.step4.reason}</label>
              <textarea className="form-textarea w-full" rows={3}></textarea>
            </div>
          </form>
        </div>

        <div className="mt-6">
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">{booking.steps.step4.termsLabel}</span>
          </label>
        </div>

        <div className="flex justify-between mt-8">
          <button className="btn-secondary">{booking.navigation.back}</button>
          <button className="btn-primary">{booking.steps.step4.confirmButton}</button>
        </div>
      </div>
    </div>
  );
};

export default BookingSteps; 