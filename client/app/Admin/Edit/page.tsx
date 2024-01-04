'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
 
 
const Edit = () => {
 
 
  const [student, setStudent] = useState<any>({
  });
  const router = useRouter();
  const{id} = useParams();
  
 
  useEffect(() => {
    let userId:any=localStorage.getItem("UserId")
    console.log(userId)
  }, []);
 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        let userId = localStorage.getItem("UserId");
        const body = {
          studentID: userId
        }
       
        const response = await axios.post<any>('http://localhost:3004/student/show', body);
       
        const studentData = (response.data)
        setStudent(studentData.response);
 
        console.log('Student Data:', studentData);
      } catch (err) {
        console.error('Error fetching student data:', err);
      }
    };
 
    fetchData();
  }, []);
 
 
 
 
useEffect(() => {
let studentid:any=localStorage.getItem("studentID")
console.log("jgkkjj",studentid
)
}, []);
 
const handleUpdate = (e: { preventDefault: () => void; }) => {
e.preventDefault();
console.log('Updating with student data:', student);
 
 
let userId = localStorage.getItem("UserId");
if (!userId) {
    console.error('User ID not found in localStorage.');
    return;
  }
 
const body = {
    studentID: userId,
    Rollno: student.rollno,
    name: student.name,
    email: student.email,
    course: student.course,
    phone: student.phone,
    password: student.password
  }
 
console.log('Update request body:', body);
axios.post('http://localhost:3004/student/update', body)
  .then(result => {
    console.log('Update result:', result);
    router.push('/');
  })
  .catch(err => console.error('Error updating student:', err));
}
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className='d-flex w-100 vh-100 justify-contect-center align-items-center'>
    <div className='w-50 border bg-light p-5'>
     <h2 className='text-center mb-4'>Edit User</h2>
     <form onSubmit={handleUpdate} className='bg-white rounded p-4 w-120 shadow-md'>    
 
     <div className='form-group mb-3 p-2'>
           <label htmlFor='Rollno' className="text-sm font-medium text-gray-700">Rollno:</label>
           <input className={'w-full border rounded p-2 $ {errors.rollno && errors.rollno.type==="required" ? "border-red-500" : "border-gray-300"}'}
            type='text'
            placeholder='enter the Rollno'
            value={student.rollno}
            onChange={(e) => setStudent({ ...student, rollno:e.target.value} )}
            />
        </div>
        <div className='form-group mb-3 p-2'>
           <label htmlFor='name' className="text-sm font-medium text-gray-700">Name:</label>
           <input className={'w-full border rounded p-2 $ {errors.name && errors.name.type==="required" ? "border-red-500" : "border-gray-300"}'}
            type='text'
            placeholder='enter the name'
            value={student.name}
            onChange={(e) => setStudent({ ...student, name:e.target.value} )}
            />
        </div>
        <div className='form-group mb-3 p-2'>
            <label htmlFor='email'  className="text-sm font-medium text-gray-700">Email:</label>
            <input className={'w-full border rounded p-2 $ {errors.name && errors.name.type==="required" ? "border-red-500" : "border-gray-300"}'}
             type='email'
             placeholder='enter the email'
             value={student.email}
             onChange={(e) => setStudent({ ...student, email: e.target.value })}
           
            />
        </div>
        <div className='form-group mb-3 p-2'>
            <label htmlFor='course'  className="text-sm font-medium text-gray-700">course:</label>
            <input className={'w-full border rounded p-2 $ {errors.name && errors.name.type==="required" ? "border-red-500" : "border-gray-300"}'}
             type='text'
             placeholder='select the course'
             value={student.course}
             onChange={(e) => setStudent({ ...student, course: e.target.value })}
           
            />
        </div>
       
        <div className='form-group mb-3 p-2'>
            <label htmlFor='phone' className="text-sm font-medium text-gray-700">Phone:</label>
            <input className={'w-full border rounded p-2 $ {errors.phone && errors.phone.type==="required" ? "border-red-500" : "border-gray-300"}'}
             type='number'
             placeholder='enter the phone'
             value={student.phone}
             onChange={(e) => setStudent({ ...student, age: e.target.value })}
            />
        </div>
 
        <div className='form-group mb-3 p-2'>
            <label htmlFor='password'  className="text-sm font-medium text-gray-700">password:</label>
            <input className={'w-full border rounded p-2 $ {errors.name && errors.name.type==="required" ? "border-red-500" : "border-gray-300"}'}
             type='text'
             placeholder='enter the password'
             value={student.password}
             onChange={(e) => setStudent({ ...student, password: e.target.value })}
           
            />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 rounded-lg px-6 py-3">Update</button>
     </form>
    </div>
   </div>
</main>
  )
}
 
export default Edit