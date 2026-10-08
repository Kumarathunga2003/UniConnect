import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";

const actions = [
  { icon: "◉", title: "Build your profile", text: "Show employers who you are and what you can do.", path: "/student/profile", tone: "from-violet-500 to-indigo-600" },
  { icon: "◇", title: "Add education & skills", text: "Highlight your qualifications and strongest skills.", path: "/student/portfolio", tone: "from-blue-500 to-cyan-500" },
  { icon: "▤", title: "Explore internships", text: "Discover roles that match your career direction.", path: "/student/internships", tone: "from-cyan-500 to-teal-500" },
  { icon: "✓", title: "Track applications", text: "Stay updated throughout every application stage.", path: "/student/applications", tone: "from-fuchsia-500 to-violet-600" },
];

function StudentDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ profileCompletion: 0, applications: 0, saved: 0, interviews: 0 });
  useEffect(() => { api.get("/analytics/student").then(({ data }) => setStats(data)).catch(() => {}); }, []);
  const fullName = localStorage.getItem("fullName") || "Student";
  const firstName = fullName.split(" ")[0];
  return <DashboardLayout role="STUDENT">
    <section className="relative overflow-hidden rounded-3xl bg-[#111936] p-5 text-white shadow-2xl sm:rounded-[2rem] sm:p-10">
      <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" /><div className="absolute -bottom-28 right-1/3 h-60 w-60 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="relative max-w-2xl"><span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[.16em] text-indigo-100">Student workspace</span><h1 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:mt-6 sm:text-5xl">Welcome back, {firstName}.</h1><p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">Your next opportunity could be one connection away. Complete your profile and explore internships created for emerging talent.</p><button onClick={() => navigate("/student/internships")} className="mt-6 w-full rounded-xl bg-white px-5 py-3 font-black text-indigo-700 shadow-xl transition hover:-translate-y-1 sm:mt-7 sm:w-auto">Explore opportunities →</button></div>
    </section>
    <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">{[["Profile complete", `${stats.profileCompletion}%`], ["Applications", stats.applications], ["Saved roles", stats.saved], ["Interviews", stats.interviews]].map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><p className="text-[10px] font-black uppercase tracking-wider text-slate-400 sm:text-xs">{label}</p><p className="mt-2 text-2xl font-black text-indigo-600 sm:text-3xl">{value}</p></div>)}</div>
    <div className="mt-8 flex items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.18em] text-indigo-600">Quick actions</p><h2 className="mt-2 text-2xl font-black">Everything you need to move forward</h2></div><p className="hidden text-sm text-slate-500 sm:block">Choose an area to continue</p></div>
    <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{actions.map((item) => <button key={item.path} onClick={() => navigate(item.path)} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-xl"><span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${item.tone} text-xl font-black text-white shadow-lg`}>{item.icon}</span><h3 className="mt-6 text-lg font-black text-slate-900 group-hover:text-indigo-600">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p><span className="mt-5 inline-block text-sm font-black text-indigo-600">Open <span className="inline-block transition group-hover:translate-x-1">→</span></span></button>)}</div>
    <section className="mt-8 grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-3"><div><p className="text-xs font-black uppercase tracking-wider text-slate-400">01 · Create</p><h3 className="mt-2 font-black">Complete your profile</h3><p className="mt-1 text-sm text-slate-500">Build a credible professional identity.</p></div><div className="border-slate-200 sm:border-l sm:pl-6"><p className="text-xs font-black uppercase tracking-wider text-slate-400">02 · Discover</p><h3 className="mt-2 font-black">Find the right role</h3><p className="mt-1 text-sm text-slate-500">Browse relevant internship opportunities.</p></div><div className="border-slate-200 sm:border-l sm:pl-6"><p className="text-xs font-black uppercase tracking-wider text-slate-400">03 · Grow</p><h3 className="mt-2 font-black">Start your career</h3><p className="mt-1 text-sm text-slate-500">Apply, connect, and gain experience.</p></div></section>
  </DashboardLayout>;
}
export default StudentDashboard;
