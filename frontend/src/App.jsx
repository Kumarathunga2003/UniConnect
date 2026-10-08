import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import EditStudentProfile from "./pages/EditStudentProfile";
import StudentPortfolio from "./pages/StudentPortfolio";
import Internships from "./pages/Internships";
import InternshipDetails from "./pages/InternshipDetails";
import StudentApplications from "./pages/StudentApplications";
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyProfile from "./pages/CompanyProfile";
import CompanyInternships from "./pages/CompanyInternships";
import InternshipForm from "./pages/InternshipForm";
import CompanyApplications from "./pages/CompanyApplications";

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token) return <Navigate to="/" replace />;
  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === "COMPANY" ? "/company/dashboard" : "/student/dashboard"} replace />;
  }
  return children;
}

const student = (element) => <ProtectedRoute requiredRole="STUDENT">{element}</ProtectedRoute>;
const company = (element) => <ProtectedRoute requiredRole="COMPANY">{element}</ProtectedRoute>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/dashboard" element={student(<StudentDashboard />)} />
        <Route path="/student/profile" element={student(<StudentProfile />)} />
        <Route path="/student/profile/edit" element={student(<EditStudentProfile />)} />
        <Route path="/student/portfolio" element={student(<StudentPortfolio />)} />
        <Route path="/student/internships" element={student(<Internships />)} />
        <Route path="/student/internships/:id" element={student(<InternshipDetails />)} />
        <Route path="/student/applications" element={student(<StudentApplications />)} />
        <Route path="/company/dashboard" element={company(<CompanyDashboard />)} />
        <Route path="/company/profile" element={company(<CompanyProfile />)} />
        <Route path="/company/internships" element={company(<CompanyInternships />)} />
        <Route path="/company/internships/new" element={company(<InternshipForm />)} />
        <Route path="/company/internships/:id/edit" element={company(<InternshipForm />)} />
        <Route path="/company/applications" element={company(<CompanyApplications />)} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
