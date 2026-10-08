const colours = {
  PENDING: "bg-amber-100 text-amber-800",
  SHORTLISTED: "bg-blue-100 text-blue-800",
  INTERVIEW: "bg-purple-100 text-purple-800",
  ACCEPTED: "bg-emerald-100 text-emerald-800",
  REJECTED: "bg-red-100 text-red-800",
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${colours[status] || "bg-slate-100 text-slate-700"}`}>
      {status || "UNKNOWN"}
    </span>
  );
}

export default StatusBadge;
