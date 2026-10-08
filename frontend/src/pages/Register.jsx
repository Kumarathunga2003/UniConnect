import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getErrorMessage } from "../utils/errors";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", role: "STUDENT" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
      await axios.post(`${apiUrl}/auth/register`, form);
      navigate("/", { state: { message: "Registration successful. You can now sign in." } });
    } catch (err) {
      setError(getErrorMessage(err, "Registration failed."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-5">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-center text-4xl font-black text-blue-700">UniConnect</h1>
        <p className="mt-2 text-center text-slate-500">Create your account</p>
        {error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <form onSubmit={submit} className="mt-6 space-y-4">
          <Field label="Full name" value={form.fullName} onChange={(value) => setForm({ ...form, fullName: value })} />
          <Field label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
          <Field label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} />
          <label className="block text-sm font-semibold text-slate-700">
            Account type
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3">
              <option value="STUDENT">Student</option>
              <option value="COMPANY">Company</option>
            </select>
          </label>
          <button disabled={saving} className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-700 disabled:opacity-60">
            {saving ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">Already registered? <Link to="/" className="font-bold text-blue-600">Sign in</Link></p>
      </div>
    </div>
  );
}

function Field({ label, type = "text", value, onChange }) {
  return <label className="block text-sm font-semibold text-slate-700">{label}<input required type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500" /></label>;
}

export default Register;
