
"use client"

import { useForm } from "react-hook-form";

function Login() {
  const {register, formState: { errors }, reset, trigger} = useForm();



  return (
    <main className="flex min-h -screen flex-col items-center justify-between p-24">
      <h1 className="text-center pt-3 text-secondary">Login Form</h1>
        <div className="className='row mt-5">
          <form className='bg-white rounded p-4 shadow-md'>
          <div className='form-group mb-3 p-2'>
        <label htmlFor='name' className="text-sm font-medium text-gray-700">Name</label>
        <input
          type='name'
          className={`w-full border rounded p-2 ${errors.name && errors.name.type === "required" ? "border-red-500" : "border-gray-300"}`}
          placeholder='enter name'
          {...register("name", { required: true })}
           onBlur={() => trigger("name")}/>
           {errors.name && errors.name.type === "required" && <p className='text-red-500 text-sm'>Please enter the name</p>}
        </div>    
        <div className='form-group mb-3 p-2'>
        <label htmlFor='password' className="text-sm font-medium text-gray-700">Password</label>
        <input
          type='text'
          className={`w-full border rounded p-2 ${errors.password && errors.password.type === "required" ? "border-red-500" : "border-gray-300"}`}
          placeholder='enter password'
        
          {...register("password", { required: true })}
          
           onBlur={() => trigger("password")}/>
           {errors.password && errors.password.type === "required" && <p className='text-red-500 text-sm'>Please enter the password</p>}
        </div>        
            <input
              type="submit"
              className="bg-blue-500 text-white font-semibold rounded p-1 cursor-pointer"
              value="login"
            />
          </form>
        </div>
    </main>
  );
}

export default Login;