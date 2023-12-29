'use client'

import React, { useState } from 'react';


const EnrollmentForm: React.FC = () => {
  const [studentData, setStudentData] = useState({
    Rollno:'',
    name: '',
    email: '',
    course: '',
    phone:'',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted Data:', studentData);
    // Add logic to submit data to backend or perform further actions
  };

  return (
    <div className='row mt-5'>
      <h1><b>Student Enrollment Form</b></h1>
      <form onSubmit={handleSubmit}>
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
          <input className='w-full border rounded p-2'
            type="text"
            id="name"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group mb-3 p-2'>
          <label htmlFor="email"  className='text-sm font-medium text-grey-700'>Email:</label>
          <input className='w-full border rounded p-2'
            type="email"
            id="email"
            name="email"
            value={studentData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group mb-3 p-2'>
          <label htmlFor="course"  className='text-sm font-medium text-grey-700'>Course:</label>
          <input className='w-full border rounded p-2'
            type="text"
            id="course"
            name="course"
            value={studentData.course}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group mb-3 p-2'>
          <label htmlFor="phone"  className='text-sm font-medium text-grey-700'>phone:</label>
          <input className='w-full border rounded p-2'
            type="number"
            id="phone"
            name="phone"
            value={studentData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default EnrollmentForm;
