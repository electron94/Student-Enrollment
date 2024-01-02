'use client'

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

function Login() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, trigger } = useForm();

  const handleLogin = (data) => {
    // Replace this with your actual authentication logic
    // For simplicity, we're considering any non-empty email and password as a successful login
    if (data.email && data.password) {
      // If login is successful, navigate to the view page
      router.push("/Users/view");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-center pt-3 text-secondary">Login Form</h1>
      <div className="row mt-5">
        <form
          className="bg-white rounded p-4 shadow-md"
          onSubmit={handleSubmit(handleLogin)} >
          <div className="form-group mb-3 p-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className={`w-full border rounded p-2 ${errors.email && errors.email.type === "required" ? "border-red-500" : "border-gray-300"}`}
              placeholder="enter email"
              {...register("email", { required: true })}
              onBlur={() => trigger("email")}
            />
            {errors.email && errors.email.type === "required" && <p className="text-red-500 text-sm">Please enter the email</p>}
          </div>
          <div className="form-group mb-3 p-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password" {/* Changed type to password */}
              className={`w-full border rounded p-2 ${errors.password && errors.password.type === "required" ? "border-red-500" : "border-gray-300"}`}
              placeholder="enter password"
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
