import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function SalarySlip() {
  // 🔹 SalaryForm se data receive karna
  const location = useLocation();
  const { employee_id, employee_name, month, year, mainSalary } =
    location.state || {};

  // 🔹 State for dynamic inputs
  const [salary] = useState(mainSalary || 0);
  const [leaves, setLeaves] = useState("");
  const [incomeTax, setIncomeTax] = useState("");
  const [bonus, setBonus] = useState("");

  // 🔹 Convert to numbers
  const salaryNum = parseFloat(salary) || 0;
  const leavesNum = parseFloat(leaves) || 0;
  const taxNum = parseFloat(incomeTax) || 0;
  const bonusNum = parseFloat(bonus) || 0;

  // 🔹 Salary Bifurcation
  const basic = salaryNum * 0.6439299;
  const house = salaryNum * 0.28965;
  const utilities = salaryNum - (basic + house);
  const gross = basic + house + utilities;

  // 🔹 Deductions
  const providentFund = salaryNum * 0.0529268;
  const totalDeductions = providentFund + leavesNum + taxNum;

  // 🔹 Additions
  const medicalAllowance = 1500;
  const totalAdditions = medicalAllowance + bonusNum;

  // 🔹 Net Salary
  const netSalary = gross - totalDeductions + totalAdditions;

  // 🔹 Save to Database
  const handleSave = () => {
    const slipData = {
      employee_id,
      employee_name,
      month,
      year,
      main_salary: salaryNum,
      basic_salary: basic,
      house_rent: house,
      utilities,
      gross_salary: gross,
      provident_fund: providentFund,
      leaves: leavesNum,
      income_tax: taxNum,
      total_deductions: totalDeductions,
      medical_allowance: medicalAllowance,
      bonus: bonusNum,
      total_additions: totalAdditions,
      net_salary: netSalary,
    };

    fetch("http://localhost/salary-backend/save_salary_slip.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slipData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Salary Slip Saved Successfully ✅");
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-[120vh] bg-slate-500 text-white flex justify-center items-start p-6">
      <div className="w-1/2 bg-slate-500 shadow p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center">SALARY SLIP</h1>
        <h2 className="text-lg text-center">
          FOR THE MONTH OF {month}, {year}
        </h2>
        <h3 className="mb-6 text-center">{employee_name || "Employee Name"}</h3>

        {/* Salary Input (read-only) */}
        <div className="mb-6">
          <label className="mr-2 font-medium">Main Salary (PKR):</label>
          <input
            type="number"
            value={salaryNum}
            readOnly
            className="border rounded-lg p-2 w-48 text-black bg-gray-200"
          />
        </div>

        {/* Salary Bifurcation */}
        <div className="grid grid-cols-2 gap-2 border p-3 mb-4">
          <div className="text-left font-semibold mb-2 mt-4 underline decoration-2 underline-offset-4 ">
            SALARY BIFURCATION: -
          </div>
          <div className="text-right font-semibold mt-4 mb-2">Amount(PKR)</div>
          <div className="text-left ml-8">Basic Salary</div>
          <div className="text-right  ">
            <input
              className="border rounded-lg p-1 w-24 text-right text-black"
              type="number"
              value={basic.toFixed(0)}
            />
          </div>
          <div className="text-left ml-8">House Rent</div>

          <div className="text-right">
            <input
              className="border rounded-lg p-1 w-24 text-right text-black"
              type="number"
              value={house.toFixed(0)}
            />
          </div>
          <div className="text-left ml-8">Utilities</div>
          <div className="text-right">
            <input
              className="border rounded-lg p-1 w-24 text-right text-black"
              type="number"
              value={utilities.toFixed(0)}
            />
          </div>
          <div className="font-bold text-left ml-8 mt-3 ">Gross Salary</div>
          <div className="text-right font-bold border-t-4 border-b-4 border-white mt-2 py-1">
            {gross.toFixed(0)}
          </div>
        </div>

        {/* Deductions */}
        <div className="grid grid-cols-2 gap-2 border p-3 mb-4">
          <div className="text-left font-semibold mt-4 mb-2 underline decoration-2 underline-offset-4">
            DEDUCTIONS: -
          </div>
          <div></div>
          <div className="text-left ml-8">Provident Fund</div>
          <div className="text-right">
            <input
              className="border rounded-lg p-1 w-24 text-right text-black ml-2"
              type="number"
              value={providentFund.toFixed(0)}
            />
          </div>
          <div className="text-left ml-8">Leaves / Late Joining</div>
          <div className="text-right">
            <input
              type="number"
              value={leaves}
              onChange={(e) => setLeaves(e.target.value)}
              className="border rounded-lg p-1 w-24 text-right text-black"
            />
          </div>
          <div className="text-left ml-8">Income Tax</div>
          <div className="text-right">
            <input
              type="number"
              value={incomeTax}
              onChange={(e) => setIncomeTax(e.target.value)}
              className="border rounded-lg p-1 w-24 text-right text-black"
            />
          </div>
          <div className="font-bold text-left ml-8 mt-3">Total</div>
          <div className="text-right font-bold border-t-4 border-b-4 border-white mt-2">
            {totalDeductions.toFixed(0)}
          </div>
        </div>

        {/* Additions */}
        <div className="grid grid-cols-2 gap-2 border p-3 mb-4">
          <div className="text-left font-semibold mt-4 mb-2 underline decoration-2 underline-offset-4">
            ADDITIONS: -
          </div>
          <div></div>
          <div className="text-left ml-8">Medical Allowance</div>
          <div className="text-right">
            <input
              className="border rounded-lg p-1 w-24 text-right text-black"
              type="number"
              value={medicalAllowance}
            />
          </div>
          <div className="text-left ml-8">Arrears / Bonus </div>
          <div className="text-right">
            <input
              type="number"
              value={bonus}
              onChange={(e) => setBonus(e.target.value)}
              className="border rounded-lg p-1 w-24 text-right text-black"
            />
          </div>
          <div className="font-bold text-left ml-8 mt-3">Total</div>
          <div className="text-right font-bold border-t-4 border-b-4 border-white mt-2">
            {totalAdditions.toFixed(0)}
          </div>

          {/* Net Salary */}
          <div className="font-bold mt-7 text-left ml-8">NET SALARY</div>
          <div className="text-xl font-bold mt-6 text-right border-4 border-white pr-2">
            {netSalary.toFixed(0)} PKR
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600  "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
