var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const employeeSchema = new Schema({
  title: String,
  designation: String,
  salary: Number,
});

module.exports = mongoose.model("EmployeesModel", employeeSchema);
