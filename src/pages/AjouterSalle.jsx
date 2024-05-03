import React ,{ useState } from 'react'
import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import  useAuthContext  from '../hooks/useAuthContext';

function AjouterSalle() {
  const [num , setNum] = useState("");
  const [type , setType] = useState("");
  const [batiment , setBatiment] = useState("");
  const [capacite , setCapacite] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const handleSaveSalle = () => {
    const data = {
      num,
      type,
      batiment,
      capacite
    };
    axios
    .post('http://localhost:5555/salles', data ,{
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    }).then(() => {
      enqueueSnackbar('Salle ajoutée avec succès', { variant: 'success' });
      navigate('/');
    })
    .catch((error) => {
      enqueueSnackbar('Error', { variant: 'error' });
      console.log(error);
    });
  };

  return (
    <div className='flex min-h-screen flex-col text-gray-400 bg-gray-900 body-font'>
      <Navbar />
      <Sidebar />
      <div className='flex flex-col text-center w-full mb-8 mt-8'>
            <h1 className='sm:text-2xl text-2xl font-bold font-body text-white'>
              Ajouter une Salle d'examination
            </h1>
      </div>

      <div className='rounded-xl mb-8 border border-gray-200 shadow  mx-auto  lg:col-span-8 xl:p-6 p-4 md:w-1/2 md:mt-4 justify-center '>
          <div className='my-4'>
            <label className=' text-sm font-body text-gray-400'>Numéro de salle</label>
            <input
              type='text'
              value={num}
              onChange={(e) => setNum(e.target.value)}
              className='w-full font-body bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
          </div>
          <div className='my-4'>
            <label className=' text-sm font-body text-gray-400'>Type de salle</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className='w-full font-body bg-gray-600  bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out'>
              <option value="Salle TD" className='text-gray-100 bg-gray-800 font-body font-semibold py-4 px-4 rounded'>Salle de TD</option>
              <option value="Amphi" className=' text-gray-100 bg-gray-800 font-body font-semibold py-4 px-4 rounded '>Amphi</option>
            </select>
          </div>
          <div className='my-4'>
            <label className=' text-sm font-body text-gray-400'>Batiment</label>
            <input
              type='text'
              value={batiment}
              onChange={(e) => setBatiment(e.target.value)}
              className='w-full font-body bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
          </div>
          <div className='my-4'>
            <label className=' text-sm font-body text-gray-400'>Capacité </label>
            <input
              type='number'
              value={capacite}
              onChange={(e) => setCapacite(e.target.value)}
              className='w-full font-body bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
          </div>
          <button className='w-full py-2 mt-3 text-white font-body font-semibold bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onClick={handleSaveSalle}>
          Ajouter
        </button>
        </div>
    </div>
  )
}

export default AjouterSalle