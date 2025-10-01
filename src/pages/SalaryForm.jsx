import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SalaryForm() {
  const [employee, setEmployee] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [employees, setEmployees] = useState([]); // ✅ backend se employees aayenge

  const navigate = useNavigate();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = [2025, 2024, 2023, 2022];

  // ✅ Backend se employees fetch karo
  useEffect(() => {
    fetch("http://localhost/salary-backend/fetch.php")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEmployees(data);
        } else {
          console.error("Invalid employee data:", data);
        }
      })
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  const handleNext = () => {
    if (!employee || !month || !year) {
      alert("Please select all fields!");
      return;
    }

    // ✅ Selected employee find karo
    const selectedEmp = employees.find(
      (emp) => String(emp.id) === String(employee)
    );

    if (!selectedEmp) {
      alert("Employee not found!");
      return;
    }

    // ✅ SalarySlip page pe navigate with data
    navigate("/salaryslip", {
      state: {
        mode: "create", // ✅ naya flag
        employee_id: selectedEmp.id,
        employee_name: selectedEmp.name,
        designation: selectedEmp.designation,
        month,
        year,
        mainSalary: selectedEmp.mainSalary,
      },
    });
  };

  return (
    <div className="p-6 w-1/2 mx-auto bg-slate-50 border rounded shadow">
      {/* 🔹 Add Employee Button */}
      <div className="text-right mb-4">
        <button
          onClick={() => navigate("/empfoam")}
          className="hover:bg-white hover:text-black hover:border-black hover:border-2 bg-green-500 text-white px-4 py-2 rounded"
        >
          + Add Employee
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Salary System</h1>

      {/* Employee Select */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Select Employee</label>
        <select
          className="border p-2 rounded w-full"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        >
          <option value="">--Select Employee--</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      {/* Month Select */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Select Month</label>
        <select
          className="border p-2 rounded w-full"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">--Select Month--</option>
          {months.map((m, idx) => (
            <option key={idx} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Year Select */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Select Year</label>
        <select
          className="border p-2 rounded w-full"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">--Select Year--</option>
          {years.map((y, idx) => (
            <option key={idx} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="hover:bg-white hover:text-black hover:border-black hover:border-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
