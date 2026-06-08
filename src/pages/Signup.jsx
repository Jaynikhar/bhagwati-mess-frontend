import React from "react";
import MapPicker from "../components/MapPicker";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addressText, setAddressText] = useState("");


  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, photo: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSignup = async () => {
    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.address
    ) {
      alert("All fields required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // const res = await axios.post("/auth/signup", {
      const res = await API.post("/auth/signup", {
        username: form.username,
        email: form.email,
        password: form.password,
        address: form.address,
        
      });      
      localStorage.setItem("token", res.data.token);

      // login(res.data);
      alert("Signup successful ✅");
      
      window.location.href = "/"; // redirect after signup
      
    } catch (err) {
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-8">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Join Bhagwati Mess 🍛
        </p>

        {/* FORM GRID */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* USERNAME */}
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />


          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email :   xyz@gmail.com"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />

        </div>

        {/* MAP ADDRESS */}
        <div className="mt-6">
          <label className="font-semibold block mb-2">
            Select Address on Map
          </label>

          <MapPicker
            addressText={addressText}
            setAddress={(value) => setForm({ ...form, address: value })}
          />
        </div>

        {/* WRITTEN ADDRESS */}
        <textarea
          placeholder="Full Address"
          className="w-full border p-3 rounded-lg mt-4"
          value={addressText}
          onChange={(e) => {
            setAddressText(e.target.value);
            setForm({ ...form, address: e.target.value });
          }}
        />


        {/* PHOTO UPLOAD */}
        <div className="mt-6">
          <label className="font-semibold block mb-2">
            Profile Photo
          </label>

          <input type="file" onChange={handleImage} />

          {preview && (
            <img
              src={preview}
              className="h-24 w-24 rounded-full mt-3 object-cover"
            />
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold mt-8"
        >
          {loading ? "Creating account..." : "Signup"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account? 
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 font-semibold cursor-pointer ml-1"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Signup;

