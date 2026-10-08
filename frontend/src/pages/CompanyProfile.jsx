import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";
import { getErrorMessage } from "../utils/errors";

const empty = { companyName: "", industry: "", website: "", description: "", phone: "" };

function CompanyProfile() {
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/companies/profile").then((response) => setForm({ ...empty, ...response.data })).catch(() => {});
  }, []);

  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setError(""); setMessage("");
    try { const response = await api.put("/companies/profile", form); setForm({ ...empty, ...response.data }); setMessage("Company profile saved successfully."); }
    catch (err) { setError(getErrorMessage(err, "Unable to save company profile.")); }
    finally { setSaving(false); }
  };

  return <DashboardLayout role="COMPANY" title="Company Profile">
    <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      {message && <p className="mb-5 rounded-xl bg-emerald-50 p-4 text-emerald-700">{message}</p>}
      {error && <p className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
      <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
        {[["Company name", "companyName", true], ["Industry", "industry", false], ["Website", "website", false], ["Phone", "phone", false]].map(([label, name, required]) => <label key={name} className="text-sm font-semibold text-slate-700">{label}<input required={required} value={form[name] || ""} onChange={(e) => setForm({ ...form, [name]: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>)}
        <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Description<textarea rows="5" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
        <button disabled={saving} className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white sm:col-span-2">{saving ? "Saving..." : "Save Profile"}</button>
      </form>
    </div>
  </DashboardLayout>;
}

export default CompanyProfile;
