// auth.js
 
// Replace the placeholder URL with the actual URL of your authentication endpoint
const AUTH_ENDPOINT = "http://localhost:3004/student/authenticate";
 
export const authenticateUser = async (email: any, password: any) => {
  try {
    const response = await fetch(AUTH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
 
   
    if (!response.ok) {
      throw new Error('Authentication failed');
    }
 
    // Assuming your server returns a JSON object with a token property upon successful authentication
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};