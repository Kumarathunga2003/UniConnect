import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getErrorMessage } from "../utils/errors";
import ThemeToggle from "../components/ThemeToggle";
import BrandLogo from "../components/BrandLogo";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", role: "STUDENT" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setError(""); setSaving(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
      await axios.post(`${apiUrl}/auth/register`, form);
      navigate("/", { state: { message: "Registration successful. You can now sign in." } });
    } catch (err) { setError(getErrorMessage(err, "Registration failed.")); }
    finally { setSaving(false); }
  };

  return <div className="auth-grid min-h-screen px-3 py-6 sm:px-8 sm:py-10">
    <div className="fixed right-5 top-5 z-30"><ThemeToggle compact /></div>
    <div className="page-enter mx-auto max-w-2xl rounded-3xl border border-white/20 bg-white p-5 shadow-2xl sm:p-10">
      <Link to="/"><BrandLogo /></Link>
      <div className="mt-8"><p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Join the network</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Create your account</h1><p className="mt-3 text-slate-500">Start connecting with the right opportunities and talent.</p></div>
      {error && <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      <form onSubmit={submit} className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Full name" value={form.fullName} onChange={(value) => setForm({ ...form, fullName: value })} extra="sm:col-span-2" />
        <Field label="Email address" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
        <Field label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} />
        <label className="text-sm font-bold text-slate-700 sm:col-span-2">I am joining as<select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5"><option value="STUDENT">Student looking for opportunities</option><option value="COMPANY">Company looking for talent</option></select></label>
        <button disabled={saving} className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 disabled:opacity-60 sm:col-span-2">{saving ? "Creating account..." : "Create account"}</button>
      </form>
      <p className="mt-7 text-center text-sm text-slate-500">Already registered? <Link to="/" className="font-bold text-indigo-600">Sign in</Link></p>
    </div>
  </div>;
}

function Field({ label, type = "text", value, onChange, extra = "" }) {
  return <label className={`text-sm font-bold text-slate-700 ${extra}`}>{label}<input required type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5" /></label>;
}
export default Register;
