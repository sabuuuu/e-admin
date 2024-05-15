import React ,{ useState ,useEffect ,useMemo} from 'react'

import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import  useAuthContext  from '../hooks/useAuthContext';
import Filter from '/assets/filter.png'
import Spinner from "../components/Spinner";

function ListePlanning() {
  const [plannings, setPlannings] = useState([])
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/plannings/all', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((response) => {
        setPlannings(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const facultes = plannings.map((planning) => planning.faculte)
  const departements = plannings.map((planning) => planning.departement)
  const filieres = plannings.map((planning) => planning.filiere)
  const annees = plannings.map((planning) => planning.annee)
  const  semestres = plannings.map((planning) => planning.semestre)
  const  types = plannings.map((planning) => planning.type)
  const exams = plannings.map((planning) => planning.exams)



  return (
    <div className="text-white flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <Sidebar />
      <div className='flex items-center justify-around px-8 py-4'>
        <div></div>
        <div></div>
        <div></div>
        <h1 className='sm:text-2xl text-2xl font-bold font-body text-white'>
        Liste des Plannings 
        </h1>
        <div></div>
        <button  className='py-2 text-white font-body font-semibold  border-0  px-8 focus:outline-none hover:bg-indigo-600 rounded '>
          <img src={Filter} alt="" />
        </button>
      </div>
      <div className='font-body rounded-xl  mt-8 mb-8 shadow  mx-auto  lg:col-span-8 lg:w-3/4 lg:mr-12 md:w-1/2 md:mt-4 justify-center '>
        <div className="w-full  overflow-x-auto rounded-lg">
          <div className="flex  flex-wrap justify-center items-center align-middle min-w-full">
            <table className="min-w-full ">
                <thead>
                    <tr>
                        <th className="px-6 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Faculté</th>
                        <th className="px-18 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Département</th>
                        <th className="px-6 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Fliére</th>
                        <th className="px-6 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Année</th>
                        <th className="px-6 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Semestre</th>
                        <th className="px-6 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Type</th>
                        <th className="px-6 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider  border-black">Examens</th>
                    </tr>
                </thead>
                {loading ? (
                    <Spinner />
                ) : (
                  <tbody className="bg-indigo-900 divide-y divide-gray-200">
                  <tr>
                    <td className="px-2 py-4 whitespace-no-wrap ">
                        <ul className="list-inside text-white text-center">
                        {facultes.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 '>{name}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-6 py-2 whitespace-no-wrap ">
                        <ul className="list-inside text-white">
                        {departements.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4  hover:text-gray-400 '>{name}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap ">
                        <ul className="list-inside text-white">
                        {filieres.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 '>{name}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap ">
                        <ul className="list-inside text-white">
                        {annees.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 '>{name}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap ">
                        <ul className="list-inside text-white">
                        {semestres.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 '>{name}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap ">
                        <ul className="list-inside text-white">
                        {types.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 '>{name}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-6 whitespace-no-wrap ">
                      <ul className="list-inside text-white">
                      {facultes.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4  hover:bg-indigo-600 rounded-t '>
                              <button className=' text-white font-body font-semibold  border-0  focus:outline-none'>Voir liste</button>
                            </li>
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

export default ListePlanning