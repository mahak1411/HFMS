import React, { useState, useEffect } from "react";
import axios from "axios";

const PantryStaff = () => {
  const [tasks, setTasks] = useState([]);
  const [meal, setMeal] = useState("");
  const [taskDescription, settaskDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [patients, setPatients] = useState([]);
  const [pantryStaffId, setpantryStaffId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [taskIdToUpdate, setTaskIdToUpdate] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPantryTasks();
    fetchPatients();
  }, []);

  // Fetch all pantry tasks
  const fetchPantryTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/pantry/pantry-tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data.pantryTasks);
    } catch (error) {
      console.error(
        "Error fetching pantry tasks:",
        error.response?.data || error.message
      );
    }
  };

  // Fetch all patients
  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/patient/patients",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPatients(response.data.patients);
    } catch (error) {
      console.error(
        "Error fetching patients:",
        error.response?.data || error.message
      );
    }
  };

  // Create a new pantry task
  const createPantryTask = async () => {
    if (!meal || !patientId || !pantryStaffId || !taskDescription) {
      alert("All fields are required!");
      return;
    }

    const newTask = { meal, patientId, pantryStaffId, taskDescription, status };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/pantry/pantry-tasks",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks([...tasks, response.data.pantryTask]);
      alert("Pantry task created successfully!");
    } catch (error) {
      console.error(
        "Error creating pantry task:",
        error.response?.data || error.message
      );
    }
  };

  // Update a pantry task
  const updatePantryTask = async () => {
    if (
      !taskIdToUpdate ||
      !meal ||
      !taskDescription ||
      !status ||
      !pantryStaffId
    ) {
      alert("All fields are required!");
      return;
    }

    const updatedTask = {
      meal,
      patientId,
      pantryStaffId,
      taskDescription,
      status,
    };
    try {
      const response = await axios.put(
        `http://localhost:5000/api/pantry/pantry-tasks/${taskIdToUpdate}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(
        tasks.map((task) =>
          task._id === taskIdToUpdate ? response.data.pantryTask : task
        )
      );
      alert("Pantry task updated successfully!");
    } catch (error) {
      console.error(
        "Error updating pantry task:",
        error.response?.data || error.message
      );
    }
  };

  // Delete a pantry task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/pantry/pantry-tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(tasks.filter((task) => task._id !== taskId));
      alert("Pantry task deleted successfully!");
    } catch (error) {
      console.error(
        "Error deleting pantry task:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Pantry Task Manager
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Create New Pantry Task</h3>
          <input
            type="text"
            placeholder="Staff ID"
            value={pantryStaffId}
            onChange={(e) => setpantryStaffId(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Meal"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
          />
          <textarea
            placeholder="Task Details"
            value={taskDescription}
            onChange={(e) => settaskDescription(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
          />
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
          >
            <option value="">Select Patient</option>
            {patients.length === 0 ? (
              <option>No patients available</option>
            ) : (
              patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.name} - {patient.age} years
                </option>
              ))
            )}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            onClick={createPantryTask}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Create Task
          </button>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Update Pantry Task</h3>
          <select
            value={taskIdToUpdate}
            onChange={(e) => setTaskIdToUpdate(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
          >
            <option value="">Select Task to Update</option>
            {tasks.length === 0 ? (
              <option>No tasks available</option>
            ) : (
              tasks.map((task) => (
                <option key={task._id} value={task._id}>
                  {task.meal} - {task.status}
                </option>
              ))
            )}
          </select>
          <input
            type="text"
            placeholder="Updated Meal"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
          />
          <textarea
            placeholder="Updated Task Details"
            value={taskDescription}
            onChange={(e) => settaskDescription(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            onClick={updatePantryTask}
            className="w-full bg-yellow-600 text-white p-3 rounded-lg hover:bg-yellow-700 transition duration-200"
          >
            Update Task
          </button>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Pantry Tasks</h3>
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center p-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                <div className="text-sm text-gray-600">
                  Assigned by: 
                  {task.pantryStaff && (
                    <span className="font-semibold">{task.pantryStaff.name}</span>
                  )}
                </div>
                <div className="text-gray-800 font-medium">
                  <div className="font-semibold">{task.meal} - {task.status}</div>
                  <div className="text-sm">
                    Patient: {task.patient && (
                      <span className="font-semibold">
                        {task.patient.name} - {task.patient.age} years
                      </span>
                    )}
                  </div>
                  <div className="text-sm">Description: {task.taskDescription}</div>
                </div>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition duration-200"
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

export default PantryStaff;
