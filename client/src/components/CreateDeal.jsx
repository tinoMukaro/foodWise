import { useState } from "react";
import { createDeal } from "../services/deal.service.js";

export default function CreateDeal() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    originalPrice: "",
    dealPrice: "",
    quantityTotal: "",
    expiresAt: "",
    pickupLocation: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const payload = {
        ...form,
        quantityTotal: Number(form.quantityTotal),
      };

      await createDeal(payload);

      setSuccess("Deal created successfully ✅");
      setForm({
        title: "",
        description: "",
        originalPrice: "",
        dealPrice: "",
        quantityTotal: "",
        expiresAt: "",
        pickupLocation: "",
        imageUrl: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to create deal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-2xl mx-auto bg-[#020617] p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Create New Deal</h2>

        {error && <p className="text-red-400 mb-3">{error}</p>}
        {success && <p className="text-green-400 mb-3">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Deal title"
            value={form.title}
            onChange={handleChange}
            className="w-full bg-[#020617] border border-slate-700 p-2 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Deal description"
            value={form.description}
            onChange={handleChange}
            className="w-full bg-[#020617] border border-slate-700 p-2 rounded"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="originalPrice"
              placeholder="Original price"
              value={form.originalPrice}
              onChange={handleChange}
              className="bg-[#020617] border border-slate-700 p-2 rounded"
              required
            />

            <input
              name="dealPrice"
              placeholder="Deal price"
              value={form.dealPrice}
              onChange={handleChange}
              className="bg-[#020617] border border-slate-700 p-2 rounded"
              required
            />
          </div>

          <input
            name="quantityTotal"
            type="number"
            placeholder="Total quantity"
            value={form.quantityTotal}
            onChange={handleChange}
            className="w-full bg-[#020617] border border-slate-700 p-2 rounded"
            required
          />

          <input
            name="expiresAt"
            type="datetime-local"
            value={form.expiresAt}
            onChange={handleChange}
            className="w-full bg-[#020617] border border-slate-700 p-2 rounded"
            required
          />

          <input
            name="pickupLocation"
            placeholder="Pickup location"
            value={form.pickupLocation}
            onChange={handleChange}
            className="w-full bg-[#020617] border border-slate-700 p-2 rounded"
            required
          />

          <input
            name="imageUrl"
            placeholder="Image URL (optional)"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full bg-[#020617] border border-slate-700 p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 p-2 rounded font-medium disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Deal"}
          </button>
        </form>
      </div>
    </div>
  );
}
