import { useEffect, useState } from "react";
import OrderRow from "../components/OrderRow.jsx";
import { getOrders } from "../services/orders.service.js";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <section className="p-6 bg-gray-800 min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-6">Your Orders</h2>

      {loading && (
        <p className="text-sm text-[#94A3B8]">Loading orders...</p>
      )}

      {!loading && orders.length === 0 && (
        <p className="text-sm text-[#94A3B8]">No orders yet</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading &&
          orders.map((order, index) => (
            <div
              key={index}
              className="bg-green-100 border border-white/10 rounded-xl p-4 shadow-lg hover:shadow-[#22C55E]/20 transition"
            >
              <OrderRow order={order} />
              <div className="mt-3 flex justify-between items-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === "pending"
                      ? "bg-yellow-500 text-black"
                      : "bg-green-500 text-black"
                  }`}
                >
                  {order.status.toUpperCase()}
                </span>
                <span className="text-xs text-[#94A3B8]">
                  {new Date(order.createdAt).toLocaleDateString()}{" "}
                  {new Date(order.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
