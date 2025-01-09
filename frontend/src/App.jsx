import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

// Import pages/components for different routes
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPage from "./pages/RolePages/AdminPage";
import PantryStaff from "./pages/RolePages/PantryStaff";
import Delivery from "./pages/RolePages/Delivery";
import Patient from "./pages/Patient/Patient";
import DietChartManager from "./pages/Diet/DietChartManager";
function App() {
  return (
    <div className="container mx-auto p-4">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-home" element={<AdminPage />} />
        <Route path="/pantry-home" element={<PantryStaff />} />
        <Route path="/delivery-home" element={<Delivery />} />
        <Route path="/manage-patients" element={<Patient />} />
        <Route path="/manage-food-plans" element={<DietChartManager/>} />
      </Routes>
    </div>
  );
}

export default App;
