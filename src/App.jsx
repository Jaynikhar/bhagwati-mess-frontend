import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth, AuthProvider } from "./context/AuthContext";
import Monthly from "./pages/Monthly";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";

// import Daily from "./pages/Daily";
import Profile from "./pages/Profile";
import Attendance from "./pages/Attendance";
import OwnerDashboard from "./pages/OwnerDashboard";
import AttendanceCalendar from "./components/AttendanceCalendar";
import DailyMeal from "./pages/DailyMeal";
import SubscriptionRequired from "./components/SubscriptionRequired";
import MonthlyDashboard from "./pages/MonthlyDashboard";
// import NotFound from "./pages/NotFound";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.role === "OWNER" ? children : <Navigate to="/" />;
};


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/monthly" element={<Monthly />} />
          {/* <Route path="/daily" element={<Daily />} /> */}
          <Route path="/dailymeal" element={<DailyMeal />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="*" element={<NotFound />} />  */}
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/calendar" element={<AttendanceCalendar />} />
          {/* <Route path="/monthlydashboard" element={<MonthlyDashboard />} /> */}
          <Route path="/monthlydashboard" element={ <SubscriptionRequired> <MonthlyDashboard /> </SubscriptionRequired> } />




        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
