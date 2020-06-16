const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/", employeeController.home);

//Add Employee
router.get("/add-employee", employeeController.addEmployee);
router.post("/add-employee", employeeController.saveEmployee);

//edit Employee
router.get("/edit/:id", employeeController.editEmployee);
router.put("/edit/:id", employeeController.updateEmployee);
router.delete("/delete/:id", employeeController.deleteEmployee);

//Search Employee
router.get("/search", employeeController.searchEmployee);
router.get("/search-results", employeeController.searchEmployeeResult);

module.exports = router;
