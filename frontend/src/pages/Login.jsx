import React, { useState } from "react";
import Input from "../components/Input";
import { loginForm } from "../validations/Validations";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { EnvelopeIcon,LockClosedIcon,EyeSlashIcon,EyeIcon } from "@heroicons/react/24/outline";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [showPassword,setShowPassword]=useState(false);

  const { loading, user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = loginForm(form.email, form.password);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const res = await dispatch(loginUser(form));
    console.log(res);
    
    if (res.meta.requestStatus === "fulfilled") {
      setTimeout(()=>{
        navigate("/chat");
      },2000);    
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="bg-white/10 backdrop-blur-3xl rounded-3xl shadow-2xl p-10 max-w-md w-full animate-slide-up">
        <h2 className="text-4xl font-black text-white mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-float">
          Login to ChatSphere
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 text-white/70 absolute top-3 left-3" />
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-10 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                errors.email ? 'ring-2 ring-red-400' : ''
              }`}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <LockClosedIcon className="w-5 h-5 text-white/70 absolute top-3 left-3" />
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-10 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                errors.password ? 'ring-2 ring-red-400' : ''
              }`}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 cursor-pointer"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5 text-white/70" />
              ) : (
                <EyeIcon className="w-5 h-5 text-white/70" />
              )}
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-bold text-lg shadow-xl hover:shadow-purple-500/50 transform hover:-translate-y-1 transition-all duration-500"
          >
           {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-white/70 mt-6 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-purple-400 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;