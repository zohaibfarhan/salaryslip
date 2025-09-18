import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeForm from "./pages/EmployeeForm";
import SalaryForm from "./pages/SalaryForm"; // agar future me salary form chahiye
import EmployeeTable from "./pages/employeetabel"; // table page
import SalarySlip from "./pages/salaryslip";

function App() {
  return (
    <Router>
      <div className="p-6">
        <Routes>
          {/* Home page: Employee Form */}
          <Route path="/empfoam" element={<EmployeeForm />} />

          {/* Employee Table page */}
          <Route path="/emptable" element={<EmployeeTable />} />

          {/* Salary form page (optional) */}
          <Route path="/" element={<SalaryForm />} />

          <Route path="/salaryslip" element={<SalarySlip />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
