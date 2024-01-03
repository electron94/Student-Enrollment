"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
 
interface FormData {
  Email: string;
  password: string;
}
 
function Login() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, trigger } = useForm<FormData>();
  const [loginStatus, setLoginStatus] = useState<'valid' | 'invalid' | 'initial'>('initial');
 
  const onSubmit = (data: FormData) => {
    const { Email, password } = data;
 
    // Check if the entered email and password match your criteria for admin login
    if (Email === 'test@gmail.com' && password === '1234') {
      // If successful, navigate to the admin page
      router.push('/Admin'); // Assuming you have a route for the admin page
    } else {
      // If login fails, set the login status to 'invalid'
      setLoginStatus('invalid');
    }
  };
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <h1 className="text-center pt-3 text-secondary">Login Form</h1>
      <div className="row mt-5">
        <form className="bg-white rounded p-4 shadow-md" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3 p-2">
            <label htmlFor="Email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              className={`w-full border rounded p-2 ${errors.Email && errors.Email.type === "required" ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter name"
              {...register("Email", { required: true })}
              onBlur={() => trigger("Email")}
            />
            {errors.Email && errors.Email.type === "required" && (
              <p className="text-red-500 text-sm">Please enter the name</p>
            )}
          </div>
          <div className="form-group mb-3 p-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className={`w-full border rounded p-2 ${errors.password && errors.password.type === "required" ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter password"
              {...register("password", { required: true })}
              onBlur={() => trigger("password")}
            />
            {errors.password && errors.password.type === "required" && (
              <p className="text-red-500 text-sm">Please enter the password</p>
            )}
            {loginStatus === 'invalid' && (
              <p className="text-red-500 text-sm">Invalid email or password</p>
            )}
          </div>
          <input
            type="submit"
            className={`bg-blue-500 text-white font-semibold rounded p-1 cursor-pointer ${loginStatus === 'invalid' ? 'cursor-not-allowed opacity-50' : ''}`}
            value="Login"
            disabled={loginStatus === 'invalid'}
          />
        </form>
      </div>
    </main>
  );
}
 
export default Login;