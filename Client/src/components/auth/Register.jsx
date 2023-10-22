import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import loginBackground from '../../assets/image.png'; // Import the image

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend API to create the user
      // You can use Axios or any other HTTP library
      await axios.post('http://localhost:5000/auth/register', formData);
      navigate('/login'); // Use navigate to redirect to the login page on success
    } catch (error) {
      console.error('Signup failed:', error);
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center">
      <div className="w-full sm:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${loginBackground})`, height: "430px", backgroundSize: "cover" }}></div>
      <div className="w-full sm:w-1/2 bg-white p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-4">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="w-full border rounded-lg p-3"
              type="name"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full border rounded-lg p-3"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full border rounded-lg p-3"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="bg-blue-500 text-white w-full py-2 rounded-lg hover-bg-blue-600"
            type="submit"
          >
            Signup
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
