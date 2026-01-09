import { deleteDeal } from "../services/deal.service";

function DealCard({ deal, onDelete }) {
  const expiresInHours = Math.max(
    0,
    Math.floor(
      (new Date(deal.expiresAt) - new Date()) / (1000 * 60 * 60)
    )
  );

  const handleDelete = async () => {
    if (!confirm("Delete this deal?")) return;

    try {
      await deleteDeal(deal.id);
      onDelete?.(deal.id); 
    } catch (err) {
      console.error(err);
      alert("Failed to delete deal");
    }
  };

  return (
    <div className="bg-[#020617] border border-white/10 rounded-xl overflow-hidden">
      <div className="p-4 space-y-2">
        <h3 className="font-semibold">{deal.title}</h3>

        <p className="text-sm text-[#94A3B8]">
          ${deal.dealPrice} instead of ${deal.originalPrice} •{" "}
          {deal.quantityLeft}/{deal.quantityTotal} left
        </p>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-[#94A3B8]">
            Expires in {expiresInHours}h
          </span>

          <p
            className={`text-sm ${
              deal.status === "active"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {deal.status}
          </p>
        </div>

        
        <button
          onClick={handleDelete}
          className="mt-2 w-full text-sm bg-red-400 hover:bg-red-600 text-white py-1.5 rounded transition"
        >
          Delete Deal
        </button>
      </div>
    </div>
  );
}

export default DealCard;
