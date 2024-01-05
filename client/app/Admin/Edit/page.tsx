'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import {useForm} from 'react-hook-form';
 
 
const Edit = () => {
 
 
  const [student, setStudent] = useState<any>({
  });
  const[IsModified,setIsModified]=useState('');
  const{register,trigger,formState:{errors},setValue}=useForm();
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
    router.push('/Admin');
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
           <label htmlFor='name' className="text-sm font-medium text-gray-700">Name:</label>
           <input className={'w-full border rounded p-2 $ {errors.name && errors.name.type==="required" ? "border-red-500" : "border-gray-300"}'}
             {...register("name", {required: true, minLength: 4}  ) }
             onBlur={() => trigger("name")}
            
            type='text'
            placeholder='enter the name'
            value={student.name}
            onChange={(e) =>{ setStudent({ ...student, name:e.target.value} );
              setValue("name",e.target.value);
              trigger("name");
              setIsModified(true);
              }}
            />
             {errors.name && errors.name.type === "required" &&  <p className='text-red-500 text-sm'>Please enter the name</p>}
            {errors.name && errors.name.type === "minLength" && <p className='text-yellow-500 text-sm'>Please enter at least 4 characters</p>}
        </div>
        <div className='form-group mb-3 p-2'>
            <label htmlFor='email'  className="text-sm font-medium text-gray-700">Email:</label>
            <input className={'w-full border rounded p-2 $ {errors.name && errors.name.type==="required" ? "border-red-500" : "border-gray-300"}'}
              {...register("email", { required: true,pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}}) }
                onBlur={() => trigger("email")}
             
             type='email'
             placeholder='enter the email'
             value={student.email}
             onChange={(e) =>{
              setStudent(prevData => ({ ...prevData, email: e.target.value }));
          setValue("email",e.target.value);
          trigger('email');
          setIsModified(true);
          }}
           
            />
             {errors.email && errors.email.type==="required" && <p className='text-red-500 text-sm'>please enter the email</p>}
              {errors.email && errors.email.type==="pattern" && <p className='text-yellow-500 text-sm'>please enter valid email</p>}
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
              {...register("phone", { required: true,pattern:{value:/^[0-9]{10}$/ }}) }
              onBlur={() => trigger("phone")}
             type='number'
             placeholder='enter the phone'
             value={student.phone}
             onChange={(e) =>{
             
              setStudent(prevData => ({ ...prevData, phone: e.target.value }));
             setValue("phone",e.target.value);
              trigger('phone');

              
              setIsModified(true);          
             }}
            />
              {errors.phone && errors.phone.type==="required"&&<p className='text-red-500 text-sm'>please enter number</p>}
              {errors.phone && errors.phone.type==="pattern"&&<p className='text-green-500 text-sm'>please enter exactly 10 digits and only enter digits</p>}
        </div>
 
        <div className='form-group mb-3 p-2'>
            <label htmlFor='password'  className="text-sm font-medium text-gray-700">password:</label>
            <input className={'w-full border rounded p-2 $ {errors.name && errors.name.type==="required" ? "border-red-500" : "border-gray-300"}'}
             type='text'
             placeholder='enter the password'
             value={student.password}
             {...register("password", { required: true, minLength: 8 })}
              onBlur={() => trigger("password")}
              onChange={(e) => {
                setStudent({ ...student, password: e.target.value });
                setValue("password", e.target.value);
                trigger("password");
                setIsModified(true);
              }}
           
            />
             {errors.password && errors.password.type === "required" && <p className='text-red-500 text-sm'>Please enter the password</p>}
            {errors.password && errors.password.type === "minLength" && <p className='text-yellow-500 text-sm'>Password must be at least 8 characters</p>}
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 rounded-lg px-6 py-3">Update</button>
        <Link href='/' className="bg-blue-500 hover:bg-blue-600 rounded-lg px-6 py-3" >Cancel</Link>
     </form>
    </div>
   </div>
</main>
  )
}
 
export default Edit


