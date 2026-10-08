import { NavLink, useNavigate } from "react-router-dom";

const studentLinks = [
  ["Dashboard", "/student/dashboard"],
  ["Profile", "/student/profile"],
  ["Education & Skills", "/student/portfolio"],
  ["Internships", "/student/internships"],
  ["Applications", "/student/applications"],
];

const companyLinks = [
  ["Dashboard", "/company/dashboard"],
  ["Company Profile", "/company/profile"],
  ["Internships", "/company/internships"],
  ["Applications", "/company/applications"],
];

function DashboardLayout({ role, title, children }) {
  const navigate = useNavigate();
  const links = role === "COMPANY" ? companyLinks : studentLinks;
  const fullName = localStorage.getItem("fullName") || role;

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <button onClick={() => navigate(links[0][1])} className="text-2xl font-black text-blue-700">
            UniConnect
          </button>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{fullName}</p>
              <p className="text-xs text-slate-500">{role === "COMPANY" ? "Company account" : "Student account"}</p>
            </div>
            <button onClick={logout} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:min-h-[calc(100vh-120px)]">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {links.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main>
          {title && <h1 className="mb-6 text-3xl font-black tracking-tight">{title}</h1>}
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
