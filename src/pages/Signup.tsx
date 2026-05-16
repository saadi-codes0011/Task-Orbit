import { message } from "antd";
import { motion, type Variants } from "framer-motion";
import { Key, Mail, Plus, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../api/api";
import axios from "axios";

const Signup = () => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const submitbtn = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const payload = {
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      email: formData.email,
      password: formData.password
    };

    if (!payload.FirstName || !payload.LastName || !payload.email || !payload.password) {
      message.error("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);
      const response = await api.post("/api/auth/signup", payload);
      const token = response.data.newUser.token;
      localStorage.setItem("token", token);


      localStorage.setItem("user", JSON.stringify(response.data.newUser));

      message.success("Account created successfully");

      navigate("/dashboard");

    } catch (error: unknown) {

      if (axios.isAxiosError(error)) {

        const msg =
          error.response?.data?.message ||
          "Something went wrong";

        message.error(msg);

      } else {

        message.error("Unexpected error occurred");

      }
    }
    finally {
      setLoading(false);
    }
  };

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center overflow-hidden font-sans">

      <div className="w-full min-h-screen grid lg:grid-cols-2">

        <div className="hidden lg:flex relative flex-col items-center justify-center bg-[#020617] p-12 overflow-hidden border-r border-slate-800/50">

          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />

          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="relative z-10 w-64 h-64 rounded-full border-[35px] border-t-purple-500/40 border-l-cyan-400/30 border-r-pink-500/20 border-b-indigo-500/40 blur-[2px] shadow-[0_0_50px_rgba(139,92,246,0.2)]"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center z-10"
          >
            <h2 className="text-5xl font-extrabold tracking-tight">
              Task <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Orbit</span>
            </h2>
            <p className="text-slate-400 mt-4 text-lg max-w-sm mx-auto leading-relaxed">
              Your personal workspace to launch projects and track goals with cosmic precision.
            </p>
          </motion.div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-12 relative">

          <div className="lg:hidden absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/10 blur-3xl" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md bg-slate-900/40 backdrop-blur-2xl border border-slate-800/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl"
          >
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Create Account</h1>
              <p className="text-slate-400">Join the elite circle of productivity</p>
            </motion.div>
            <div className="space-y-4">

              <div className="grid grid-cols-2 gap-4">

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <User size={20} />
                  </div>

                  <motion.input
                    variants={itemVariants}
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={onchange}
                    type="text"
                    placeholder="First Name"
                    className="w-full pl-12 pr-5 py-4 bg-slate-800/50 rounded-2xl border border-slate-700/50"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <User size={20} />
                  </div>

                  <motion.input
                    variants={itemVariants}
                    name="LastName"
                    value={formData.LastName}
                    onChange={onchange}
                    type="text"
                    placeholder="Last Name"
                    className="w-full pl-12 pr-5 py-4 bg-slate-800/50 rounded-2xl border border-slate-700/50"
                  />
                </div>

              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Mail size={20} />
                </div>

                <motion.input
                  variants={itemVariants}
                  name="email"
                  value={formData.email}
                  onChange={onchange}
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 pr-5 py-4 bg-slate-800/50 rounded-2xl border border-slate-700/50"
                />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Key size={20} />
                </div>

                <motion.input
                  variants={itemVariants}
                  name="password"
                  value={formData.password}
                  onChange={onchange}
                  type="password"
                  placeholder="Create Password"
                  className="w-full pl-12 pr-5 py-4 bg-slate-800/50 rounded-2xl border border-slate-700/50"
                />
              </div>

            </div>
            <motion.button
              disabled={loading}
              onClick={submitbtn}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-8 py-4 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 rounded-2xl font-bold text-lg"
            >
              {loading ? (
                "Creating..."
              ) : (
                <>
                  <Plus size={20} strokeWidth={3} />
                  Get Started
                </>
              )}
            </motion.button>
            <motion.p variants={itemVariants} className="text-center mt-6 text-slate-400 text-sm">
              Already a member?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-cyan-400 font-semibold cursor-pointer"
              >
                Log In
              </span>
            </motion.p>

          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Signup;