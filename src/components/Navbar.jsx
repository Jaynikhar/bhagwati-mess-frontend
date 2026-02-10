import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [subscription, setSubscription] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!token) return;

    const checkSubscription = async () => {

      try {
        const res = await API.get("/subscriptions/my");
        setSubscription(res.data);
      } catch {
        setSubscription(null);
      }
    };

    checkSubscription();
  }, [token]);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent"
        >
          🍛 Bhagwati Mess
        </Link>

        

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          


          {/* NOT LOGGED IN */}
          {!token && (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 font-medium"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 font-semibold shadow"
              >
                Signup
              </Link>
            </>
          )}
          {(token && (user.role === "OWNER")) && (
            <>
              <Link
                to="/admin"
                className="px-5 py-2 rounded-xl bg-purple-100 text-purple-700 font-semibold"
              >
                Owner Dashboard
              </Link>

              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="px-5 py-2 rounded-xl bg-red-500 text-white font-semibold shadow hover:bg-red-600"
              >
                Logout
              </button>
            </>

          )}

          {/*LOGGED IN*/}
          {(token && !(user.role === "OWNER")) && (
            <>
              
              {/* SHOW SUBSCRIBE IF NOT SUBSCRIBED */}
              {!subscription && (
                <button
                  onClick={() => navigate("/monthly")}
                  className=" md:block px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 font-semibold shadow"
                >
                  Subscribe
                </button>
              )}

              {/* SHOW DASHBOARD IF SUBSCRIBED */}
              {subscription && (
                <Link
                  to="/monthlydashboard"
                  className="md:block px-5 py-2 rounded-xl bg-green-100 text-green-700 font-semibold"
                >
                  My Plan
                </Link>
              )} 
              

              {/* AVATAR */}
              <div className="relative">
               
                <img
                  src={user?.photo || "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3485.jpg?w=360"}
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-green-300"
                /> 

                {/* DROPDOWN */}
                {menuOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border p-2 animate-fadeIn">

                    <button
                      onClick={() => {
                        navigate("/profile");
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
                    >
                      👤 Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate("/dailymeal");
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
                    >
                      🍛 Book Daily Meal
                    </button>
                    <button
                      onClick={() => {
                        navigate("/orders");
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
                    >
                      🍛 My Orders
                    </button>

                    <hr className="my-2" />

                    <button
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                      className="w-full text-left px-4 py-2 rounded-lg text-red-500 hover:bg-red-50"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;







// import { Link } from "react-router-dom";
// import React from "react";
// import { useContext } from "react";
// import { useAuth,  AuthContext } from "../context/AuthContext";
// // bg-white shadow-md px-6 py-3 flex justify-between items-center
// const Navbar = () => {
//   const { token, logout } = useAuth();

//   return (
//     <nav className=" bg-white shadow-md px-6 py-3 flex justify-between items-center ">

//       {/* LOGO */}
//       <Link to="/" className="text-2xl font-bold text-green-600">
//         Bhagwati Mess
//       </Link>

//       {/* MENU */}
//       <div className="flex items-center gap-6">

//         <Link to="/">Home</Link>
//         <Link to="/monthlydashboard">Dashboard</Link>
//         <Link to="/dailymeal">Daily Meal</Link>

//         {/* 👇 USER LOGGED IN */}
//         {token ? (
//           <>
//             <Link
//               to="/profile"
//               className="bg-green-600 text-white px-4 py-2 rounded-lg"
//             >
//               Profile
//             </Link>

            // <button
            //   onClick={logout}
            //   className="bg-red-500 text-white px-4 py-2 rounded-lg"
            // >
            //   Logout
            // </button>
//           </>
//         ) : (
//           <>
//             {/* 👇 USER NOT LOGGED IN */}
//             <Link to="/login">Login</Link>
//             <Link
//               to="/signup"
//               className="bg-green-600 text-white px-4 py-2 rounded-lg"
//             >
//               Signup
//             </Link>
//           </>
//         )}

//       </div>
//     </nav>
//   );
// };

// export default Navbar;

