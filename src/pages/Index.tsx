import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import IconButton from '@/components/ui-components/IconButton';
import { 
  CalendarPlus, 
  Clock, 
  Calendar, 
  UserRound,
  Phone, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { translations } = useLanguage();

  const features = [
    {
      title: 'Cơ Sở Hiện Đại',
      description: 'Trang thiết bị y tế tiên tiến và cơ sở vật chất hiện đại',
      icon: <CalendarPlus size={28} />
    },
    {
      title: 'Bác Sĩ Chuyên Môn',
      description: 'Các chuyên gia có kinh nghiệm đa khoa',
      icon: <UserRound size={28} />
    },
    {
      title: 'Đặt Lịch Dễ Dàng',
      description: 'Đặt lịch trực tuyến hoặc qua hotline 24/7',
      icon: <Clock size={28} />
    },
    {
      title: 'Chăm Sóc Chất Lượng',
      description: 'Dịch vụ y tế đạt chuẩn quốc tế',
      icon: <CheckCircle size={28} />
    }
  ];

  return (
    <Layout>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-6 md:p-12 mb-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Bệnh Viện Nam Cần Thơ<br />
              <span className="text-primary-600">Dịch Vụ Y Tế Chuyên Nghiệp</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Cơ sở y tế hiện đại với dịch vụ chăm sóc đạt chuẩn quốc tế
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book-appointment">
                <Button size="lg" className="px-8 py-6 text-xl w-full sm:w-auto">
                  {translations.nav.bookAppointment}
                </Button>
              </Link>
              <a href="tel:+842923831981">
                <Button variant="outline" size="lg" className="px-8 py-6 text-xl w-full sm:w-auto flex items-center gap-2">
                  <Phone size={20} />
                  Đường Dây Nóng
                </Button>
              </a>
            </div>
          </div>
          
          <div className="relative">
            {/* Main Hospital Image */}
            <img 
              src="/hospital-building.jpg"
              alt="Bệnh Viện Nam Cần Thơ" 
              className="w-full h-auto rounded-2xl shadow-lg"
            />
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <UserRound className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Bác Sĩ Chuyên Môn</div>
                  <div className="text-xs text-gray-500">Đa Chuyên Khoa</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Dịch Vụ 24/7</div>
                  <div className="text-xs text-gray-500">Cấp Cứu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link to="/book-appointment">
            <IconButton 
              icon={<CalendarPlus size={40} />} 
              label={translations.nav.bookAppointment}
              className="h-32 w-full"
            />
          </Link>
          <Link to="/appointments">
            <IconButton 
              icon={<Calendar size={40} />} 
              label={translations.nav.appointments}
              variant="outline"
              className="h-32 w-full"
            />
          </Link>
          <a href="tel:+842923831981">
            <IconButton 
              icon={<Phone size={40} />} 
              label="Cấp cứu: 02923.831.981"
              variant="outline"
              className="h-32 w-full"
            />
          </a>
          <Link to="/profile">
            <IconButton 
              icon={<UserRound size={40} />} 
              label={translations.nav.profile}
              variant="outline"
              className="h-32 w-full"
            />
          </Link>
        </div>
      </section>

      {/* Key Departments */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Các Khoa Chính</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-2">Khoa Nội</h3>
            <p className="text-gray-600">Chẩn đoán và điều trị toàn diện các bệnh nội khoa</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-2">Khoa Ngoại</h3>
            <p className="text-gray-600">Phẫu thuật hiện đại với các bác sĩ có kinh nghiệm</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-2">Sản Phụ Khoa</h3>
            <p className="text-gray-600">Chăm sóc chuyên biệt cho sức khỏe phụ nữ</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Tại Sao Chọn Bệnh Viện Nam Cần Thơ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="text-primary-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-primary-100 rounded-xl p-6 text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Liên Hệ</h2>
        <p className="text-lg mb-4">
          Dịch vụ y tế chuyên nghiệp có sẵn 24/7
        </p>
        <div className="flex flex-col items-center gap-2">
          <a 
            href="tel:+842923831981" 
            className="inline-flex items-center text-primary-700 text-xl font-bold gap-2"
          >
            <Phone size={24} />
            02923.831.981
          </a>
          <p className="text-gray-600">
            Địa chỉ: 448B Đường Nguyễn Thị Minh Khai, Phường Cái Khế, Quận Ninh Kiều, TP. Cần Thơ
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
