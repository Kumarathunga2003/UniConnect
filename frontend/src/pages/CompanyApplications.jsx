import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import StatusBadge from "../components/StatusBadge";
import api from "../api/axios";
import { getErrorMessage } from "../utils/errors";

const statuses = ["PENDING", "SHORTLISTED", "INTERVIEW", "ACCEPTED", "REJECTED"];

function CompanyApplications() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const load = async () => {
    try { const response = await api.get("/applications/company/my"); setItems(response.data); }
    catch (err) { setError(getErrorMessage(err, "Unable to load applications.")); }
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try { await api.put(`/applications/${id}/status`, { status }); await load(); }
    catch (err) { setError(getErrorMessage(err, "Unable to update status.")); }
  };

  return <DashboardLayout role="COMPANY" title="Student Applications">
    {error && <p className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
    <div className="space-y-4">{items.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center"><div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold">{item.studentName}</h2><StatusBadge status={item.status} /></div><p className="mt-1 text-slate-500">{item.studentEmail}</p><p className="mt-3"><b>Applied for:</b> {item.internshipTitle}</p></div><label className="text-sm font-semibold">Update status<select value={item.status} onChange={(e) => updateStatus(item.id, e.target.value)} className="mt-2 block rounded-xl border border-slate-300 px-4 py-3">{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label></div>
    </article>)}{!items.length && <div className="rounded-2xl bg-white p-8 text-center text-slate-500">No applications received yet.</div>}</div>
  </DashboardLayout>;
}

export default CompanyApplications;
