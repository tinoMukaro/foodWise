function OrderRow({ order }) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div>
        <p className="font-medium">
          Deal #{order.dealId}
        </p>

        <p className="text-sm text-[#94A3B8]">
          Qty: {order.quantity} • Pickup{" "}
          {new Date(order.pickupTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        {order.specialInstructions && (
          <p className="text-xs text-[#94A3B8] mt-1">
            Note: {order.specialInstructions}
          </p>
        )}
      </div>

      <div className="text-right">
        <p className="font-semibold">${order.totalPrice}</p>
        <p className="text-xs text-[#94A3B8] capitalize">
          {order.status}
        </p>
      </div>
    </div>
  );
}

export default OrderRow;
