'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
 
 
const view = () => {
 
 
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
        let userIdString = localStorage.getItem("userDetails");
        if (userIdString !== null) {
          try {
            let userId = JSON.parse(userIdString);
    
            // Check if userId has the _id property
            if (userId && typeof userId._id === 'string') {
              let id: string = userId._id;
              console.log("userId", userId._id);
  
              const body = {
                studentID: id
              };
  
              const response = await axios.post<any>('http://localhost:3004/student/show', body);
  
              const userDetails = response.data;
              setStudent(userDetails.response);
  
              console.log('userDetails:', userDetails);
            }
          } catch (err) {
            console.error('Error parsing user details or fetching student data:', err);
          }
        } else {
          console.error("User details not found in localStorage.");
        }
      } catch (error) {
        console.error("Outer try block error:", error);
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
    StudentID: userId,
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
     <h2 className='text-center mb-4'>View User</h2>
     <form onSubmit={handleUpdate} className='bg-white rounded p-4 w-120 shadow-md'>    
 
   
        <div className='form-group mb-3 p-2'>
           <label htmlFor='name' className="text-sm font-medium text-gray-700">Name:</label>
           <input className={'w-full border rounded p-2 $ {errors.name && errors.name.type==="required" ? "border-red-500" : "border-gray-300"}'}
            type='text'
            placeholder='enter the name'
            value={student?.name}
            onChange={(e) => setStudent({ ...student, name:e.target.value} )}
            />
        </div>
        <div className='form-group mb-3 p-2'>
            <label htmlFor='email'  className="text-sm font-medium text-gray-700">Email:</label>
            <input className={'w-full border rounded p-2 $ {errors.name && errors.name.type==="required" ? "border-red-500" : "border-gray-300"}'}
             type='email'
             placeholder='enter the email'
             value={student?.email}
             onChange={(e) => setStudent({ ...student, email: e.target.value })}
           
            />
        </div>
        <div className='form-group mb-3 p-2'>
            <label htmlFor='course'  className="text-sm font-medium text-gray-700">course:</label>
            <input className={'w-full border rounded p-2 $ {errors.name && errors.name.type==="required" ? "border-red-500" : "border-gray-300"}'}
             type='text'
             placeholder='select the course'
             value={student?.course}
             onChange={(e) => setStudent({ ...student, course: e.target.value })}
           
            />
        </div>
       
        <div className='form-group mb-3 p-2'>
            <label htmlFor='phone' className="text-sm font-medium text-gray-700">Phone:</label>
            <input className={'w-full border rounded p-2 $ {errors.phone && errors.phone.type==="required" ? "border-red-500" : "border-gray-300"}'}
             type='number'
             placeholder='enter the phone'
             value={student?.phone}
             onChange={(e) => setStudent({ ...student, age: e.target.value })}
            />
        </div>
 
        <div className='form-group mb-3 p-2'>
            <label htmlFor='password'  className="text-sm font-medium text-gray-700">password:</label>
            <input className={'w-full border rounded p-2 $ {errors.name && errors.name.type==="required" ? "border-red-500" : "border-gray-300"}'}
             type='text'
             placeholder='enter the password'
             value={student?.password}
             onChange={(e) => setStudent({ ...student, password: e.target.value })}
           
            />
        </div>
        <Link href='/' className="bg-blue-700 text-white font-semibold rounded p-1 cursor-pointer" >Cancel</Link>
     </form>
    </div>
   </div>
</main>
  )
}
 
export default view