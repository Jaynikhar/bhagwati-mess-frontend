import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import React from "react";

// export default function AttendanceCalendar() {
//   const [date, setDate] = useState(new Date());

//   return (
//     <div className="max-w-xl mx-auto p-10 card">
//       <h2 className="text-2xl font-bold mb-4">
//         Monthly Attendance
//       </h2>

//       <Calendar onChange={setDate} value={date} />

//       <p className="mt-4 text-center">
//         Attendance details will show here
//       </p>
//     </div>
//   );
// }


const AttendanceCalendar = ({ attendance }) => {
  const getStatus = (date) => {
    const d = date.toISOString().split("T")[0];
    const record = attendance.find((a) => a.date === d);
    return record?.status;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Attendance</h2>

      <Calendar
        tileClassName={({ date }) => {
          const status = getStatus(date);
          if (status === "PRESENT") return "bg-green-200 rounded-full";
          if (status === "ABSENT") return "bg-red-200 rounded-full";
        }}
      />
    </div>
  );
};

export default AttendanceCalendar;