import React from "react";
export default function Hero() {
  return (
    <div className="relative h-[30vh] flex items-center justify-center text-white">

      <img
        src="https://m.media-amazon.com/images/I/71nsjXRzyfL._AC_UF1000,1000_QL80_.jpg"
        className="absolute w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative text-center">
        <h1 className="text-6xl font-bold tracking-wide">
          Bhagwati Mess
        </h1>
        <p className="mt-4 text-xl opacity-90">
          Homemade Taste • Healthy Life • Affordable Meals
        </p>

        
      </div>
    </div>
  );
}
