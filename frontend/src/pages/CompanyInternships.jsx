import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Alert, EmptyState } from "../components/Ui";
import api from "../api/axios";
import { getErrorMessage } from "../utils/errors";

function CompanyInternships() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const load = async () => { try { const { data } = await api.get("/internships/company/my"); setItems(data); } catch (err) { setError(getErrorMessage(err, "Create your company profile before posting internships.")); } };
  useEffect(() => { load(); }, []);
  const remove = async (id) => { if (!window.confirm("Delete this internship? Applications linked to it may also be deleted.")) return; try { await api.delete(`/internships/${id}`); await load(); } catch (err) { setError(getErrorMessage(err, "Unable to delete internship.")); } };

  return <DashboardLayout role="COMPANY" title="Manage Internships">
    <div className="mb-7 flex flex-col justify-between gap-4 rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 p-5 text-white shadow-xl sm:flex-row sm:items-center sm:p-6"><div><p className="text-xs font-black uppercase tracking-[.18em] text-indigo-100">Opportunity centre</p><h2 className="mt-2 text-2xl font-black">Create roles that launch careers</h2><p className="mt-2 text-sm text-indigo-100">Publish and manage all your company opportunities here.</p></div><button onClick={() => navigate("/company/internships/new")} className="w-full shrink-0 rounded-xl bg-white px-5 py-3 font-black text-indigo-700 shadow-lg transition hover:-translate-y-1 sm:w-auto">+ New internship</button></div>
    {error && <Alert>{error}</Alert>}
    <div className="grid gap-5 lg:grid-cols-2">{items.map((item) => <article key={item.id} className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-6"><div className="flex items-start justify-between gap-4"><span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-black text-indigo-700">{item.internshipType}</span><span className="text-xs font-bold text-slate-400">ID #{item.id}</span></div><h2 className="mt-5 break-words text-xl font-black group-hover:text-indigo-600">{item.title}</h2><div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-500"><span className="rounded-lg bg-slate-50 px-3 py-2">⌖ {item.location || "Not specified"}</span><span className="rounded-lg bg-slate-50 px-3 py-2">◷ {item.deadline || "Open deadline"}</span></div><p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">{item.description || "No description provided."}</p><div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row"><button onClick={() => navigate(`/company/internships/${item.id}/edit`)} className="btn-secondary w-full sm:flex-1">Edit listing</button><button onClick={() => remove(item.id)} className="min-h-11 w-full rounded-xl bg-red-50 px-5 py-3 text-sm font-black text-red-700 transition hover:bg-red-100 sm:w-auto">Delete</button></div></article>)}
      {!items.length && !error && <div className="lg:col-span-2"><EmptyState icon="▤" title="No internships yet" description="Post your first opportunity and start connecting with talented students." action={<button onClick={() => navigate("/company/internships/new")} className="btn-primary">Post first internship</button>} /></div>}
    </div>
  </DashboardLayout>;
}
export default CompanyInternships;
