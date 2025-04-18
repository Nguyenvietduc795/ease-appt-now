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

// Import hero image
import heroImage from '@/assets/hero-image.svg';

const Index = () => {
  const features = [
    {
      title: 'Easy Booking',
      description: 'Book appointments with just a few taps, no complex forms',
      icon: <CalendarPlus size={28} />
    },
    {
      title: 'Save Time',
      description: 'No need to wait in long queues, book from anywhere',
      icon: <Clock size={28} />
    },
    {
      title: 'Appointment Reminders',
      description: 'Get SMS and email reminders before your appointment',
      icon: <Calendar size={28} />
    },
    {
      title: 'Doctor Selection',
      description: 'Choose your preferred doctor from our specialists',
      icon: <UserRound size={28} />
    }
  ];

  return (
    <Layout>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-6 md:p-12 mb-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Book Your Hospital Appointment<br />
              <span className="text-primary-600">Without The Wait</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Simple, quick, and convenient way to schedule your next doctor visit
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book">
                <Button size="lg" className="px-8 py-6 text-xl w-full sm:w-auto">
                  Book Appointment
                </Button>
              </Link>
              <Link to="/help">
                <Button variant="outline" size="lg" className="px-8 py-6 text-xl w-full sm:w-auto">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-2/5">
            <img 
              src={heroImage}
              alt="Medical center appointment booking illustration" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link to="/book">
            <IconButton 
              icon={<CalendarPlus size={40} />} 
              label="Book Appointment"
              className="h-32 w-full"
            />
          </Link>
          <Link to="/appointments">
            <IconButton 
              icon={<Calendar size={40} />} 
              label="My Appointments"
              variant="outline"
              className="h-32 w-full"
            />
          </Link>
          <Link to="/help">
            <IconButton 
              icon={<Phone size={40} />} 
              label="Contact Us"
              variant="outline"
              className="h-32 w-full"
            />
          </Link>
          <Link to="/profile">
            <IconButton 
              icon={<UserRound size={40} />} 
              label="My Profile"
              variant="outline"
              className="h-32 w-full"
            />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Use Our Online Booking</h2>
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

      {/* How It Works */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-bold mb-2">Choose Department & Doctor</h3>
            <p className="text-gray-600">
              Select your medical department and preferred doctor from our specialists
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-bold mb-2">Select Date & Time</h3>
            <p className="text-gray-600">
              Pick an available time slot that works best for your schedule
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-bold mb-2">Confirm & Get QR Code</h3>
            <p className="text-gray-600">
              Receive your appointment QR code to skip the queue when you arrive
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link to="/book">
            <Button className="gap-2 px-8 py-6 text-lg">
              Book Your Appointment Now
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Patient Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Maria G.",
              age: 67,
              text: "This system made it so easy to book my appointment. No more waiting in long lines!"
            },
            {
              name: "Robert T.",
              age: 72,
              text: "The large text and simple steps helped me book appointments without asking my grandchildren for help."
            },
            {
              name: "Susan L.",
              age: 58,
              text: "I love the reminder feature. I never miss my appointments now. Very convenient!"
            }
          ].map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="flex items-start mb-4">
                <div className="mr-4 mt-1">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
                <p className="italic text-gray-700">{testimonial.text}</p>
              </div>
              <div className="font-medium">
                {testimonial.name}, {testimonial.age}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Help Banner */}
      <section className="bg-primary-100 rounded-xl p-6 text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Need Help Booking?</h2>
        <p className="text-lg mb-4">
          Our support team is just a call away
        </p>
        <div className="flex justify-center">
          <a 
            href="tel:+18001234567" 
            className="inline-flex items-center text-primary-700 text-xl font-bold gap-2"
          >
            <Phone size={24} />
            1-800-123-4567
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
