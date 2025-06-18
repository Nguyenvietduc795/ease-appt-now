import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import PageTitle from '@/components/ui-components/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { User, Phone, Mail, Map, Save, Edit2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Profile = () => {
  const { translations, language, setLanguage } = useLanguage();
  
  // Mock user data
  const [user, setUser] = useState({
    name: 'John Doe',
    phoneNumber: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    address: '123 Main Street, Anytown, CA 12345'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    toast.success(language === 'en' ? 'Profile updated successfully' : 'Cập nhật hồ sơ thành công');
  };
  
  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  // Handle language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'en' | 'vi');
  };
  
  return (
    <Layout>
      <PageTitle title={translations.profile.title} />
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{translations.profile.personalInfo}</h2>
          {!isEditing && (
            <Button 
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="gap-2"
            >
              <Edit2 size={18} />
              {translations.profile.edit}
            </Button>
          )}
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-base flex items-center gap-2 mb-2">
                <User size={18} className="text-primary-500" />
                {translations.profile.name}
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="text-lg py-6"
                />
              ) : (
                <p className="text-lg font-medium">{user.name}</p>
              )}
            </div>
            
            {/* Phone */}
            <div>
              <Label htmlFor="phoneNumber" className="text-base flex items-center gap-2 mb-2">
                <Phone size={18} className="text-primary-500" />
                {translations.profile.phone}
              </Label>
              {isEditing ? (
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="text-lg py-6"
                />
              ) : (
                <p className="text-lg font-medium">{user.phoneNumber}</p>
              )}
            </div>
            
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-base flex items-center gap-2 mb-2">
                <Mail size={18} className="text-primary-500" />
                {translations.profile.email}
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="text-lg py-6"
                />
              ) : (
                <p className="text-lg font-medium">{user.email}</p>
              )}
            </div>
            
            {/* Address */}
            <div>
              <Label htmlFor="address" className="text-base flex items-center gap-2 mb-2">
                <Map size={18} className="text-primary-500" />
                {translations.profile.address}
              </Label>
              {isEditing ? (
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="text-lg py-6"
                />
              ) : (
                <p className="text-lg font-medium">{user.address}</p>
              )}
            </div>
          </div>
          
          {isEditing && (
            <div className="flex gap-4 justify-end mt-8">
              <Button variant="outline" onClick={handleCancel} className="px-6">
                {translations.common.cancel}
              </Button>
              <Button onClick={handleSave} className="gap-2 px-6">
                <Save size={18} />
                {translations.common.save}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">{translations.profile.personalInfo}</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-3">Tùy Chọn Thông Báo</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="sms-notifications" 
                  className="h-5 w-5 rounded text-primary-600 focus:ring-primary-500" 
                  defaultChecked 
                />
                <label htmlFor="sms-notifications" className="ml-3 text-lg">
                  Nhắc Nhở Lịch Hẹn Qua SMS
                </label>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="email-notifications" 
                  className="h-5 w-5 rounded text-primary-600 focus:ring-primary-500" 
                  defaultChecked 
                />
                <label htmlFor="email-notifications" className="ml-3 text-lg">
                  Thông Báo Qua Email
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-3">Tùy Chọn Ngôn Ngữ</h3>
            <select 
              className="bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-4"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="vi">Tiếng Việt</option>
            </select>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
