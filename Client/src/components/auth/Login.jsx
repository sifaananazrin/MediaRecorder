import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginBackground from "../../assets/image.png";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        formData
      );
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center">
      <div
        className="w-full sm:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${loginBackground})`,
          height: "430px",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="w-full sm:w-1/2 bg-white p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-4">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
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
            className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
            type="submit"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
