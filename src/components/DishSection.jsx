import React from "react";
import FoodCard from "./FoodCard";

export default function DishSection({ title }) {
  return (
    <div className="py-10 px-8">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <div className="grid md:grid-cols-4 gap-6 mt-10">
        <FoodCard title="Veggies" image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c" />
        <FoodCard title="Pulses" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ50BfGxODtYlpnyOKC0VKxQqJaFI1okhoUUQ&s" />
        <FoodCard title="Wednesday Special" image="https://images.unsplash.com/photo-1601050690597-df0568f70950" />
        <FoodCard title="Sunday Special" image="https://images.unsplash.com/photo-1512058564366-18510be2db19" />
      </div>
    </div>
  );
}
