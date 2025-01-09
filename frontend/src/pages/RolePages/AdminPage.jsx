import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();

    const handleManageUsers = () => {
        // Navigate to the page where admins can manage users
        navigate('/manage-users');
    };

    const handleManageFoodPlans = () => {
        // Navigate to the page where admins can manage food plans
        navigate('/manage-food-plans');
    };

    const handleViewReports = () => {
        // Navigate to the page where admins can view hospital reports
        navigate('/view-reports');
    };

    const handleManagePatients = () => {
        // Navigate to the page where admins can manage patient details
        navigate('/manage-patients');
    };

    const handleAssignPantryTasks = () => {
        // Navigate to the page where admins can assign pantry tasks
        navigate('/assign-pantry-tasks');
    };

    const handleAssignDeliveryTasks = () => {
        // Navigate to the page where admins can assign delivery tasks
        navigate('/assign-delivery-tasks');
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4">
                {/* Hero Section */}
                <section className="text-center py-20">
                    <h1 className="text-4xl font-bold text-blue-600 mb-4">Admin Dashboard</h1>
                    <p className="text-lg text-gray-700 mb-6">
                        Welcome back! Here you can manage hospital operations and user data.
                    </p>
                </section>

                {/* Admin Actions Section */}
                <section className="py-16">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">Admin Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {/* Manage Users Card */}
                        <div className="bg-white shadow-lg rounded-lg p-6 cursor-pointer" onClick={handleManageUsers}>
                            <h3 className="text-xl font-semibold text-blue-600 mb-4">Manage Users</h3>
                            <p className="text-gray-600">
                                Add, update, or remove users from the system. Assign roles like Pantry Staff or Delivery personnel.
                            </p>
                        </div>

                        {/* Manage Food Plans Card */}
                        <div className="bg-white shadow-lg rounded-lg p-6 cursor-pointer" onClick={handleManageFoodPlans}>
                            <h3 className="text-xl font-semibold text-blue-600 mb-4">Manage Food Plans</h3>
                            <p className="text-gray-600">
                                Create and modify diet plans for patients. Customize meals based on different conditions.
                            </p>
                        </div>

                        {/* View Reports Card */}
                        <div className="bg-white shadow-lg rounded-lg p-6 cursor-pointer" onClick={handleViewReports}>
                            <h3 className="text-xl font-semibold text-blue-600 mb-4">View Reports</h3>
                            <p className="text-gray-600">
                                View detailed reports on food deliveries, patient meal status, and other hospital operations.
                            </p>
                        </div>

                        {/* Manage Patients Card */}
                        <div className="bg-white shadow-lg rounded-lg p-6 cursor-pointer" onClick={handleManagePatients}>
                            <h3 className="text-xl font-semibold text-blue-600 mb-4">Manage Patients</h3>
                            <p className="text-gray-600">
                                Add, update, or remove patient details, and assign diet charts.
                            </p>
                        </div>

                        {/* Assign Pantry Tasks Card */}
                        <div className="bg-white shadow-lg rounded-lg p-6 cursor-pointer" onClick={handleAssignPantryTasks}>
                            <h3 className="text-xl font-semibold text-blue-600 mb-4">Assign Pantry Tasks</h3>
                            <p className="text-gray-600">
                                Assign food preparation tasks to pantry staff and track their progress.
                            </p>
                        </div>

                        {/* Assign Delivery Tasks Card */}
                        <div className="bg-white shadow-lg rounded-lg p-6 cursor-pointer" onClick={handleAssignDeliveryTasks}>
                            <h3 className="text-xl font-semibold text-blue-600 mb-4">Assign Delivery Tasks</h3>
                            <p className="text-gray-600">
                                Assign delivery personnel to deliver meals to patients' rooms.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <footer className="bg-blue-600 text-white py-6">
                    <div className="text-center">
                        <p>&copy; 2025 Hospital Food Manager. All Rights Reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AdminPage;
