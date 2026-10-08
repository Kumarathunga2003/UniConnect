import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Alert, EmptyState, LoadingState } from "../components/Ui";
import api from "../api/axios";
import { getErrorMessage } from "../utils/errors";
function SavedInternships() {
  const navigate = useNavigate(); const [items, setItems] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const load = async () => { try { const { data } = await api.get("/students/saved-internships"); setItems(data); } catch (err) { setError(getErrorMessage(err, "Unable to load saved internships.")); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const remove = async (id) => { await api.delete(`/students/saved-internships/${id}`); await load(); };
  return <DashboardLayout role="STUDENT" title="Saved Internships">{error && <Alert>{error}</Alert>}{loading ? <LoadingState /> : <div className="grid gap-5 md:grid-cols-2">{items.map((item) => <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-700">{item.internshipType}</span><h2 className="mt-5 break-words text-xl font-black">{item.title}</h2><p className="mt-1 break-words font-semibold text-indigo-600">{item.companyName}</p><p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">{item.description}</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><button onClick={() => navigate(`/student/internships/${item.id}`)} className="btn-primary w-full sm:flex-1">View details</button><button onClick={() => remove(item.id)} className="btn-secondary w-full sm:w-auto">Remove</button></div></article>)}{!items.length && <div className="md:col-span-2"><EmptyState icon="♡" title="Nothing saved yet" description="Save interesting internships while browsing and return to them here." action={<button onClick={() => navigate("/student/internships")} className="btn-primary">Explore internships</button>} /></div>}</div>}</DashboardLayout>;
}
export default SavedInternships;
