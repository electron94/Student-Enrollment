'use client'
// Example in your main page
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';



const HomePage: React.FC = () => {
  return (
    <div>
      <h1><b>Welcome to the Main Page</b></h1>
    
        
       <div >
         <button className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 mb-2" style={{ marginLeft: '40px' }} >User Login</button>
         <Link href="/Users">
         <button className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2" style={{ marginLeft: '40px' }} >User SignUp</button>
         </Link>
         
       </div>
    
      <Link href="/Admin">
        <div>
      <button className="bg-blue-500 hover:bg-blue-600 rounded-lg px-2 py-2" style={{ marginLeft: '1500px' }} >Admin Login</button>
      </div>
      </Link>
    </div>
  );
};
export default HomePage;
