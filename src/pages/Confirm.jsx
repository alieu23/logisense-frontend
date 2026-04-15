import { useState } from "react";
import { confirmSignUp } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

export default function Confirm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      alert("Account verified! You can now login.");
      navigate("/login");
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
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-1">Check your email</h2>
          <p className="text-sm text-gray-500">We sent a verification code to your email address</p>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4 mb-6">
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
              Verification code
            </label>
            <input
              type="text"
              placeholder="123456"
              maxLength={6}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 tracking-widest transition"
            />
          </div>
        </div>


        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full bg-violet-600 hover:bg-violet-700 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2"
        >
          {loading && (
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? "Verifying..." : "Verify account"}
        </button>

  
        <p className="mt-5 text-center text-sm text-gray-500">
          Wrong email?{" "}
          <a
            href="/signup"
            className="text-violet-500 hover:text-violet-600 font-medium"
          >
            Go back
          </a>
        </p>

      </div>
    </div>
  );
}