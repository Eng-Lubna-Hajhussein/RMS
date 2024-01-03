import { Routes, Route } from 'react-router-dom';
import Home from "components/public/website/home/Home";
import Signup from "components/public/signup/Signup";
import Login from "components/public/login/Login";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default Router;