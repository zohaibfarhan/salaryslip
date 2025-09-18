import express from "express";
import cors from "cors";
import mysql from "mysql2";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpassword",
  database: "employee_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

// API: Add Employee
app.post("/api/employees", (req, res) => {
  const { name, doj, designation, email, mainSalary } = req.body;
  const sql =
    "INSERT INTO employees (name, doj, designation, email, main_salary) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, doj, designation, email, mainSalary], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Employee added successfully");
  });
});

// API: Get Employees
app.get("/api/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// API: Add Salary
app.post("/api/salaries", (req, res) => {
  const { employeeId, month, year } = req.body;
  const sql =
    "INSERT INTO salaries (employee_id, month, year) VALUES (?, ?, ?)";
  db.query(sql, [employeeId, month, year], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Salary record added");
  });
});

// API: Get Salary Slip
app.get("/api/salaries/slip/:employeeId/:month/:year", (req, res) => {
  const { employeeId, month, year } = req.params;
  const sql = `
    SELECT e.name, e.designation, e.main_salary, s.month, s.year
    FROM employees e
    JOIN salaries s ON e.id = s.employee_id
    WHERE e.id = ? AND s.month = ? AND s.year = ?`;
  db.query(sql, [employeeId, month, year], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
