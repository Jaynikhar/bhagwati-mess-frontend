import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api/axios";
import Attendance from "./Attendance";


const MonthlyDashboard = () => {
  const [subscription, setSubscription] = useState(null);
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const sub = await API.get("/subscriptions/my");
      setSubscription(sub.data);

      const todayMenu = await API.get("/menu/today");
      setMenu(todayMenu.data);

    } catch (error) {
      console.log("Dashboard error", error.response?.data || error.message);
      setSubscription(null);
    }finally {
      setLoading(false);
    }
  };

  const markAttendance = async (type) => {
    try {
      // setLoading(true);
      await API.post("/attendance/mark", { type });
      alert(`${type} attendance marked`);
    } catch {
      alert("Attendance failed");
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  const requestPacking = async () => {
    try {
      await API.post("/packing/request");
      alert("Packing request sent");
    } catch {
      alert("Request failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading membership...
      </div>
    );

  if (!subscription)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Please Subscribe..!
      </div>
      
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 p-4 md:p-8">

      {/* PLAN CARD */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-6 border-t-4 border-green-500">
        <h1 className="text-3xl font-bold text-center mb-4">
          🍛 Bhagwati Mess Membership
        </h1>

        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {subscription.plan} Plan Active
          </p>

          <p className="text-gray-500 mt-1">
            Joined: {new Date(subscription.joinDate).toDateString()}
          </p>

          <p className="text-lg mt-2">
            Paid: ₹{subscription.price}
          </p>
        </div>
      </div>

      {/* ATTENDANCE */}
      

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Mark Today Attendance
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <button
            disabled={loading}
            // onClick={() => markAttendance("DAY")}
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
          >
            Day Meal Present
          </button>

          <button
            disabled={loading}
            // onClick={() => markAttendance("NIGHT")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            Night Meal Present
          </button>
        </div>
      </div> 

      {/* PACKING */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Meal Packing
        </h2>

        <button
          onClick={requestPacking}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
        >
          Request Packing for Today
        </button>
      </div>

      {/* DAILY MENU */}
      {menu && (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Today Menu
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="font-bold text-green-700 mb-2">
                Day Meal
              </h3>
              <p>{menu.day}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="font-bold text-blue-700 mb-2">
                Night Meal
              </h3>
              <p>{menu.night}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MonthlyDashboard;
