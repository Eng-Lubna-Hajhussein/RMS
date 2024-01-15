import { Routes, Route } from 'react-router-dom';
import Signup from "components/public/signup/Signup";
import Login from "components/public/login/Login";
import RouteLandingPage from 'components/RouteLandingPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<RouteLandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default Router;