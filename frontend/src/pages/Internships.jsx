import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Internships() {
    const navigate = useNavigate();

    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadInternships = async () => {
            try {
                const response = await api.get("/internships");

                const internshipData = Array.isArray(response.data)
                    ? response.data
                    : response.data.internships || [];

                setInternships(internshipData);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Unable to load internships."
                );
            } finally {
                setLoading(false);
            }
        };

        loadInternships();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-6xl">
                <button
                    type="button"
                    onClick={() => navigate("/student/dashboard")}
                    className="mb-6 text-blue-600 hover:underline"
                >
                    ← Back to Dashboard
                </button>

                <h1 className="text-3xl font-bold text-gray-800">
                    Available Internships
                </h1>

                <p className="mt-2 text-gray-600">
                    Find an opportunity that matches your career goals.
                </p>

                {loading && (
                    <p className="mt-8 text-gray-600">
                        Loading internships...
                    </p>
                )}

                {error && (
                    <p className="mt-6 rounded-lg bg-red-100 p-4 text-red-700">
                        {error}
                    </p>
                )}

                {!loading && !error && internships.length === 0 && (
                    <p className="mt-8 rounded-xl bg-white p-6 text-gray-600 shadow">
                        No internships are currently available.
                    </p>
                )}

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {internships.map((internship) => (
                        <div
                            key={internship.id}
                            className="rounded-xl bg-white p-6 shadow"
                        >
                            <h2 className="text-2xl font-bold text-gray-800">
                                {internship.title}
                            </h2>

                            <p className="mt-2 font-medium text-blue-600">
                                {internship.companyName || "Company"}
                            </p>

                            <p className="mt-4 text-gray-600">
                                {internship.description || "No description provided."}
                            </p>

                            <div className="mt-5 space-y-2 text-sm text-gray-600">
                                <p>
                                    <span className="font-semibold">Location:</span>{" "}
                                    {internship.location || "Not specified"}
                                </p>

                                <p>
                                    <span className="font-semibold">Type:</span>{" "}
                                    {internship.internshipType || "Not specified"}
                                </p>

                                <p>
                                    <span className="font-semibold">Deadline:</span>{" "}
                                    {internship.deadline || "Not specified"}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(`/student/internships/${internship.id}`)
                                }
                                className="mt-6 rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Internships;