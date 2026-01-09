import { useState } from "react";
import ReserveDealModal from "./ReserveDeal";

export default function DealCard({ deal }) {
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showModal, setShowModal] = useState(false);

function getExpiryText(dateString) {
  if (!dateString) return "No expiry date";

  const now = new Date();
  const expiry = new Date(dateString);

  
  if (isNaN(expiry.getTime())) {
    return "Invalid expiry date";
  }

  const diffMs = expiry - now;

  
  if (diffMs <= 0) {
    return "Expired";
  }

  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `Expires in ${minutes} min`;
  if (hours < 24) return `Expires in ${hours} hrs`;
  return `Expires in ${days} day(s)`;
}



  return (
    <>
      {/* Deal Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
        
        <img
          src={deal.image}
          alt={deal.title}
          className="h-40 w-full object-cover"
        />

       
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-[#333333]">
            {deal.title}
          </h3>

          <p className="text-sm text-[#8D6E63]">
            {deal.business} • {deal.location}
          </p>

          
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#2E7D32]">
              ${deal.price}
            </span>
            <span className="line-through text-sm text-gray-400">
              ${deal.originalPrice}
            </span>
          </div>

          
          <div className="flex justify-between text-sm">
            <span className="text-[#4CAF50]">
              {deal.quantity} left
            </span>
            
              <p className="text-sm text-red-600">
                {getExpiryText(deal.expiresIn)}
             </p>
            
          </div>

          
          <button
                disabled={deal.quantity === 0}
                onClick={() => {
                  if (deal.quantity === 0) return; 
                  setSelectedDeal(deal);
                  setShowModal(true);
                }}
                className={`px-4 py-2 rounded text-white transition
                  ${deal.quantity === 0
                    ? "bg-red-600 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                  }
                `}
              >
                {deal.quantity === 0 ? "Sold Out" : "Reserve Deal"}
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
