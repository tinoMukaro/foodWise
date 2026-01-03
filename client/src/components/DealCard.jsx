import { useState } from "react";
import ReserveDealModal from "./ReserveDeal";

export default function DealCard({ deal }) {
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Deal Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
        {/* Image */}
        <img
          src={deal.image}
          alt={deal.title}
          className="h-40 w-full object-cover"
        />

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-[#333333]">
            {deal.title}
          </h3>

          <p className="text-sm text-[#8D6E63]">
            {deal.business} • {deal.location}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#2E7D32]">
              ${deal.price}
            </span>
            <span className="line-through text-sm text-gray-400">
              ${deal.originalPrice}
            </span>
          </div>

          {/* Meta */}
          <div className="flex justify-between text-sm">
            <span className="text-[#4CAF50]">
              {deal.quantity} left
            </span>
            <span className="text-orange-600">
              {deal.expiresIn}
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              setSelectedDeal(deal);
              setShowModal(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Reserve Deal
          </button>
        </div>
      </div>

      {showModal && selectedDeal && (
        <ReserveDealModal
          deal={selectedDeal}
          onClose={() => {
            setShowModal(false);
            setSelectedDeal(null);
          }}
        />
      )}
    </>
  );
}
