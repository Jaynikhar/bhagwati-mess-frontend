import { useEffect, useState } from "react";
import API from "../api/axios";
import React from "react";

const AdminDashboard = () => {
  const [menu, setMenu] = useState(null);
  const [subs, setSubs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [packing, setPacking] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const m = await API.get("/menu/today");
      const s = await API.get("/admin/subscriptions");
      const o = await API.get("/admin/orders");
      const p = await API.get("/admin/payments");
      const pk = await API.get("/admin/packing");

      setMenu(m.data);
      setSubs(s.data);
      setOrders(o.data);
      setPayments(p.data);
      setPacking(pk.data);
    } catch (err) {
      console.log("Admin load error", err.response?.data);
    }
  };

  const verifyPayment = async (id) => {
    try {
      await API.put(`/payments/${id}/verify`);
      alert("Payment verified");
      fetchData();
    } catch {
      alert("Verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 p-4 md:p-8">

      <h1 className="text-3xl font-bold text-center mb-6">
        👑 Owner Dashboard
      </h1>

      {/* TODAY MENU */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-3xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Today Menu</h2>
        {menu ? (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="font-bold text-green-700">Day</h3>
              <p>{menu.day?.rice} • {menu.day?.pulse} • {menu.day?.veggie}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="font-bold text-blue-700">Night</h3>
              <p>{menu.night?.rice} • {menu.night?.pulse} • {menu.night?.veggie}</p>
            </div>
          </div>
        ) : "No menu today"}
      </div>

      {/* SUBSCRIBERS */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-3xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">
          Active Subscribers ({subs.length})
        </h2>

        {subs.map((s, i) => (
          <div key={i} className="border-b py-2 flex justify-between">
            <span>{s.user?.username}</span>
            <span className="text-green-600 font-semibold">{s.plan}</span>
          </div>
        ))}
      </div>

      {/* ORDERS */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-3xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">
          Daily Orders ({orders.length})
        </h2>

        {orders.map((o, i) => (
          <div key={i} className="border-b py-2 flex justify-between">
            <span>{o.user?.username}</span>
            <span>{o.mealType}</span>
            <span>₹{o.price}</span>
          </div>
        ))}
      </div>

      {/* PAYMENTS */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-3xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Payments</h2>

        {payments.map((p, i) => (
          <div key={i} className="border-b py-2 flex justify-between items-center">
            <span>{p.user?.username}</span>
            <span>₹{p.amount}</span>

            {!p.verified && (
              <button
                onClick={() => verifyPayment(p._id)}
                className="bg-green-600 text-white px-4 py-1 rounded-lg"
              >
                Verify
              </button>
            )}
          </div>
        ))}
      </div>

      {/* PACKING REQUESTS */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-3xl shadow">
        <h2 className="text-xl font-semibold mb-3">
          Packing Requests ({packing.length})
        </h2>

        {packing.map((p, i) => (
          <div key={i} className="border-b py-2">
            {p.user?.username} requested packing
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminDashboard;
