import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SelectSlipForm() {
  const { id } = useParams(); // employee ka ID milega
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

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
  const years = [2022, 2023, 2024, 2025];

  // ✅ employee data fetch
  useEffect(() => {
    fetch("http://localhost/salary-backend/fetch.php")
      .then((res) => res.json())
      .then((data) => {
        const emp = data.find((e) => String(e.id) === String(id));
        setEmployee(emp);
      });
  }, [id]);

  const handleNext = () => {
    if (!month || !year) {
      alert("Please select Month & Year");
      return;
    }
    navigate("/salaryslip", {
      state: {
        mode: "view", // ✅ yahan view mode
        employee_id: employee.id,
        employee_name: employee.name, // ✅ ye add kiya
        designation: employee.designation, // ✅ ye add kiya
        month,
        year,
      },
    });
  };

  if (!employee) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 w-1/2 mx-auto bg-slate-50 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Generate Salary Slip for {employee.name} , {employee.designation}
      </h1>

      {/* Month */}
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

      {/* Year */}
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

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
