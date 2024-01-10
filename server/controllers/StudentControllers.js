const Student = require('../models/Student')
 
//show the list of employees
const index =(req,res,next)=>{
    Student.find().sort({ _id: -1 })
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
    // Extract student details from the request body
    const newStudent = {
        name: req.body.name,
        email: req.body.email,
        course: req.body.course,
        phone: req.body.phone,
        password: req.body.password
    };
 
    // Check for duplicate email
    Student.findOne({ email: newStudent.email })
        .then(existingStudent => {
            if (existingStudent) {
                // Student with this email already exists
                res.status(400).json({
                    success: false,
                    message: 'Student with this email already exists',
                });
            } else {
                // Email is not a duplicate, proceed to save
                const student = new Student(newStudent);
                student.save()
                    .then(() => {
                        res.status(201).json({
                            success: true,
                            status:true,
                            message: 'Student added successfully',
                        });
                    })
                    .catch(error => {
                        res.status(500).json({
                            success: false,
                            message: 'An error occurred while saving the student',
                        });
                    });
            }
        })
        .catch(error => {
            res.status(500).json({
                success: false,
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
 
 
const authenticate= async (req, res) => {
 
    try {
        const userDetails = req.body;
        const email = userDetails.email;
        const password = userDetails.password;
        const userData  = await Student.findOne({ email: email ,password:password});
        return res.status(200).json({ Status: true, user_details: userData,message: "User login successfully!" })
    } catch (err) {
        return res.status(500).json({ Status: false, message: "Internal Server Error!" })
    }
  }
 
 
 
module.exports={
    index,show,store,update,destroy,authenticate
}