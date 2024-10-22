const Student = require('../models/user').Student;

const student_login_get = (req, res) => {
       res.render("student/login");
    };

const student_login_post = async (req, res) => {

        const Sturoll = req.body.roll;   
        const dob = req.body.dob;
        const individualStudent = await Student.findOne({roll : Sturoll, dob : dob});    
        if(!individualStudent){
          res.render("student/login", {
            error : "Please enter correct credentials"
          })
        }      
        res.render("student/view", { one : individualStudent});
};

module.exports={
    student_login_get,
    student_login_post
}
