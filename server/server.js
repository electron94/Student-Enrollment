// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const morgan = require('morgan')
// const cors = require('cors')

// const app = express();
// const PORT = process.env.PORT || 3001;
// 

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/student-enrollment', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Define Student schema
// // const studentSchema = new mongoose.Schema({
// //   Rollno: String,
// //   name: String,
// //   email: String,
// //   course: String,
// //   phone: String,
// // });

// // const Student = mongoose.model('Student', studentSchema);

// // Middleware
// app.use(bodyParser.json());

// 
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
// app.use('/student',StudentRoute)


const express  =require('express')
const mongoose  =require('mongoose')
const morgan  =require('morgan')
const bodyParser =require('body-parser')
const cors = require('cors')
 
 
const StudentRoute = require('./routes/student')
mongoose.connect('mongodb://localhost:27017/student-enrollment',{useNewUrlParser:true,useUnifiedTopology:true,});
const db=mongoose.connection
 
db.on('error',(err)=>{
    console.log(err)
})
 
db.once('open', ()=>{
    console.log('database is established')
})
 
const app=express()
 
  app.use(cors());
 
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// Route to handle student enrollment
app.post('/store', async (req, res) => {
  const studentData = req.body;

  try {
    // Create a new student instance and save it to the database
    const newStudent = new Student(studentData);
    await newStudent.save();

    res.json({ success: true, message: 'Student enrolled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

 
const   PORT =process.env.PORT || 3004;
 
 
 
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});
 
app.use('/student',StudentRoute);

