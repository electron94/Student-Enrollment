
const Student = require('../models/Student')
 
//show the list of employees
const index =(req,res,next)=>{
    Student.find()
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(error=>{
        res.json({
            message:'an error occured'
        })
    })
}
 
const show =(req,res,next)=>{
    let studentID =req.body.studentID
    Student.findById(studentID)
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(error=>{
        message:'an error occured'
    })
}

const store = (req, res, next) => {
    const newStudent = {
       
        name: req.body.name,
        email: req.body.email,
        course:req.body.course,
        phone: req.body.phone,
        password:req.body.password
    };

    // Check for duplicate email
    Student.findOne({ email: newStudent.email })
        .then(existingStudent => {
            if (existingStudent) {
                // Employee with this email already exists
                res.json({
                    message: 'student with this email already exists',
                });
            } else {
                // Email is not a duplicate, proceed to save
                const student = new Student(newStudent);
                student.save()
                    .then(() => {
                        res.json({
                            message: 'Student added successfully',
                        });
                    })
                    .catch(error => {
                        res.json({
                            message: 'An error occurred while saving the student',
                        });
                    });
            }
        })
        .catch(error => {
            res.json({
                message: 'An error occurred while checking for duplicate email',
            });
        });
};
   // update an employee
    const update = (req, res, next) => {
        let StudentID = req.body.StudentID;
        let updatedData = {
           
            name: req.body.name,
            email: req.body.email,
            course: req.body.course,
            phone: req.body.phone,
            password: req.body.password
        };
    
        Student.findByIdAndUpdate(StudentID, { $set: updatedData }, { new: true })
            .then((updatedStudent) => {
                if (!updatedStudent) {
                    return res.status(404).json({
                        message: 'User not found'
                    });
                }
                res.json({
                    message: 'User updated successfully',
                    data: updatedStudent
                });
            })
            .catch((error) => {
                res.status(500).json({
                    message: 'An error occurred'
                });
            });
    };
 
//delete an employee
 
const destroy =(req,res,next)=>{
    let studentID =req.body.studentID
    Student.findByIdAndDelete(studentID)
    .then(()=>{
        res.json({
            message:'student deleted successfully'
        })
    })
    .catch(error=>{
       
        res.json({
            message:'an error occured'
        })
    })
}
const authenticate = (req, res) => {
    const { email, password } = req.body;
   
    // Check the email and password against your database
    Student.findOne({ email, password })
      .then(student => {
        if (student) {
          // In a real-world scenario, you'd generate a JWT token and return it to the client
          // For simplicity, we're returning a plain object here
          res.json({ token: 'your_generated_token' });
        } else {
          res.status(401).json({ error: 'Authentication failed' });
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred' });
      });
  };
 
module.exports={
    index,show,store,update,destroy,authenticate
} 

 