import React from "react";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const SubscriptionRequired = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const res = await API.get("/subscriptions/my");
        if (res.data) setHasSubscription(true);
      } catch {
        setHasSubscription(false);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Checking membership...
      </div>
    );
  }

  if (!hasSubscription) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-green-50 p-6">
        <div className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8 text-center">

          <div className="text-5xl mb-4">🍛</div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Monthly Membership Required
          </h1>

          <p className="text-gray-500 mb-6">
            Subscribe to Bhagwati Mess to access daily meals,
            attendance, and dashboard features.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="text-green-700 font-semibold">
              ✔ Daily Fresh Food
            </p>
            <p className="text-green-700 font-semibold">
              ✔ Attendance Tracking
            </p>
            <p className="text-green-700 font-semibold">
              ✔ Member Dashboard
            </p>
          </div>

          <button
            onClick={() => navigate("/monthly")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-md"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default SubscriptionRequired;
