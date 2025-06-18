import React from 'react';
import Layout from '@/components/layout/Layout';
import PageTitle from '@/components/ui-components/PageTitle';
import AccessibleCard from '@/components/ui-components/AccessibleCard';
import { Phone, Mail, VideoIcon, HelpCircle, BookOpen, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Help = () => {
  const { translations } = useLanguage();

  const supportOptions = [
    {
      title: translations.help.supportOptions.call.title,
      description: translations.help.supportOptions.call.description,
      icon: <Phone size={28} />,
      action: translations.help.supportOptions.call.action,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: translations.help.supportOptions.video.title,
      description: translations.help.supportOptions.video.description,
      icon: <VideoIcon size={28} />,
      action: translations.help.supportOptions.video.action,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: translations.help.supportOptions.email.title,
      description: translations.help.supportOptions.email.description,
      icon: <Mail size={28} />,
      action: translations.help.supportOptions.email.action,
      color: 'bg-green-50 text-green-600'
    }
  ];
  
  return (
    <Layout>
      <PageTitle 
        title={translations.help.title}
        subtitle={translations.help.subtitle}
      />
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <HelpCircle className="mr-2 text-primary-500" />
          {translations.help.howCanWeHelp}
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
          {translations.help.faq.title}
        </h2>
        
        <div className="space-y-4">
          {translations.help.faq.items.map((item, index) => (
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
          {translations.help.stillHaveQuestions.title}
        </h2>
        
        <AccessibleCard className="text-center">
          <p className="text-lg mb-6">
            {translations.help.stillHaveQuestions.availability}
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a href={`tel:${translations.help.stillHaveQuestions.phone}`} className="inline-flex items-center justify-center gap-2 text-primary-600 font-bold">
              <Phone size={20} />
              {translations.help.stillHaveQuestions.phone}
            </a>
            
            <a href={`mailto:${translations.help.stillHaveQuestions.email}`} className="inline-flex items-center justify-center gap-2 text-primary-600 font-bold">
              <Mail size={20} />
              {translations.help.stillHaveQuestions.email}
            </a>
          </div>
        </AccessibleCard>
      </section>
    </Layout>
  );
};

export default Help;
