function OrderRow({ order }) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div>
        <p className="font-medium">
          Customer: {order.userName}
        </p>

        <p className="text-sm text-[#000000]">
          Qty: {order.quantity} • Pickup{" "}
          {new Date(order.pickupTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        {order.specialInstructions && (
          <p className="text-xs text-[#000000] mt-1">
            Note: {order.specialInstructions}
          </p>
        )}
      </div>

      <div className="text-right">
        <p className="font-semibold">${order.totalPrice}</p>
        <p className="text-xs text-[#000000] capitalize">
          {order.status}
        </p>
      </div>
    </div>
  );
}

export default OrderRow;
