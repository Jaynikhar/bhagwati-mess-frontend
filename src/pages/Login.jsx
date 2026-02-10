import React from "react";
import { useState, useContext } from "react";
import API from "../api/axios";
import { useAuth, AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// export default function Login() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const { login } = useContext(AuthContext);
//   const submit = async () => {
//     const res = await API.post("/auth/login", form);
//     login(res.data.token);
//     alert("Login successful");
//   };

//   return (
//     <div className="p-10 max-w-md mx-auto">
//       <input
//         placeholder="Username"
//         className="input"
//         onChange={(e) => setForm({ ...form, username: e.target.value })}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         className="input mt-4"
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//       />
//       <button onClick={submit} className="btn mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl">
//         Login
//       </button>
//     </div>
//   );
// }
const Login = () => {
  const {login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      alert("Enter username and password");
      return;
    }

    try {
      setLoading(true);

      // const res = await axios.post(
      //   "http://localhost:5000/api/auth/login",
      //   form
      // );
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      login(res.data);
      alert("Login successful ✅");
      
      if (res.data.user.role === "OWNER") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
      // localStorage.setItem("token", res.data.token);
      navigate("/profile"); // redirect after login
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to Bhagwati Mess 🍛
        </p>


        {/* USERNAME */}
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-3 rounded-lg mb-4"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />
        {/* PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-sm text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold mt-6"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {/* SIGNUP LINK */}
        <p className="text-center text-gray-600 mt-5">
          Don’t have an account?
          <span
            onClick={() => navigate("/signup")}
            className="text-green-600 font-semibold cursor-pointer ml-1"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};
export default Login;