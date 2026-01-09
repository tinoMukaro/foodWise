function OrderRow({ order }) {
  return (
    <div className="px-5 py-4 space-y-3">
  {/* Deal */}
  <div>
    <p className="text-xs text-gray-500 uppercase">Deal</p>
    <p className="font-medium">{order.dealName}</p>
  </div>

  {/* Customer */}
  <div>
    <p className="text-xs text-gray-500 uppercase">Customer</p>
    <p className="font-medium">{order.userName}</p>
  </div>

  {/* Quantity & Pickup */}
  <div className="flex gap-6">
    <div>
      <p className="text-xs text-gray-500 uppercase">Quantity</p>
      <p>{order.quantity}</p>
    </div>

    <div>
      <p className="text-xs text-gray-500 uppercase">Pickup Time</p>
      <p>
        {new Date(order.pickupTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  </div>

  {/* Special Instructions */}
  {order.specialInstructions && (
    <div>
      <p className="text-xs text-gray-500 uppercase">Special Instructions</p>
      <p className="text-sm">{order.specialInstructions}</p>
    </div>
  )}

  {/* Price & Status */}
  <div className="flex justify-between items-center pt-2 border-t">
    <div>
      <p className="text-xs text-gray-500 uppercase">Status</p>
      <p className="capitalize font-medium">{order.status}</p>
    </div>

    <div className="text-right">
      <p className="text-xs text-gray-500 uppercase">Total</p>
      <p className="font-semibold text-lg">${order.totalPrice}</p>
    </div>
  </div>
</div>

  );
}

export default OrderRow;
