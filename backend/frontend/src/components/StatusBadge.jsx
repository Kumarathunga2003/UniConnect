const colours = {
  PENDING: "bg-amber-100 text-amber-800 ring-amber-200",
  SHORTLISTED: "bg-blue-100 text-blue-800 ring-blue-200",
  INTERVIEW: "bg-purple-100 text-purple-800 ring-purple-200",
  ACCEPTED: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  REJECTED: "bg-red-100 text-red-800 ring-red-200",
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black tracking-wide ring-1 ring-inset ${colours[status] || "bg-slate-100 text-slate-700 ring-slate-200"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />{(status || "UNKNOWN").replace("_", " ")}
    </span>
  );
}

export default StatusBadge;
