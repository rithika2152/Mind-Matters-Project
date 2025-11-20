import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';
import { useUser } from '../contexts/UserContext';

interface ProfileData {
  name: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
}

const Profile = () => {
  const { currentUser, updateUserData } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: currentUser?.name || '',
    age: '',
    gender: 'Prefer not to say',
    email: currentUser?.email || '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  useEffect(() => {
    if (currentUser) {
      setProfile(prev => ({
        ...prev,
        name: currentUser.name,
        email: currentUser.email,
        ...currentUser.profile
      }));
    }
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!currentUser) return;
    
    setIsSaving(true);
    try {
      await updateUserData(currentUser.id, {
        name: profile.name,
        profile: {
          age: profile.age,
          gender: profile.gender,
          phone: profile.phone,
          emergencyContact: profile.emergencyContact,
          emergencyPhone: profile.emergencyPhone
        }
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div className="max-w-4xl mx-auto">
      <BackButton to="/dashboard" />
      
      <div className="text-center mb-8">
        <motion.div 
          className="inline-block p-2 rounded-full bg-primary-100 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <UserCircle className="h-16 w-16 text-primary-600" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-md"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="mr-2 text-primary-600" />
            Personal Information
          </h2>
          
          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleInputChange}
                    min="0"
                    max="150"
                    className="w-full p-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={profile.gender}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600">Name: {profile.name}</p>
                <p className="text-gray-600">Age: {profile.age || 'Not specified'}</p>
                <p className="text-gray-600">Gender: {profile.gender}</p>
              </>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-md"
          initial={{ x: 20 }}
          animate={{ x: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Mail className="mr-2 text-primary-600" />
            Contact Information
          </h2>
          
          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    disabled
                    className="w-full p-2 border rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600">Email: {profile.email}</p>
                <p className="text-gray-600">Phone: {profile.phone || 'Not specified'}</p>
              </>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-md md:col-span-2"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Phone className="mr-2 text-primary-600" />
            Emergency Contact
          </h2>
          
          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={profile.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={profile.emergencyPhone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600">Name: {profile.emergencyContact || 'Not specified'}</p>
                <p className="text-gray-600">Phone: {profile.emergencyPhone || 'Not specified'}</p>
              </>
            )}
          </div>
        </motion.div>
      </div>

      <div className="mt-6 text-center">
        {isEditing ? (
          <div className="space-x-4">
            <motion.button
              onClick={handleSubmit}
              className="bg-primary-600 text-white py-2 px-6 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </motion.button>
            <motion.button
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSaving}
            >
              Cancel
            </motion.button>
          </div>
        ) : (
          <motion.button
            onClick={() => setIsEditing(true)}
            className="bg-primary-600 text-white py-2 px-6 rounded-lg hover:bg-primary-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Edit Profile
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;