import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate(); // 🔹 navigation hook

  useEffect(() => {
    fetch("http://localhost/system/get_employees.php")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  return (
    <div className="p-6 w-1/2 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      <table className="border w-full text-left">
        <thead>
          <tr>
            <th className="border px-2">ID</th>
            <th className="border px-2">Name</th>
            <th className="border px-2">DOJ</th>
            <th className="border px-2">Designation</th>
            <th className="border px-2">Email</th>
            <th className="border px-2">Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="border px-2">{emp.id}</td>
              <td className="border px-2">{emp.name}</td>
              <td className="border px-2">{emp.doj}</td>
              <td className="border px-2">{emp.designation}</td>
              <td className="border px-2">{emp.email}</td>
              <td className="border px-2">{emp.mainSalary}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 Back Button */}
      <div className="mt-4">
        <button
          onClick={() => navigate("/empfoam")} // 🔹 navigate to EmployeeForm
          className="hover:bg-white hover:text-black hover:border-black hover:border-2  bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
}
