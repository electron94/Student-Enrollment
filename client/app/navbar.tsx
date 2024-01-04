import { ShieldCheckIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
 
 
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-blue-500 px-6 py-3">
      <h1 className="text-white font-bold">Student Enrollment</h1>
      <div>
        <Link className="text-white font-bold" href={"/Users/Login"}>
          <UserIcon className="h-5 w-5 mr-1" />
          Users
        </Link>
        <Link className="text-white font-bold" href={"/Admin/Login"}>
          <ShieldCheckIcon className="h-5 w-5 mr-1" />
          Admin
        </Link>
      </div>
    </nav>
  );
}
