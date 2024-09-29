import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Pill, Stethoscope } from 'lucide-react';
//import { Alert, AlertDescription, AlertTitle } from 'src/components/ui/alert';
import { Alert, AlertDescription, AlertTitle  } from './components/ui/alert';
const API_URL = 'http://localhost:5000/api';

const NurseConnectPro = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [services, setServices] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    date: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/services`);
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleInputChange = (e) => {
    setAppointmentData({ ...appointmentData, [e.target.id]: e.target.value });
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
      const data = await response.json();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">NurseConnect Pro</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#services" className="text-blue-600 hover:text-blue-800">Services</a></li>
              <li><a href="#appointment" className="text-blue-600 hover:text-blue-800">Appointment</a></li>
              <li><a href="#consultation" className="text-blue-600 hover:text-blue-800">Consultation</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Professional Nursing Care at Your Fingertips</h2>
          <p className="text-xl mb-8">Experience top-tier nursing services with NurseConnect Pro</p>
          <button onClick={handleBookAppointment} className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
            Book an Appointment
          </button>
        </div>
      </section>

         {/* Services Section */}
         <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard icon={<Calendar className="w-12 h-12 text-blue-500" />} title="Appointment Booking" description="Schedule your nursing care visits with ease" />
            <ServiceCard icon={<Video className="w-12 h-12 text-blue-500" />} title="Online Consultation" description="Connect with our nurses virtually for quick advice" />
            <ServiceCard icon={<Stethoscope className="w-12 h-12 text-blue-500" />} title="Diagnosis" description="Comprehensive health assessments and diagnoses" />
            <ServiceCard icon={<Pill className="w-12 h-12 text-blue-500" />} title="Medication Management" description="Expert guidance on your medication regimen" />
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="appointment" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">Book an Appointment</h2>
          <form className="max-w-md mx-auto" onSubmit={handleBookAppointment}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={appointmentData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={appointmentData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Preferred Date</label>
              <input
                type="date"
                id="date"
                value={appointmentData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Schedule Appointment
            </button>
          </form>
        </div>
      </section>

      {/* Online Consultation Section */}
      <section id="consultation" className="bg-blue-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-blue-800">Online Consultation</h2>
          <p className="text-xl mb-8">Connect with our experienced nurses from the comfort of your home</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
            Start Consultation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 NurseConnect Pro. All rights reserved.</p>
        </div>
      </footer>

      {/* Alert */}
      {showAlert && (
        <Alert className="fixed bottom-4 right-4 w-64">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Appointment booked successfully!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-blue-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const getIconForService = (title) => {
  switch (title.toLowerCase()) {
    case 'appointment booking':
      return <Calendar className="w-12 h-12 text-blue-500" />;
    case 'online consultation':
      return <Video className="w-12 h-12 text-blue-500" />;
    case 'diagnosis':
      return <Stethoscope className="w-12 h-12 text-blue-500" />;
    case 'medication management':
      return <Pill className="w-12 h-12 text-blue-500" />;
    default:
      return <Clock className="w-12 h-12 text-blue-500" />;
  }
};

export default NurseConnectPro;