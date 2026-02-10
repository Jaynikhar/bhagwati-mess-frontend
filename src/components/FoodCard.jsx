import React from "react";
import { motion } from "framer-motion";

export default function FoodCard({ title, image }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
    >
      <img src={image} className="h-48 w-full object-cover" />
      <div className="p-4 text-center font-semibold text-lg">
        {title}
      </div>
    </motion.div>
  );
}
