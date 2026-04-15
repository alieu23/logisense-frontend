import { useState } from "react";
import { registerUser } from "../auth/signup";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    try {
      await registerUser(email, password, firstName);
      alert("Check your email for verification code");
      navigate("/confirm");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl border border-gray-200 p-10">

 
        <div className="mb-8">
          <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center mb-5">
            <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM4 14a6 6 0 0112 0v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-1z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-1">Create an account</h2>
          <p className="text-sm text-gray-500">Sign up to get started today</p>
        </div>

      
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              First name
            </label>
            <input
              type="text"
              placeholder="Jane"
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Email address
            </label>
            <input
              type="email"
              placeholder="user@logisense.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 transition"
            />
          </div>
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-violet-600 hover:bg-violet-700 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? "Creating account..." : "Create account"}
        </button>





        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-500 hover:text-violet-600 font-medium">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}