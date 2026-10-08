export function PageIntro({ eyebrow, title, description, action }) {
  return <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-black uppercase tracking-[.2em] text-indigo-600">{eyebrow}</p><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h1>{description && <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">{description}</p>}</div>{action}</div>;
}

export function EmptyState({ icon = "✦", title, description, action }) {
  return <div className="empty-state"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-indigo-50 text-2xl text-indigo-600">{icon}</div><h3 className="mt-4 text-lg font-black text-slate-800">{title}</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>{action && <div className="mt-5">{action}</div>}</div>;
}

export function Alert({ type = "error", children }) {
  const styles = type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : type === "warning" ? "border-amber-200 bg-amber-50 text-amber-800" : "border-red-200 bg-red-50 text-red-700";
  return <div className={`mb-6 rounded-2xl border p-4 text-sm font-semibold ${styles}`}>{children}</div>;
}

export function LoadingState({ label = "Loading..." }) {
  return <div className="skeleton-card flex items-center gap-4"><span className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" /><span className="font-semibold">{label}</span></div>;
}
