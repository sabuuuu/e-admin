import React ,{ useState ,useEffect ,useMemo} from 'react'
import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import  useAuthContext  from '../hooks/useAuthContext';
import Filter from '/assets/filter.png'
import Spinner from '../components/Spinner'

function ListePlanning() {
  const [plannings, setPlannings] = useState([])
  const [planningsFiltered, setPlanningsFiltered] = useState([])
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [filters, setFilters] = useState({
    filiere: '',
    annee: '',
    semestre: '',
    type: '',
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://eplan-backend.onrender.com/plannings/all', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((response) => {
        setPlannings(response.data.data)
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleHide = () => {
    document.getElementById('filter').classList.toggle('hidden');
  }

  const filterSchedules = (plannings, filters) => {
    return plannings.filter((planning) => {
      return (
        (!filters.filiere || planning.filiere === filters.filiere) &&
        (!filters.annee || planning.annee === filters.annee) &&
        (!filters.semestre || planning.semestre === filters.semestre) &&
        (!filters.type || planning.type === filters.type)
      );
    });
  };
  

  const handleFilter = () => {
    setPlanningsFiltered(filterSchedules(plannings, filters))
  }
  return (
    <div className="text-white flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <Sidebar />
      <div className='flex items-center justify-around px-8 py-4'>
        <div></div>
        <div></div>
        <div></div>
        <h1 className='sm:text-2xl text-2xl font-bold font-body text-white'>
        Liste des Plannings 📅   
        </h1>
        <div></div>
        <div>
          <button onClick={handleHide} className='py-2 text-white font-body font-semibold  border-0  px-8 focus:outline-none hover:bg-indigo-600 rounded '>
            <img src={Filter} className='w-8 h-8' />
          </button>
        </div>
      </div>
          <div id="filter" className='font-body rounded-xl flex my-8 shadow  mx-auto  lg:col-span-8 lg:w-3/4 lg:mr-16 md:w-1/2 md:mt-4 justify-center '>
              <div className='mx-4'>
                <label className='block mb-1 text-sm font-body text-gray-400'>Filiére </label>
                <select onChange={(event) => setFilters({ ...filters, filiere: event.target.value })} className='w-full border border-none rounded-md px-4 py-2 mb-2 bg-gray-800 font-body'>
                  <option value="">Select...</option> 
                  <option value="Ingéniorat">Ingéniorat</option>
                  <option value="Informatique">Informatique</option>
                  <option value="Informatique LMD">Informatique LMD</option>
                  <option value="Informatique MI">Informatique MI</option>
                  <option value="Informatique RN-SI">Informatique RN-SI</option>
                  <option value="ASR">ASR</option>
                  <option value="GL">GL</option>
                  <option value="IA">IA</option>
                  <option value="RS">RS</option>
                  <option value="SIA">SIA</option>
                </select>
              </div>
              <div className='mx-4'>
                <label className='block mb-1 text-sm font-body text-gray-400'>Année</label>
                <select onChange={(event) => setFilters({ ...filters, annee: event.target.value })} className='w-full border border-none rounded-md px-4 py-2 mb-2 bg-gray-800 font-body'>
                  <option value="">Select...</option> 
                  <option value="L1">L1</option>
                  <option value="L2">L2</option>
                  <option value="L3">L3</option>
                  <option value="M1">M1</option>
                  <option value="M2">M2</option>
                </select>
              </div>
              <div className='mx-4'>
                <label className='block mb-1 text-sm font-body text-gray-400'>Semestre</label>
                <select onChange={(event) => setFilters({ ...filters, semestre: event.target.value })} className='w-full border border-none rounded-md px-2  py-2 mb-2 bg-gray-800 font-body'>
                  <option value="">Select...</option> 
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className='mx-4'>
                <label className='block mb-1 text-sm font-body text-gray-400'>Type</label>
                <select onChange={(event) => setFilters({ ...filters, type: event.target.value })}  className='w-full border border-none rounded-md px-2  py-2 mb-2 bg-gray-800 font-body'>
                  <option value="">Select...</option> 
                  <option value="Normal">Normal</option>
                  <option value="Rattrapage">Rattrapage</option>
                  <option value="Remplacement">Remplacement</option>
                </select>
              </div>
              <div className='mx-4'>
                <button className='w-full border border-none rounded-md px-8 py-2 mt-5 bg-indigo-800 font-body' onClick={handleFilter}>Filtrer</button>
              </div>
          </div>
      <div className=' mx-auto  lg:col-span-8 lg:w-3/4 lg:mr-12 md:mt-4 w-full md:w-2/3 p-4 flex flex-col items-center justify-center'>
      <div className="w-full overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full">
                <table className="min-w-full font-body ">
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
                    {(planningsFiltered.length > 0 ? planningsFiltered : plannings).map((planning) => (
                        <tr key={planning.id}>
                           <td className="px-6 py-5 whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              {planning.faculte}
                            </td>
                            <td className="px-6 py-5 whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              {planning.departement}
                            </td>
                            <td className="px-6 py-5 whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              {planning.filiere}
                            </td>
                            <td className="px-6 py-5 whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              {planning.annee}
                            </td>
                            <td className="px-6 py-5 whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              {planning.semestre}
                            </td>
                            <td className="px-6 py-5 whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              {planning.type}
                            </td>
                            <td className="px-6  whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              <button className=' text-white font-body px-4 py-4 font-semibold  border-0  hover:bg-indigo-600 rounded'>voir modules</button>
                            </td>
                        </tr>
                    ))}
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