import { Routes, Route } from "react-router-dom";
import SignupSystem from "components/public/signup/signupSystem/SignupSystem";
import Login from "components/public/login/Login";
import RouteLandingPage from "components/RouteLandingPage";
import Signup from "components/public/signup/Signup";
import Cart from "components/stackholders/customer/cart/Cart";
import RouteAdmin from "components/stackholders/admin/RouteAdmin";
import AdminDashboard from 'components/stackholders/admin/dashboard/Dahboard';
import RouteCustomer from "components/stackholders/customer/RouteCustomer";
import Order from "components/stackholders/customer/order/Order";
import Orders from "components/stackholders/customer/orders/Orders";
import ReserveTable from "components/stackholders/customer/reserveTable/ReserveTable";
import Tables from "components/stackholders/admin/tables/Tables";
import CustomPaginationActionsTable from "components/stackholders/admin/TaPag";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<RouteLandingPage isDemo={true} />} />
      <Route path="/test" element={<CustomPaginationActionsTable/>} />
      <Route path="/:systemName/:systemID" element={<RouteLandingPage />} />
      <Route path="/signup/:systemName/:systemID" element={<Signup />} />
      <Route path="/login/:systemName/:systemID" element={<Login />} />
      <Route path="/admin/:systemName/:systemID" element={<RouteAdmin />} />
      <Route path="/admin/tables/:systemName/:systemID" element={<Tables />} />
      <Route path="/customer/:systemName/:systemID" element={<RouteCustomer />} />
      <Route path="/admin/dashboard/:systemName/:systemID" element={<AdminDashboard />} />
      <Route path="/customer/dashboard/reserve-table/:systemName/:systemID" element={<ReserveTable />} />
      <Route path="/customer/dashboard/order/:systemName/:systemID" element={<Order />} />
      <Route path="/customer/dashboard/orders/:systemName/:systemID" element={<Orders />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/customer/dashboard/cart/:systemName/:systemID" element={<Cart />} />
    </Routes>
  );
}

export default Router;
