import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const ProfileSetup = () => {
  const { user, isLoading: authLoading, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    dateOfBirth: "",
    avatar: ""
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiClient = async () => {
    const token = await getAccessTokenSilently();
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      setApiLoading(true);
      const api = await apiClient();
      const response = await api.get(`/users/profile`);
      
      setFormData(prev => ({
        ...prev,
        fullName: response.data.name || prev.fullName,
        bio: response.data.bio || "",
        dateOfBirth: response.data.dateOfBirth || "",
        avatar: response.data.avatar || user.picture || "https://via.placeholder.com/150"
      }));
    } catch (err) {
      console.log("No existing profile found, creating new one");
    } finally {
      setApiLoading(false);
    }
  };

  // Handle initial load and auth
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/");
      return;
    }

    // Set initial values from Auth0 user
    const fullName = user.name || `${user.given_name} ${user.family_name}` || user.nickname || user.email.split('@')[0];
    
    setFormData(prev => ({
      ...prev,
      fullName,
      avatar: user.picture || "https://via.placeholder.com/150"
    }));

    // Fetch existing profile if exists
    fetchUserProfile();
  }, [user, authLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleImageUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    setError(null);
    const file = e.target.files[0];
    
    try {
      const token = await getAccessTokenSilently();
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/avatars/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setFormData(prev => ({ ...prev, avatar: response.data.url }));
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };


  

 // In your ProfileSetup component
const handleSubmit = async (e) => {
  e.preventDefault();
  setApiLoading(true);
  
  try {
    const api = await apiClient();
    await api.post('/users/profile', {  // Changed from '/users/profile'
      name: formData.fullName,
      email: user.email,
      bio: formData.bio,
      dateOfBirth: formData.dateOfBirth,
      avatar: formData.avatar
    });
    navigate("/dashboard");
  } catch (err) {
    // Error handling
  } finally {
    setApiLoading(false);
  }
};

  if (authLoading || apiLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
          <p className="mt-2 text-gray-600">
            Let's set up your account to get started.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-6">
            <div 
              className="relative group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={formData.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {(isHovering || !formData.avatar) && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center transition-opacity duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white mb-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <label className="cursor-pointer text-white text-xs text-center">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                      {isUploading ? 'Uploading...' : 'Change Photo'}
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={isUploading || apiLoading}
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={isUploading || apiLoading}
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us about yourself..."
              disabled={isUploading || apiLoading}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!formData.fullName || isUploading || apiLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                !formData.fullName || isUploading || apiLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {apiLoading ? "Saving..." : "Complete Setup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;