import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calendar,
  Clock,
  Heart,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Bell,
  UserPlus
} from 'lucide-react';
import Footer from '@/components/layout/Footer';

// Danh sách ảnh bệnh viện chuyên nghiệp
const hospitalImages = [
  "https://benhviendhnct.com.vn/wp-content/uploads/2024/03/khanhthanh.jpg.webp",
  "https://benhviendhnct.com.vn/wp-content/uploads/2024/06/z5512235255713_a24d9e52dcb15cdc1a0dd400cd0f170c.jpg",
  "https://nctu.edu.vn/uploads/page/2022_05/ndt001.jpg"
];

const Home = () => {
  const navigate = useNavigate();
  const { translations } = useLanguage();
  const [sliderIdx, setSliderIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIdx(idx => (idx + 1) % hospitalImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Easy Booking",
      description: "Book appointments with just a few taps, no complex forms"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Save Time",
      description: "No need to wait in long queues, book from anywhere"
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Appointment Reminders",
      description: "Get SMS and email reminders before your appointment"
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Doctor Selection",
      description: "Choose your preferred doctor from our specialists"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Choose Department & Doctor",
      description: "Select your medical department and preferred doctor from our specialists"
    },
    {
      number: "2",
      title: "Select Date & Time",
      description: "Pick an available time slot that works best for your schedule"
    },
    {
      number: "3",
      title: "Confirm & Get QR Code",
      description: "Receive your appointment QR code to skip the queue when you arrive"
    }
  ];

  const testimonials = [
    {
      quote: "This system made it so easy to book my appointment. No more waiting in long lines!",
      author: "Maria G., 67"
    },
    {
      quote: "The large text and simple steps helped me book appointments without asking my grandchildren for help.",
      author: "Robert T., 72"
    },
    {
      quote: "I love the reminder feature. I never miss my appointments now. Very convenient!",
      author: "Susan L., 58"
    }
  ];

  return (
    <Layout>
      <div className="bg-blue-50 rounded-3xl p-8 md:p-12 mb-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-20">
          {/* Left Content */}
          <div className="flex-1 max-w-xl space-y-6">
            <h1 className="text-[2.75rem] font-bold text-gray-900 leading-tight">
              {translations.home.hero.title}
              <div className="text-primary mt-3">
                {translations.home.waitingMessage}
              </div>
            </h1>
            
            <p className="text-lg text-gray-600 mt-4">
              {translations.home.hero.subtitle}
            </p>

            <div className="flex gap-4 mt-6">
              <Button
                onClick={() => navigate('/book-appointment')}
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base h-auto"
              >
                {translations.home.hero.bookButton}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/help')}
                className="bg-white hover:bg-gray-50 rounded-full px-8 py-6 text-base h-auto border-2"
              >
                {translations.home.hero.learnMore}
              </Button>
            </div>
          </div>

          {/* Right Content - Modern Medical Illustration */}
          <div className="flex-1 flex justify-end">
            <div className="relative bg-white rounded-2xl shadow-xl p-6 min-w-[480px] max-w-[600px] flex flex-col items-center">
              <div className="w-full h-[400px] rounded-2xl overflow-hidden relative">
                <img
                  src={hospitalImages[sliderIdx]}
                  alt="Bệnh viện hiện đại"
                  className="w-full h-full object-cover rounded-2xl shadow-lg border border-blue-100 transition-all duration-700"
                  draggable={false}
                />
                {/* Dot indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                  {hospitalImages.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-4 h-4 rounded-full border-2 border-white ${sliderIdx === idx ? 'bg-blue-500' : 'bg-gray-300'} transition-all`}
                      style={{ boxShadow: sliderIdx === idx ? '0 0 0 2px #2563EB' : undefined }}
                      onClick={() => setSliderIdx(idx)}
                      aria-label={`Chọn ảnh ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Without The Wait Section - Cập nhật phần này */}
      <section className="space-y-8 bg-gradient-to-r from-primary/5 to-primary/10 p-8 rounded-2xl mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-4">
            {translations.home.benefits.title} {/* "Không Cần Chờ Đợi" trong tiếng Việt */}
          </h2>
          <p className="text-xl text-gray-600">
            {translations.home.benefits.subtitle} {/* "Tại Sao Nên Sử Dụng Đặt Lịch Trực Tuyến" trong tiếng Việt */}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <BenefitCard
            icon={CheckCircle}
            title={translations.home.benefits.features.easyBooking.title}
            description={translations.home.benefits.features.easyBooking.description}
          />
          <BenefitCard
            icon={Clock}
            title={translations.home.benefits.features.saveTime.title}
            description={translations.home.benefits.features.saveTime.description}
          />
          <BenefitCard
            icon={Bell}
            title={translations.home.benefits.features.reminders.title}
            description={translations.home.benefits.features.reminders.description}
          />
          <BenefitCard
            icon={UserPlus}
            title={translations.home.benefits.features.doctorChoice.title}
            description={translations.home.benefits.features.doctorChoice.description}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-8 mb-12">
        <h2 className="text-3xl font-bold text-center">{translations.home.howItWorks.title}</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <StepCard
            number="1"
            title={translations.home.howItWorks.steps.step1.title}
            description={translations.home.howItWorks.steps.step1.description}
          />
          <StepCard
            number="2"
            title={translations.home.howItWorks.steps.step2.title}
            description={translations.home.howItWorks.steps.step2.description}
          />
          <StepCard
            number="3"
            title={translations.home.howItWorks.steps.step3.title}
            description={translations.home.howItWorks.steps.step3.description}
          />
        </div>
        <div className="text-center mt-8">
          <Button size="lg" onClick={() => navigate('/book-appointment')}>
            {translations.home.howItWorks.cta}
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="space-y-8 bg-primary/5 p-8 rounded-2xl mb-12">
        <h2 className="text-3xl font-bold text-center">{translations.home.testimonials.title}</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <TestimonialCard
            quote={translations.home.testimonials.patients.patient1.quote}
            name={translations.home.testimonials.patients.patient1.name}
            age={translations.home.testimonials.patients.patient1.age}
          />
          <TestimonialCard
            quote={translations.home.testimonials.patients.patient2.quote}
            name={translations.home.testimonials.patients.patient2.name}
            age={translations.home.testimonials.patients.patient2.age}
          />
          <TestimonialCard
            quote={translations.home.testimonials.patients.patient3.quote}
            name={translations.home.testimonials.patients.patient3.name}
            age={translations.home.testimonials.patients.patient3.age}
          />
        </div>
      </section>

      {/* Support Section */}
      <section className="text-center space-y-4 bg-primary/5 p-8 rounded-2xl mb-12">
        <h2 className="text-3xl font-bold">{translations.home.support.title}</h2>
        <p className="text-xl text-gray-600">{translations.home.support.description}</p>
        <p className="text-2xl font-bold text-primary">{translations.home.support.phone}</p>
      </section>
      <Footer />
    </Layout>
  );
};

// Component phụ
const BenefitCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-sm">
    <div className="transition-transform duration-300 hover:scale-110 w-12 h-12 flex items-center justify-center mx-auto mb-4">
      <Icon className="w-12 h-12 text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-sm">
    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, name, age }) => (
  <div className="p-6 bg-white rounded-xl shadow-sm">
    <p className="text-gray-600 italic mb-4">"{quote}"</p>
    <p className="font-semibold">{name}, {age}</p>
  </div>
);

export default Home; 

<style>
{`
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-16px); }
}
.animate-float {
  animation: float 3s ease-in-out infinite;
}
`}
</style> 