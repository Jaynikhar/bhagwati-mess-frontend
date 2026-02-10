import React from "react";
import { useState, useEffect } from "react";
import API from "../api/axios";
import axios from "axios";
import { useAuth, AuthContext, AuthProvider } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Monthly() {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const check = async () => {
      try {
        const res = await API.get("/subscriptions/my");
        if (res.data) navigate("/monthlydashboard");
      } catch {}
    };
    check();
  }, []);

  // useEffect(() => {
  //   checkSubscription();
  // }, []);

  // const checkSubscription = async () => {
  //   try {
  //     const res = await API.get("/subscriptions/my");
  //     if (res.data) {
  //       navigate("/monthlydashboard");
  //     }
  //   } catch (error) {
  //     // no subscription → stay on page
  //   }
  // };

  const [plan, setPlan] = useState("THALI");


  const [form, setForm] = useState({
    joinDate: "",
    plan: "THALI",
    agree: false,
  });

  const price = form.plan === "TIFFIN" ? 3100 : 2900;


  const handleSubscribe = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }
    
    try {
      if (!form.joinDate || !form.agree) {
        alert("Fill all fields and accept rules");
        return;
      }
      
      await API.post("/subscriptions/create", {
        joinDate: form.joinDate,
        plan: form.plan,
        price,
      });

      alert("Subscription successful ✅");
      
      navigate("/monthlydashboard");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Subscription failed");
    }
  };
  
  
  
  const requestPacking = async () => {
    try {
      await API.post(
        "notifications/packing",
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert("Packing request sent to owner");
    } catch (error) {
      alert("Error sending request");
    }
  };
  



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center mb-2">
          Join Bhagwati Mess
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Fresh homemade food • Monthly subscription
        </p>

        {/* PLAN SELECTION */}
        <div className="mb-6">
          <label className="font-semibold block mb-2">
            Select Plan
          </label>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setForm({ ...form, plan: "THALI" })}
              className={`p-4 rounded-xl border-2 ${
                form.plan === "THALI"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300"
              }`}
            >
              <h2 className="text-xl font-semibold">Monthly Thali</h2>
              <p className="text-green-600 font-bold text-lg">₹2900</p>
            </button>

            <button
              onClick={() => setForm({ ...form, plan: "TIFFIN" })}
              className={`p-4 rounded-xl border-2 ${
                form.plan === "TIFFIN"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300"
              }`}
            >
              <h2 className="text-xl font-semibold">Monthly Tiffin</h2>
              <p className="text-green-600 font-bold text-lg">₹3100</p>
            </button>
          </div>
        </div>

        {/* JOIN DATE */}
        <div className="mb-6">
          <label className="font-semibold block mb-2">
            Joining Date
          </label>

          <input
            type="date"
            className="w-full border p-3 rounded-lg"
            value={form.joinDate}
            onChange={(e) =>
              setForm({ ...form, joinDate: e.target.value })
            }
          />
        </div>

        {/* RULES */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Mess Rules</h3>
          <ul className="text-sm text-gray-600 list-disc ml-5">
            <li>Fees are non-refundable</li>
            <li>Attendance required daily</li>
            <li>Sunday night meal closed</li>
          </ul>

          <label className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) =>
                setForm({ ...form, agree: e.target.checked })
              }
            />
            I agree to all rules
          </label>
        </div>

        {/* PAYMENT BOX */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
          <h3 className="font-semibold mb-2">
            Pay via UPI
          </h3>

          <p className="text-gray-700">
            Amount: <b>₹{price}</b>
          </p>

          <p className="text-gray-600 text-sm mt-1">
            UPI ID: <b>bhagwatimess@upi</b>
          </p>

          <p className="text-xs text-gray-500 mt-2">
            Complete payment then click subscribe
          </p>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubscribe}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold"
        >
          Subscribe Now
        </button>

      </div>
    </div>
  );
};
