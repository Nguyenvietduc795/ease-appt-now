
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageTitle from '@/components/ui-components/PageTitle';
import AccessibleCard from '@/components/ui-components/AccessibleCard';
import { Phone, Mail, VideoIcon, HelpCircle, BookOpen, MessageSquare } from 'lucide-react';

const Help = () => {
  const supportOptions = [
    {
      title: 'Call Support',
      description: 'Talk to our support team directly',
      icon: <Phone size={28} />,
      action: 'Call 1-800-123-4567',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Video Guide',
      description: 'Watch our step-by-step video guide',
      icon: <VideoIcon size={28} />,
      action: 'Watch Video',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Email Support',
      description: 'Send us an email with your questions',
      icon: <Mail size={28} />,
      action: 'Send Email',
      color: 'bg-green-50 text-green-600'
    }
  ];
  
  const faqItems = [
    {
      question: 'How do I book an appointment?',
      answer: `To book an appointment:
      1. Click on 'Book Appointment' on the home page
      2. Choose your preferred department
      3. Select a doctor
      4. Pick an available time slot
      5. Confirm your booking details`
    },
    {
      question: 'Can I cancel or reschedule my appointment?',
      answer: `Yes, you can cancel or reschedule your appointment by:
      1. Going to 'My Appointments' section
      2. Find the appointment you want to change
      3. Click 'Cancel' or 'Reschedule' button
      4. Follow the on-screen instructions`
    },
    {
      question: 'What should I bring to my appointment?',
      answer: `Please bring the following to your appointment:
      1. Your ID or passport
      2. Health insurance card (if applicable)
      3. Any relevant medical records
      4. List of current medications
      5. Your appointment QR code or reference number`
    },
    {
      question: 'How early should I arrive for my appointment?',
      answer: 'We recommend arriving 15 minutes before your scheduled appointment time to complete any necessary paperwork and check-in procedures.'
    },
    {
      question: "What if I'm running late for my appointment?",
      answer: "If you're running late, please call our support line as soon as possible. We'll try to accommodate you, but if you're more than 15 minutes late, we may need to reschedule your appointment."
    }
  ];
  
  return (
    <Layout>
      <PageTitle 
        title="Help & Support" 
        subtitle="We're here to help you with any questions or issues"
      />
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <HelpCircle className="mr-2 text-primary-500" />
          How Can We Help You?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportOptions.map((option, index) => (
            <AccessibleCard 
              key={index} 
              className="text-center flex flex-col items-center"
            >
              <div className={`${option.color} p-3 rounded-full mb-4`}>
                {option.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <button className="text-primary-600 font-medium hover:underline mt-auto">
                {option.action}
              </button>
            </AccessibleCard>
          ))}
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <BookOpen className="mr-2 text-primary-500" />
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <details 
              key={index} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 group"
            >
              <summary className="font-bold text-lg cursor-pointer list-none flex justify-between items-center">
                {item.question}
                <span className="text-primary-500 transition-transform transform group-open:rotate-180">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </summary>
              <div className="mt-4 text-gray-600 whitespace-pre-line">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <MessageSquare className="mr-2 text-primary-500" />
          Still Have Questions?
        </h2>
        
        <AccessibleCard className="text-center">
          <p className="text-lg mb-6">
            Our support team is available Monday to Friday, 8:00 AM - 6:00 PM
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a href="tel:+18001234567" className="inline-flex items-center justify-center gap-2 text-primary-600 font-bold">
              <Phone size={20} />
              1-800-123-4567
            </a>
            
            <a href="mailto:support@medicalcenter.com" className="inline-flex items-center justify-center gap-2 text-primary-600 font-bold">
              <Mail size={20} />
              support@medicalcenter.com
            </a>
          </div>
        </AccessibleCard>
      </section>
    </Layout>
  );
};

export default Help;
