/** @format */

import { Route, Routes } from "react-router";
import "./App.css";
import Homepage from "./pages/Homepage";
import RegisterUserPage from "./pages/auth/user/RegisterUserPage";
import LoginUserPage from "./pages/auth/user/LoginUserPage";
import RegisterCompanyPage from "./pages/auth/company/RegisterCompany";
import LoginCompanyPage from "./pages/auth/company/LoginCompany";
import UserDashboardPage from "./pages/dashboad/user/Dashboard";
import CompanyDashboardPage from "./pages/dashboad/company/Dashboard";
import ServicesPage from "./pages/dashboad/company/Services";
import CustomersPage from "./pages/dashboad/company/Customers";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>} />
        <Route path="/login-user" element={<LoginUserPage></LoginUserPage>} />
        <Route path="/login-company" element={<LoginCompanyPage />} />

        <Route path="/register-user" element={<RegisterUserPage />} />
        <Route path="/register-company" element={<RegisterCompanyPage />} />

        <Route path="/company-dashboard" element={<CompanyDashboardPage />}>
          <Route path="services" element={<ServicesPage />} />
          <Route path="customers" element={<CustomersPage />} />
        </Route>
        <Route path="/user-dashboard" element={<UserDashboardPage />} />
      </Routes>
    </>
  );
}

export default App;
