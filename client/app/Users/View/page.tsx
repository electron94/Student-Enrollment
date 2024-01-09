'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
 
 
const view = () => {
 
 
  const [student, setStudent] = useState<any>({
  });
 
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
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className='d-flex w-100 vh-100 justify-contect-center align-items-center'>
    <div className='w-50 border bg-light p-5'>
     <h2 className='text-center mb-4'>View User</h2>
     <form  className='bg-white rounded p-4 w-120 shadow-md'>    

        <div className='form-group mb-3 p-2'>
           <label htmlFor='name' className="text-sm font-medium text-gray-700">Name:</label>
           <input className={'w-full border rounded p-2 $ {errors.name && errors.name.type==="required" ? "border-red-500" : "border-gray-300"}'}
            type='text'
            placeholder='enter the name'
            value={student?.name}/>
        </div>
        <div className='form-group mb-3 p-2'>
            <label htmlFor='email'  className="text-sm font-medium text-gray-700">Email:</label>
            <input className={'w-full border rounded p-2 $ {errors.name && errors.name.type==="required" ? "border-red-500" : "border-gray-300"}'}
             type='email'
             placeholder='enter the email'
             value={student?.email} />
        </div>
        <div className='form-group mb-3 p-2'>
            <label htmlFor='course'  className="text-sm font-medium text-gray-700">course:</label>
            <input className={'w-full border rounded p-2 $ {errors.name && errors.name.type==="required" ? "border-red-500" : "border-gray-300"}'}
             type='text'
             placeholder='select the course'
             value={student?.course} />
        </div>
        <div className='form-group mb-3 p-2'>
            <label htmlFor='phone' className="text-sm font-medium text-gray-700">Phone:</label>
            <input className={'w-full border rounded p-2 $ {errors.phone && errors.phone.type==="required" ? "border-red-500" : "border-gray-300"}'}
             type='number'
             placeholder='enter the phone'
             value={student?.phone} />
        </div>
        <div className='form-group mb-3 p-2'>
            <label htmlFor='password'  className="text-sm font-medium text-gray-700">password:</label>
            <input className={'w-full border rounded p-2 $ {errors.name && errors.name.type==="required" ? "border-red-500" : "border-gray-300"}'}
             type='text'
             placeholder='enter the password'
             value={student?.password}/>
        </div>
        <Link href='/Users/Login' className="bg-blue-700 text-white font-semibold rounded p-1 cursor-pointer" >Cancel</Link>
     </form>
    </div>
   </div>
</main>
  )
}
 
export default view