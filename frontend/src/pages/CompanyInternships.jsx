import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";
import { getErrorMessage } from "../utils/errors";

function CompanyInternships() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try { const response = await api.get("/internships/company/my"); setItems(response.data); }
    catch (err) { setError(getErrorMessage(err, "Create your company profile before posting internships.")); }
  };
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this internship? Applications linked to it may also be deleted.")) return;
    try { await api.delete(`/internships/${id}`); await load(); }
    catch (err) { setError(getErrorMessage(err, "Unable to delete internship.")); }
  };

  return <DashboardLayout role="COMPANY" title="Manage Internships">
    <div className="mb-6 flex justify-end"><button onClick={() => navigate("/company/internships/new")} className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">+ Post Internship</button></div>
    {error && <p className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
    <div className="space-y-4">{items.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><h2 className="text-xl font-bold">{item.title}</h2><p className="mt-1 text-slate-500">{item.location || "Location not specified"} · {item.internshipType}</p><p className="mt-2 text-sm">Deadline: {item.deadline || "Not specified"}</p></div><div className="flex gap-2"><button onClick={() => navigate(`/company/internships/${item.id}/edit`)} className="rounded-lg border px-4 py-2 font-semibold">Edit</button><button onClick={() => remove(item.id)} className="rounded-lg bg-red-50 px-4 py-2 font-semibold text-red-700">Delete</button></div></div>
    </article>)}{!items.length && !error && <div className="rounded-2xl bg-white p-8 text-center text-slate-500">No internships posted yet.</div>}</div>
  </DashboardLayout>;
}

export default CompanyInternships;
