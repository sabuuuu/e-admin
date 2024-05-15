import React ,{ useState } from 'react'
import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Select from 'react-select';
import  useAuthContext  from '../hooks/useAuthContext';

function AjouterSalle() {
  const [num , setNum] = useState("");
  const [type , setType] = useState({ value: "Salle TD" , label: "Salle TD"});
  const [batiment , setBatiment] = useState("");
  const [capacite , setCapacite] = useState();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const { user } = useAuthContext();

  const handleChangeType = (selectedOption) => {
    setType(selectedOption);
  }
  const handleSaveSalle = () => {
    const data = {
      num,
      type : type.value,
      batiment,
      capacite
    };
    console.log(data);
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

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#374151',
      borderRadius: '4px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#334155' : '#374151',
      color: state.isSelected ? '#e5e7eb' : '#f3f4f6',
      '&:hover': {
        backgroundColor: state.isSelected ? '#334155' : '#6b7280',
        color: state.isSelected ? '#e5e7eb' : '#e5e7eb',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#e5e7eb',  
    }),
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
            <label className='text-sm font-body text-gray-400'>Type du local</label>
            <Select
                options={[{ value: "Salle TD", label: "Salle TD" }, { value: "Amphi", label: "Amphi" }]}
                value={type}
                onChange={handleChangeType}
                className="basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-700 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out"
                styles={{
                  ...customStyles, // Merge custom styles
                  control: (base) => ({
                    ...base,
                    borderColor: 'gray',
                    color: 'white',
                    backgroundColor: '',
                  }),
                }}/>
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
          <button className='w-full mt-3 text-white font-body font-semibold bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onClick={handleSaveSalle}>
          Ajouter
        </button>
        </div>
    </div>
  )
}

export default AjouterSalle