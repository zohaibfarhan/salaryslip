import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate(); // yahan hona chahiye

  return (
    <nav className="bg-slate-500 p-4 no-print">
      <div className="flex justify-center gap-6">
        <button
          onClick={() => navigate("/empform")}
          className="text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
        >
          + Add Employee
        </button>

        <button
          onClick={() => navigate("/emptable")}
          className="text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
        >
          View Table
        </button>

        <button
          onClick={() => navigate("/salaryform")}
          className="text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
        >
          Salary Form
        </button>
      </div>
    </nav>
  );
}
