import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";

function StudentProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/students/profile").then((response) => setProfile(response.data)).catch((err) => setError(err.response?.data?.message || "Complete your profile to introduce yourself to companies.")).finally(() => setLoading(false));
  }, []);

  const fullName = localStorage.getItem("fullName") || "Student";
  const email = profile?.email || localStorage.getItem("email") || "";
  const initials = fullName.split(" ").filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase();

  return <DashboardLayout role="STUDENT" title="My Profile">
    {loading ? <div className="skeleton-card">Loading your profile...</div> : <>
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="h-28 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500" />
        <div className="px-6 pb-7 sm:px-8">
          <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex min-w-0 items-end gap-3 sm:gap-4"><div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border-4 border-white bg-[#111936] text-xl font-black text-white shadow-xl sm:h-24 sm:w-24 sm:rounded-3xl sm:text-2xl">{initials}</div><div className="min-w-0 pb-1"><h2 className="truncate text-xl font-black sm:text-2xl">{fullName}</h2><p className="break-all text-sm text-slate-500">{email}</p></div></div>
            <button onClick={() => navigate("/student/profile/edit")} className="btn-primary w-full sm:w-auto">✎ Edit profile</button>
          </div>
        </div>
      </section>

      {error && <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-800"><p className="font-bold">Your profile needs attention</p><p className="mt-1 text-sm">{error}</p><button onClick={() => navigate("/student/profile/edit")} className="mt-4 min-h-11 w-full rounded-xl bg-amber-600 px-4 py-2 text-sm font-bold text-white sm:w-auto">Create profile</button></div>}

      {profile && <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <ProfileItem icon="◆" label="University" value={profile.university} />
        <ProfileItem icon="▣" label="Degree programme" value={profile.degreeProgram} />
        <ProfileItem icon="◎" label="Graduation year" value={profile.graduationYear} />
        <ProfileItem icon="◈" label="Phone" value={profile.phone} />
        <div className="sm:col-span-2"><ProfileItem icon="✦" label="Professional bio" value={profile.bio} /></div>
      </div>}
    </>}
  </DashboardLayout>;
}

function ProfileItem({ icon, label, value }) {
  return <article className="group h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"><div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 font-bold text-indigo-600">{icon}</div><p className="text-xs font-bold uppercase tracking-[.14em] text-slate-400">{label}</p><p className="mt-2 text-base font-bold text-slate-800">{value || "Not provided"}</p></article>;
}
export default StudentProfile;
