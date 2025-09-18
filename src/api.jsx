import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const addEmployee = (data) => API.post("/employees", data);
export const getEmployees = () => API.get("/employees");
export const addSalary = (data) => API.post("/salaries", data);
export const getSalarySlip = (employeeId, month, year) =>
  API.get(`/salaries/slip/${employeeId}/${month}/${year}`);
