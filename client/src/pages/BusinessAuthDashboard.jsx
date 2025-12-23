import { useState } from "react";
import { Building2, LogIn, UserPlus } from "lucide-react";

export default function BusinessAuthDashboard() {
  const [mode, setMode] = useState("login"); // login | register

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950 text-white px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left branding panel */}
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-emerald-600/20 flex items-center justify-center">
                <Building2 className="text-emerald-400" />
              </div>
              <h1 className="text-2xl font-semibold">Foodwise for Business</h1>
            </div>

            <p className="text-zinc-400 leading-relaxed">
              Turn surplus food into revenue. Reach nearby customers and reduce food waste — all from one simple dashboard.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-zinc-300">
              <li>• List surplus meals & deals</li>
              <li>• Track orders in real time</li>
              <li>• Grow your local customer base</li>
            </ul>
          </div>

          <p className="text-xs text-zinc-500 mt-8">© {new Date().getFullYear()} Foodwise</p>
        </div>

        {/* Right auth panel */}
        <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-8">
          {/* Toggle */}
          <div className="flex bg-zinc-800 rounded-xl p-1 mb-8">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition ${
                mode === "login"
                  ? "bg-emerald-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <LogIn size={16} /> Log In
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition ${
                mode === "register"
                  ? "bg-emerald-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <UserPlus size={16} /> Register Business
            </button>
          </div>

          {mode === "login" ? (
            <form className="space-y-5">
              <div>
                <label className="text-sm text-zinc-400">Email</label>
                <input
                  type="email"
                  placeholder="business@email.com"
                  className="mt-1 w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="mt-1 w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button className="w-full rounded-xl bg-emerald-600 py-3 font-medium hover:bg-emerald-500 transition">
                Log In to Dashboard
              </button>
            </form>
          ) : (
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-zinc-400">Business Name</label>
                  <input type="text" placeholder="Tino's Bakery" className="mt-1 w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500" />
                </div>

                <div>
                  <label className="text-sm text-zinc-400">Business Type</label>
                  <input type="text" placeholder="Bakery, Restaurant, Cafe" className="mt-1 w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500" />
                </div>

                <div>
                  <label className="text-sm text-zinc-400">Email</label>
                  <input type="email" placeholder="business@email.com" className="mt-1 w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500" />
                </div>

                <div>
                  <label className="text-sm text-zinc-400">Phone</label>
                  <input type="text" placeholder="+263 7XX XXX XXX" className="mt-1 w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500" />
                </div>

                <div>
                  <label className="text-sm text-zinc-400">Phone 2 (optional)</label>
                  <input type="text" placeholder="Optional" className="mt-1 w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500" />
                </div>

                <div>
                  <label className="text-sm text-zinc-400">Location</label>
                  <input type="text" placeholder="Harare, CBD" className="mt-1 w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500" />
                </div>
              </div>

              <div>
                <label className="text-sm text-zinc-400">Opening Hours</label>
                <input type="text" placeholder="Mon - Sat, 08:00 - 18:00" className="mt-1 w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500" />
              </div>

              <div>
                <label className="text-sm text-zinc-400">Description</label>
                <textarea rows="3" placeholder="Short description of your business" className="mt-1 w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500" />
              </div>

              <div>
                <label className="text-sm text-zinc-400">Password</label>
                <input type="password" placeholder="••••••••" className="mt-1 w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500" />
              </div>

              <button className="w-full rounded-xl bg-emerald-600 py-3 font-medium hover:bg-emerald-500 transition">Create Business Account</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
