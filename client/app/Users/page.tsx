'use client'
 
import { useRouter } from 'next/navigation';
import React, { useState ,useEffect} from 'react';
import {useForm} from 'react-hook-form';
import Link from 'next/link';
 
const EnrollmentForm= () => {
   
    const [selectedCourse, setSelectedCourse] = useState('');
    const[duplicateemail,setDuplicateEmail]=useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [selectmessage, setSelectMessage] = useState('');
   
 
   
    const [studentData, setStudentData] = useState({
   
    name: '',
    email: '',
    course: '',
    phone:'',
    password:''
  });
 
//   interface MyResponse {
//   success: boolean;
//   message?: string;
//   // Add other properties if needed
// }
 
  const router = useRouter();
 
 
  const handleCourseChange = (e:any) => {
    console.log("Selected Course:", e.target.value);
    setSelectedCourse(e.target.value);
    setStudentData({
      ...studentData,
      course: e.target.value, // Add this line to set the selected course in the studentData state
    });
  };
 
 
  const{register,trigger,formState:{errors,isValid},setValue}=useForm();
 
  useEffect(() => {
    setIsFormValid(isValid);
  }, [isValid]);
 
  const checkDuplicateEmail = async (email: string) => {
    try {
      const response = await fetch(`http://localhost:3004/student/checkDuplicateEmail?email=${email}`);
      const data = await response.json();
 
      if (data.isDuplicate) {
        // Show alert for duplicate email
        alert("Email is already registered");
        setDuplicateEmail("Email is already registered");
        return true;
      }
 
     
    } catch (error) {
      console.error('Error checking duplicate email:', error);
      return false;
    }
  };
 
  const handleSubmit = async (e: any) => {
    e.preventDefault();
 
    try {
 
     
      const response = await fetch('http://localhost:3004/student/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      })
      .then(response => response.json())
  .then(data => {
    if(data.message=="Student added successfully"){
      alert("data submitted successfully");
      router.push('/');
    }else{
      setSelectMessage(data.message);
      console.error('Error saving data:', response);
    }
 
      if (data.ok) {
        console.log('Data saved successfully');
        // Add any other logic you need after successful submission
      } else {
        console.error('Error saving data:', response);
      }})
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
 
 
 
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className='w-50 border bg-light p-5'>
      <h1><b>Student Enrollment Form</b></h1>
      <form onSubmit={handleSubmit} className='bg-white rounded p-4 w-120 shadow-md'>
     
 
        <div className='form-group mb-3 p-2'>
          <label htmlFor="name"  className='text-sm font-medium text-grey-700'>Name:</label>
          <input className={`w-full border rounded p-2 ${errors.name && errors.name.type === "required" ? "border-red-500" : "border-gray-300"}`} type='text' id='name'
            {...register("name", {required: true, minLength: 4}  ) }
             onBlur={() => trigger("name")}
             onChange={(e) =>{
                const trimmedValue=e.target.value.replace(/[^A-Za-z]/gi,'');
                setStudentData(prevData => ({ ...prevData, name: e.target.value }));
              setValue("name", trimmedValue);
              trigger("name");
            }}
             />
             {errors.name && errors.name.type === "required" &&  <p className='text-red-500 text-sm'>Please enter the name</p>}
            {errors.name && errors.name.type === "minLength" && <p className='text-red-500 text-sm'>Please enter at least 4 characters</p>}
           
        </div>
        <div className='form-group mb-3 p-2'>
          <label htmlFor="email"  className='text-sm font-medium text-grey-700'>Email:</label>
          <input className='w-full border rounded p-2'
             {...register("email", { required: true,pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",}}) }
                onBlur={() => trigger("email")}
            type="email"
            id="email"
            name="email"
            value={studentData.email}
            onChange={(e) =>{
                setStudentData(prevData => ({ ...prevData, email: e.target.value }));
            setValue("email",e.target.value);
            trigger('email');
            }} />
            <div>
              {selectmessage &&(
                <p className='text-red-500 text-sm'>
                   <span style={{ color: 'red' }}>{selectmessage}</span>
                </p>
              )}
              </div>
          {errors.email && errors.email.type==="required" && <p className='text-red-500 text-sm'>please enter the email</p>}
              {errors.email && errors.email.type==="pattern" && <p className='text-red-500 text-sm'>please enter valid email</p>}
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
            {...register("phone", { required: true, pattern:{value:/^[0-9]{10}$/,
            message: "Please enter a valid phone number" }}) }
            type="number"
            id="phone"
            name="phone"
            onBlur={() => trigger("phone")}
            value={studentData.phone}
            onChange={(e) =>{
             
                setStudentData(prevData => ({ ...prevData, phone: e.target.value }));
               setValue("phone",e.target.value);
                trigger('phone');     
               }}
          />
             {errors.phone && errors.phone.type==="required"&&<p className='text-red-500 text-sm'>please enter number</p>}
              {errors.phone && errors.phone.type==="pattern"&&<p className='text-red-500 text-sm'>please enter exactly 10 digits and only enter digits</p>}
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
              }}/>
            {errors.password && errors.password.type === "required" && <p className='text-red-500 text-sm'>Please enter the password</p>}
            {errors.password && errors.password.type === "minLength" && <p className='text-red-500 text-sm'>Password must be at least 8 characters</p>}
          </div>
          <button
            className={`bg-blue-500 hover:bg-blue-500 rounded-lg px-6 py-3 ${!isFormValid? 'disabled' : ''}`}
            type="submit"
            disabled={!isFormValid}>
            Submit
          </button>
        <Link href={'/.'} className="bg-blue-500 hover:bg-blue-600 rounded-lg px-6 py-3">Cancel</Link>
      </form>
    </div>
    </main>
  );
};
 
export default EnrollmentForm;
 