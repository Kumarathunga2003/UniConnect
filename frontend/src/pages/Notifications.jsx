import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { EmptyState, LoadingState } from "../components/Ui";
import api from "../api/axios";
function Notifications() {
  const role = localStorage.getItem("role") || "STUDENT"; const [items, setItems] = useState([]); const [loading, setLoading] = useState(true);
  const load = () => api.get("/notifications").then(({ data }) => setItems(data)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);
  const read = async (id) => { await api.put(`/notifications/${id}/read`); load(); };
  const readAll = async () => { await api.put("/notifications/read-all"); load(); };
  return <DashboardLayout role={role} title="Notifications"><div className="mb-5 flex justify-end"><button onClick={readAll} className="btn-secondary w-full sm:w-auto">Mark all as read</button></div>{loading ? <LoadingState /> : <div className="space-y-3">{items.map((item) => <button key={item.id} onClick={() => read(item.id)} className={`w-full rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 sm:p-5 ${item.read ? "border-slate-200 bg-white" : "border-indigo-200 bg-indigo-50"}`}><div className="flex min-w-0 items-start gap-3 sm:gap-4"><span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.read ? "bg-slate-300" : "bg-indigo-600"}`} /><div className="min-w-0"><h2 className="break-words font-black">{item.title}</h2><p className="mt-1 break-words text-sm leading-6 text-slate-500">{item.message}</p><p className="mt-2 text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</p></div></div></button>)}{!items.length && <EmptyState icon="♢" title="You are all caught up" description="Important application and account updates will appear here." />}</div>}</DashboardLayout>;
}
export default Notifications;
