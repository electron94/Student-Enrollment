const mongoose  =require('mongoose')
 
const Schema     =  mongoose.Schema
 
const studentSchema = new Schema({
   
    name: String,
    email: String,
    course: String,
    phone: String,
    password:String
  });
const Studentmodel = mongoose.model('student', studentSchema)
module.exports = Studentmodel