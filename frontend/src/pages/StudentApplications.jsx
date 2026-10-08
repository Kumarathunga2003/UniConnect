import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import StatusBadge from "../components/StatusBadge";
import api from "../api/axios";
import { getErrorMessage } from "../utils/errors";

function StudentApplications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try { const response = await api.get("/applications/student/my"); setApplications(response.data); }
    catch (err) { setError(getErrorMessage(err, "Unable to load applications.")); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const withdraw = async (id) => {
    if (!window.confirm("Withdraw this application?")) return;
    try { await api.delete(`/applications/${id}`); await load(); }
    catch (err) { setError(getErrorMessage(err, "Unable to withdraw application.")); }
  };

  return <DashboardLayout role="STUDENT" title="My Applications">
    {error && <p className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
    {loading ? <p>Loading...</p> : <div className="space-y-4">
      {applications.map((item) => <div key={item.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div><h2 className="text-xl font-bold">{item.internshipTitle}</h2><p className="mt-1 text-slate-600">{item.companyName}</p><p className="mt-2 text-xs text-slate-400">Applied {item.appliedAt ? new Date(item.appliedAt).toLocaleString() : ""}</p></div>
        <div className="flex items-center gap-3"><StatusBadge status={item.status} />{item.status === "PENDING" && <button onClick={() => withdraw(item.id)} className="rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-700">Withdraw</button>}</div>
      </div>)}
      {!applications.length && <div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">You have not applied for an internship yet.</div>}
    </div>}
  </DashboardLayout>;
}

export default StudentApplications;
