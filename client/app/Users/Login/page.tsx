"use client"
 
 
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { authenticateUser } from "@/app/auth/page";
import Link from "next/link";
 
 
interface FormData {
  email: string;
  password: string;
}
 
 
function Login() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, trigger } = useForm<FormData>();
 
  const handleLogin = async (data: FormData) => {
    try {
      // Call authenticateUser with email and password from the form data
      const response = await authenticateUser(data.email, data.password);
 
      // Check if authentication is successful
      if (response.token) {
        // If authentication is successful, you can save the token to localStorage or use a state management library
        localStorage.setItem('token', response.token);
 
        // Navigate to the view page
        router.push("/Users/View");
      } else {
        // Handle authentication failure (e.g., display an error message)
        console.error("Authentication failed");
      }
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error("Error during authentication:", error);
    }
  };
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='w-50 border bg-light p-5'>
      <h2 className='text-center mb-4 font-bold text-blue-800'>UserLogin</h2>
      <div className="row mt-5">
        <form className="bg-white rounded p-4 shadow-md" onSubmit={handleSubmit(handleLogin)}>
          <div className="form-group mb-3 p-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className={`w-full border rounded p-2 ${errors.email && errors.email.type === "required" ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter email"
              {...register("email", { required: true })}
              onBlur={() => trigger("email")}
            />
            {errors.email && errors.email.type === "required" && <p className="text-red-500 text-sm">Please enter the email</p>}
          </div>
          <div className="form-group mb-3 p-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className={`w-full border rounded p-2 ${errors.password && errors.password.type === "required" ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter password"
              {...register("password", { required: true })}
              onBlur={() => trigger("password")}
            />
            {errors.password && errors.password.type === "required" && <p className="text-red-500 text-sm">Please enter the password</p>}
          </div>
          <div className="flex gap-4">
          <input
            type="submit"
            className="bg-blue-700 text-white font-semibold rounded p-1 cursor-pointer"
            value="Login"
          />
          <Link href='/' className="bg-blue-700 text-white font-semibold rounded p-1 cursor-pointer" >Cancel</Link>
          <Link className="bg-green text-red p-2" href={"/Users"} style={{ textDecoration: 'underline' }}>you don't have account ?</Link>
         </div>
        </form>
      </div>
      </div>
    </main>
  );
}
 
export default Login;