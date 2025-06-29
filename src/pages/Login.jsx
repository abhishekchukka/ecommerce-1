import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useShopContext } from "../context/ShopContext";
// import { backendUrl } from "../../../admin/src/App";

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState("login");
  // 'login' or 'signup'
  const { backendUrl, setToken, token } = useShopContext();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault(); // Prevent default form submission behavior

      if (formState === "login") {
        console.log("Login submitted:", formData.email, formData.password);

        // Handle login logic here
        const response = await axios.post(
          backendUrl + "/api/user/login",
          formData
        );
        if (response.data.success) {
          console.log(response.data.token);
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }

        console.log("Login submitted:", formData.email, formData.password);
        // Example: Call an authentication API
      } else {
        if (formData.password.length < 8) {
          toast.error(
            "Password must be strong and contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters."
          );
        }
        // Handle signup logic here
        const response = await axios.post(
          backendUrl + "/api/user/register",
          formData
        );
        console.log(response.data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
        console.log(
          "Signup submitted:",
          formData.username,
          formData.email,
          formData.password
        );
      }
      // Example: Call a registration API
    } catch (error) {
      // You might want to clear the form or redirect after submission
      // toast.error(error.message);
      console.error(error.message);
    }
    // setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center prata-regular">
          {formState === "login" ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {formState === "signup" && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
              value={formData.username}
              onChange={handleChange}
              required={formState === "signup"}
            />
          )}

          <input
            type="email" // Use type="email" for email inputs
            name="email"
            placeholder="Email Address"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password" // Use type="password" for password inputs
            name="password"
            placeholder="Password"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-700 cursor-pointer transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2"
          >
            {formState === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600 text-center">
          {formState === "login" ? (
            <>
              <p
                className="prata-regular cursor-pointer hover:underline mb-2"
                onClick={() => console.log("Forgot Password clicked")} // Placeholder for forgot password logic
              >
                Forgot Password?
              </p>
              <p className="prata-regular">
                Don't have an account?{" "}
                <span
                  className="text-gray-800 cursor-pointer hover:underline font-medium"
                  onClick={() => {
                    setFormState("signup");
                    setFormData({ username: "", email: "", password: "" }); // Clear form on switch
                  }}
                >
                  Sign Up here
                </span>
              </p>
            </>
          ) : (
            <p className="prata-regular">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline font-medium"
                onClick={() => {
                  setFormState("login");
                  setFormData({ username: "", email: "", password: "" }); // Clear form on switch
                }}
              >
                Login here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
