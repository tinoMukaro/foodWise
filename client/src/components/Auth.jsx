import { useState } from "react";
import { signin, signup } from "../services/auth.service.js";

export default function AuthPage() {
  const [mode, setMode] = useState("signin"); // signin | signup
  const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  phone: "",
  role: "user", 
});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        await signup({
            name: form.name,
            email: form.email,
            password: form.password,
            phone: form.phone,
            role: form.role,
        });
      } else {
        await signin({
          email: form.email,
          password: form.password,
        });
        
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="w-full max-w-md bg-white border border-[#8D6E63]/30 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-[#2E7D32] mb-2">
          FoodWise
        </h1>
        <p className="text-center text-[#333333] mb-6">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </p>

        {error && (
          <div className="mb-4 text-sm text-white bg-[#F57C00] px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
            />

             <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
           />
           </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
          />


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2E7D32] hover:bg-[#256628] text-white font-semibold py-2 rounded-lg transition"
          >
            {loading
              ? "Please wait..."
              : mode === "signup"
              ? "Sign Up"
              : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#333333]">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("signin")}
                className="text-[#FF9800] font-medium"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-[#FF9800] font-medium"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
