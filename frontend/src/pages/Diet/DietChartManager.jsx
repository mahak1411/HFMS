import React, { useState, useEffect } from "react";
import axios from "axios";

const DietChartManager = () => {
  const [dietCharts, setDietCharts] = useState([]);
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [dietChart, setDietChart] = useState({
    morningMeal: "",
    afternoonMeal: "",
    eveningMeal: "",
    nightMeal: "",
    specialInstructions: "",
  });

  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  useEffect(() => {
    if (token) {
      fetchDietCharts();
      fetchPatients();
    } else {
      alert("You are not logged in. Please log in first.");
    }
  }, [token]);

  // Fetch all diet charts
  const fetchDietCharts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/diets/diet-charts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDietCharts(response.data.dietCharts);
    } catch (error) {
      console.error("Error fetching diet charts:", error);
    }
  };

  // Fetch all patients
  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await axios.get(
        "http://localhost:5000/api/patient/patients",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPatients(response.data.patients); // Assuming the response is an array of patients
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Create a new diet chart
  const createDietChart = async () => {
    const newDietChart = { patientId, ...dietChart };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/diets/diet-charts",
        newDietChart,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDietCharts([...dietCharts, response.data.dietChart]);
      alert("Diet chart created successfully!");
    } catch (error) {
      console.error("Error creating diet chart:", error);
    }
  };

  const deleteDietChart = async (dietChartId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/diets/diet-charts/${dietChartId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDietCharts(
        dietCharts.filter((dietChart) => dietChart._id !== dietChartId)
      ); // Update state after deleting
      alert("Diet chart deleted successfully!");
    } catch (error) {
      console.error("Error deleting diet chart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Diet Chart Manager
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Create New Diet Chart</h3>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
          >
            <option value="">Select Patient</option>
            {Array.isArray(patients) &&
              patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.name} - {patient.age} years
                </option>
              ))}
          </select>
          <input
            type="text"
            placeholder="Morning Meal"
            value={dietChart.morningMeal}
            onChange={(e) =>
              setDietChart({ ...dietChart, morningMeal: e.target.value })
            }
            className="w-full p-3 mb-4 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Afternoon Meal"
            value={dietChart.afternoonMeal}
            onChange={(e) =>
              setDietChart({ ...dietChart, afternoonMeal: e.target.value })
            }
            className="w-full p-3 mb-4 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Evening Meal"
            value={dietChart.eveningMeal}
            onChange={(e) =>
              setDietChart({ ...dietChart, eveningMeal: e.target.value })
            }
            className="w-full p-3 mb-4 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Night Meal"
            value={dietChart.nightMeal}
            onChange={(e) =>
              setDietChart({ ...dietChart, nightMeal: e.target.value })
            }
            className="w-full p-3 mb-4 border rounded-lg"
          />
          <textarea
            placeholder="Special Instructions"
            value={dietChart.specialInstructions}
            onChange={(e) =>
              setDietChart({
                ...dietChart,
                specialInstructions: e.target.value,
              })
            }
            className="w-full p-3 mb-4 border rounded-lg"
          />
          <button
            onClick={createDietChart}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Create Diet Chart
          </button>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Diet Charts</h3>
          <ul className="space-y-4">
            {dietCharts.map((dietChart) => (
              <li
                key={dietChart._id}
                className="flex justify-between items-center p-4 bg-gray-200 rounded-lg"
              >
                <div className="text-gray-800 font-medium">
                  {patients.find(
                    (patient) => patient._id === dietChart.patientId
                  )?.name || "Unknown Patient"}{" "}
                  - Morning Meal:{" "}
                  {Array.isArray(dietChart.morningMeal)
                    ? dietChart.morningMeal.join(", ")
                    : dietChart.morningMeal}
                  , Afternoon Meal:{" "}
                  {Array.isArray(dietChart.afternoonMeal)
                    ? dietChart.afternoonMeal.join(", ")
                    : dietChart.afternoonMeal}
                  , Evening Meal:{" "}
                  {Array.isArray(dietChart.eveningMeal)
                    ? dietChart.eveningMeal.join(", ")
                    : dietChart.eveningMeal}
                  . Special Instructions:{" "}
                  {dietChart.specialInstructions || "None"}
                </div>

                <button
                  onClick={() => deleteDietChart(dietChart._id)}
                  className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DietChartManager;
