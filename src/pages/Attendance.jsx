import API from "../api/axios";
import React from "react";
export default function Attendance() {
  const mark = async (type) => {
    try {
      await API.post("/attendance/mark", { type });
      alert("Attendance updated");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-10 space-y-6">

      <div className="card text-center">
        <h2 className="text-xl font-bold mb-4">Morning Meal</h2>
        <button onClick={() => mark("MORNING")} className="btn">
          Mark Absent
        </button>
      </div>

      <div className="card text-center">
        <h2 className="text-xl font-bold mb-4">Night Meal</h2>
        <button onClick={() => mark("NIGHT")} className="btn">
          Mark Absent
        </button>
      </div>

    </div>
  );
}
