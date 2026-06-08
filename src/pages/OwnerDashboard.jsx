import { useState, useEffect } from "react";
import API from "../api/axios";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

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
      const res = await API.get("/owner/stats",
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
