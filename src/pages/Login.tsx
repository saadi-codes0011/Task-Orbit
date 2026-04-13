import { message } from "antd";
import { motion } from "framer-motion";
import { Key, Mail, Rocket } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../api/api";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const validations = async (e: any) => {
    e.preventDefault()

    const payload = {
      email: formData.email,
      password: formData.password
    }
    if (!formData.email || !formData.password) {
      message.error("please fill all the fields")
      return;
    }
    try {
      const response = await api.post("/api/auth/login", payload)
      const token = response.data.user.token
      localStorage.setItem("token", token)
      message.success("Login Succesfully")
      navigate("/dashboard")

    } catch (error: any) {
      const msg = error?.response?.data?.message || "Server not found"
      message.error(msg);
    }
  }
  const onchange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">

      {/* GRID */}
      <div className="w-full h-screen grid md:grid-cols-2">

        {/* ================= LEFT SIDE (VISUAL) ================= */}
        <div className="hidden md:flex relative items-center justify-center overflow-hidden">

          {/* Glow Orbs */}
          <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] top-[-100px] left-[-100px]" />
          <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] bottom-[-100px] right-[-100px]" />

          {/* Torus Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="w-[280px] h-[280px] rounded-full border-[30px] border-t-purple-500/40 border-l-cyan-400/30 border-r-transparent border-b-transparent"
          />

          {/* Text */}
          <div className="absolute bottom-20 text-center px-10">
            <h2 className="text-3xl font-bold">
              Enter the{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-magenta-400 bg-clip-text text-transparent">
                Orbit
              </span>
            </h2>
            <p className="text-gray-400 mt-2">
              Secure. Fast. Cosmic productivity.
            </p>
          </div>
        </div>

        {/* ================= RIGHT SIDE (FORM) ================= */}
        <div className="flex items-center justify-center px-6">

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md bg-slate-900/40 backdrop-blur-2xl border border-gray-700/30 rounded-[2.5rem] p-8 space-y-6"
          >

            {/* HEADER */}
            <div>
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-gray-400 text-sm mt-1">
                Enter your cosmic credentials to continue.
              </p>
            </div>

            {/* FORM */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >

              {/* Email */}
              <div className="relative group">
                {/* 1. Icon ko Input se pehle rakhein */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                  <Mail size={20} />
                </div>

                {/* 2. Input ki padding badhayein (px-12) taake text icon ke upar na aaye */}
                <motion.input
                  variants={itemVariants}
                  name="email"
                  value={formData.email}
                  onChange={onchange}
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 pr-6 py-4 bg-[#1e293b] text-white rounded-2xl border border-gray-700/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-gray-500 outline-none transition-all"
                />
              </div>

              {/* Password */}
              <div className="relative group">
                {/* 1. Key Icon: Absolute position ke sath center mein */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                  <Key size={20} />
                </div>

                {/* 2. Motion Input: Padding left 'pl-12' rakhi hai taake text icon ke upar na aaye */}
                <motion.input
                  variants={itemVariants}
                  name="password"
                  value={formData.password}
                  onChange={onchange}
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-6 py-4 bg-[#1e293b] text-white rounded-2xl border border-gray-700/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-gray-500 outline-none transition-all"
                />
              </div>
              {/* BUTTON */}
              <motion.button
                onClick={validations}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-full font-bold transition shadow-lg hover:shadow-pink-500/30"
              >
                <Rocket size={18} />
                Launch Dashboard
              </motion.button>

            </motion.div>

            {/* FOOTER */}
            <p className="text-center text-gray-400 text-sm">
              New to the Orbit?{" "}
              <span onClick={() => navigate("/Signup")} className="text-cyan-400 font-medium cursor-pointer">
                Create Account
              </span>
            </p>

          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Login;