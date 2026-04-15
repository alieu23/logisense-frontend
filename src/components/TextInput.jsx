import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://18.219.19.141:8000";

export default function TextInput({ onResult }) {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://18.219.19.141:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    onResult(data);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <textarea
        className="w-full border p-3 rounded-lg mb-3"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Analyze
      </button>
    </div>
  );
}