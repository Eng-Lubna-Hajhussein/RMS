import { Routes, Route } from "react-router-dom";
import SignupSystem from "components/public/signup/signupSystem/SignupSystem";
import Login from "components/public/login/Login";
import RouteLandingPage from "components/RouteLandingPage";
import Signup from "components/public/signup/Signup";
import Cart from "components/stackholders/customer/cart/Cart";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<RouteLandingPage isDemo={true} />} />
      <Route path="/:systemName/:systemID" element={<RouteLandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/:systemName/:systemID/cart" element={<Cart />} />
    </Routes>
  );
}

export default Router;
