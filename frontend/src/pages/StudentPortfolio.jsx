import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";
import { getErrorMessage } from "../utils/errors";

const emptyEducation = { institution: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "" };

function StudentPortfolio() {
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillText, setSkillText] = useState("");
  const [form, setForm] = useState(emptyEducation);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const [educationResponse, skillsResponse] = await Promise.all([
        api.get("/students/education"),
        api.get("/students/skills"),
      ]);
      setEducation(educationResponse.data);
      setSkills(skillsResponse.data.skills || []);
      setSkillText((skillsResponse.data.skills || []).join(", "));
    } catch (err) {
      setError(getErrorMessage(err, "Create your student profile before adding education and skills."));
    }
  };

  useEffect(() => { load(); }, []);

  const saveEducation = async (event) => {
    event.preventDefault();
    setError("");
    const payload = { ...form, endDate: form.endDate || null, startDate: form.startDate || null };
    try {
      if (editingId) await api.put(`/students/education/${editingId}`, payload);
      else await api.post("/students/education", payload);
      setForm(emptyEducation);
      setEditingId(null);
      setMessage("Education saved successfully.");
      await load();
    } catch (err) { setError(getErrorMessage(err, "Unable to save education.")); }
  };

  const editEducation = (item) => {
    setEditingId(item.id);
    setForm({ institution: item.institution || "", degree: item.degree || "", fieldOfStudy: item.fieldOfStudy || "", startDate: item.startDate || "", endDate: item.endDate || "" });
  };

  const deleteEducation = async (id) => {
    if (!window.confirm("Delete this education record?")) return;
    try { await api.delete(`/students/education/${id}`); await load(); }
    catch (err) { setError(getErrorMessage(err, "Unable to delete education.")); }
  };

  const saveSkills = async () => {
    const values = skillText.split(",").map((item) => item.trim()).filter(Boolean);
    try {
      const response = await api.put("/students/skills", { skills: values });
      setSkills(response.data.skills || values);
      setMessage("Skills saved successfully.");
    } catch (err) { setError(getErrorMessage(err, "Unable to save skills.")); }
  };

  return (
    <DashboardLayout role="STUDENT" title="Education & Skills">
      {message && <p className="mb-5 rounded-xl bg-emerald-50 p-4 text-emerald-700">{message}</p>}
      {error && <p className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Skills</h2>
        <p className="mt-1 text-sm text-slate-500">Enter skills separated by commas.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input value={skillText} onChange={(e) => setSkillText(e.target.value)} placeholder="Java, React, MySQL" className="flex-1 rounded-xl border border-slate-300 px-4 py-3" />
          <button onClick={saveSkills} className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white">Save Skills</button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">{skills.map((skill) => <span key={skill} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">{skill}</span>)}</div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">{editingId ? "Edit education" : "Add education"}</h2>
        <form onSubmit={saveEducation} className="mt-5 grid gap-4 sm:grid-cols-2">
          {[["Institution", "institution"], ["Degree", "degree"], ["Field of study", "fieldOfStudy"]].map(([label, name]) => (
            <label key={name} className="text-sm font-semibold text-slate-700">{label}<input required={name === "institution"} value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
          ))}
          <label className="text-sm font-semibold text-slate-700">Start date<input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
          <label className="text-sm font-semibold text-slate-700">End date<input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
          <div className="flex gap-3 sm:col-span-2">
            <button className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white">{editingId ? "Update" : "Add"}</button>
            {editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyEducation); }} className="rounded-xl border px-6 py-3 font-bold">Cancel</button>}
          </div>
        </form>
        <div className="mt-7 space-y-3">
          {education.map((item) => <div key={item.id} className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center"><div><h3 className="font-bold">{item.degree || "Education"} — {item.institution}</h3><p className="text-sm text-slate-500">{item.fieldOfStudy || "Field not specified"} · {item.startDate || "?"} to {item.endDate || "Present"}</p></div><div className="flex gap-2"><button onClick={() => editEducation(item)} className="rounded-lg border px-3 py-2 text-sm font-semibold">Edit</button><button onClick={() => deleteEducation(item.id)} className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">Delete</button></div></div>)}
          {!education.length && <p className="text-slate-500">No education records yet.</p>}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default StudentPortfolio;
