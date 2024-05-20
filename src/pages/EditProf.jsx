import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import  useAuthContext  from '../hooks/useAuthContext';
import Spinner from '../components/Spinner';
import Select from 'react-select';

function EditProf() {
    const [matricule , setMatricule] = useState(0);
    const [birthdate , setBirthdate] = useState("");
    const [name , setName] = useState("");
    const [surname , setSurname] = useState("");
    const [grade , setGrade] = useState({ value: "MCA", label: "MCA" });
    const [email , setEmail] = useState("");

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext();
    const {id} = useParams();

    const getSalle = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://eplan-backend.onrender.com/profs/${id}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          console.log(response.data);
          setMatricule(response.data.matricule);
          setBirthdate(response.data.birthdate);
          setName(response.data.name);
          setSurname(response.data.surname);
          setGrade({ value: response.data.grade, label: response.data.grade });
          setEmail(response.data.email);
        } catch (error) {
            console.log(error);
        } finally {
          setLoading(false); 
        }
      };
      
      useEffect(() => {
        getSalle();
      }, []);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const handleChangeGrade = (selectedOption) => {
        setGrade(selectedOption);
      }
      const handleEditProf =  () => {
        try {
            if (!matricule || !birthdate || !name || !surname || !grade || !email) {
                setError('Veuillez remplir tous les champs avant de sauvegarder ✍🏽');
                return;
              }
              setError(null);
              if (!emailRegex.test(email)) {
                setError('Veuillez entrer une adresse email valide ✍🏽');
                return
              }
              setError(null);
          
              //make sure name and surname are not numbers
              if (!isNaN(name) || !isNaN(surname)) {
                setError('Veuillez entrer des noms et des prenoms valides ✍🏽');
                return;
              }
            const data = {
                matricule,
                birthdate,
                name,
                surname,
                grade : grade.value,
                email
              };

            axios
            .put(`https://eplan-backend.onrender.com/profs/${id}`, data , {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            .then(() => {
                enqueueSnackbar('Enseigant modifié avec succès', { variant: 'success' });
                navigate('/listeutilisateurs');
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
      <div className="text-white flex flex-col min-h-screen bg-gray-900">
            <Navbar />
            <Sidebar />
              <div className='flex flex-col text-center w-full  mt-8'>
                <h1 className='sm:text-2xl text-2xl font-bold font-body text-white'>
                  Modifier un Professeur
                </h1>
              </div>
            <div className='rounded-xl mb-8 border border-gray-200 shadow  mx-auto  lg:col-span-8 xl:p-6 p-4 md:w-1/2 md:mt-4 justify-center '>
              <div className='my-4'>
                <label className=' text-sm font-body text-gray-400'>Matricule</label>
                <input
                  type='number'
                  min={0}
                  value={matricule}
                  onChange={(e) => setMatricule(e.target.value)}
                  className='w-full font-body bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                />
              </div>
              <div className='my-4'>
                <label className=' text-sm font-body text-gray-400'>Date de naissance </label>
                <input
                  type='date'
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  placeholder='dd/mm/yyyy'
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
                <label className='text-sm font-body text-gray-400'>Grade</label>
                <Select
                    options={[{ value: "MCA", label: "MCA" }, { value: "MCB", label: "MCB"},{ value: "MAA", label: "MAA"},{value:"Pr",label:"Pr"}]}
                    value={grade}
                    onChange={handleChangeGrade}
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
                <label className=' text-sm font-body text-gray-400'>E-mail</label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full font-body bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                />
              </div>
              <button className='w-full mt-3 text-white font-body font-semibold bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onClick={handleEditProf}>
                    Sauvegarder les modifications
                </button>
            {error && <p className='error-message font-body text-red-700 text-center text-lg mt-4'>{error}</p>}
            </div>
        </div>
      )
}

export default EditProf