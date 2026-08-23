import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import React from "react";




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
