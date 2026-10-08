import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";
import { getErrorMessage } from "../utils/errors";

function InternshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    api.get(`/internships/${id}`).then((response) => setInternship(response.data)).catch((err) => setError(getErrorMessage(err, "Unable to load internship.")));
  }, [id]);

  const apply = async () => {
    setApplying(true);
    setError("");
    try {
      await api.post("/applications", { internshipId: Number(id) });
      setMessage("Application submitted successfully.");
    } catch (err) { setError(getErrorMessage(err, "Unable to apply.")); }
    finally { setApplying(false); }
  };

  return (
    <DashboardLayout role="STUDENT" title="Internship Details">
      <button onClick={() => navigate("/student/internships")} className="mb-5 font-semibold text-blue-600">← Back to internships</button>
      {error && <p className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
      {message && <p className="mb-5 rounded-xl bg-emerald-50 p-4 text-emerald-700">{message}</p>}
      {!internship && !error && <p>Loading...</p>}
      {internship && <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><h2 className="text-3xl font-black">{internship.title}</h2><p className="mt-2 text-lg font-semibold text-blue-700">{internship.companyName}</p></div>
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">{internship.internshipType}</span>
        </div>
        <div className="mt-7 grid gap-4 rounded-xl bg-slate-50 p-5 sm:grid-cols-2"><p><b>Location:</b> {internship.location || "Not specified"}</p><p><b>Deadline:</b> {internship.deadline || "Not specified"}</p></div>
        <h3 className="mt-7 text-lg font-bold">Description</h3><p className="mt-2 whitespace-pre-wrap leading-7 text-slate-600">{internship.description || "No description provided."}</p>
        <button disabled={applying || Boolean(message)} onClick={apply} className="mt-8 rounded-xl bg-blue-600 px-7 py-3 font-bold text-white disabled:opacity-60">{message ? "Applied" : applying ? "Applying..." : "Apply Now"}</button>
      </article>}
    </DashboardLayout>
  );
}

export default InternshipDetails;
