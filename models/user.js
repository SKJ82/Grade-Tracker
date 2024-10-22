const mongoose = require("mongoose")
const { Schema } = mongoose;

const studentSchema = new Schema({
  roll: {
    type : Number,
    unique : true
  } ,
  name: String,     
  dob:{
    type:Date
  } ,
  score:Number 
});

const teacherSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = {
  Student : mongoose.model("Student", studentSchema), 
  Teacher : mongoose.model("Teacher", teacherSchema)}
;
