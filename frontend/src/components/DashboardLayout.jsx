import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import BrandLogo, { BrandMark } from "./BrandLogo";
import api from "../api/axios";

const studentLinks = [
  ["Dashboard", "/student/dashboard", "home"],
  ["Profile", "/student/profile", "user"],
  ["Education & Skills", "/student/portfolio", "award"],
  ["Internships", "/student/internships", "briefcase"],
  ["Saved", "/student/saved", "bookmark"],
  ["Applications", "/student/applications", "check"],
  ["My CV", "/student/cv", "file"],
  ["Notifications", "/student/notifications", "bell"],
  ["Settings", "/student/settings", "settings"],
];

const companyLinks = [
  ["Dashboard", "/company/dashboard", "home"],
  ["Company Profile", "/company/profile", "building"],
  ["Internships", "/company/internships", "briefcase"],
  ["Applications", "/company/applications", "check"],
  ["Notifications", "/company/notifications", "bell"],
  ["Settings", "/company/settings", "settings"],
];

const adminLinks = [
  ["Overview", "/admin/dashboard", "home"],
  ["Notifications", "/admin/notifications", "bell"],
  ["Settings", "/admin/settings", "settings"],
];

function DashboardLayout({ role, title, children }) {
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = role === "ADMIN" ? adminLinks : role === "COMPANY" ? companyLinks : studentLinks;
  const fullName = localStorage.getItem("fullName") || (role === "ADMIN" ? "Administrator" : role === "COMPANY" ? "Company" : "Student");
  const email = localStorage.getItem("email") || "";
  const initials = fullName.split(" ").filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase();
  const notificationPath = role === "ADMIN" ? "/admin/notifications" : role === "COMPANY" ? "/company/notifications" : "/student/notifications";

  useEffect(() => {
    api.get("/notifications/unread-count")
      .then(({ data }) => setUnread(data.count))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const logout = () => {
    ["token", "role", "email", "userId", "fullName"].forEach((key) => localStorage.removeItem(key));
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900 lg:grid lg:grid-cols-[264px_1fr]">
      <DesktopSidebar links={links} fullName={fullName} email={email} initials={initials} />

      {menuOpen && (
        <MobileDrawer
          links={links}
          fullName={fullName}
          email={email}
          initials={initials}
          onClose={() => setMenuOpen(false)}
          onLogout={logout}
        />
      )}

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex min-h-16 items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-6 sm:py-3 lg:px-8 lg:py-4">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
              >
                <MenuIcon />
              </button>
              <div className="lg:hidden"><BrandMark className="h-10 w-10" /></div>
              <div className="hidden min-w-0 lg:block">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-indigo-600">
                  {role === "ADMIN" ? "Platform administration" : role === "COMPANY" ? "Employer workspace" : "Student workspace"}
                </p>
                <p className="text-sm text-slate-500">
                  {role === "ADMIN" ? "Keep UniConnect safe, active, and useful." : role === "COMPANY" ? "Find the talent that moves your business forward." : "Build your future, one opportunity at a time."}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => navigate(notificationPath)}
                className="relative grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm"
                aria-label="Notifications"
              >
                <NavIcon name="bell" />
                {unread > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </button>
              <ThemeToggle compact />
              <button
                type="button"
                onClick={logout}
                className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:flex sm:w-auto sm:px-4 sm:text-sm sm:font-bold"
                aria-label="Sign out"
              >
                <LogoutIcon />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </header>

        <main className="page-enter mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-9">
          {title && (
            <div className="mb-5 sm:mb-7">
              <h1 className="break-words text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
              <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-400" />
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

function DesktopSidebar({ links, fullName, email, initials }) {
  return (
    <aside className="sticky top-0 hidden h-screen border-r border-white/10 bg-[#111936] text-white lg:block">
      <div className="flex h-full flex-col">
        <div className="px-6 py-6"><BrandLogo light /></div>
        <Navigation links={links} className="flex-1 overflow-y-auto px-4 pb-4 pt-5" />
        <div className="border-t border-white/10 p-4"><UserCard fullName={fullName} email={email} initials={initials} /></div>
      </div>
    </aside>
  );
}

function MobileDrawer({ links, fullName, email, initials, onClose, onLogout }) {
  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <button type="button" className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} aria-label="Close navigation menu" />
      <aside id="mobile-navigation" className="mobile-drawer relative flex h-full w-[min(86vw,320px)] flex-col bg-[#111936] text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <BrandLogo light compact />
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white" aria-label="Close navigation menu">
            <CloseIcon />
          </button>
        </div>
        <div className="px-4 pt-4"><UserCard fullName={fullName} email={email} initials={initials} /></div>
        <Navigation links={links} onNavigate={onClose} className="flex-1 overflow-y-auto px-4 py-4" />
        <div className="border-t border-white/10 p-4">
          <button type="button" onClick={onLogout} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white">
            <LogoutIcon /> Sign out
          </button>
        </div>
      </aside>
    </div>
  );
}

function Navigation({ links, className, onNavigate }) {
  return (
    <nav className={`flex flex-col gap-2 ${className}`}>
      {links.map(([label, path, icon]) => (
        <NavLink
          key={path}
          to={path}
          onClick={onNavigate}
          className={({ isActive }) => `group flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-white text-indigo-700 shadow-lg shadow-black/15" : "text-slate-300 hover:bg-white/8 hover:text-white"}`}
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 group-hover:bg-white/15"><NavIcon name={icon} /></span>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function UserCard({ fullName, email, initials }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/6 p-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-indigo-500 text-sm font-bold">{initials}</div>
      <div className="min-w-0"><p className="truncate text-sm font-bold">{fullName}</p><p className="truncate text-xs text-slate-400">{email}</p></div>
    </div>
  );
}

function MenuIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}

function CloseIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

function LogoutIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17l5-5-5-5M15 12H3M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" /></svg>;
}

function NavIcon({ name }) {
  const paths = {
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    award: <><circle cx="12" cy="9" r="6"/><path d="m8 14-2 7 6-3 6 3-2-7"/><path d="m10 9 1.3 1.3L14.5 7"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"/></>,
    building: <><path d="M4 21V4h11v17M15 9h5v12M8 8h3M8 12h3M8 16h3"/><path d="M2 21h20"/></>,
    check: <><path d="M9 11.5 11 14l4.5-5"/><rect x="3" y="3" width="18" height="18" rx="4"/></>,
    bookmark: <path d="M6 3h12v18l-6-4-6 4V3Z"/>,
    file: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM12 2v3M12 19v3M2 12h3M19 12h3"/></>,
  };
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default DashboardLayout;
