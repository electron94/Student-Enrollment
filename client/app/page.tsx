'use client'
// Example in your main page
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';



const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      <Link href="/Users">
        
          <button>User</button>
        
      </Link>
      <button>Admin</button>

    </div>
  );
};
export default HomePage;
