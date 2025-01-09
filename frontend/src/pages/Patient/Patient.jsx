import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Patient = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);  // Add loading state
    const [newPatient, setNewPatient] = useState({
        name: '',
        age: '',
        gender: '',
        contactInfo: '',
        emergencyContact: '',
        diseases: '',
        allergies: '',
        roomNumber: '',
        bedNumber: '',
        floorNumber: '',
        additionalDetails: '',
    });
    const [error, setError] = useState(null);

    // Fetch all patients
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                const response = await axios.get('http://localhost:5000/api/patient/patients', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPatients(response.data.patients);
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                setError('Error fetching patients');
                setLoading(false); // Set loading to false even in case of error
                console.error('Error fetching patients:', err);
            }
        };

        fetchPatients();
    }, []);

    // Handle input changes for new patient form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPatient({
            ...newPatient,
            [name]: value,
        });
    };

    // Handle submitting new patient
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token'); // Get token from localStorage

            const response = await axios.post('http://localhost:5000/api/patient/patients', newPatient, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Patient added successfully');
            setNewPatient({
                name: '',
                age: '',
                gender: '',
                contactInfo: '',
                emergencyContact: '',
                diseases: '',
                allergies: '',
                roomNumber: '',
                bedNumber: '',
                floorNumber: '',
                additionalDetails: '',
            });

            // Refresh patients list after adding a new one
            setPatients((prevPatients) => [...prevPatients, response.data.patient]);
        } catch (err) {
            setError('Error adding patient');
            console.error('Error adding patient:', err);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Manage Patients</h1>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Patient</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newPatient.name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label htmlFor="age" className="block text-gray-700 font-medium mb-2">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={newPatient.age}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={newPatient.gender}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <label htmlFor="contactInfo" className="block text-gray-700 font-medium mb-2">Contact Info</label>
                        <input
                            type="text"
                            id="contactInfo"
                            name="contactInfo"
                            value={newPatient.contactInfo}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Emergency Contact */}
                    <div>
                        <label htmlFor="emergencyContact" className="block text-gray-700 font-medium mb-2">Emergency Contact</label>
                        <input
                            type="text"
                            id="emergencyContact"
                            name="emergencyContact"
                            value={newPatient.emergencyContact}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Diseases */}
                    <div>
                        <label htmlFor="diseases" className="block text-gray-700 font-medium mb-2">Diseases</label>
                        <textarea
                            id="diseases"
                            name="diseases"
                            value={newPatient.diseases}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Allergies */}
                    <div>
                        <label htmlFor="allergies" className="block text-gray-700 font-medium mb-2">Allergies</label>
                        <textarea
                            id="allergies"
                            name="allergies"
                            value={newPatient.allergies}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Room Number */}
                    <div>
                        <label htmlFor="roomNumber" className="block text-gray-700 font-medium mb-2">Room Number</label>
                        <input
                            type="text"
                            id="roomNumber"
                            name="roomNumber"
                            value={newPatient.roomNumber}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Bed Number */}
                    <div>
                        <label htmlFor="bedNumber" className="block text-gray-700 font-medium mb-2">Bed Number</label>
                        <input
                            type="text"
                            id="bedNumber"
                            name="bedNumber"
                            value={newPatient.bedNumber}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Floor Number */}
                    <div>
                        <label htmlFor="floorNumber" className="block text-gray-700 font-medium mb-2">Floor Number</label>
                        <input
                            type="text"
                            id="floorNumber"
                            name="floorNumber"
                            value={newPatient.floorNumber}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Additional Details */}
                    <div>
                        <label htmlFor="additionalDetails" className="block text-gray-700 font-medium mb-2">Additional Details</label>
                        <textarea
                            id="additionalDetails"
                            name="additionalDetails"
                            value={newPatient.additionalDetails}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>

                <button type="submit" className="mt-6 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
                    Add Patient
                </button>
            </form>

            {/* Patients List Section */}
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Patients List</h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <ul>
                    {patients.map((patient) => (
                        <li key={patient._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                            
                            <h3 className="text-xl font-semibold text-blue-600">{patient.name}</h3>
                            <h4>Patient Id : <b>{patient._id}</b></h4>
                            <p><strong>Age:</strong> {patient.age}</p>
                            <p><strong>Room:</strong> {patient.roomNumber}</p>
                            <p><strong>Bed:</strong> {patient.bedNumber}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Patient;
