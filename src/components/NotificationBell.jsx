import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";

const NotificationBell = () => {
  const token = localStorage.getItem("token");
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/notifications",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(res.data);
    };
    fetchNotes();
  }, []);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="text-xl">
        🔔
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl p-3">
          {notes.map((n, i) => (
            <div key={i} className="text-sm border-b py-1">
              {n.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
