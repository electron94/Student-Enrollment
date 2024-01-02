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
 
};
 
const App: React.FC = () => {
  const router = useRouter();
 
  const [Student, setStudent] = useState<any>([]);
 
  const handleSubmit = async (e: any) => {
    e.preventDefault();
 
  };
 
  const addStudent = (employee: {}) => {
    setStudent([...Student, Student]);
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
      employeeID: id
    }
    axios.post('http://localhost:3004/api/employee/delete',body)
      .then(res => {
        console.log(res);
       
      })
      .catch(err=> console.log(err));
       
  }
 
 
const handleEdit =(e:any, id:any) => {
  e.preventDefault()
  let userId: any = id;
  localStorage.setItem("UserId", userId);
  router.push(`/components/addContacts/editContacts?id=${id}`)
}
 
 
 
  return (
   
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
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
                    <div className="flex">
                    <button  className="mr-4 bg-green-700 text-white px-2 py-2 rounded" onClick={(e)=> handleEdit(e, d._id)}>
                    <h3 className="w-3 h-3"> edit </h3>
                    </button>
                      <button
                        onClick={() => handleDeleteSubmit(d._id)}
                        className="mr-4 bg-red-700 text-white px-2 py-2 rounded"
                      > <h3 className="w-3 h-3"> delete </h3> 
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
 