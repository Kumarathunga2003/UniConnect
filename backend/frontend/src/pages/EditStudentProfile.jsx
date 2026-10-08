import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";

const empty = { university: "", degreeProgram: "", graduationYear: "", phone: "", bio: "" };

function EditStudentProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { api.get("/students/profile").then(({ data }) => setForm({ ...empty, ...data })).catch((err) => { if (![400, 404].includes(err.response?.status)) setError("Unable to load your profile."); }).finally(() => setLoading(false)); }, []);
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setError("");
    try { await api.put("/students/profile", { ...form, graduationYear: form.graduationYear ? Number(form.graduationYear) : null }); navigate("/student/profile"); }
    catch (err) { setError(err.response?.data?.message || "Unable to update your profile."); }
    finally { setSaving(false); }
  };

  return <DashboardLayout role="STUDENT" title="Edit Profile">
    <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7"><h2 className="text-xl font-black">Personal and academic details</h2><p className="mt-1 text-sm text-slate-500">Keep this information accurate so companies can understand your background.</p></div>
        {error && <p className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
        {loading ? <p className="text-slate-500">Loading profile...</p> : <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
          <Field label="University" name="university" value={form.university} onChange={change} placeholder="NSBM Green University" />
          <Field label="Degree programme" name="degreeProgram" value={form.degreeProgram} onChange={change} placeholder="BSc in Computer Science" />
          <Field label="Graduation year" name="graduationYear" type="number" value={form.graduationYear} onChange={change} placeholder="2027" />
          <Field label="Phone number" name="phone" value={form.phone} onChange={change} placeholder="+94 7X XXX XXXX" />
          <label className="text-sm font-bold text-slate-700 sm:col-span-2">Professional bio<textarea name="bio" value={form.bio} onChange={change} rows="5" placeholder="Write a short introduction about yourself, your interests, and career goals..." className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5" /></label>
          <div className="flex flex-wrap gap-3 pt-2 sm:col-span-2"><button disabled={saving} className="btn-primary">{saving ? "Saving..." : "Save changes"}</button><button type="button" onClick={() => navigate("/student/profile")} className="btn-secondary">Cancel</button></div>
        </form>}
      </section>
      <aside className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 p-7 text-white shadow-xl shadow-indigo-200/40"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-2xl">✦</div><h3 className="mt-6 text-xl font-black">Make your profile stand out</h3><ul className="mt-5 space-y-4 text-sm leading-6 text-indigo-100"><li>✓ Use your official university name</li><li>✓ Add a reachable phone number</li><li>✓ Keep your bio clear and professional</li><li>✓ Update your expected graduation year</li></ul></aside>
    </div>
  </DashboardLayout>;
}

function Field({ label, name, value, onChange, type = "text", placeholder }) {
  return <label className="text-sm font-bold text-slate-700">{label}<input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5" /></label>;
}
export default EditStudentProfile;
