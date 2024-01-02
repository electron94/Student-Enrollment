
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
 
const store= (req,res,next)=>{
    let student = new Student({
        Rollno:req.body.Rollno,
        name: req.body.name,
        email: req.body.email,
        course:req.body.course,
        phone: req.body.phone,
        password:req.body.password
    })
    student.save()
    .then(response=>{
        res.json({
            message:'User added successfully'
        })
    })
    .catch(error=>{
        res.json({
            message:'an error occured'
        })
    })
}
    //update an employee
 
    const update = (req,res,next)=>{
        let UserID = req.body.UserID
        let updatedData ={
                Rollno:req.body.Rollno,
                name: req.body.name,
                email: req.body.email,
                course:req.body.course,
                phone: req.body.phone,
                password:req.body.password
        }
        User.findByIdAndUpdate(UserID, {$set: updatedData})
        .then(()=>{
            res.json({
                message:'User updated successfully'
            })
        })
        .catch(error=>{
            res.json({
                message:'an error occured '
            })
        })
    }
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
 
module.exports={
    index,show,store,update,destroy
}
 