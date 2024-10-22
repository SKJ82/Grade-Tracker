const bcrypt = require('bcrypt')
const Student = require('../models/user').Student;
const Teacher = require('../models/user').Teacher;

const teacher_signup_get = (req, res) => {
    res.render("teacher/teacherSignup");
};

const teacher_signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingTeacher = await Teacher.findOne({ email });

        if (existingTeacher) {
            return res.render("teacher/teacherSignup", {
                error: "Email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newTeacher = new Teacher({
            email,
            password: hashedPassword
        });

        await newTeacher.save();

        res.redirect("/teacher/option");
    } catch (error) {
        console.error(error);
        res.render("teacher/teacherSignup", {
            error: "An error occurred during signup."
        });
    }
};

const teacher_login_get = (req, res) => {
    res.render("teacher/teacherLogin");
};

const teacher_login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const teacher = await Teacher.findOne({ email });

        if (!teacher) {
            return res.render("teacher/teacherLogin", {
                error: "Email not found."
            });
        }

        const isMatch = await bcrypt.compare(password, teacher.password);
        if (isMatch) {
            return res.redirect("/teacher/option");
        } else {
            return res.render("teacher/teacherLogin", {
                error: "Please enter the correct password."
            });
        }
    } catch (error) {
        console.error(error);
        return res.render("teacher/teacherLogin", {
            error: "An error occurred during login."
        });
    }
};


const teacher_viewall_get = async (req, res) => {
    const allStudents = await Student.find() 
    res.render("teacher/viewall", {student : allStudents})
};

const teacher_edit_get =async (req, res) => {
    const user = await Student.findById(req.params.id)
    res.render("teacher/edit", {user : user})
};
const teacher_edit_post =async (req, res) => {
    const user = await Student.findByIdAndUpdate(req.params.id,req.body)
    res.redirect("/teacher/viewall")
};
const teacher_delete_get =async (req, res) => {
    await Student.findByIdAndDelete(req.params.id)
    res.redirect("/teacher/viewall")
};
const teacher_option_get = (req,res) => {
    res.render("teacher/option")
};
const teacher_add_get = (req, res) => {
    res.render("teacher/addstudent");
};
const teacher_add_post = async (req, res) => {
    const singleStudent = new Student({
        name : req.body.name,  
        roll : req.body.roll,             
        dob : req.body.dob,
        score : req.body.score        
    })
    try {
        const newStudent = await singleStudent.save();
        res.redirect("/teacher/add");
      } catch {
        res.send("error")
    }
};

module.exports={
    teacher_signup_get,
    teacher_signup_post,
    teacher_login_get,
    teacher_login_post,
    teacher_viewall_get,
    teacher_edit_get,
    teacher_edit_post,
    teacher_delete_get,
    teacher_add_post,
    teacher_add_get,
    teacher_option_get
}