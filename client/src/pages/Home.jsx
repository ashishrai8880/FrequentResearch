import axios from 'axios'
import React, { useEffect , useState} from 'react'


const Home = () => {

  const [userList, setUserList] = useState([])

  const getAllUser =async ()=>{
    let data = await  axios.get('http://localhost:3001/api/auth/user') ;
    console.log('data user : ',data)
    setUserList(data.data.data);
  }

  useEffect(() => {
    getAllUser();
  }, [])
  

  return (
    <>
    
    

    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">ID</th>
                  <th scope="col" className="px-6 py-4">First</th>
                  <th scope="col" className="px-6 py-4">Last</th>
                  <th scope="col" className="px-6 py-4">Email</th>
                  <th scope="col" className="px-6 py-4">Country</th>
                  <th scope="col" className="px-6 py-4">State</th>
                  <th scope="col" className="px-6 py-4">City</th>
                  <th scope="col" className="px-6 py-4">Gender</th>
                  <th scope="col" className="px-6 py-4">DOB</th>
                  <th scope="col" className="px-6 py-4">Age</th>
                </tr>
              </thead>
              <tbody>

                {userList.map((user,index) => (


                  <tr key={user._id}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                  <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
                  <td className="whitespace-nowrap px-6 py-4">{user.first_name}</td>
                  <td className="whitespace-nowrap px-6 py-4">{user.last_name}</td>
                  <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                  <td className="whitespace-nowrap px-6 py-4">{user.country}</td>
                  <td className="whitespace-nowrap px-6 py-4">{user.state}</td>
                  <td className="whitespace-nowrap px-6 py-4">{user.city}</td>
                  <td className="whitespace-nowrap px-6 py-4">{user.gender}</td>
                  <td className="whitespace-nowrap px-6 py-4">{(new Date(user.date_of_birth)).toLocaleDateString('en-US')}</td>
                  <td className="whitespace-nowrap px-6 py-4">{user.age}</td>
                </tr>


                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>


    
    </>
    
  )
}

export default Home