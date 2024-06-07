import React ,{ useState ,useEffect ,useContext} from 'react'
import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import  useAuthContext  from '../hooks/useAuthContext';
import Filter from '/assets/filter.png'
import Spinner from '../components/Spinner'
import Supprimer from '/assets/sup.png'
import Modifier from '/assets/mod.png'
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext'
import config from '../config/Config';

function ListePlanning() {
  const { theme } = useContext(ThemeContext);
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
      .get(`${config.apiBaseUrl}/plannings/all`, {
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
  
  const handleDelete = (pID) => {
    setLoading(true);
    axios
      .delete(`${config.apiBaseUrl}/plannings/${pID}` , {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Planning supprimé avec succés', { variant: 'success' });
        navigate('/listeplannings');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const handleFilter = () => {
    setPlanningsFiltered(filterSchedules(plannings, filters))
  }
  return (
    <div className={`flex flex-col min-h-screen font-body text-white ${theme === 'dark' ? 'bg-gray-900 ' : 'bg-gray-200 '}`}>
      <Navbar />
      <Sidebar />
      <div className='flex items-center justify-around px-8 py-4'>
        <div></div>
        <div></div>
        <div></div>
        <h1 className={`sm:text-xl text-2xl font-bold font-body  ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
        Liste des Plannings 📅   
        </h1>
        <div></div>
        <div>
          <button onClick={handleHide} className={`py-2 font-body font-semibold  border-0  px-6 rounded ${theme === 'dark' ? 'focus:outline-none hover:bg-indigo-600 ' : 'bg-blue-800 focus:outline-none hover:bg-blue-600 '}`}>
            <img src={Filter} className='w-8 h-8' />
          </button>
        </div>
      </div>
          <div id="filter" className='font-body rounded-xl flex my-8 py-2 shadow  mx-auto  lg:col-span-8 lg:w-3/4 lg:mr-16 md:w-1/2 md:mt-4 justify-center '>
              <div className='mx-4'>
                <label className={`block mb-1 text-sm font-body  ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Filiére </label>
                <select onChange={(event) => setFilters({ ...filters, filiere: event.target.value })} className={`bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}>
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
                <label className={`block mb-1 text-sm font-body  ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Année</label>
                <select onChange={(event) => setFilters({ ...filters, annee: event.target.value })} className={`bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}>
                  <option value="">Select...</option> 
                  <option value="L1">L1</option>
                  <option value="L2">L2</option>
                  <option value="L3">L3</option>
                  <option value="M1">M1</option>
                  <option value="M2">M2</option>
                </select>
              </div>
              <div className='mx-4'>
                <label className={`block mb-1 text-sm font-body  ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Semestre</label>
                <select onChange={(event) => setFilters({ ...filters, semestre: event.target.value })} className={`bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}>
                  <option value="">Select...</option> 
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className='mx-4'>
                <label className={`block mb-1 text-sm font-body  ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Type</label>
                <select onChange={(event) => setFilters({ ...filters, type: event.target.value })}  className={`bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}>
                  <option value="">Select...</option> 
                  <option value="Normal">Normal</option>
                  <option value="Rattrapage">Rattrapage</option>
                  <option value="Remplacement">Remplacement</option>
                </select>
              </div>
              <div className='mx-4'>
                <button className={`w-full border border-none rounded-md px-8 py-2 mt-5 bg-indigo-800 font-body  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-200'}`} onClick={handleFilter}>Filtrer</button>
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
                        <th className="px-6 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider  border-black">Actions</th>
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
                            <td className="flex px-2 py-4 whitespace-no-wrap border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              <Link to={`/editplanning/${planning._id}`} className='border-none cursor-pointer  text-white font-body px-2 py-1 font-semibold  border-0  hover:bg-indigo-600 rounded'><img src={Modifier} alt="" /></Link>
                              <Link onClick={() => handleDelete(planning._id)} className='border-none cursor-pointer  text-white font-body px-2 py-1 font-semibold  border-0  hover:bg-indigo-600 rounded'><img src={Supprimer} alt="" /></Link>
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