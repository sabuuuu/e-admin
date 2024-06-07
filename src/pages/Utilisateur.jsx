import React ,{ useState ,useContext } from 'react'
import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import  useAuthContext  from '../hooks/useAuthContext';
import Select from 'react-select';
import { ThemeContext } from '../context/ThemeContext'
import config from '../config/Config';
function Utilisateur() {
  const [matricule , setMatricule] = useState(0);
  const [birthdate , setBirthdate] = useState("");
  const [name , setName] = useState("");
  const [surname , setSurname] = useState("");
  const [grade , setGrade] = useState({ value: "MCA", label: "MCA" });
  const [email , setEmail] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const { theme } = useContext(ThemeContext);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChangeGrade = (selectedOption) => {
    setGrade(selectedOption);
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
  const handleSaveUtilisateur = () => {
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
    setError(null);
    const data = {
      matricule,
      birthdate,
      name,
      surname,
      grade : grade.value,
      email
    };
    axios
    .post(`${config.apiBaseUrl}/profs`, data ,{
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    }).then(() => {
      enqueueSnackbar('Enseignant ajouté avec succès', { variant: 'success' });
      navigate('/');
    })
    .catch((error) => {
      enqueueSnackbar('Error', { variant: 'error' });
      console.log(error);
    });
  };
  return (
    <div className={`flex min-h-screen flex-col body-font ${theme === 'dark' ? 'text-gray-400 bg-gray-900' : 'bg-gray-200 text-gray-800'}`}>
        <Navbar />
        <Sidebar />
          <div className='flex flex-col text-center w-full  mt-8'>
            <h1 className='sm:text-2xl text-2xl font-bold font-body'>
              Ajouter un Professeur
            </h1>
          </div>
        <div className={`rounded-xl mb-8 border shadow  mx-auto  lg:col-span-8 xl:p-6 p-4 md:w-1/2 md:mt-4 justify-center ${theme === 'dark' ? 'border-gray-200 ' : 'border-gray-600 '}`}>
          <div className='my-4'>
            <label className={`font-medium font-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Matricule</label>
            <input
              type='number'
              min={0}
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              className={`w-full bg-opacity-20 focus:ring-indigo-900 rounded py-1 px-3 border text-base outline-none leading-8 transition-colors duration-200 ease-in-out font-body ${theme === 'dark' ? 'bg-gray-600 border-gray-600 focus:border-indigo-500 text-white' : 'bg-gray-400 border-gray-600 focus:border-indigo-500 text-black'}`} />
          </div>
          <div className='my-4'>
            <label className={`font-medium font-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Date de naissance </label>
            <input
              type='date'
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              placeholder='dd/mm/yyyy'
              className={`w-full bg-opacity-20 focus:ring-indigo-900 rounded py-1 px-3 border text-base outline-none leading-8 transition-colors duration-200 ease-in-out font-body ${theme === 'dark' ? 'bg-gray-600 border-gray-600 focus:border-indigo-500 text-white' : 'bg-gray-400 border-gray-600 focus:border-indigo-500 text-black'}`}
            />
          </div>
          <div className='my-4'>
            <label className={`font-medium font-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Nom</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full bg-opacity-20 focus:ring-indigo-900 rounded py-1 px-3 border text-base outline-none leading-8 transition-colors duration-200 ease-in-out font-body ${theme === 'dark' ? 'bg-gray-600 border-gray-600 focus:border-indigo-500 text-white' : 'bg-gray-400 border-gray-600 focus:border-indigo-500 text-black'}`} />
          </div>
          <div className='my-4'>
            <label className={`font-medium font-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Prénom</label>
            <input
              type='text'
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className={`w-full bg-opacity-20 focus:ring-indigo-900 rounded py-1 px-3 border text-base outline-none leading-8 transition-colors duration-200 ease-in-out font-body ${theme === 'dark' ? 'bg-gray-600 border-gray-600 focus:border-indigo-500 text-white' : 'bg-gray-400 border-gray-600 focus:border-indigo-500 text-black'}`} />
          </div>
          <div className='my-4'>
            <label className={`font-medium font-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Grade</label>
            <Select
                options={[{ value: "MCA", label: "MCA" }, { value: "MCB", label: "MCB"},{ value: "MAA", label: "MAA"},{value:"Pr",label:"Pr"},{value:"Doct",label:"Doct"},{value:"Vac",label:"Vac"}]}
                value={grade}
                onChange={handleChangeGrade}
                className="basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-700 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out" 
                styles={{
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
            <label className={`font-medium font-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>E-mail</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-opacity-20 focus:ring-indigo-900 rounded py-1 px-3 border text-base outline-none leading-8 transition-colors duration-200 ease-in-out font-body ${theme === 'dark' ? 'bg-gray-600 border-gray-600 focus:border-indigo-500 text-white' : 'bg-gray-400 border-gray-600 focus:border-indigo-500 text-black'}`} />
          </div>
          <button className='w-full mt-3 text-white font-body font-semibold bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onClick={handleSaveUtilisateur}>
          Ajouter
        </button>
        {error && <p className='error-message font-body text-red-700 text-center text-lg mt-4'>{error}</p>}
        </div>
    </div>
  )
}

export default Utilisateur