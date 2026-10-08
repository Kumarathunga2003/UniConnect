import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function EditStudentProfile() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        university: "",
        degreeProgram: "",
        graduationYear: "",
        phone: "",
        bio: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await api.get("/students/profile");
                const profile = response.data;

                setFormData({
                    university: profile.university || "",
                    degreeProgram: profile.degreeProgram || "",
                    graduationYear: profile.graduationYear || "",
                    phone: profile.phone || "",
                    bio: profile.bio || "",
                });
            } catch (err) {
                // A new student may not have a profile yet; the same form creates it.
                if (err.response?.status !== 400 && err.response?.status !== 404) {
                    setError(err.response?.data?.message || "Unable to load your profile.");
                }
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");

        try {
            await api.put("/students/profile", {
                ...formData,
                graduationYear: formData.graduationYear ? Number(formData.graduationYear) : null,
            });

            navigate("/student/profile");
        } catch (err) {
            setError(
                err.response?.data?.message || "Unable to update your profile."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow">
                <button
                    type="button"
                    onClick={() => navigate("/student/profile")}
                    className="mb-6 text-blue-600 hover:underline"
                >
                    ← Back to Profile
                </button>

                <h1 className="text-3xl font-bold text-gray-800">
                    Edit Student Profile
                </h1>

                {error && (
                    <p className="mt-4 rounded-lg bg-red-100 p-3 text-red-700">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <ProfileInput
                        label="University"
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                    />

                    <ProfileInput
                        label="Degree Program"
                        name="degreeProgram"
                        value={formData.degreeProgram}
                        onChange={handleChange}
                    />

                    <ProfileInput
                        label="Graduation Year"
                        name="graduationYear"
                        type="number"
                        value={formData.graduationYear}
                        onChange={handleChange}
                    />

                    <ProfileInput
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Bio
                        </label>

                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows="4"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}

function ProfileInput({
                          label,
                          name,
                          value,
                          onChange,
                          type = "text",
                      }) {
    return (
        <div>
            <label className="mb-2 block font-medium text-gray-700">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
        </div>
    );
}

export default EditStudentProfile;
