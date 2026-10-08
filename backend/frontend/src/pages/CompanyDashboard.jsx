import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";

const actions = [
  { icon: "◉", title: "Company profile", text: "Present your company and employer brand.", path: "/company/profile", tone: "from-violet-500 to-indigo-600" },
  { icon: "+", title: "Post an internship", text: "Create a new opportunity for students.", path: "/company/internships/new", tone: "from-blue-500 to-cyan-500" },
  { icon: "▤", title: "Manage internships", text: "Update and organise your active listings.", path: "/company/internships", tone: "from-cyan-500 to-teal-500" },
  { icon: "✓", title: "Review candidates", text: "Evaluate applicants and update decisions.", path: "/company/applications", tone: "from-fuchsia-500 to-violet-600" },
];

function CompanyDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ internships: 0, applications: 0, interviews: 0, accepted: 0 });
  useEffect(() => { api.get("/analytics/company").then(({ data }) => setStats(data)).catch(() => {}); }, []);
  const fullName = localStorage.getItem("fullName") || "Company";
  return <DashboardLayout role="COMPANY">
    <section className="relative overflow-hidden rounded-[2rem] bg-[#111936] p-7 text-white shadow-2xl sm:p-10"><div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" /><div className="absolute -bottom-28 right-1/3 h-60 w-60 rounded-full bg-cyan-400/20 blur-3xl" /><div className="relative max-w-2xl"><span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[.16em] text-indigo-100">Employer workspace</span><h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl">Grow your team with emerging talent.</h1><p className="mt-4 max-w-xl text-base leading-7 text-slate-300">Welcome, {fullName}. Publish meaningful internships, meet motivated students, and manage every candidate from one clear workspace.</p><button onClick={() => navigate("/company/internships/new")} className="mt-7 rounded-xl bg-white px-5 py-3 font-black text-indigo-700 shadow-xl transition hover:-translate-y-1">+ Post an internship</button></div></section>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[["Internships", stats.internships], ["Applications", stats.applications], ["Interviews", stats.interviews], ["Accepted", stats.accepted]].map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-black uppercase tracking-wider text-slate-400">{label}</p><p className="mt-2 text-3xl font-black text-indigo-600">{value}</p></div>)}</div>
    <div className="mt-8"><p className="text-xs font-black uppercase tracking-[.18em] text-indigo-600">Employer tools</p><h2 className="mt-2 text-2xl font-black">Manage your recruitment journey</h2></div>
    <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{actions.map((item) => <button key={item.path} onClick={() => navigate(item.path)} className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-xl"><span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${item.tone} text-xl font-black text-white shadow-lg`}>{item.icon}</span><h3 className="mt-6 text-lg font-black text-slate-900 group-hover:text-indigo-600">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p><span className="mt-5 inline-block text-sm font-black text-indigo-600">Open →</span></button>)}</div>
  </DashboardLayout>;
}
export default CompanyDashboard;
