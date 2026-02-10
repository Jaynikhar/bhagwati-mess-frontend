import React from "react";

export default function FoodCard({ title }) {
  return (
    <div className="group overflow-hidden rounded-3xl shadow-xl bg-white hover:shadow-2xl transition">

      <img
        src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
        className="h-40 w-full object-cover group-hover:scale-110 transition"
      />

      <div className="p-5">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500 text-sm mt-2">
          Freshly prepared with love
        </p>
      </div>

    </div>
  );
}
