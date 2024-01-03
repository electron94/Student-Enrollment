'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import Link from 'next/link';

const EnrollmentForm: React.FC = () => {
    const[isModified,setIsModified]=useState<undefined | string>(undefined);
    const [selectedCourse, setSelectedCourse] = useState('');
  const [studentData, setStudentData] = useState({
    Rollno:'',
    name: '',
    email: '',
    course: '',
    phone:'',
  });

  const router = useRouter()
  const handleCourseChange = (e:any) => {

    setSelectedCourse(e.target.value);
  };

  const{register,trigger,formState:{errors},setValue}=useForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3004/student/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
  
      if (response.ok) {
        console.log('Data saved successfully');
        alert("data submitted successfully");
        router.push('/')
        // Add any other logic you need after successful submission
      } else {
        console.error('Error saving data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className='w-50 border bg-light p-5'>
      <h1><b>Student Enrollment Form</b></h1>
      <form onSubmit={handleSubmit} className='bg-white rounded p-4 w-120 shadow-md'>
      <div className='form-group mb-3 p-2'>
          <label htmlFor="Rollno" className='text-sm font-medium text-grey-700'>Rollno:</label>
          <input className='w-full border rounded p-2' 
            type="number"
            id="Rollno"
            name="Rollno"
            value={studentData.Rollno}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group mb-3 p-2'>
          <label htmlFor="name"  className='text-sm font-medium text-grey-700'>Name:</label>
          <input className={`w-full border rounded p-2 ${errors.name && errors.name.type === "required" ? "border-red-500" : "border-gray-300"}`} type='text' id='name'
            {...register("name", {required: true, minLength: 4}  ) }
             onBlur={() => trigger("name")}
             onChange={(e) =>{
                const trimmedValue=e.target.value.replace(/[^A-Za-z]/gi,'');
                setStudentData({name:trimmedValue});
              setValue("name", trimmedValue);
              trigger("name");
              setIsModified(true);
            }}
             />
             {errors.name && errors.name.type === "required" &&  <p className='text-red-500 text-sm'>Please enter the name</p>}
            {errors.name && errors.name.type === "minLength" && <p className='text-yellow-500 text-sm'>Please enter at least 4 characters</p>}
           
        </div>
        <div className='form-group mb-3 p-2'>
          <label htmlFor="email"  className='text-sm font-medium text-grey-700'>Email:</label>
          <input className='w-full border rounded p-2'
             {...register("email", { required: true,pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}}) }
                onBlur={() => trigger("email")}
            type="email"
            id="email"
            name="email"
            value={studentData.email}
            onChange={(e) =>{
                setStudentData(prevData => ({ ...prevData, email: e.target.value }));
            setValue("email",e.target.value);
            trigger('email');
            setIsModified(true);
            }}
          />
          {errors.email && errors.email && errors.email.type==="required" && <p className='text-red-500 text-sm'>please enter the email</p>}
              {errors.email && errors.email.type==="pattern" && <p className='text-yellow-500 text-sm'>please enter valid email</p>}
        </div>
        <div>          
            <label htmlFor="course"> Course:</label>         
             <select id="course" name="course" value={selectedCourse} onChange={handleCourseChange}>    
             <option value="">Select..</option>     
                  <option value="sql">Sql</option>      
                        <option value="python">python</option>        
                            <option value="c">c</option>     
                                   <option value="java">java</option>  

            </select>    
       </div> 
        <div className='form-group mb-3 p-2'>
          <label htmlFor="phone"  className='text-sm font-medium text-grey-700'>phone:</label>
          <input className='w-full border rounded p-2'
            {...register("phone", { required: true,pattern:{value:/^[0-9]{10}$/ }}) }
            type="number"
            id="phone"
            name="phone"
            onBlur={() => trigger("phone")}
            value={studentData.phone}
            onChange={(e) =>{
             
                setStudentData(prevData => ({ ...prevData, phone: e.target.value }));
               setValue("phone",e.target.value);
                trigger('phone');
                setIsModified(true);          
               }}
          />
             {errors.phone&&errors.phone && errors.phone.type==="required"&&<p className='text-red-500 text-sm'>please enter number</p>}
              {errors.phone && errors.phone.type==="pattern"&&<p className='text-green-500 text-sm'>please enter exactly 10 digits and only enter digits</p>}
        </div>
      
        <div className='form-group mb-3 p-2'>
            <label htmlFor="password" className='text-sm font-medium text-grey-700'>Password:</label>
            <input
              className={`w-full border rounded p-2 ${errors.password && errors.password.type === "required" ? "border-red-500" : "border-gray-300"}`}
              type='password'
              id='password'
              {...register("password", { required: true, minLength: 8 })}
              onBlur={() => trigger("password")}
              onChange={(e) => {
                setStudentData({ ...studentData, password: e.target.value });
                setValue("password", e.target.value);
                trigger("password");
                setIsModified(true);
              }}
            />
            {errors.password && errors.password.type === "required" && <p className='text-red-500 text-sm'>Please enter the password</p>}
            {errors.password && errors.password.type === "minLength" && <p className='text-yellow-500 text-sm'>Password must be at least 8 characters</p>}
          </div>
        <button className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4" type="submit"> submit</button>
        <Link href={'/.'} className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4">Cancel</Link>
     
      </form>
    </div>
    </main>
  );
};

export default EnrollmentForm;
