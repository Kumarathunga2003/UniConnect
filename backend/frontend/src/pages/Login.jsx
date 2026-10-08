import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ThemeToggle from "../components/ThemeToggle";
import BrandLogo from "../components/BrandLogo";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
      const { data } = await axios.post(`${baseUrl}/auth/login`, { email, password });
      ["token", "role", "email", "fullName"].forEach((key) => localStorage.setItem(key, data[key]));
      localStorage.setItem("userId", String(data.userId));
      if (data.role === "STUDENT") navigate("/student/dashboard");
      else if (data.role === "COMPANY") navigate("/company/dashboard");
      else if (data.role === "ADMIN") navigate("/admin/dashboard");
      else setError("This user role does not have a dashboard.");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your email and password.");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-grid min-h-screen lg:grid lg:grid-cols-[1.08fr_.92fr]">
      <div className="fixed right-5 top-5 z-30"><ThemeToggle compact /></div>
      <section className="soft-grid relative hidden overflow-hidden p-14 text-white lg:flex lg:flex-col lg:justify-between">
        <BrandLogo light />
        <div className="max-w-xl">
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-indigo-100">Your career starts here</span>
          <h1 className="mt-7 text-5xl font-black leading-[1.08] tracking-tight xl:text-6xl">Connect talent with opportunity.</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">Build your professional profile, discover internships, and take the next step in your career, all in one place.</p>
        </div>
        <p className="text-sm text-slate-400">© 2026 UniConnect · Built for tomorrow’s professionals</p>
      </section>

      <section className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-10">
        <div className="page-enter w-full max-w-md">
          <div className="mb-10 lg:hidden"><BrandLogo /></div>
          <p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Welcome back</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900">Sign in to your account</h2>
          <p className="mt-3 text-slate-500">Enter your details to continue to your workspace.</p>
          {location.state?.message && <p className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">{location.state.message}</p>}
          {error && <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">{error}</p>}
          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <Field label="Email address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
            <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="Enter your password" />
            <button disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}</button>
          </form>
          <p className="mt-7 text-center text-sm text-slate-500">New to UniConnect? <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-800">Create an account</Link></p>
        </div>
      </section>
    </div>
  );
}

function Field({ label, type, value, onChange, placeholder }) {
  return <label className="block text-sm font-bold text-slate-700">{label}<input required type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400" /></label>;
}

export default Login;
