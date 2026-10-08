import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";
import { getErrorMessage } from "../utils/errors";

const empty = { title: "", description: "", location: "", internshipType: "ONSITE", deadline: "" };

function InternshipForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) api.get(`/internships/${id}`).then((response) => setForm({ ...empty, ...response.data })).catch((err) => setError(getErrorMessage(err, "Unable to load internship.")));
  }, [id]);

  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setError("");
    try {
      const payload = { ...form, deadline: form.deadline || null };
      if (id) await api.put(`/internships/${id}`, payload); else await api.post("/internships", payload);
      navigate("/company/internships");
    } catch (err) { setError(getErrorMessage(err, "Unable to save internship.")); }
    finally { setSaving(false); }
  };

  return <DashboardLayout role="COMPANY" title={id ? "Edit Internship" : "Post Internship"}>
    <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      {error && <p className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
      <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold sm:col-span-2">Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
        <label className="text-sm font-semibold">Location<input value={form.location || ""} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
        <label className="text-sm font-semibold">Type<select value={form.internshipType} onChange={(e) => setForm({ ...form, internshipType: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"><option value="ONSITE">Onsite</option><option value="REMOTE">Remote</option><option value="HYBRID">Hybrid</option></select></label>
        <label className="text-sm font-semibold">Deadline<input type="date" value={form.deadline || ""} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
        <label className="text-sm font-semibold sm:col-span-2">Description<textarea rows="7" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
        <div className="flex gap-3 sm:col-span-2"><button disabled={saving} className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white">{saving ? "Saving..." : "Save Internship"}</button><button type="button" onClick={() => navigate("/company/internships")} className="rounded-xl border px-6 py-3 font-bold">Cancel</button></div>
      </form>
    </div>
  </DashboardLayout>;
}

export default InternshipForm;
