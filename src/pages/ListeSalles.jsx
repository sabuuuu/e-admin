import React ,{ useState ,useEffect ,useMemo} from 'react'

import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import  useAuthContext  from '../hooks/useAuthContext';
import Filter from '/assets/filter.png'
import Spinner from "../components/Spinner";
import Supprimer from '/assets/sup.png'
import Modifier from '/assets/mod.png'
import { Link } from 'react-router-dom';


function ListeSalles() {
  const [salles, setSalles] = useState([])
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [filters, setFilters] = useState({
    type: '',
    capacite: '',
  });
  const [salleFiltered, setSalleFiltered] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://eplan-backend.onrender.com/salles/all', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((response) => {
        setSalles(response.data.data);
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

  const filterSalle = (salles, filters) => {
    return salles.filter((salle) => {
      return (
        (!filters.type || salle.type === filters.type) &&
        (!filters.capacite || salle.capacite === parseInt(filters.capacite))  
      );
    });
  };
  

  const handleFilter = () => {
    setSalleFiltered(filterSalle(salles, filters));
  };

  const handleDelete = (pID) => {
    setLoading(true);
    axios
      .delete(`https://eplan-backend.onrender.com/salles/${pID}` , {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Local supprimé avec succés', { variant: 'success' });
        navigate('/listesalles');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="text-white flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <Sidebar />
      <div className='flex items-center justify-around px-8 py-4'>
        <div></div>
        <div></div>
        <div></div>
        <h1 className='sm:text-2xl text-2xl font-bold font-body text-white'>
          Liste des Locaux 🏢
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
                <label className='block mb-1 text-sm font-body text-gray-400'>Type du local</label>
                <select onChange={(event) => setFilters({ ...filters, type: event.target.value })} className='w-full border border-none rounded-md px-4 py-2 mb-2 bg-gray-800 font-body'>
                  <option value="">Select...</option> 
                  <option value="Salle TD">Salle TD</option>
                  <option value="Amphi">Amphi</option>
                </select>
              </div>
              <div className='mx-4'>
                <label className='block mb-1 text-sm font-body text-gray-400'>Capacité</label>
                <select onChange={(event) => setFilters({ ...filters, capacite: event.target.value })} className='w-full border border-none rounded-md px-4 py-2 mb-2 bg-gray-800 font-body'>
                  <option value="">Select...</option> 
                  <option value="32">32</option>
                  <option value="40">40</option>
                  <option value="60">60</option>
                  <option value="80">80</option>
                  <option value="120">120</option>
                  <option value="180">180</option>
                  <option value="220">220</option>
                  <option value="300">300</option>
                </select>
              </div>
              <div className='mx-4'>
                <button className='w-full border border-none rounded-md px-8 py-2 mt-5 bg-indigo-800 font-body' onClick={handleFilter}>Filtrer</button>
              </div>
          </div>
          <div className=' mx-auto  lg:col-span-8 lg:w-2/3 lg:mr-32 md:mt-4 w-full md:w-2/3 p-4 flex flex-col items-center justify-center'>
      <div className="w-full overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full">
                <table className="min-w-full font-body ">
                <thead>
                    <tr>
                    <th className="px-4 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Numéro</th>
                        <th className="px-4 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Type</th>
                        <th className="px-4 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Batiment</th>
                        <th className="px-4 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Capacité</th>
                        <th className="px-2 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider ">Actions</th>
                    </tr>
                </thead>
                {loading ? (
                    <Spinner />
                ) : (
                  <tbody className="bg-indigo-900 divide-y divide-gray-200">
                    {(salleFiltered.length > 0 ? salleFiltered : salles).map((salle) => (
                        <tr key={salle.id}>
                           <td className="px-6 py-4 whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              {salle.num}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              {salle.type}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              {salle.batiment}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              {salle.capacite}
                            </td>
                            <td className="flex px-2 py-4 whitespace-no-wrap border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              <Link to={`/editsalle/${salle._id}`} className='border-none cursor-pointer  text-white font-body px-2 py-1 font-semibold  border-0  hover:bg-indigo-600 rounded'><img src={Modifier} alt="" /></Link>
                              <Link onClick={() => handleDelete(salle._id)} className='border-none cursor-pointer  text-white font-body px-2 py-1 font-semibold  border-0  hover:bg-indigo-600 rounded'><img src={Supprimer} alt="" /></Link>
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

export default ListeSalles