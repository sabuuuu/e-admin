import React ,{ useState } from 'react'
import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import  useAuthContext  from '../hooks/useAuthContext';

function Utilisateur() {
  const [matricule , setMatricule] = useState("");
  const [birthdate , setBirthdate] = useState("");
  const [name , setName] = useState("");
  const [surname , setSurname] = useState("");
  const [grade , setGrade] = useState("");
  const [dispo , setDispo] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const handleSaveUtilisateur = () => {
    const data = {
      matricule,
      birthdate,
      name,
      surname,
      grade,
    };
    axios
    .post('http://localhost:5555/profs', data ,{
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    }).then(() => {
      enqueueSnackbar('Prof ajouté avec succès', { variant: 'success' });
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
          <div className='flex flex-col text-center w-full  mt-8'>
            <h1 className='sm:text-2xl text-2xl font-bold font-body text-white'>
              Ajouter un Professeur
            </h1>
          </div>
        <div className='rounded-xl mb-8 border border-gray-200 shadow  mx-auto  lg:col-span-8 xl:p-6 p-4 md:w-1/2 md:mt-4 justify-center '>
          <div className='my-4'>
            <label className=' text-sm font-body text-gray-400'>Matricule</label>
            <input
              type='text'
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              className='w-full font-body bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
          </div>
          <div className='my-4'>
            <label className=' text-sm font-body text-gray-400'>Date de naissance</label>
            <input
              type='text'
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className='w-full font-body bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
          </div>
          <div className='my-4'>
            <label className=' text-sm font-body text-gray-400'>Nom</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full font-body bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
          </div>
          <div className='my-4'>
            <label className=' text-sm font-body text-gray-400'>Prénom</label>
            <input
              type='text'
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className='w-full font-body bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
          </div>
          <div className='my-4'>
            <label className=' text-sm font-body text-gray-400'>Grade</label>
            <input
              type='text'
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className='w-full font-body bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
          </div>
          <button className='w-full py-2 mt-3 text-white font-body font-semibold bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onClick={handleSaveUtilisateur}>
          Ajouter
        </button>
        </div>
    </div>
  )
}

export default Utilisateur