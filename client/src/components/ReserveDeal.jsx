import { useState } from "react";
import { createOrder } from "../services/orders.service";

export default function ReserveDealModal({ deal, onClose }) {
  const [form, setForm] = useState({
    quantity: 1,
    pickupTime: "",
    paymentMethod: "cash",
    specialInstructions: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createOrder({
        dealId: deal.id,           
        quantity: Number(form.quantity),
        pickupTime: form.pickupTime,
        paymentMethod: form.paymentMethod,
        specialInstructions: form.specialInstructions,
      });

      onClose(); 
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to reserve deal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-1">{deal.title}</h2>
        <p className="text-sm text-gray-500 mb-4">
          Price: ${deal.price}
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="number"
            name="quantity"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          <input
            type="time"
            name="pickupTime"
            value={form.pickupTime}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </select>

          <textarea
            name="specialInstructions"
            value={form.specialInstructions}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Special instructions"
          />

          <button
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Reserving..." : "Confirm Reservation"}
          </button>
        </form>
      </div>
    </div>
  );
}
