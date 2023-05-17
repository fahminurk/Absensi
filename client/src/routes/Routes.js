import { Route } from "react-router-dom";
import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage";
import DashboardPage from "../pages/DashbordPage";

const routes = [
  <Route path="/login" element={<LoginPage />} />,
  <Route path="/register" element={<RegisterPage />} />,
  <Route path="/" element={<DashboardPage />} />,
];

export default routes;
