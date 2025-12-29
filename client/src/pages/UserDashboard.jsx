import Navbar from "../components/Navbar";
import DealCard from "../components/DealCard";
import OrdersPreview from "../components/OrderPreview";
import { getMe } from "../services/auth.service";
import { getDealsForUser } from "../services/deal.service";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data
    getMe()
      .then(setUser)
      .catch(() => {
        setError("Failed to load user data");
      });

    // Fetch deals data
    getDealsForUser()
      .then((response) => {
        console.log("Full API Response:", response);
        
        // The response has a 'data' property containing the array of deals
        if (response && response.success && Array.isArray(response.data)) {
          // Transform API data to match DealCard component structure
          const formattedDeals = response.data.map(deal => ({
            id: deal.id,
            title: deal.title,
            business: deal.businessName, 
            location: deal.pickupLocation,
            price: deal.dealPrice,
            originalPrice: deal.originalPrice,
            quantity: deal.quantityLeft,
            expiresIn: deal.expiresAt,
            image: deal.imageUrl || "https://via.placeholder.com/300x200?text=Food+Deal",
            description: deal.description // Added for potential future use
          }));
          
          setDeals(formattedDeals);
        } else {
          setError("No deals available or invalid response format");
          setDeals([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching deals:", err);
        setError("Failed to load deals. Please try again.");
        setLoading(false);
        setDeals([]);
      });
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <Navbar />

      <main className="px-6 py-10 space-y-12 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <section className="rounded-2xl bg-white border border-orange-100 p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-orange-600">
            Welcome {user?.name}!
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

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-orange-600">Loading deals...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-red-500">{error}</div>
            </div>
          ) : deals.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-500">No deals available at the moment</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          )}
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