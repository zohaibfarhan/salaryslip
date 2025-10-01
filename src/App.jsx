import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeForm from "./pages/EmployeeForm";
import SalaryForm from "./pages/SalaryForm";
import EmployeeTable from "./pages/employeetabel";
import SelectSlipForm from "./pages/SelectSlipForm";
import SalarySlip from "./pages/salaryslip";
import Navbar from "./components/navbar";
function App() {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <div className="p-6">
        <Routes>
          <Route path="/select-slip/:id" element={<SelectSlipForm />} />

          {/* Employee Form page */}
          <Route path="/empform" element={<EmployeeForm />} />

          {/* Employee Table page */}
          <Route path="/emptable" element={<EmployeeTable />} />

          {/* Salary Form page */}
          <Route path="/salaryform" element={<SalaryForm />} />

          {/* Salary Slip page */}
          <Route path="/salaryslip" element={<SalarySlip />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
