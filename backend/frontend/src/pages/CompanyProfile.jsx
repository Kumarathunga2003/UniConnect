import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Alert } from "../components/Ui";
import api from "../api/axios";
import { getErrorMessage } from "../utils/errors";

const empty = { companyName: "", industry: "", website: "", description: "", phone: "" };

function CompanyProfile() {
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => { api.get("/companies/profile").then(({ data }) => setForm({ ...empty, ...data })).catch(() => {}); }, []);
  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setError(""); setMessage("");
    try { const { data } = await api.put("/companies/profile", form); setForm({ ...empty, ...data }); setMessage("Company profile saved successfully."); }
    catch (err) { setError(getErrorMessage(err, "Unable to save company profile.")); }
    finally { setSaving(false); }
  };
  const companyInitial = (form.companyName || localStorage.getItem("fullName") || "C")[0].toUpperCase();

  return <DashboardLayout role="COMPANY" title="Company Profile">
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7"><p className="text-xs font-black uppercase tracking-[.18em] text-indigo-600">Employer identity</p><h2 className="mt-2 text-2xl font-black">Tell students about your company</h2><p className="mt-2 text-sm leading-6 text-slate-500">A complete profile builds trust and helps the right candidates understand your organisation.</p></div>
        {message && <Alert type="success">{message}</Alert>}{error && <Alert>{error}</Alert>}
        <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
          <Field label="Company name" name="companyName" required value={form.companyName} setForm={setForm} form={form} placeholder="Tech Lanka Solutions" />
          <Field label="Industry" name="industry" value={form.industry} setForm={setForm} form={form} placeholder="Information Technology" />
          <Field label="Website" name="website" type="url" value={form.website} setForm={setForm} form={form} placeholder="https://company.lk" />
          <Field label="Phone" name="phone" value={form.phone} setForm={setForm} form={form} placeholder="+94 7X XXX XXXX" />
          <label className="text-sm font-bold text-slate-700 sm:col-span-2">Company overview<textarea rows="6" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe your mission, culture, team, and the work you do..." className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5" /></label>
          <div className="sm:col-span-2"><button disabled={saving} className="btn-primary min-w-40">{saving ? "Saving profile..." : "Save company profile"}</button></div>
        </form>
      </section>
      <aside className="h-fit overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="h-24 bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500" /><div className="p-6"><div className="-mt-14 grid h-20 w-20 place-items-center rounded-2xl border-4 border-white bg-[#111936] text-3xl font-black text-white shadow-lg">{companyInitial}</div><h3 className="mt-4 text-xl font-black">{form.companyName || "Your company"}</h3><p className="mt-1 text-sm font-semibold text-indigo-600">{form.industry || "Industry"}</p><p className="mt-4 text-sm leading-6 text-slate-500">{form.description || "Your company introduction will appear here as you complete the form."}</p><div className="mt-5 border-t border-slate-200 pt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Profile preview</div></div></aside>
    </div>
  </DashboardLayout>;
}

function Field({ label, name, value, form, setForm, type = "text", required = false, placeholder }) {
  return <label className="text-sm font-bold text-slate-700">{label}<input type={type} required={required} value={value || ""} onChange={(e) => setForm({ ...form, [name]: e.target.value })} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5" /></label>;
}
export default CompanyProfile;
