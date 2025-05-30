
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageTitle from '@/components/ui-components/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { User, Phone, Mail, Map, Save, Edit2 } from 'lucide-react';

const Profile = () => {
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
    toast.success('Profile updated successfully');
  };
  
  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };
  
  return (
    <Layout>
      <PageTitle title="My Profile" />
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Personal Information</h2>
          {!isEditing && (
            <Button 
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="gap-2"
            >
              <Edit2 size={18} />
              Edit Profile
            </Button>
          )}
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-base flex items-center gap-2 mb-2">
                <User size={18} className="text-primary-500" />
                Full Name
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
                Phone Number
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
                Email
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
                Address
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
                Cancel
              </Button>
              <Button onClick={handleSave} className="gap-2 px-6">
                <Save size={18} />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-3">Notification Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="sms-notifications" 
                  className="h-5 w-5 rounded text-primary-600 focus:ring-primary-500" 
                  defaultChecked 
                />
                <label htmlFor="sms-notifications" className="ml-3 text-lg">
                  SMS Appointment Reminders
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
                  Email Notifications
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-3">Language Preference</h3>
            <select 
              className="bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-4"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="vi">Vietnamese</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
