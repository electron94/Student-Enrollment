'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  password: string;
}

function Login() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, trigger } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Perform your login logic here
    const { name, password } = data;

    // Check if the entered email and password match your criteria for admin login
    if (name === "test@gmail.com" && password === "1234") {
      // If successful, navigate to the admin page
      router.push('/Admin') // Assuming you have a route for the admin page
    } else {
      // If login fails, you can display an error message or handle it accordingly
      console.log("Login failed");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-center pt-3 text-secondary">Login Form</h1>
      <div className="row mt-5">
        <form className="bg-white rounded p-4 shadow-md" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3 p-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className={`w-full border rounded p-2 ${errors.name && errors.name.type === "required" ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter name"
              {...register("name", { required: true })}
              onBlur={() => trigger("name")}
            />
            {errors.name && errors.name.type === "required" && (
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
