import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { Alert } from "../components/Ui";
import api from "../api/axios";
import { getErrorMessage } from "../utils/errors";

const empty = { title: "", description: "", location: "", internshipType: "ONSITE", deadline: "" };

function InternshipForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (id) api.get(`/internships/${id}`).then(({ data }) => setForm({ ...empty, ...data })).catch((err) => setError(getErrorMessage(err, "Unable to load internship."))); }, [id]);
  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setError("");
    try { const payload = { ...form, deadline: form.deadline || null }; if (id) await api.put(`/internships/${id}`, payload); else await api.post("/internships", payload); navigate("/company/internships"); }
    catch (err) { setError(getErrorMessage(err, "Unable to save internship.")); }
    finally { setSaving(false); }
  };

  return <DashboardLayout role="COMPANY" title={id ? "Edit Internship" : "Create Internship"}>
    <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="mb-7"><p className="text-xs font-black uppercase tracking-[.18em] text-indigo-600">Opportunity details</p><h2 className="mt-2 text-2xl font-black">{id ? "Update the opportunity" : "Reach your next great intern"}</h2><p className="mt-2 text-sm text-slate-500">Use a clear title and helpful description to attract suitable students.</p></div>{error && <Alert>{error}</Alert>}<form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-slate-700 sm:col-span-2">Internship title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Software Engineering Intern" className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5" /></label>
        <label className="text-sm font-bold text-slate-700">Location<input value={form.location || ""} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Colombo / Remote" className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5" /></label>
        <label className="text-sm font-bold text-slate-700">Work arrangement<select value={form.internshipType} onChange={(e) => setForm({ ...form, internshipType: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5"><option value="ONSITE">On-site</option><option value="REMOTE">Remote</option><option value="HYBRID">Hybrid</option></select></label>
        <label className="text-sm font-bold text-slate-700">Application deadline<input type="date" value={form.deadline || ""} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5" /></label>
        <label className="text-sm font-bold text-slate-700 sm:col-span-2">Role description<textarea rows="8" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the responsibilities, learning opportunities, and ideal candidate..." className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5" /></label>
        <div className="flex flex-wrap gap-3 pt-2 sm:col-span-2"><button disabled={saving} className="btn-primary">{saving ? "Saving..." : id ? "Save changes" : "Publish internship"}</button><button type="button" onClick={() => navigate("/company/internships")} className="btn-secondary">Cancel</button></div>
      </form></section>
      <aside className="h-fit rounded-3xl bg-[#111936] p-7 text-white shadow-xl"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-2xl">✦</div><h3 className="mt-6 text-xl font-black">A strong listing includes</h3><ul className="mt-5 space-y-4 text-sm leading-6 text-slate-300"><li>✓ A specific, searchable role title</li><li>✓ Clear responsibilities and outcomes</li><li>✓ The work location or arrangement</li><li>✓ A realistic application deadline</li><li>✓ Skills students can develop</li></ul></aside>
    </div>
  </DashboardLayout>;
}
export default InternshipForm;
