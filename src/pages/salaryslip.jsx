import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Logo1 from "../assets/img/logo1.png";
import Logo2 from "../assets/img/logo2.png";

export default function SalarySlip() {
  // 🔹 SalaryForm / SelectForm se data receive karna
  const location = useLocation();
  const {
    mode, // ✅ yahan se milega (create / view)
    employee_id,
    employee_name,
    designation,
    month,
    year,
    mainSalary,
  } = location.state || {};

  // 🔹 State for dynamic inputs
  const [salary, setSalary] = useState(mainSalary || 0);
  const [leaves, setLeaves] = useState("");
  const [incomeTax, setIncomeTax] = useState("");
  const [bonus, setBonus] = useState("");
  const [error, setError] = useState("");

  // ✅ Agar view mode hai to DB se salary slip load karni hai
  useEffect(() => {
    if (mode === "view" && employee_id && month && year) {
      fetch(
        `http://localhost/salary-backend/get_salary_slip.php?employee_id=${employee_id}&month=${month}&year=${year}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            const d = data.data;
            setSalary(d.main_salary);
            setLeaves(d.leaves);
            setIncomeTax(d.income_tax);
            setBonus(d.bonus);
          } else {
            setError("Salary slip not found for this month/year");
          }
        })
        .catch(() => setError("Failed to fetch salary slip"));
    }
  }, [mode, employee_id, month, year]);

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

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

  const handlePrint = () => {
    const slipContent = document.getElementById("slip-area").innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
    <html>
      <head>
        <title>Salary Slip</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          td, th { border: 1px solid #000; padding: 8px; text-align: left; }
          h1, h2, h3 { text-align: center; }
        </style>
      </head>
      <body>
        ${slipContent}
      </body>
    </html>
  `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // 🔹 Save to Database (sirf create mode me)
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
    <div
      id="slip-area"
      className="min-h-[120vh] bg-slate-500 text-white flex justify-center items-start p-6"
    >
      <div className="w-1/2 bg-slate-500 shadow p-6">
        <div className="grid grid-cols-2 items-center mt-4">
          <div className="text-left flex justify-start">
            <img src={Logo1} alt="First logo" className="h-full" />
          </div>
          <div className="text-right flex justify-end">
            <img src={Logo2} alt="Second logo" className="w-44 " />
          </div>
        </div>
        {/* Header */}
        <h1 className="text-2xl font-bold text-center">SALARY SLIP</h1>
        <h2 className="text-lg text-center">
          FOR THE MONTH OF {month}, {year}
        </h2>
        <h3 className="mb-6 text-center">
          {employee_name || "Employee Name"}
          {designation ? ` , ${designation}` : ""}
        </h3>
        {/* Salary Input (read-only always) */}
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
              readOnly
            />
          </div>
          <div className="text-left ml-8">House Rent</div>

          <div className="text-right">
            <input
              className="border rounded-lg p-1 w-24 text-right text-black"
              type="number"
              value={house.toFixed(0)}
              readOnly
            />
          </div>
          <div className="text-left ml-8">Utilities</div>
          <div className="text-right">
            <input
              className="border rounded-lg p-1 w-24 text-right text-black"
              type="number"
              value={utilities.toFixed(0)}
              readOnly
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
              readOnly
            />
          </div>
          <div className="text-left ml-8">Leaves / Late Joining</div>
          <div className="text-right">
            <input
              type="number"
              value={leaves}
              onChange={(e) => mode === "create" && setLeaves(e.target.value)}
              readOnly={mode === "view"}
              className="border rounded-lg p-1 w-24 text-right text-black"
            />
          </div>
          <div className="text-left ml-8">Income Tax</div>
          <div className="text-right">
            <input
              type="number"
              value={incomeTax}
              onChange={(e) =>
                mode === "create" && setIncomeTax(e.target.value)
              }
              readOnly={mode === "view"}
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
              readOnly
            />
          </div>
          <div className="text-left ml-8">Arrears / Bonus </div>
          <div className="text-right">
            <input
              type="number"
              value={bonus}
              onChange={(e) => mode === "create" && setBonus(e.target.value)}
              readOnly={mode === "view"}
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
        {/* Save Button sirf create mode me */}
        {mode === "create" && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600  "
            >
              Save
            </button>
          </div>
        )}
        {/* Print Button (sirf view mode ke liye) */}
        {location.state?.mode === "view" && (
          <div className="flex justify-end mt-4 no-print">
            <button
              onClick={handlePrint}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 no-print"
            >
              Print
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
