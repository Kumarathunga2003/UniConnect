import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import StatusBadge from "../components/StatusBadge";
import { Alert, EmptyState } from "../components/Ui";
import api from "../api/axios";
import { getErrorMessage } from "../utils/errors";
const statuses = ["PENDING", "SHORTLISTED", "INTERVIEW", "ACCEPTED", "REJECTED"];
function CompanyApplications() {
  const navigate = useNavigate(); const [items, setItems] = useState([]); const [error, setError] = useState("");
  const load = async () => { try { const { data } = await api.get("/applications/company/my"); setItems(data); } catch (err) { setError(getErrorMessage(err, "Unable to load applications.")); } };
  useEffect(() => { load(); }, []);
  const updateStatus = async (id, status) => { try { await api.put(`/applications/${id}/status`, { status }); await load(); } catch (err) { setError(getErrorMessage(err, "Unable to update status.")); } };
  return <DashboardLayout role="COMPANY" title="Student Applications">
    <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"><Stat label="Total candidates" value={items.length} tone="text-indigo-600" /><Stat label="In progress" value={items.filter((x) => ["SHORTLISTED", "INTERVIEW"].includes(x.status)).length} tone="text-amber-600" /><div className="col-span-2 sm:col-span-1"><Stat label="Accepted" value={items.filter((x) => x.status === "ACCEPTED").length} tone="text-emerald-600" /></div></div>
    {error && <Alert>{error}</Alert>}<div className="grid gap-5 xl:grid-cols-2">{items.map((item) => <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-start gap-4"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 font-black text-white">{(item.studentName || "S")[0]}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-3"><h2 className="truncate text-lg font-black">{item.studentName}</h2><StatusBadge status={item.status} /></div><p className="truncate text-sm text-slate-500">{item.studentEmail}</p></div></div><div className="my-5 rounded-2xl bg-slate-50 p-4"><p className="text-xs font-black uppercase tracking-wider text-slate-400">Applied for</p><p className="mt-1 font-bold">{item.internshipTitle}</p></div><button onClick={() => navigate(`/company/applications/${item.id}/candidate`)} className="btn-secondary mb-4 w-full">View full candidate profile</button><label className="text-xs font-black uppercase tracking-wider text-slate-500">Move candidate to<select value={item.status} onChange={(e) => updateStatus(item.id, e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold normal-case tracking-normal">{statuses.map((status) => <option key={status}>{status}</option>)}</select></label></article>)}{!items.length && <div className="xl:col-span-2"><EmptyState icon="◎" title="No applications received" description="Candidate applications will appear here after students apply to your internships." /></div>}</div>
  </DashboardLayout>;
}
function Stat({ label, value, tone }) { return <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><p className="text-[10px] font-black uppercase tracking-wider text-slate-400 sm:text-xs">{label}</p><p className={`mt-2 text-2xl font-black sm:text-3xl ${tone}`}>{value}</p></div>; }
export default CompanyApplications;
