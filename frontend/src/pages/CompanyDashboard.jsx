import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const cards = [
  ["Company Profile", "Keep your public company information current.", "/company/profile"],
  ["Manage Internships", "Create, edit, and remove internship opportunities.", "/company/internships"],
  ["Review Applications", "Review candidates and update their status.", "/company/applications"],
];

function CompanyDashboard() {
  const navigate = useNavigate();
  const fullName = localStorage.getItem("fullName") || "Company";
  return <DashboardLayout role="COMPANY" title={`Welcome, ${fullName}!`}>
    <p className="mb-8 text-slate-600">Publish opportunities and manage your candidates.</p>
    <div className="grid gap-5 md:grid-cols-3">
      {cards.map(([title, description, path]) => <button key={path} onClick={() => navigate(path)} className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
        <h2 className="text-xl font-bold">{title}</h2><p className="mt-2 text-slate-600">{description}</p>
      </button>)}
    </div>
  </DashboardLayout>;
}
export default CompanyDashboard;
