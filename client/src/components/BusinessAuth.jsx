import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, LogIn, UserPlus } from "lucide-react";
import { signup, signin } from "../services/business.service.js";

export default function BusinessAuthDashboard() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // login | register
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    type: "",
    email: "",
    password: "",
    phone: "",
    phone2: "",
    location: "",
    openingHours: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        await signup(form);
        navigate("/businessDashboard");
      } else {
        await signin({
          email: form.email,
          password: form.password,
        });
        navigate("/businessDashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950 text-white px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left panel */}
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-emerald-600/20 flex items-center justify-center">
                <Building2 className="text-emerald-400" />
              </div>
              <h1 className="text-2xl font-semibold">Foodwise for Business</h1>
            </div>
            <p className="text-zinc-400">
              Turn surplus food into revenue and reach nearby customers.
            </p>
          </div>
          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} Foodwise</p>
        </div>

        {/* Right panel */}
        <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-8">
          {/* Toggle */}
          <div className="flex bg-zinc-800 rounded-xl p-1 mb-6">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition ${
                mode === "login" ? "bg-emerald-600" : "text-zinc-400"
              }`}
            >
              <LogIn size={16} /> Log In
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition ${
                mode === "register" ? "bg-emerald-600" : "text-zinc-400"
              }`}
            >
              <UserPlus size={16} /> Register
            </button>
          </div>

          {error && (
            <div className="mb-4 text-sm rounded-lg bg-red-500/10 text-red-400 px-4 py-2 border border-red-500/30">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["name", "Business Name"],
                  ["type", "Business Type"],
                  ["phone", "Phone"],
                  ["phone2", "Phone 2 (optional)"],
                  ["location", "Location"],
                ].map(([key, label]) => (
                  <input
                    key={key}
                    name={key}
                    placeholder={label}
                    value={form[key]}
                    onChange={handleChange}
                    className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500"
                  />
                ))}
              </div>
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500"
            />

            {mode === "register" && (
              <>
                <input
                  name="openingHours"
                  placeholder="Opening Hours"
                  value={form.openingHours}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500"
                />
                <textarea
                  name="description"
                  placeholder="Business description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500"
                />
              </>
            )}

            <button
              disabled={loading}
              className="w-full rounded-xl bg-emerald-600 py-3 font-medium hover:bg-emerald-500 transition"
            >
              {loading ? "Please wait..." : mode === "register" ? "Create Business Account" : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
