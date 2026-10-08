import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Alert, LoadingState } from "../components/Ui";
import api from "../api/axios";
import { getErrorMessage } from "../utils/errors";

function InternshipDetails() {
  const { id } = useParams(); const navigate = useNavigate();
  const [item, setItem] = useState(null); const [error, setError] = useState(""); const [message, setMessage] = useState(""); const [applying, setApplying] = useState(false);
  useEffect(() => { api.get(`/internships/${id}`).then(({ data }) => setItem(data)).catch((err) => setError(getErrorMessage(err, "Unable to load internship."))); }, [id]);
  const apply = async () => { setApplying(true); setError(""); try { await api.post("/applications", { internshipId: Number(id) }); setMessage("Application submitted successfully. You can track it from My Applications."); } catch (err) { setError(getErrorMessage(err, "Unable to apply.")); } finally { setApplying(false); } };
  return <DashboardLayout role="STUDENT">
    <button onClick={() => navigate("/student/internships")} className="btn-secondary mb-6 w-full sm:w-auto">← Back to opportunities</button>
    {error && <Alert>{error}</Alert>}{message && <Alert type="success">{message}</Alert>}{!item && !error && <LoadingState label="Loading opportunity..." />}
    {item && <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="relative bg-[#111936] p-5 text-white sm:p-9"><div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/30 blur-3xl" /><div className="relative"><span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-indigo-100">{item.internshipType}</span><h1 className="mt-5 break-words text-2xl font-black leading-tight sm:text-4xl">{item.title}</h1><p className="mt-3 break-words text-base font-bold text-cyan-300 sm:text-lg">{item.companyName}</p></div></div><div className="p-5 sm:p-9"><div className="grid gap-4 sm:grid-cols-2"><Info icon="⌖" label="Location" value={item.location || "Not specified"} /><Info icon="◷" label="Apply before" value={item.deadline || "Open deadline"} /></div><div className="mt-8 border-t border-slate-200 pt-7"><p className="text-xs font-black uppercase tracking-[.18em] text-indigo-600">About this role</p><p className="mt-4 break-words whitespace-pre-wrap text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{item.description || "No description provided."}</p></div></div></article>
      <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-xl text-indigo-600">✦</div><h2 className="mt-5 text-xl font-black">Ready to take the next step?</h2><p className="mt-2 text-sm leading-6 text-slate-500">Submit your application and the company will be able to review your student profile.</p><button disabled={applying || Boolean(message)} onClick={apply} className="btn-primary mt-6 w-full">{message ? "Application sent ✓" : applying ? "Submitting..." : "Apply for this role"}</button><p className="mt-4 text-center text-xs text-slate-400">Make sure your profile and skills are up to date.</p></aside>
    </div>}
  </DashboardLayout>;
}
function Info({ icon, label, value }) { return <div className="rounded-2xl bg-slate-50 p-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-indigo-600 shadow-sm">{icon}</span><div><p className="text-xs font-black uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 font-bold">{value}</p></div></div></div>; }
export default InternshipDetails;
