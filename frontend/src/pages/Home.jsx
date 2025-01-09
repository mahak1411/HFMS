import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const userName = "John"; // Replace with actual user data

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        {/* Navigation */}
        <nav className="flex justify-center gap-6 mb-6">
          <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">Dashboard</Link>
          <Link to="/about" className="text-blue-600 hover:text-blue-800">About Us</Link>
        </nav>

        {/* Hero Section */}
        <header className="text-center py-20">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome,To Hospital Food Manager SignIn OR login To get started !
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Manage patient food plans, deliveries, and track their meal status with ease.
          </p>
          <div className="flex justify-center gap-6">
           <Link to='/signin'><button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition transform">
              Get Started
            </button></Link> 
            <button className="border-2 border-blue-600 text-blue-600 py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 hover:text-white hover:scale-105 transition transform">
              Learn More
            </button>
          </div>
        </header>

        {/* Features Section */}
        <main>
          <section className="py-16">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Feature Cards */}
              {[
                { title: "Manage Patients", desc: "Easily add, update, and manage patient details, including diseases, allergies, and more." },
                { title: "Create Diet Plans", desc: "Create morning, evening, and night meal plans, with the ability to add special instructions." },
                { title: "Track Deliveries", desc: "Keep track of meal delivery statuses, ensuring timely delivery of meals to patients." },
              ].map((feature, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-600 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-blue-600 text-white py-6">
          <div className="text-center">
            <p>&copy; 2025 Hospital Food Manager. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
