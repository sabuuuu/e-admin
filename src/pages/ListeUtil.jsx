import React ,{ useState ,useEffect ,useContext} from 'react'

import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import  useAuthContext  from '../hooks/useAuthContext';
import Filter from '/assets/filter.png'
import Spinner from "../components/Spinner";
import Supprimer from '/assets/sup.png'
import Modifier from '/assets/mod.png'
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext'
import config from '../config/Config';
function ListeUtil() {
  const { theme } = useContext(ThemeContext);
  const [profs, setProfs] = useState([])
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [profFiltered, setProfFiltered] = useState([])
  const [filters, setFilters] = useState({
    grade: '',
  });

  useEffect(() => {
    setLoading(true);  
    axios
      .get(`${config.apiBaseUrl}/profs/all`, {
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

  const handleHide = () => {
    document.getElementById('filter').classList.toggle('hidden');
  }

  const filterProf = (profs, filters) => {
    return profs.filter((prof) => {
      return (
        (!filters.grade || prof.grade === filters.grade) 
      );
    });
  };
  

  const handleFilter = () => {
    setProfFiltered(filterProf(profs, filters))
    console.log(profFiltered)
  }

  const handleDelete = (pID) => {
    setLoading(true);
    axios
      .delete(`${config.apiBaseUrl}/profs/${pID}` , {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Enseignant supprimé avec succés', { variant: 'success' });
        navigate('/listeutilisateurs');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className={`flex flex-col min-h-screen font-body text-white ${theme === 'dark' ? 'bg-gray-900 ' : 'bg-gray-200 '}`}>
      <Navbar />
      <Sidebar />
      <div className='flex items-center justify-around px-8 py-4'>
        <div></div>
        <div></div>
        <div></div>
        <h1 className={`sm:text-xl text-2xl font-bold font-body  ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          Liste des Enseignants 👨🏽‍🏫 
        </h1>
        <div></div>
        <div>
          <button onClick={handleHide} className={`py-2 font-body font-semibold  border-0  px-6 rounded ${theme === 'dark' ? 'focus:outline-none hover:bg-indigo-600 ' : 'bg-blue-800 focus:outline-none hover:bg-blue-600 '}`}>
            <img src={Filter} className='w-8 h-8' />
          </button>
        </div>
      </div>
          <div id="filter" className='font-body rounded-xl flex my-8 shadow  mx-auto  lg:col-span-8 lg:w-3/4 lg:mr-16 md:w-1/2 md:mt-4 justify-center '>
              <div className='mx-4'>
              <label className={`block mb-1 text-sm font-body  ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Grade</label>
                <select onChange={(event) => setFilters({ ...filters, grade: event.target.value })} className={`w-full bg-gray-100 text-gray-900 border border-none rounded-md px-12 py-2 mb-2 font-body ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}>
                  <option value="">Select...</option> 
                  <option value="MCA">MCA</option>
                  <option value="MCB">MCB</option>
                  <option value="MAA">MAA</option>
                  <option value="Pr">Pr</option>
                  <option value="Doct">Doct</option>
                  <option value="Vac">Vac</option>
                </select>
              </div>
              <div className='mx-4'>
                <button className='w-full border border-none rounded-md px-8 py-2 mt-5 bg-indigo-800 font-body' onClick={handleFilter}>Filtrer</button>
              </div>
          </div>
          <div className=' mx-auto  lg:col-span-8 lg:w-4/5 lg:mr-12 md:mt-4 w-full md:w-2/3 p-4 flex flex-col items-center justify-center'>
      <div className="w-full overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full">
                <table className="min-w-full font-body ">
                <thead>
                    <tr>
                      <th className="px-2 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Matricule</th>
                      <th className="px-2 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Date de naissance</th>
                      <th className="px-2 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Nom</th>
                      <th className="px-2 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Prénom</th>
                      <th className="px-2 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Grade</th>
                      <th className="px-2 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">E-mail</th>
                      <th className="px-2 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                {loading ? (
                    <Spinner />
                ) : (
                  <tbody className="bg-indigo-900 divide-y divide-gray-200">
                    {(profFiltered.length > 0 ? profFiltered : profs).map((prof) => (
                        <tr key={prof.id}>
                           <td className="px-6 py-5 whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              {prof.matricule}
                            </td>
                            <td className="px-6 py-5 whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              {prof.birthdate}
                            </td>
                            <td className="px-6 py-5 whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              {prof.name}
                            </td>
                            <td className="px-6 py-5 whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              {prof.surname}
                            </td>
                            <td className="px-6 py-5 whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              {prof.grade}
                            </td>
                            <td className="px-6 py-5 whitespace-no-wrap border-b border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              {prof.email}
                            </td>
                            <td className="flex px-2 py-4 whitespace-no-wrap border-blue-gray-100 bg-blue-gray-50   hover:text-gray-400">
                              <Link to={`/editprof/${prof._id}`} className='border-none cursor-pointer  text-white font-body px-2 py-1 font-semibold  border-0  hover:bg-indigo-600 rounded'><img src={Modifier} alt="" /></Link>
                              <Link onClick={() => handleDelete(prof._id)} className='border-none cursor-pointer  text-white font-body px-2 py-1 font-semibold  border-0  hover:bg-indigo-600 rounded'><img src={Supprimer} alt="" /></Link>
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

export default ListeUtil

      {/* <div className='font-body rounded-xl  mt-8 mb-8 shadow  mx-auto  lg:col-span-8 lg:w-3/4 lg:mr-12 md:w-1/2 md:mt-4 justify-center '>        <div className="w-full  overflow-x-auto rounded-lg">
          <div className="flex  flex-wrap justify-center items-center align-middle min-w-full">
            <table className="min-w-full ">
                <thead>
                    <tr>
                        
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
      </div> */}