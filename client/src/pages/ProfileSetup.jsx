// src/pages/ProfileSetup.jsx
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>
        <p className="mb-4">Welcome, {user?.name || user?.email}!</p>
        {/* Add your profile setup form here */}
        <button
          onClick={() => navigate("/dashboard")} // Redirect to your main app after setup
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Complete Setup
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;