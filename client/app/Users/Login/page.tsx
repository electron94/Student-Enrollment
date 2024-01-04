 
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
                 <div>
      <Link href="/Users">
         <button className="  justify-between bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2" style={{ marginLeft: '40px' }} >User SignUp</button>
         </Link>
      </div>
      <h1 className="text-center pt-3 text-secondary">Login Form</h1>
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
          <input
            type="submit"
            className="bg-blue-500 text-white font-semibold rounded p-1 cursor-pointer"
            value="Login"
          />

        </form>
      </div>
    </main>
  );
}
 
export default Login;