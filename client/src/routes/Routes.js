import { Route } from "react-router-dom";
import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage";
import DashboardPage from "../pages/DashbordPage";
import AttendanceLogPage from "../pages/attendanceLog";
import ForgetPasswordPage from "../pages/forgetPasswordPage";

const routes = [
  <Route path="/login" key="login" element={<LoginPage />} />,
  <Route path="/register" key="register" element={<RegisterPage />} />,
  <Route path="/" key="dashboard" element={<DashboardPage />} />,
  <Route path="/attendanceLog" element={<AttendanceLogPage />} />,
  <Route path="/forgetPassword" element={<ForgetPasswordPage />} />,
];

export default routes;
