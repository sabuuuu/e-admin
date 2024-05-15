import React ,{ useState ,useEffect ,useMemo} from 'react'

import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import  useAuthContext  from '../hooks/useAuthContext';
import Filter from '/assets/filter.png'
import Spinner from "../components/Spinner";

function ListeSalles() {
  const [salles, setSalles] = useState([])
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/salles/all', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((response) => {
        setSalles(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  const numero = salles.map((salle) => salle.num)
  const type = salles.map((salle) => salle.type) 
  const batiment = salles.map((salle) => salle.batiment)
  const capacites = salles.map((salle) => salle.capacite)
  return (
    <div className="text-white flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <Sidebar />
      <div className='flex items-center justify-around px-8 py-4'>
        <div></div>
        <div></div>
        <div></div>
        <h1 className='sm:text-2xl text-2xl font-bold font-body text-white'>
          Liste des salles 
        </h1>
        <div></div>
        <button  className='py-2 text-white font-body font-semibold  border-0  px-8 focus:outline-none hover:bg-indigo-600 rounded '>
          <img src={Filter} alt="" />
        </button>
      </div>
      <div className='rounded-xl font-body  mt-8 mb-8 shadow  mx-auto  lg:col-span-8  md:w-1/2 md:mt-4 justify-center '>
        <div className="w-full  overflow-x-auto rounded-lg">
          <div className="flex  flex-wrap justify-center items-center align-middle min-w-full">
            <table className="min-w-full ">
                <thead>
                    <tr>
                        <th className="px-6 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Numéro</th>
                        <th className="px-18 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Type</th>
                        <th className="px-6 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Batiment</th>
                        <th className="px-6 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider ">Capacité</th>
                    </tr>
                </thead>
                {loading ? (
                    <Spinner />
                ) : (
                  <tbody className="bg-indigo-900 divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap ">
                        <ul className="list-inside text-white text-center">
                        {numero.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 font-semibold'>{name}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-6 py-2 whitespace-no-wrap ">
                        <ul className="list-inside text-white">
                        {type.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4  hover:text-gray-400 font-semibold'>{name}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap ">
                        <ul className="list-inside text-white">
                        {batiment.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 font-semibold'>{name}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap ">
                        <ul className="list-inside text-white">
                        {capacites.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 font-semibold'>{name}</li>
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

export default ListeSalles