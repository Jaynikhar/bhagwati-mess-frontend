import React from "react";
import { useEffect, useState } from "react";
import API from "../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my");
      setOrders(res.data);
    } catch (error) {
      console.log("Orders load error", error.response?.data);
      setOrders([]);
    }
  };

  if (!orders)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading your orders...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 p-4 md:p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-6">

        <h1 className="text-3xl font-bold mb-6 text-center">
          🍛 My Meal Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">
            You have not ordered any meals yet
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map((o, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border"
              >
                <div>
                  <p className="font-semibold text-lg">
                    {o.mealType} Meal
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(o.createdAt).toDateString()}
                  </p>
                </div>

                <span className="text-green-600 font-bold text-lg">
                  ₹{o.price}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
