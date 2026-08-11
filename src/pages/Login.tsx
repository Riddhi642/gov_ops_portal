import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate =useNavigate();
  const handleLogin= ()=>{
    navigate("/dashboard")
  }
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Government Operations Portal
          </h1>

          <p className="text-slate-500 mt-2">
            Secure Government Management System
          </p>
        </div>

        {/* Login Form */}
        <form>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex justify-between items-center mb-6">

            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" />
              Remember Me
            </label>

            <a
              href="#"
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot Password?
            </a>

          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;