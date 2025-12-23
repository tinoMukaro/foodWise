import Navbar from "../components/Navbar";
import DealCard from "../components/DealCard";
import OrdersPreview from "../components/OrderPreview";
import fakeDeals from "../data/fakeDeals";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <Navbar />

      <main className="px-6 py-10 space-y-12 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <section className="rounded-2xl bg-white border border-orange-100 p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-orange-600">
            Welcome to Foodwise 
          </h2>
          <p className="text-zinc-600 mt-2 max-w-xl">
            Save food, save money, and enjoy great meals near you — all while fighting food waste.
          </p>

          <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-white font-medium hover:bg-orange-400 transition">
            Browse Deals
          </button>
        </section>

        {/* Deals Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-zinc-800">
              Available Deals
            </h3>
            <span className="text-sm text-orange-600 font-medium cursor-pointer hover:underline">
              View all
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fakeDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </section>

        {/* Orders */}
        <section className="rounded-2xl bg-white border border-orange-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-zinc-800">Your Orders</h3>
            <span className="text-sm text-orange-600 font-medium cursor-pointer hover:underline">
              See history
            </span>
          </div>
          <OrdersPreview />
        </section>
      </main>
    </div>
  );
}
