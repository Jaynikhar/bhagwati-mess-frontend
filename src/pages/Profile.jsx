// || "https://i.pravatar.cc/150"
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import API from "../api/axios";
import AttendanceCalendar from "../components/AttendanceCalendar";
import React from "react";

const Profile = () => {
  const { token, logout } = useAuth();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [attendance, setAttendance] = useState([]);

 

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchData = async () => {
      try {
        const u = await API.get("/users/me");
        const o = await API.get("/orders/my");
        const s = await API.get("/subscriptions/my");
        const n = await API.get("/notifications");
        const a = await API.get("/attendance/my");

        setUser(u.data);
        setOrders(o.data);
        setSubscription(s.data);
        setNotifications(n.data);
        setAttendance(a.data);
      } catch (error) {
        console.log("Profile load error:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, [token]);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Profile Loading..... 
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 p-4 md:p-8">

      {/* HEADER CARD */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <div className="flex items-center gap-4">
          <img
            src={user.photo || "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3485.jpg?w=360" }
            className="w-20 h-20 rounded-full object-cover border-4 border-green-200"
          />

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {user.username}
            </h1>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400">{user.address}</p>
          </div>
        </div>

        {/* <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold shadow"
        >
          Logout
        </button> */}
      </div>

      {/* INFO GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mt-6">

        {/* SUBSCRIPTION */}
        <div className="bg-white rounded-3xl shadow p-6 border-t-4 border-green-500">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Monthly Plan
          </h2>

          {subscription ? (
            <>
              <p className="text-xl font-bold text-green-600">
                {subscription.plan}
              </p>
              <p className="text-gray-500 mt-1">
                Joined: {new Date(subscription.joinDate).toDateString()}
              </p>
              <p className="text-sm text-green-600 mt-2 font-semibold">
                Active
              </p>
            </>
          ) : (
            <p className="text-gray-400">No subscription yet</p>
            
          )}
        </div>

        {/* NOTIFICATIONS */}
        <div className="bg-white rounded-3xl shadow p-6 border-t-4 border-orange-400">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Notifications
          </h2>

          <div className="space-y-2 max-h-40 overflow-y-auto">
            {notifications.length === 0 && (
              <p className="text-gray-400">No notifications</p>
            )}

            {notifications.map((n, i) => (
              <div
                key={i}
                className="bg-orange-50 border border-orange-200 p-2 rounded-lg text-sm"
              >
                {n.message}
              </div>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div className="bg-white rounded-3xl shadow p-6 border-t-4 border-blue-500">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Activity
          </h2>

          <p className="text-gray-600">
            Total Orders: <b>{orders.length}</b>
          </p>

          <p className="text-gray-600 mt-1">
            Attendance Records: <b>{attendance.length}</b>
          </p>
        </div>

      </div>

      {/* ATTENDANCE */}
      <div className="max-w-6xl mx-auto mt-6 bg-white rounded-3xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Attendance Calendar
        </h2>

        <AttendanceCalendar attendance={attendance} />
      </div>

      {/* ORDERS */}
      <div className="max-w-6xl mx-auto mt-6 bg-white rounded-3xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Order History
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-400">No orders yet</p>
        ) : (
          <div className="space-y-3">
            {orders.map((o, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-xl"
              >
                <div>
                  <p className="font-semibold">{o.mealType} Meal</p>
                  <p className="text-sm text-gray-500">
                    {new Date(o.createdAt).toDateString()}
                  </p>
                </div>

                <span className="text-green-600 font-bold">
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

export default Profile;
