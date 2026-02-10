// import { useState } from "react";
// import React from "react";
// import API from "../api/axios";

// const DailyMeal = () => {
//   const [loading, setLoading] = useState(false);

//   const orderMeal = async (type, price) => {
//     try {
//       setLoading(true);

//       await API.post("/orders/create", {
//         mealType: type,
//         price,
//       });

//       alert(`${type} meal ordered ✅ Self service`);
//     } catch (err) {
//       console.log(err.response?.data || err.message);
//       alert("Order failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">

//       <h1 className="text-4xl font-bold text-center mb-10">
//         Try Daily Thali 🍛
//       </h1>

//       <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <img
//             src="https://images.unsplash.com/photo-1601050690597-df0568f70950"
//             className="h-60 w-full object-cover"
//           />

//           <div className="p-6">
//             <h2 className="text-2xl font-semibold mb-2">Day Thali</h2>

//             <p className="text-gray-600 mb-4">
//               Rice • Dal • 4 Chapati • Sabji • Salad
//             </p>

//             <p className="text-3xl font-bold text-green-600 mb-4">
//               ₹120
//             </p>

//             <button
//               onClick={() => orderMeal("DAY", 120)}
//               disabled={loading}
//               className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
//             >
//               Order Day Meal
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <img
//             src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
//             className="h-60 w-full object-cover"
//           />

//           <div className="p-6">
//             <h2 className="text-2xl font-semibold mb-2">Night Thali</h2>

//             <p className="text-gray-600 mb-4">
//               Rice • Dal • 4 Chapati • Sabji • Sweet
//             </p>

//             <p className="text-3xl font-bold text-green-600 mb-4">
//               ₹120
//             </p>

//             <button
//               onClick={() => orderMeal("NIGHT", 120)}
//               disabled={loading}
//               className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
//             >
//               Order Night Meal
//             </button>
//           </div>
//         </div>

//       </div>

//       <div className="text-center mt-10 text-gray-600">
//         Meals are available for <b>self service</b> at Bhagwati Mess
//       </div>

//     </div>
//   );
// };

// export default DailyMeal;


import { useState } from "react";
import axios from "axios";
import React from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";


const DailyMeal = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const orderMeal = async (type, price) => {
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/orders/create", {
          mealType: type,
          price
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`${type} meal ordered ✅ Self service`);
      navigate("/orders");
    } catch (err) {
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Try Daily Thali 🍛
      </h1>

      {/* MEAL CARDS */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

        {/* DAY MEAL */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1601050690597-df0568f70950"
            className="h-60 w-full object-cover"
          />

          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Day Thali</h2>

            <p className="text-gray-600 mb-4">
              Rice • Dal • 4 Chapati • Sabji • Salad
            </p>

            <p className="text-3xl font-bold text-green-600 mb-4">
              ₹120
            </p>

            <button
              onClick={() => orderMeal("DAY", 80)}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
            >
              Order Day Meal
            </button>
          </div>
        </div>

        {/* NIGHT MEAL */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            className="h-60 w-full object-cover"
          />

          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Night Thali</h2>

            <p className="text-gray-600 mb-4">
              Rice • Dal • 4 Chapati • Sabji • Sweet
            </p>

            <p className="text-3xl font-bold text-green-600 mb-4">
              ₹120
            </p>

            <button
              onClick={() => orderMeal("NIGHT", 80)}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
            >
              Order Night Meal
            </button>
          </div>
        </div>

      </div>

      {/* INFO SECTION */}
      <div className="text-center mt-10 text-gray-600">
        Meals are available for <b>self service</b> at Bhagwati Mess
      </div>

    </div>
  );
};

export default DailyMeal;
