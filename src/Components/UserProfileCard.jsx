import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, MapPin, Calendar, Briefcase, Mail, Phone, Edit3, Check, X, Camera, Upload } from 'lucide-react';

// Persistent storage using localStorage to survive page refresh
const persistentStorage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(`profileCard_${key}`);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(`profileCard_${key}`, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(`profileCard_${key}`);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

export default function UserProfileCard() {
  // Initialize state with persistent data if available
  const [isFollowing, setIsFollowing] = useState(() => persistentStorage.get('isFollowing') || false);
  const [isEditing, setIsEditing] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [likes, setLikes] = useState(() => persistentStorage.get('likes') || 42);
  const [isLiked, setIsLiked] = useState(() => persistentStorage.get('isLiked') || false);
  const [userInfo, setUserInfo] = useState(() => ({
    name: persistentStorage.get('name') || "Malatesha",
    title: persistentStorage.get('title') || "Frontend Developer",
    company: persistentStorage.get('company') || "CSUEB",
    location: persistentStorage.get('location') || "San Francisco, CA",
    bio: persistentStorage.get('bio') || "Passionate about creating beautiful, accessible web experiences. React enthusiast and open source contributor.",
    joinDate: "March 2021",
    followers: 1250,
    following: 340,
    profileImage: persistentStorage.get('profileImage') || null
  }));
  const [editForm, setEditForm] = useState(userInfo);

  // Persist data whenever it changes
  useEffect(() => {
    persistentStorage.set('isFollowing', isFollowing);
  }, [isFollowing]);

  useEffect(() => {
    persistentStorage.set('likes', likes);
  }, [likes]);

  useEffect(() => {
    persistentStorage.set('isLiked', isLiked);
  }, [isLiked]);

  useEffect(() => {
    persistentStorage.set('profileImage', userInfo.profileImage);
  }, [userInfo.profileImage]);

  useEffect(() => {
    persistentStorage.set('name', userInfo.name);
    persistentStorage.set('title', userInfo.title);
    persistentStorage.set('company', userInfo.company);
    persistentStorage.set('location', userInfo.location);
    persistentStorage.set('bio', userInfo.bio);
  }, [userInfo.name, userInfo.title, userInfo.company, userInfo.location, userInfo.bio]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(userInfo);
  };

  const handleSave = () => {
    setUserInfo(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(userInfo);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserInfo(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
        setShowImageModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setUserInfo(prev => ({
      ...prev,
      profileImage: null
    }));
    setShowImageModal(false);
  };

  const handleEmail = () => {
    window.open('mailto:invincible@gmail.com', '_blank');
  };

  const handleCall = () => {
    window.open('tel:3418003822', '_blank');
  };

  const predefinedImages = [
    "https://images.unsplash.com/photo-1494790108755-2616b152c825?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  ];

  return (
    <motion.div 
      className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with cover image */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        <motion.button
          onClick={handleEdit}
          className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Edit3 size={16} className="text-white" />
        </motion.button>
      </div>

      {/* Profile picture */}
      <div className="relative px-6 pb-6">
        <div className="flex justify-center">
          <div className="relative">
            <motion.div 
              className="w-24 h-24 bg-gray-300 rounded-full -mt-12 border-4 border-white shadow-lg flex items-center justify-center text-2xl font-bold text-gray-600 overflow-hidden"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {userInfo.profileImage ? (
                <img 
                  src={userInfo.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                userInfo.name.split(' ').map(n => n[0]).join('')
              )}
            </motion.div>
            
            {/* Camera button for profile pic */}
            <motion.button
              onClick={() => setShowImageModal(true)}
              className="absolute bottom-0 right-0 p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Camera size={12} />
            </motion.button>
          </div>
        </div>

        {/* Profile info */}
        <div className="text-center mt-4">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div 
                key="editing"
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full text-xl font-bold text-center border-b-2 border-blue-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full text-gray-600 text-center border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={editForm.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full text-gray-600 text-center border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full text-gray-600 text-center border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  value={editForm.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="w-full text-gray-700 text-center border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  rows="3"
                />
                <div className="flex justify-center space-x-2 mt-4">
                  <motion.button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center space-x-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Check size={16} />
                    <span>Save</span>
                  </motion.button>
                  <motion.button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center space-x-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={16} />
                    <span>Cancel</span>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-gray-800">{userInfo.name}</h2>
                <p className="text-gray-600">{userInfo.title}</p>
                <p className="text-gray-600 text-sm">{userInfo.company}</p>
                
                <div className="flex items-center justify-center mt-2 text-gray-500 text-sm">
                  <MapPin size={14} className="mr-1" />
                  <span>{userInfo.location}</span>
                </div>

                <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                  {userInfo.bio}
                </p>

                {/* Stats */}
                <div className="flex justify-center space-x-6 mt-4 text-sm">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="font-bold text-gray-800">{userInfo.followers}</div>
                    <div className="text-gray-600">Followers</div>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="font-bold text-gray-800">{userInfo.following}</div>
                    <div className="text-gray-600">Following</div>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="font-bold text-gray-800">{likes}</div>
                    <div className="text-gray-600">Likes</div>
                  </motion.div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-2 mt-6">
                  <motion.button
                    onClick={handleFollow}
                    className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                      isFollowing
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </motion.button>
                  
                  <motion.button 
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle size={18} className="text-gray-600" />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleLike}
                    className={`p-2 border rounded-md transition-colors ${
                      isLiked
                        ? 'border-red-300 bg-red-50 hover:bg-red-100'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    <Heart size={18} className={isLiked ? 'text-red-500 fill-current' : 'text-gray-600'} />
                  </motion.button>
                  
                  <motion.button 
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 size={18} className="text-gray-600" />
                  </motion.button>
                </div>

                {/* Additional info */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <Calendar size={14} className="mr-2" />
                    <span>Joined {userInfo.joinDate}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <Briefcase size={14} className="mr-2" />
                    <span>Available for freelance</span>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <motion.button 
                      onClick={handleEmail}
                      className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail size={14} className="mr-1" />
                      <span>Email</span>
                    </motion.button>
                    <motion.button 
                      onClick={handleCall}
                      className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Phone size={14} className="mr-1" />
                      <span>Call</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Image Upload Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4 text-center">Update Profile Picture</h3>
              
              {/* Upload from device */}
              <div className="mb-4">
                <label className="block w-full">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Upload from device</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </label>
              </div>

              {/* Predefined images */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Choose from gallery:</p>
                <div className="grid grid-cols-3 gap-2">
                  {predefinedImages.map((img, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setUserInfo(prev => ({ ...prev, profileImage: img }));
                        setShowImageModal(false);
                      }}
                      className="w-full h-16 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src={img} alt={`Option ${index + 1}`} className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Remove image option */}
              {userInfo.profileImage && (
                <motion.button
                  onClick={removeProfileImage}
                  className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors mb-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Remove Current Image
                </motion.button>
              )}

              {/* Close button */}
              <motion.button
                onClick={() => setShowImageModal(false)}
                className="w-full py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}