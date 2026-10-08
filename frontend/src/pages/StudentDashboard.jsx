import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const cards = [
  ["My Profile", "View and update your student profile.", "/student/profile"],
  ["Education & Skills", "Build the qualifications shown to companies.", "/student/portfolio"],
  ["Internships", "Search and apply for available opportunities.", "/student/internships"],
  ["My Applications", "Track the status of your applications.", "/student/applications"],
];

function StudentDashboard() {
  const navigate = useNavigate();
  const fullName = localStorage.getItem("fullName") || "Student";
  return <DashboardLayout role="STUDENT" title={`Welcome, ${fullName}!`}>
    <p className="mb-8 text-slate-600">Manage your profile and find your next internship.</p>
    <div className="grid gap-5 sm:grid-cols-2">
      {cards.map(([title, description, path]) => <button key={path} onClick={() => navigate(path)} className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
        <h2 className="text-xl font-bold">{title}</h2><p className="mt-2 text-slate-600">{description}</p>
      </button>)}
    </div>
  </DashboardLayout>;
}
export default StudentDashboard;
