import React from "react";
import { useSelector } from "react-redux";

export default function OrderHistory() {
  const orders = useSelector((state) => state.order.orders);

  if (!orders.length)
    return <p className="text-center py-10">No orders yet.</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border p-4 rounded-md mb-6 bg-white shadow-sm"
        >
          <p className="font-semibold mb-2">Order Date: {order.date}</p>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-2 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 font-bold text-lg text-right">
            Total: ${order.total.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}
