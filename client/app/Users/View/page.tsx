// ViewPage.js

import React from "react";

function ViewPage() {
  // Replace this with your actual user data fetching logic
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    // Add other user data fields as needed
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-center pt-3 text-secondary">User Profile</h1>
      <div className="bg-white rounded p-4 shadow-md">
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        {/* Display other user data fields as needed */}
      </div>
    </div>
  );
}

export default ViewPage;
