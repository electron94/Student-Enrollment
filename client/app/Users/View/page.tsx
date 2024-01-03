'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useForm} from  'react-hook-form';
import { useRouter } from 'next/navigation';
 
 
const View = () => {
  const { register, formState: {errors}, trigger } = useForm();
 
  interface UserData {
    Rollno: string;
    name: string;
    phone: string;
    email: string;
    course:string;
  }
  const [selectedCourse, setSelectedCourse] = useState('');
  const [studentData,setstudentData]=useState('');
    const [data, setData] = useState<UserData>({
      Rollno: '',
      name: '',
      phone: '',
      email: '',
      course:'',
    });
 
    const handleCourseChange = (e:any) => {
 
        setSelectedCourse(e.target.value);
      };
 
  useEffect(() => {
    let studentemail:any=localStorage.getItem("studentemail")
    console.log(studentemail)
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      let studentemail:any=localStorage.getItem("studentemail")
      try {
     
 
  const response = await axios.get(`http://localhost:3000/Users`);
          setData(response.data);
          console.log("hksdkgkds",response.data.phone)
      } catch (error) {
        console.error(error);
      }
    };
 
    fetchData();
  }, []);
 
   
  const router = useRouter();
 
     
  return (
  <main className="flex min-h -screen flex-col items-center justify-between p-24">
      <div className='w-90 h-90 mx-auto shadow p-5'>
        <h2 className='text-center mb-4'>View UserDetails</h2>
        <form className='bg-white rounded p-4 w-120 shadow-md'>
        <div className='form-group mb-3 p-2'>
          <label htmlFor="Rollno" className='text-sm font-medium text-grey-700'>Rollno:</label>
          <input className='w-full border rounded p-2'
            type="number"
            id="Rollno"
            name="Rollno"
            value={studentData.Rollno}
            required
          />
        </div>
          <div className='form-group mb-3 p-2'>
          <label htmlFor="name"  className='text-sm font-medium text-grey-700'>Name:</label>
          <input className={`w-full border rounded p-2 ${errors.name && errors.name.type === "required" ? "border-red-500" : "border-gray-300"}`} type='text' id='name'
            {...register("name", {required: true, minLength: 4}  ) }
             onBlur={() => trigger("name")}
             value={studentData.name}
             
           
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
         
          />
             {errors.phone&&errors.phone && errors.phone.type==="required"&&<p className='text-red-500 text-sm'>please enter number</p>}
              {errors.phone && errors.phone.type==="pattern"&&<p className='text-green-500 text-sm'>please enter exactly 10 digits and only enter digits</p>}
        </div>
 
        </form>
      </div>
  </main>
  );
};
 
export default View;
 