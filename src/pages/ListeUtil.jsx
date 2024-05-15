import React ,{ useState ,useEffect ,useMemo} from 'react'

import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import  useAuthContext  from '../hooks/useAuthContext';
import Filter from '/assets/filter.png'
import Spinner from "../components/Spinner";
function ListeUtil() {
  const [profs, setProfs] = useState([])
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  useEffect(() => {
    setLoading(true);  
    axios
      .get('http://localhost:5555/profs/all', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((response) => {
        setProfs(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const matricule = profs.map((prof) => prof.matricule)
  const datenaiss = profs.map((prof) => prof.birthdate) 
  const profsname = profs.map((prof) => prof.name)
  const surname = profs.map((prof) => prof.surname)
  const grade = profs.map((prof) => prof.grade)
  const email = profs.map((prof) => prof.email)
  return (
    <div className="text-white flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <Sidebar />
      <div className='flex items-center justify-around px-8 py-4'>
        <div></div>
        <div></div>
        <div></div>
        <h1 className='sm:text-2xl text-2xl font-bold font-body text-white'>
        Liste des Professeurs 
        </h1>
        <div></div>
        <button  className='py-2 text-white font-body font-semibold  border-0  px-8 focus:outline-none hover:bg-indigo-600 rounded '>
          <img src={Filter} alt="" />
        </button>
      </div>
      <div className='font-body rounded-xl  mt-8 mb-8 shadow  mx-auto  lg:col-span-8 lg:w-3/4 lg:mr-12 md:w-1/2 md:mt-4 justify-center '>        <div className="w-full  overflow-x-auto rounded-lg">
          <div className="flex  flex-wrap justify-center items-center align-middle min-w-full">
            <table className="min-w-full ">
                <thead>
                    <tr>
                        <th className="px-2 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Matricule</th>
                        <th className="px-2 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Date de naissance</th>
                        <th className="px-2 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Nom</th>
                        <th className="px-2 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Prénom</th>
                        <th className="px-2 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Grade</th>
                        <th className="px-2 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider">E-mail</th>
                    </tr>
                </thead>
                {loading ? (
                    <Spinner />
                ) : (
                  <tbody className="bg-indigo-900 divide-y divide-gray-200">
                  <tr>
                  <td className="px-6 py-4 whitespace-no-wrap ">
                        <ul className="list-inside text-white text-center">
                        {matricule.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 text-sm'>{name}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-6 py-2 whitespace-no-wrap ">
                        <ul className="list-inside text-white">
                        {datenaiss.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4  hover:text-gray-400 text-sm'>{name}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap ">
                        <ul className="list-inside text-white">
                        {profsname.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 text-sm'>{name}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap ">
                        <ul className="list-inside text-white">
                        {surname.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 text-sm'>{name}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap ">
                        <ul className="list-inside text-white">
                        {grade.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 text-sm'>{name}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap ">
                        <ul className="list-inside text-white">
                        {email.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 text-sm'>{name}</li>
                        ))}
                        </ul>
                    </td>
                </tr>
            </tbody>
                )}
            </table>
        </div>
        </div>
      </div>
    </div>
  )
}

export default ListeUtil