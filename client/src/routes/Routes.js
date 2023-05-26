import { Route } from "react-router-dom";
import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage";
import DashboardPage from "../pages/DashbordPage";
import AttendanceLogPage from "../pages/attendanceLog";

import ForgotPassword, {
  RequestForgotPassword,
} from "../pages/forgetPasswordPage";

const routes = [
  <Route path="/login" key="login" element={<LoginPage />} />,
  <Route path="/register" key="register" element={<RegisterPage />} />,
  <Route path="/" key="dashboard" element={<DashboardPage />} />,
  <Route path="/attendanceLog" element={<AttendanceLogPage />} />,

  <Route
    path="/forgot-password/request"
    key="request-forgot-password"
    element={<RequestForgotPassword />}
  />,
  <Route
    path="/forgot-password/:token"
    key="forgot-password"
    element={<ForgotPassword />}
  />,
];

export default routes;
