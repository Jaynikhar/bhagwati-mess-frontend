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

      

      <section className="flex justify-around p-10 max-w-6xl mx-auto px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Website Designer</h2>
          <img className="w-32 h-32 rounded-full mx-auto" src={myImage} />
          <p className="font-bold">Jay</p>
        </div>
      </section>
    </>
  );
}
