import { LayoutGrid, Package, ClipboardList, LogOut, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getMe } from "../services/business.service.js";
import { getBusinessDeals } from "../services/deal.service.js";
import { Link } from "react-router-dom";

export default function BusinessDashboard() {

   const [business, setBusiness] = useState(null);
   const [deals, setDeals] = useState([]);

  useEffect(() => {
    getMe()
      .then(setBusiness)
      .catch(() => {});

    getBusinessDeals()
    .then((res) => setDeals(res.data))
    .catch(() => {});  
  }, []);

  if (!business) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#0F172A] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#020617] border-r border-white/10 flex flex-col">
        <div className="px-6 py-5 text-xl font-bold text-[#22C55E]">
          FoodWise
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<LayoutGrid size={18} />} label="Dashboard" active />
          <Link to="/createDeal">
             <NavItem icon={<Package size={18} />} label="Create Deals" />
          </Link>
          
          <NavItem icon={<ClipboardList size={18} />} label="Orders" />
        </nav>

        <button className="flex items-center gap-3 px-6 py-4 text-red-400 hover:bg-white/5">
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            />
            <input
              type="text"
              placeholder="Search deals or orders..."
              className="w-full bg-[#020617] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
            />
          </div>

          {/* Business */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#94A3B8]">
              {business.name}
            </span>

            <div className="w-9 h-9 bg-[#22C55E]/20 text-[#22C55E] rounded-full flex items-center justify-center">
              <User size={18} />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 space-y-8">
          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Active Deals" value="4" />
            <StatCard label="Pending Orders" value="12" />
            <StatCard label="Revenue Today" value="$120" />
            <StatCard label="Items Left" value="37" />
          </section>

          {/* Deals */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Your Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {deals.length === 0 ? (
                <p className="text-sm text-[#94A3B8]">
                  You haven’t created any deals yet.
                </p>
              ) : (
                deals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))
              )}

            </div>
          </section>

          {/* Orders */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Pending Orders</h2>
            <div className="bg-[#020617] border border-white/10 rounded-xl divide-y divide-white/10">
              <OrderRow />
              <OrderRow />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function NavItem({ icon, label, active }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${
        active
          ? "bg-[#22C55E]/20 text-[#22C55E]"
          : "text-[#94A3B8] hover:bg-white/5"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-[#020617] border border-white/10 rounded-xl p-5">
      <p className="text-sm text-[#94A3B8]">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function DealCard({ deal }) {
  const expiresInHours = Math.max(
    0,
    Math.floor(
      (new Date(deal.expiresAt) - new Date()) / (1000 * 60 * 60)
    )
  );

  return (
    <div className="bg-[#020617] border border-white/10 rounded-xl overflow-hidden">
      {/* Header strip */}
      <div className="h-28 bg-gradient-to-br from-[#22C55E]/30 to-transparent" />

      <div className="p-4 space-y-2">
        <h3 className="font-semibold">
          {deal.title}
        </h3>

        <p className="text-sm text-[#94A3B8]">
          ${deal.dealPrice} instead of ${deal.originalPrice} •{" "}
          {deal.quantityLeft}/{deal.quantityTotal} left
        </p>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-[#94A3B8]">
            Expires in {expiresInHours}h
          </span>

          <button className="text-sm text-red-400 hover:text-red-300">
            Disable
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderRow() {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div>
        <p className="font-medium">Order #2041</p>
        <p className="text-sm text-[#94A3B8]">1 item • Pickup 19:00</p>
      </div>
      <button className="bg-[#22C55E] hover:bg-[#16A34A] text-black text-sm font-semibold px-4 py-2 rounded-lg transition">
        Mark Ready
      </button>
    </div>
  );
}
