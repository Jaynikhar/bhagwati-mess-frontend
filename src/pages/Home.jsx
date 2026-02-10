import FoodCard from "../components/FoodCard";
import React from "react";
import Hero from "../components/Hero";
import DishSection from "../components/DishSection";
import myImage from "../assets/image.jpg";
export default function Home() {
  const sections = [
    "Veggies",
    "Pulses",
    "Wednesday Special",
    "Sunday Special"
  ];

  return (
    <>
      <Hero className="shadow-xl rounded-2xl p-6 bg-white" />
      <div className="max-w-6xl mx-auto px-6 py-14" >
        <DishSection className="shadow-xl rounded-2xl p-6 bg-white" title="Veggies" />
        <DishSection className="shadow-xl rounded-2xl p-6 bg-white" title="Pulses" />
        <DishSection className="shadow-xl rounded-2xl p-6 bg-white" title="Wednesday Special" />
        <DishSection className="shadow-xl rounded-2xl p-6 bg-white" title="Sunday Special" />
      </div>

      
      {/* <div
        className="h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/banner.jpg')" }}
      >
        <h1 className="text-5xl font-bold bg-black/50 p-6 rounded">
          Bhagwati Mess
        </h1>
      </div>

      <section className="p-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {sections.map((s) => (
          <FoodCard key={s} title={s} />
        ))}
      </section> */}

      <section className="flex justify-around p-10 max-w-6xl mx-auto px-6 py-12">
        {/* <div className="text-center">
          <h2 className="text-2xl font-bold">Owner</h2>
          <img className="w-32 h-32 rounded-full mx-auto" src="/owner.jpg" />
          <p className="font-bold">Bhagwati Mess Owner</p>
        </div> */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">Website Designer</h2>
          <img className="w-32 h-32 rounded-full mx-auto" src={myImage} />
          <p className="font-bold">Jay</p>
        </div>
      </section>
    </>
  );
}
