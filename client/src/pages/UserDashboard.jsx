import Navbar from "../components/Navbar";
import DealCard from "../components/DealCard";
import OrdersPreview from "../components/OrderPreview";
import fakeDeals from "../data/fakeDeals";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      <main className="px-6 py-8 space-y-10">
        {/* Welcome Section */}
        <section>
          <h2 className="text-2xl font-bold text-[#2E7D32]">
            Welcome to FoodWise! 
          </h2>
          <p className="text-[#333333] mt-1">
            Save food. Save money. Eat smart.
          </p>
        </section>

        {/* Deals Section */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-[#333333]">
            Available Deals
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fakeDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </section>

        {/* Orders */}
        <section>
          <OrdersPreview />
        </section>
      </main>
    </div>
  );
}
