import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    doj: "",
    designation: "",
    email: "",
    mainSalary: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", form);

    const response = await fetch("http://localhost/system/save_employee.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await response.json();
    console.log("Server Response:", result);
    alert(result.message || "Error saving employee");
  };

  return (
    <div className="p-6 border rounded bg-slate-50 w-1/2 mx-auto shadow">
      {/* 🔹 View Table Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => navigate("/")} // 🔹 navigate to EmployeeForm
          className="hover:bg-white hover:text-black hover:border-black hover:border-2  mr-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          onClick={() => navigate("/emptable")}
          className="hover:bg-white hover:text-black hover:border-black hover:border-2  bg-green-500 text-white px-4 py-2 rounded"
        >
          View Table
        </button>
      </div>

      <h1 className="font-bold text-4xl">Employee Form</h1>

      <form onSubmit={handleSubmit} className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <p className="text-left font-semibold text-lg">Name</p>
          <input
            className="border p-2 rounded"
            type="text"
            name="name"
            value={form.name}
            placeholder="Name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-left font-semibold text-lg">DOJ</p>
          <input
            className="border p-2 rounded"
            type="date"
            name="doj"
            value={form.doj}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-left font-semibold text-lg">Designation</p>
          <input
            className="border p-2 rounded"
            type="text"
            name="designation"
            value={form.designation}
            placeholder="Designation"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-left font-semibold text-lg">E-mail</p>
          <input
            className="border p-2 rounded"
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-left font-semibold text-lg">Main Salary</p>
          <input
            className="border p-2 rounded"
            type="number"
            name="mainSalary"
            value={form.mainSalary}
            placeholder="Main Salary"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="hover:bg-white hover:text-black hover:border-black hover:border-2  bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
