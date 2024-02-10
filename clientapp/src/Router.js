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
import SystemTables from "components/stackholders/admin/tables/Tables";
import CustomerTables from "components/stackholders/customer/tables/Tables";
import Users from "components/stackholders/admin/users/Users";
import Review from "components/stackholders/customer/review/Review";
import ProductReviewCustomer from "components/stackholders/customer/product/Product";
import CustomerSettings from 'components/stackholders/customer/settings/Settings'
import CustomerProfile from "components/stackholders/customer/profile/Profile";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<RouteLandingPage isDemo={true} />} />
      <Route path="/:systemName/:systemID" element={<RouteLandingPage />} />
      <Route path="/customer/product/:productID/:systemName/:systemID" element={<ProductReviewCustomer />} />
      <Route path="/signup/:systemName/:systemID" element={<Signup />} />
      <Route path="/login/:systemName/:systemID" element={<Login />} />
      <Route path="/admin/:systemName/:systemID" element={<RouteAdmin />} />
      <Route path="/admin/tables/:systemName/:systemID" element={<SystemTables />} />
      <Route path="/admin/users/:systemName/:systemID" element={<Users />} />
      <Route path="/customer/:systemName/:systemID" element={<RouteCustomer />} />
      <Route path="/admin/dashboard/:systemName/:systemID" element={<AdminDashboard />} />
      <Route path="/customer/reserve-table/:systemName/:systemID" element={<ReserveTable />} />
      <Route path="/customer/order/:systemName/:systemID" element={<Order />} />
      <Route path="/customer/orders/:systemName/:systemID" element={<Orders />} />
      <Route path="/customer/review/:systemName/:systemID" element={<Review />} />
      <Route path="/customer/tables/:systemName/:systemID" element={<CustomerTables />} />
      <Route path="/customer/settings/:systemName/:systemID" element={<CustomerSettings />} />
      <Route path="/customer/profile/:systemName/:systemID" element={<CustomerProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/customer/cart/:systemName/:systemID" element={<Cart />} />
    </Routes>
  );
}

export default Router;
