

import React, { useState } from "react";
import Input from "../components/Input";
import { registerForm } from "../validations/Validations";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/AuthSlice"
import { useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate=useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  
  const handleSubmit = async(e) => {
    e.preventDefault();

    const validationErrors = registerForm(
      form.username,
      form.email,
      form.password,
      form.confirmPassword,
      form.gender
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    
       const res = await dispatch(registerUser(form));
       console.log(res);
       
       if (res.meta.requestStatus === "fulfilled") {
        setTimeout(()=>{
             navigate("/login"); 
        },2000);
   
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-pink-700 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl space-y-4 animate-slide-up"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-4 animate-float">Register</h2>

        <Input
          label="Username"
          name="username"
          value={form.username}
          placeholder="Enter username"
          onChange={handleChange}
          error={errors.username}
        />

        <Input
          label="Email"
          name="email"
          value={form.email}
          placeholder="Enter email"
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          placeholder="Enter password"
          onChange={handleChange}
          error={errors.password}
        />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          placeholder="Confirm password"
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option className='text-red-950' value="">Select Gender</option>
          <option className='text-red-950' value="male">Male</option>
          <option className='text-red-950' value="female">Female</option>
          <option className='text-red-950' value="other">Other</option>
        </select> 
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

        <div className="flex flex-col space-y-1">
          <label className="text-white font-semibold">Profile Picture</label>
          <input
            type="file"
            name="profilePic"
            onChange={handleChange}
            className="text-white file:bg-purple-500 file:text-white file:px-4 file:py-2 file:rounded-full file:border-none file:shadow-md file:hover:scale-105 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-all shadow-lg disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-white text-center text-sm">
          Already have an account? <a href="/login" className="text-purple-300 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;        