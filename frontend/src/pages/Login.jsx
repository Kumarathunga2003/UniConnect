import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL || "http://localhost:8080/api"}/auth/login`,
                {
                    email,
                    password,
                }
            );

            const data = response.data;

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("email", data.email);
            localStorage.setItem("userId", String(data.userId));
            localStorage.setItem("fullName", data.fullName);

            if (data.role === "STUDENT") {
                navigate("/student/dashboard");
            } else if (data.role === "COMPANY") {
                navigate("/company/dashboard");
            } else {
                setError("This user role does not have a dashboard.");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Login failed. Please check your email and password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="text-center text-4xl font-bold text-blue-600">
                    UniConnect
                </h1>

                <p className="mt-2 text-center text-gray-600">
                    Sign in to continue
                </p>

                {location.state?.message && (
                    <p className="mt-5 rounded-lg bg-green-100 p-3 text-green-700">
                        {location.state.message}
                    </p>
                )}

                <form onSubmit={handleLogin} className="mt-8 space-y-5">
                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Email address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    {message && (
                        <p className="rounded-lg bg-green-100 p-3 text-green-700">
                            {message}
                        </p>
                    )}

                    {error && (
                        <p className="rounded-lg bg-red-100 p-3 text-red-700">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    New to UniConnect?{" "}
                    <Link to="/register" className="font-semibold text-blue-600 hover:underline">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
