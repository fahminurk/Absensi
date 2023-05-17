import { Route } from "react-router-dom";
import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage";

const routes = [
  <Route path="/login" element={<LoginPage />} />,
  <Route path="/register" element={<RegisterPage />} />,
  //   <Route path="/dashboard" element={<DashboardPage />} />,
];

export default routes;
