"use client";
import { useEffect, useState } from 'react';
 
import axios from 'axios';
import { useRouter } from 'next/navigation';
 
 
 
type Student = {

  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  password:string
 
};
 
const App = () => {
  const router = useRouter();
 
  const [Student, setStudent] = useState<any>([]);
 
  const handleSubmit = async (e: any) => {
    e.preventDefault();
 
  };
 
 
 
  useEffect(() => {
    axios
      .get<any>('http://localhost:3004/student')
      .then((res) => {
        setStudent(res.data.response);
        console.log('StudentData', res.data.response);
      })
      .catch((err) => console.log(err));
  }, []);
 
 
 
  const handleDeleteSubmit = (id:any) => {
    console.log('deleting employee with ID:',id);
    const body :any={
      studentID : id
    }
    axios.post('http://localhost:3004/student/delete',body)
      .then(res => {
        console.log(res);
        alert("deleted successfully");
       
      })
      .catch(err=> console.log(err));
       
  }
 
 
  const handleEdit =(e:any, id:any) => {
    e.preventDefault()
    let userId: any = id;
    localStorage.setItem("UserId", userId);
    router.push(`/Admin/Edit?id=${id}`)
  }
  return (
   
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <table className="min-w-full divide-y divide-gray-100">
          
            <thead>
              <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Password</th>
              </tr>

            </thead>

            <tbody>
              {Array.isArray(Student) &&
                Student.map((d, index) => (
                  <tr key={index}>
                     <td className="px-4 py-4 whitespace-nowrap">{d._id}</td>
                     <td className="px-4 py-4 whitespace-nowrap">{d.name}</td>
                     <td className="px-4 py-4 whitespace-nowrap">{d.email}</td>
                     <td className="px-4 py-4 whitespace-nowrap">{d.phone}</td>
                     <td className="px-4 py-4 whitespace-nowrap">{d.course}</td>
                     <td className="px-4 py-4 whitespace-nowrap">{d.password}</td>
                    <div className="flex">
                    <button  className="mr-4 bg-green-700 text-white px-2 py-2 rounded" onClick={(e)=> handleEdit(e, d._id)}>
                     edit 
                    </button>
                      <button
                        onClick={() => handleDeleteSubmit(d._id)}
                        className="mr-4 bg-red-700 text-white px-2 py-2 rounded"
                      > delete 
                      </button>
                    </div>
                  </tr>
                ))}
            </tbody>
          </table>
        </form>
      </div>
  );
};
 
export default App;


