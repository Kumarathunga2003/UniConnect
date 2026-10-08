import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Alert, LoadingState } from "../components/Ui";
import api from "../api/axios";
import { getErrorMessage } from "../utils/errors";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [internships, setInternships] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const [statsResponse, usersResponse, internshipsResponse] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/users"),
        api.get("/internships"),
      ]);
      setStats(statsResponse.data);
      setUsers(usersResponse.data);
      setInternships(internshipsResponse.data);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load administration data."));
    }
  };

  useEffect(() => { load(); }, []);

  const toggle = async (user) => {
    try {
      await api.put(`/admin/users/${user.id}/active`, { active: !user.active });
      await load();
    } catch (err) {
      setError(getErrorMessage(err, "Unable to update user."));
    }
  };

  const removeInternship = async (id) => {
    if (!window.confirm("Remove this internship from UniConnect?")) return;
    try {
      await api.delete(`/admin/internships/${id}`);
      await load();
    } catch (err) {
      setError(getErrorMessage(err, "Unable to remove internship."));
    }
  };

  return (
    <DashboardLayout role="ADMIN" title="Platform Overview">
      {error && <Alert>{error}</Alert>}
      {!stats ? <LoadingState /> : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-5">
            {[
              ["Users", stats.users],
              ["Students", stats.students],
              ["Companies", stats.companies],
              ["Internships", stats.internships],
              ["Applications", stats.applications],
            ].map(([label, value], index) => (
              <div key={label} className={index === 4 ? "col-span-2 xl:col-span-1" : ""}>
                <Stat label={label} value={value} />
              </div>
            ))}
          </div>

          <section className="mt-7 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <Header title="User management" text="Review accounts and control platform access." />

            <div className="divide-y divide-slate-200 md:hidden">
              {users.map((user) => (
                <article key={user.id} className="p-5">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-indigo-50 font-black text-indigo-600">
                      {(user.fullName || "U")[0].toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="break-words font-bold">{user.fullName}</p>
                      <p className="break-all text-sm text-slate-500">{user.email}</p>
                    </div>
                    <Status active={user.active} />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3 text-sm">
                    <div><p className="text-xs text-slate-400">Role</p><p className="mt-1 font-bold text-indigo-600">{user.role}</p></div>
                    <div><p className="text-xs text-slate-400">Joined</p><p className="mt-1 font-bold">{new Date(user.createdAt).toLocaleDateString()}</p></div>
                  </div>
                  {user.role !== "ADMIN" && (
                    <button type="button" onClick={() => toggle(user)} className="btn-secondary mt-4 w-full">
                      {user.active ? "Disable account" : "Restore account"}
                    </button>
                  )}
                </article>
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr><th className="px-6 py-4">User</th><th className="px-6 py-4">Role</th><th className="px-6 py-4">Joined</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Action</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4"><p className="font-bold">{user.fullName}</p><p className="text-sm text-slate-500">{user.email}</p></td>
                      <td className="px-6 py-4 font-bold text-indigo-600">{user.role}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4"><Status active={user.active} /></td>
                      <td className="px-6 py-4 text-right">{user.role !== "ADMIN" && <button type="button" onClick={() => toggle(user)} className="btn-secondary">{user.active ? "Disable" : "Restore"}</button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-7 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <Header title="Internship moderation" text="Review and remove inappropriate or outdated opportunities." />
            <div className="divide-y divide-slate-200">
              {internships.map((item) => (
                <div key={item.id} className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
                  <div className="min-w-0"><p className="break-words font-black">{item.title}</p><p className="mt-1 break-words text-sm text-slate-500">{item.companyName} · {item.location || "No location"}</p></div>
                  <button type="button" onClick={() => removeInternship(item.id)} className="min-h-11 w-full rounded-xl bg-red-50 px-4 py-2.5 text-sm font-black text-red-700 sm:w-auto">Remove</button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </DashboardLayout>
  );
}

function Stat({ label, value }) {
  return <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><p className="text-[10px] font-black uppercase tracking-wider text-slate-400 sm:text-xs">{label}</p><p className="mt-2 text-2xl font-black text-indigo-600 sm:text-3xl">{value}</p></div>;
}

function Header({ title, text }) {
  return <div className="border-b border-slate-200 p-5 sm:p-6"><h2 className="text-xl font-black">{title}</h2><p className="mt-1 text-sm text-slate-500">{text}</p></div>;
}

function Status({ active }) {
  return <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-black sm:text-xs ${active ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{active ? "ACTIVE" : "DISABLED"}</span>;
}

export default AdminDashboard;
