import { useEffect, useState } from "react";
import OrderRow from "../components/OrderRow.jsx";
import { getOrders,confirmOrder,markOrderReady,collectOrder, } from "../services/orders.service.js";


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

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId ? { ...order, status } : order
      )
    );
  };

  const handleConfirm = async (orderId) => {
    try {
      await confirmOrder(orderId);
      updateOrderStatus(orderId, "confirmed");
    } catch (err) {
      console.error("Failed to confirm order", err);
    }
  };

  const handleReady = async (orderId) => {
    try {
      await markOrderReady(orderId);
      updateOrderStatus(orderId, "ready");
    } catch (err) {
      console.error("Failed to mark order ready", err);
    }
  };

  const handleCollect = async (orderId) => {
    try {
      await collectOrder(orderId);
      updateOrderStatus(orderId, "collected");
    } catch (err) {
      console.error("Failed to collect order", err);
    }
  };

  return (
    <section className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Orders Dashboard
        </h2>

        {loading && (
          <p className="text-sm text-slate-500">Loading orders…</p>
        )}

        {!loading && orders.length === 0 && (
          <p className="text-sm text-slate-500">No orders available</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            orders.map((order, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm"
              >
                <OrderRow order={order} />

                {/* ACTIONS */}
                <div className="mt-4 flex gap-2">
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleConfirm(order.orderId)}
                      className="px-4 py-1.5 text-sm border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100"
                    >
                      Confirm
                    </button>
                  )}

                  {order.status === "confirmed" && (
                    <button
                      onClick={() => handleReady(order.orderId)}
                      className="px-4 py-1.5 text-sm border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100"
                    >
                      Mark Ready
                    </button>
                  )}

                  {order.status === "ready" && (
                    <button
                      onClick={() => handleCollect(order.orderId)}
                      className="px-4 py-1.5 text-sm border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100"
                    >
                      Collect
                    </button>
                  )}
                </div>

                {/* STATUS + TIME */}
                <div className="mt-4 flex justify-between items-center text-xs">
                  <span className="px-2 py-1 rounded-full border border-slate-300 text-slate-600 uppercase">
                    {order.status}
                  </span>

                  <span className="text-slate-400">
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
      </div>
    </section>
  );
}
