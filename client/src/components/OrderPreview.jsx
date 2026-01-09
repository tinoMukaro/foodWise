import { useEffect, useState } from "react";
import { getUserOrder, cancelOrder } from "../services/orders.service"; 


export default function OrdersPreview() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrder();
        setOrders(data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
//cancel
const handleCancel = async (orderId) => {
  try {
    await cancelOrder(orderId);

    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId
          ? { ...order, status: "cancelled" }
          : order
      )
    );
  } catch (error) {
    console.error("Failed to cancel order:", error);
  }
};



  return (
    <div className="bg-white rounded-xl p-6 border">
      <h2 className="text-lg font-semibold text-[#2E7D32] mb-4">
        My Orders
      </h2>

      {loading && (
        <p className="text-sm text-gray-500">Loading your orders…</p>
      )}

      {!loading && orders.length === 0 && (
        <p className="text-[#8D6E63] text-sm">
          You haven’t reserved any deals yet
        </p>
      )}

      {!loading && orders.length > 0 && (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 text-sm"
            >
              <div className="flex justify-between">
                <span className="font-medium">
                  Deal : {order.dealName}
                </span>
                <span className="text-[#2E7D32] font-semibold">
                  ${order.totalPrice}
                </span>
              </div>

              <div className="text-gray-600 mt-1">
                Quantity: {order.quantity}
              </div>

              <div className="text-gray-600">
                Status:{" "}
                <span className="capitalize">{order.status}</span>
              </div>

              {order.pickupTime && (
                <div className="text-gray-600">
                  Pickup: {new Date(order.pickupTime).toLocaleString()}
                </div>
              )}

              {order.specialInstructions && (
                <div className="text-gray-500 italic mt-1">
                  “{order.specialInstructions}”
                </div>
              )}
                <div className="text-gray-600">
                Status:{" "}
                <span className="capitalize font-medium">
                  {order.status}
                </span>
              </div>

              {order.status === "pending" && (
                <button
                  onClick={() => handleCancel(order.orderId)}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Cancel order
                </button>
              )}
            </div>
          ))}
        </div>

      )}
    </div>
  );
}
