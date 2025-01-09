import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Delivery = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [dietCharts, setDietCharts] = useState([]);
    const [deliveryStaff, setDeliveryStaff] = useState([]);
    const [patients, setPatients] = useState([]); // New state for patients
    const [selectedDietChart, setSelectedDietChart] = useState('');
    const [selectedDeliveryStaff, setSelectedDeliveryStaff] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState(''); // New state for selected patient
    const [deliveryDetails, setDeliveryDetails] = useState('');
    const [status, setStatus] = useState('');
    const [deliveryNotes, setDeliveryNotes] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [selectedDeliveryId, setSelectedDeliveryId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

        if (isAuthenticated) {
            // Fetch deliveries
            axios.get('https://hfms-5ol5.onrender.com/api/delivery/deliveries', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
                .then(response => {
                    setDeliveries(response.data.deliveries || []);
                })
                .catch(error => console.error('Error fetching deliveries:', error));

            // Fetch diet charts
            axios.get('https://hfms-5ol5.onrender.com/api/diets/diet-charts', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
                .then(response => {
                    setDietCharts(response.data.dietCharts || []);
                })
                .catch(error => console.error('Error fetching diet charts:', error));

            // Fetch delivery staff
            axios.get('https://hfms-5ol5.onrender.com/api/delivery/users?role=deliveryStaff', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
                .then(response => {
                    setDeliveryStaff(response.data.users || []);
                })
                .catch(error => console.error('Error fetching delivery staff:', error));

            // Fetch patients
            axios.get('https://hfms-5ol5.onrender.com/api/patient/patients', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
                .then(response => {
                    setPatients(response.data.patients || []);
                })
                .catch(error => console.error('Error fetching patients:', error));
        }
    }, [isAuthenticated]);

    const handleCreateDelivery = (e) => {
        e.preventDefault();

        const deliveryData = {
            dietChartId: selectedDietChart,
            deliveryStaffId: selectedDeliveryStaff,
            deliveryDetails,
            patientId: selectedPatientId, // Ensure patientId is included
        };

        axios.post('https://hfms-5ol5.onrender.com/api/delivery/deliveries', deliveryData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                console.log('Delivery task created:', response.data);
                setDeliveries([...deliveries, response.data.delivery]);
                setIsCreating(false);
            })
            .catch(error => console.error('Error creating delivery task:', error));
    };

    const handleUpdateDeliveryStatus = (e, deliveryId) => {
        e.preventDefault();

        const updateData = {
            status,
            deliveryNotes,
        };

        axios.put(`https://hfms-5ol5.onrender.com/api/delivery/deliveries/${deliveryId}`, updateData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                console.log('Delivery status updated:', response.data);
                setDeliveries(deliveries.map(delivery => delivery._id === deliveryId ? response.data.delivery : delivery));
            })
            .catch(error => console.error('Error updating delivery status:', error));
    };

    const handleSelectDelivery = (deliveryId) => {
        const delivery = deliveries.find(d => d._id === deliveryId);
        setSelectedDeliveryId(deliveryId);
        setStatus(delivery.status);
        setDeliveryNotes(delivery.deliveryNotes || '');
    };

    if (!isAuthenticated) {
        return <div className="text-center p-5 text-xl">Please log in to manage deliveries.</div>;
    }

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-5">Delivery Management</h2>

            {/* Delivery List */}
            <div>
                <h3 className="text-xl font-semibold mb-3">Delivery Tasks</h3>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border">Delivery ID</th>
                            <th className="px-4 py-2 border">Delivery Person</th>
                            <th className="px-4 py-2 border">Diet Chart</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(deliveries) && deliveries.map((delivery) => (
                            <tr key={delivery._id} className="border-b">
                                <td className="px-4 py-2">{delivery._id}</td>
                                <td className="px-4 py-2">{delivery.deliveryPerson.name}</td>
                                <td className="px-4 py-2">
    {Array.isArray(delivery.dietChart.morningMeal) && delivery.dietChart.morningMeal.length > 0
        ? delivery.dietChart.morningMeal.join(', ') 
        : 'No morning meals available'}

</td>
{/* <td className="px-4 py-2">
    {Array.isArray(delivery.dietChart.afternoonMeal) && delivery.dietChart.afternoonMeal.length > 0
        ? delivery.dietChart.afternoonMeal.join(', ') 
        : 'No afternoon meals available'}
</td>
<td className="px-4 py-2">
    {Array.isArray(delivery.dietChart.eveningMeal) && delivery.dietChart.eveningMeal.length > 0
        ? delivery.dietChart.eveningMeal.join(', ') 
        : 'No evening meals available'}
</td> */}

                                <td className="px-4 py-2">{delivery.status}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleSelectDelivery(delivery._id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        View/Update Status
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Delivery Form */}
            {isCreating ? (
                <div className="mt-5">
                    <h3 className="text-xl font-semibold mb-3">Create Delivery Task</h3>
                    <form onSubmit={handleCreateDelivery} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Diet Chart</label>
                            <select
    value={selectedDietChart}
    onChange={(e) => setSelectedDietChart(e.target.value)}
    required
    className="w-full p-2 border rounded"
>
    <option value="">Select a Diet Chart</option>
    {Array.isArray(dietCharts) && dietCharts.length > 0 ? (
        dietCharts.map((dietChart) => (
            <option key={dietChart._id} value={dietChart._id}>
                {dietChart.morningMeal && dietChart.morningMeal.length > 0
                    ? `Morning: ${dietChart.morningMeal.join(', ')}`
                    : 'Morning: No food items available'}
                {dietChart.afternoonMeal && dietChart.afternoonMeal.length > 0
                    ? `, Afternoon: ${dietChart.afternoonMeal.join(', ')}`
                    : ', Afternoon: No food items available'}
                {dietChart.eveningMeal && dietChart.eveningMeal.length > 0
                    ? `, Evening: ${dietChart.eveningMeal.join(', ')}`
                    : ', Evening: No food items available'}
            </option>
        ))
    ) : (
        <option disabled>No diet charts available</option>
    )}
</select>

                        </div>
                        <div>
                            <label className="block text-sm font-medium">Delivery Staff</label>
                            <select
                                value={selectedDeliveryStaff}
                                onChange={(e) => setSelectedDeliveryStaff(e.target.value)}
                                required
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Delivery Staff</option>
                                {Array.isArray(deliveryStaff) && deliveryStaff.map((staff) => (
                                    <option key={staff._id} value={staff._id}>
                                        {staff.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Select Patient</label>
                            <select
                                value={selectedPatientId}
                                onChange={(e) => setSelectedPatientId(e.target.value)}
                                required
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select a Patient</option>
                                {Array.isArray(patients) && patients.map((patient) => (
                                    <option key={patient._id} value={patient._id}>
                                        {patient.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Delivery Details</label>
                            <textarea
                                value={deliveryDetails}
                                onChange={(e) => setDeliveryDetails(e.target.value)}
                                required
                                className="w-full p-2 border rounded"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-6 py-2 rounded"
                        >
                            Create Delivery
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsCreating(false)}
                            className="bg-gray-500 text-white px-6 py-2 rounded ml-2"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            ) : (
                <button
                    onClick={() => setIsCreating(true)}
                    className="bg-blue-500 text-white px-6 py-2 rounded"
                >
                    Create New Delivery
                </button>
            )}

            {/* Update Delivery Status */}
            {selectedDeliveryId && (
                <div className="mt-5">
                    <h3 className="text-xl font-semibold mb-3">Update Delivery Status</h3>
                    <form onSubmit={(e) => handleUpdateDeliveryStatus(e, selectedDeliveryId)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                                className="w-full p-2 border rounded"
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="delivered">Delivered</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Delivery Notes</label>
                            <textarea
                                value={deliveryNotes}
                                onChange={(e) => setDeliveryNotes(e.target.value)}
                                className="w-full p-2 border rounded"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-yellow-500 text-white px-6 py-2 rounded"
                        >
                            Update Status
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Delivery;
