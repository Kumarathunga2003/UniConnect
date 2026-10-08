import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function StudentProfile() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await api.get("/students/profile");
                setProfile(response.data);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Unable to load your student profile."
                );
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <p className="text-lg text-gray-600">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
                <button
                    type="button"
                    onClick={() => navigate("/student/dashboard")}
                    className="mb-6 text-blue-600 hover:underline"
                >
                    ← Back to Dashboard
                </button>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Student Profile
                    </h1>

                    <button
                        type="button"
                        onClick={() => navigate("/student/profile/edit")}
                        className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
                    >
                        Edit Profile
                    </button>
                </div>

                {error && (
                    <p className="mt-6 rounded-lg bg-red-100 p-4 text-red-700">
                        {error}
                    </p>
                )}

                {profile && (
                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        <ProfileItem label="Email" value={profile.email} />

                        <ProfileItem
                            label="University"
                            value={profile.university}
                        />

                        <ProfileItem
                            label="Degree Program"
                            value={profile.degreeProgram}
                        />

                        <ProfileItem
                            label="Graduation Year"
                            value={profile.graduationYear}
                        />

                        <ProfileItem label="Phone" value={profile.phone} />

                        <div className="md:col-span-2">
                            <ProfileItem label="Bio" value={profile.bio} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ProfileItem({ label, value }) {
    return (
        <div>
            <p className="text-sm font-semibold uppercase text-gray-500">
                {label}
            </p>

            <p className="mt-1 text-lg text-gray-800">
                {value || "Not provided"}
            </p>
        </div>
    );
}

export default StudentProfile;