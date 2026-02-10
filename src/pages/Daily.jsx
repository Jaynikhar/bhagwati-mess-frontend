// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import React from "react";
// export default function Daily() {
//   const [menu, setMenu] = useState(null);

//   useEffect(() => {
//     fetchMenu();
//   }, []);

//   const fetchMenu = async () => {
//     const res = await API.get("/menu/today");
//     setMenu(res.data);
//   };



//   if (!menu) return <p className="p-10">No menu today</p>;

//   const requestPacking = async () => {
//     await API.post("/packing");
//     alert("Packing request sent");
//   };


//   return (
//     <div className="max-w-5xl mx-auto p-8 space-y-10">

//       <div className="card">
//         <h2 className="text-2xl font-bold">Day Menu</h2>
//         <p>Rice: {menu.day?.rice}</p>
//         <p>Pulse: {menu.day?.pulse}</p>
//         <p>Veggie: {menu.day?.veggie}</p>
//         <p>Special: {menu.day?.special}</p>
//         <button className="btn mt-4">Order Day Meal</button>
//       </div>

//       <button onClick={requestPacking} className="btn mt-4">
//         Request Packing
//       </button>

//       <div className="card">
//         <h2 className="text-2xl font-bold">Night Menu</h2>
//         <p>Rice: {menu.night?.rice}</p>
//         <p>Pulse: {menu.night?.pulse}</p>
//         <p>Veggie: {menu.night?.veggie}</p>
//         <p>Special: {menu.night?.special}</p>
//         <button className="btn mt-4">Order Night Meal</button>
//       </div>

//       <button onClick={requestPacking} className="btn mt-4">
//         Request Packing
//       </button>


//     </div>
//   );
// }
