import { useState, useEffect } from "react";
import API from "../api/axios";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
// export default function OwnerDashboard() {
//   const [menu, setMenu] = useState({
//     date: "",
//     day: { rice: "", pulse: "", veggie: "", special: "" },
//     night: { rice: "", pulse: "", veggie: "", special: "" },
//   });

//   const submitMenu = async () => {
//     await API.post("/menu", menu);
//     alert("Menu saved");
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-10 space-y-6">

//       <div className="card">
//         <h2 className="text-2xl font-bold">Create / Update Menu</h2>

//         <input
//           type="date"
//           className="input mt-4"
//           onChange={(e) => setMenu({ ...menu, date: e.target.value })}
//         />

//         <h3 className="mt-6 font-bold">Day</h3>
//         <input className="input mt-2" placeholder="Rice"
//           onChange={(e) => setMenu({ ...menu, day: { ...menu.day, rice: e.target.value } })}
//         />
//         <input className="input mt-2" placeholder="Pulse"
//           onChange={(e) => setMenu({ ...menu, day: { ...menu.day, pulse: e.target.value } })}
//         />
//         <input className="input mt-2" placeholder="Veggie"
//           onChange={(e) => setMenu({ ...menu, day: { ...menu.day, veggie: e.target.value } })}
//         />

//         <h3 className="mt-6 font-bold">Night</h3>
//         <input className="input mt-2" placeholder="Rice"
//           onChange={(e) => setMenu({ ...menu, night: { ...menu.night, rice: e.target.value } })}
//         />
//         <input className="input mt-2" placeholder="Pulse"
//           onChange={(e) => setMenu({ ...menu, night: { ...menu.night, pulse: e.target.value } })}
//         />
//         <input className="input mt-2" placeholder="Veggie"
//           onChange={(e) => setMenu({ ...menu, night: { ...menu.night, veggie: e.target.value } })}
//         />

//         <button onClick={submitMenu} className="btn mt-6">
//           Save Menu
//         </button>
//       </div>

//     </div>
//   );
// }

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  // const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    earnings: 0,
    notifications: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/owner/stats",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStats(res.data);
    };
    fetchData();
  }, []);

  return (
    
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-8">Owner Dashboard</h1>
      


      <div className="grid md:grid-cols-3 gap-6 mb-8">
        

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Total Users</p>
          <h2 className="text-3xl font-bold">{stats.users}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Total Orders</p>
          <h2 className="text-3xl font-bold">{stats.orders}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Total Earnings</p>
          <h2 className="text-3xl font-bold">₹{stats.earnings}</h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-3">Recent Notifications</h2>
        {stats.notifications.map((n, i) => (
          <div key={i} className="border-b py-2">
            {n.message}
          </div>
        ))}
      </div>

    </div>
  );
};

export default OwnerDashboard;