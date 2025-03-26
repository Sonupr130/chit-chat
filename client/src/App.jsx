import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ProfileSetup from "./pages/ProfileSetup.jsx";
import Home from "./components/Home.jsx";


const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<ProtectedRoute component={Home} />} />
      <Route
        path="/profile-setup"
        element={<ProtectedRoute component={ProfileSetup} />}
      />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
};

export default App;
