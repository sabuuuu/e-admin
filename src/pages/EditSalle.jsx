import React, { useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import  useAuthContext  from '../hooks/useAuthContext';
import { ThemeContext } from '../context/ThemeContext'
import Select from 'react-select';
import config from '../config/Config';
function EditSalle() {
    const [num , setNum] = useState("");
    const [type , setType] = useState({ value: "Salle TD" , label: "Salle TD"});
    const [batiment , setBatiment] = useState("");
    const [capacite , setCapacite] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext();
    const {id} = useParams();
    const { theme } = useContext(ThemeContext);

    const getSalle = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${config.apiBaseUrl}/salles/${id}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          setNum(response.data.num);
          setType({ value: response.data.type, label: response.data.type });
          setBatiment(response.data.batiment);
          setCapacite(response.data.capacite);
        } catch (error) {
            console.log(error);
        } finally {
          setLoading(false); 
        }
      };
      
      useEffect(() => {
        getSalle();
      }, []);

    const handleEditSalle =  () => {
        try {
            const data = {
                num,
                type : type.value,
                batiment,
                capacite
            }

            axios
            .put(`${config.apiBaseUrl}/salles/${id}`, data , {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            .then(() => {
                enqueueSnackbar('Local modifié avec succès', { variant: 'success' });
                navigate('/listesalles');
            })
            .catch((error) => {
                enqueueSnackbar('Error', { variant: 'error' });
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }
    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        backgroundColor: theme === 'dark' ? '#374151' : 'white',
        borderRadius: '4px',
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ?theme === 'light' ? '#D1CECE' : '#334155' : theme === 'light' ? '#FFFFFF' : '#374151',
        color: state.isSelected ? theme === 'light' ? 'black' :'#e5e7eb' : theme === 'light' ? '' : '#f3f4f6',
        '&:hover': {
          backgroundColor: state.isSelected ? theme === 'light' ? '#e5e7eb' : '#374151' : theme === 'light' ? '#e5e7eb' : '#6b7280',
          color: state.isSelected ? theme === 'light' ? '#374151' : '#e5e7eb' : theme === 'light' ? '#374151' : '#e5e7eb',
        },
      }),
      singleValue: (provided) => ({
        ...provided,
        color: theme === 'dark' ? '#e5e7eb' : '#000000',
      }),
    };
    const handleChangeType = (selectedOption) => {
        setType(selectedOption);
      }
    return (
      <div className={`flex min-h-screen flex-col body-font ${theme === 'dark' ? 'text-gray-400 bg-gray-900' : 'bg-gray-200 text-gray-800'}`}>
          <Navbar />
          <Sidebar />
          <div className='flex flex-col text-center w-full mb-6 mt-6'>
                <h1 className='sm:text-2xl text-2xl font-bold font-body'>
                  Modifier un Local 
                </h1>
          </div>
    
          <div className={`rounded-xl mb-8 border shadow  mx-auto  lg:col-span-8 xl:p-6 p-4 md:w-1/2 md:mt-4 justify-center ${theme === 'dark' ? 'border-gray-200 ' : 'border-gray-600 '}`}> 
              <div className='my-4'>
                <label className={`font-medium font-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Numéro de salle</label>
                <input
                  type='text'
                  value={num}
                  onChange={(e) => setNum(e.target.value)}
                  className={`w-full bg-opacity-20 focus:ring-indigo-900 rounded py-1 px-3 border text-base outline-none leading-8 transition-colors duration-200 ease-in-out font-body ${theme === 'dark' ? 'bg-gray-600 border-gray-600 focus:border-indigo-500 text-white' : 'bg-gray-400 border-gray-600 focus:border-indigo-500 text-black'}`}
                />
              </div>
              <div className='my-4'>
                <label className={`font-medium font-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Type du local</label>
                <Select
                    options={[{ value: "Salle TD", label: "Salle TD" }, { value: "Amphi", label: "Amphi" }]}
                    value={type}
                    onChange={handleChangeType}
                    className="basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-700 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out" styles={{
                      ...customStyles, // Merge custom styles
                      control: (base) => ({
                        ...base,
                        borderColor: 'gray',
                        color: 'white',
                        backgroundColor: theme === 'dark' ? '' : '#d1d5db',
                      }),
                    }}/>
              </div>
              <div className='my-4'>
                <label className={`font-medium font-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Batiment</label>
                <input
                  type='text'
                  value={batiment}
                  onChange={(e) => setBatiment(e.target.value)}
                  className={`w-full bg-opacity-20 focus:ring-indigo-900 rounded py-1 px-3 border text-base outline-none leading-8 transition-colors duration-200 ease-in-out font-body ${theme === 'dark' ? 'bg-gray-600 border-gray-600 focus:border-indigo-500 text-white' : 'bg-gray-400 border-gray-600 focus:border-indigo-500 text-black'}`}
                />
              </div>
              <div className='my-4'>
                <label className={`font-medium font-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Capacité </label>
                <input
                  type='number'
                  min={0}
                  value={capacite}
                  onChange={(e) => setCapacite(e.target.value)}
                  className={`w-full bg-opacity-20 focus:ring-indigo-900 rounded py-1 px-3 border text-base outline-none leading-8 transition-colors duration-200 ease-in-out font-body ${theme === 'dark' ? 'bg-gray-600 border-gray-600 focus:border-indigo-500 text-white' : 'bg-gray-400 border-gray-600 focus:border-indigo-500 text-black'}`}
                />
              </div>
              <button className='w-full mt-3 text-white font-body font-semibold bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onClick={handleEditSalle }>
              Sauvegarder les modifications
            </button>
            {error && <p className='error-message text-red-700 text-center text-lg mt-4'>{error}</p>}
            </div>
        </div>
      )
}

export default EditSalle