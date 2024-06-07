import React ,{ useState ,useEffect ,useContext} from 'react'
import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import  useAuthContext  from '../hooks/useAuthContext';
import Select from 'react-select';
import { ThemeContext } from '../context/ThemeContext'
import config from '../config/Config';
const faculteOptions = [
  { value: "Sciences exactes", label: "Sciences exactes" },
  { value: "Technologie", label: "Technologie" },
  { value: "Sciences de la nature et de la vie", label: "Sciences de la nature et de la vie" },
];

const specialiteOptions = [
  { value: "Informatique", label: "Informatique" },
  { value: "Chimie", label: "Chimie" },
  { value: "Physique et SM", label: "Physique et SM" },
  { value: "Recherche Opérationnelle", label: "Recherche Opérationnelle"},
  { value: "Mathématiques", label: "Mathématiques"},

];

const filiereOptions = [
  { value: "Ingéniorat", label: "Ingéniorat" },
  { value: "Informatique", label: "Informatique" },
  { value: "Informatique LMD", label: "Informatique RN" },
  { value: "Informatique MI", label: "Informatique MI" },
  { value: "Informatique RN-SI", label: "Informatique RN-SI" },
  { value: "Informatique RN-RS", label: "Informatique RN-RS" },
  { value: "ASR", label: "ASR" },
  { value: "GL", label: "GL" },
  { value: "IA", label: "IA" },
  { value: "RS", label: "RS" },
  { value: "SIA", label: "SIA" },
];

const anneeOptions = [
  { value: "L1", label: "L1" },
  { value: "L2", label: "L2" },
  { value: "L3", label: "L3" },
  { value: "M1", label: "M1" },
  { value: "M2", label: "M2" },
];

function Planning() {
  const { theme } = useContext(ThemeContext);
  const [exams,setExams] = useState([]);
  const [faculte,setFaculte] = useState({value: "Sciences exactes", label: "Sciences exactes"});
  const [departement,setDepartement] = useState({value: "Informatique", label: "Informatique" });
  const [filiere,setFiliere] = useState({ value: "Ingéniorat", label: "Ingéniorat" });
  const [annee,setAnnee] = useState(  { value: "L1", label: "L1" },);
  const [semestre,setSemestre] = useState({ value: "1", label: "1" });
  const [type,setType] = useState({ value: "Normal", label: "Normal" });
  const[error,setError] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const [liste, setListe] = useState([]);
  const [listeS, setListeS] = useState([]);

  const [names, setNames] = useState([]);  
  const [newName, setNewName] = useState('');  

  const addName = () => {
    setNames([...names, newName]);
    setNewName('');
  };

  const removeName = (index) => {
    const updatedNames = [...names]; // Copy the array
    updatedNames.splice(index, 1); // Remove element at specific index
    setNames(updatedNames);
  };
  const getProfs =  () => {
    try {
      axios
        .get(`${config.apiBaseUrl}/profs/all`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        })
        .then((response) => {
          setListe(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const getSalles =  () => {
    try {
      axios.
        get(`${config.apiBaseUrl}/salles/all`, { 
          headers: { 'Authorization': `Bearer ${user.token}` } })
        .then((response) => {
          setListeS(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  } 
  useEffect(() => {
    getProfs();
    getSalles();
  }, []);

  const handleChangeFac = (selectedOption) => {
    setFaculte(selectedOption);
  };
  const handleChangeDep = (selectedOption) => {
    setDepartement(selectedOption);
  };

  const handleChangeFil = (selectedOption) => {
    setFiliere(selectedOption);
  };
  const handleChangeAn = (selectedOption) => {
    setAnnee(selectedOption);
  };
  const handleChangeSem = (selectedOption) => {
    setSemestre(selectedOption);
  };
  const handleChangeTy = (selectedOption) => {
    setType(selectedOption);
  };
  const getPlanning =  () => {
    try {
      if(names.length === 0){
        setError('Veuillez ajouter au moins un examen 📚');
        return;
      }
      setError(null);
      const profs = liste;
      const salles = listeS;
      const examNames = names;
      const requestData = {
        examNames: examNames,
        profs: profs,
        salles: salles
    };
      axios
        .post(`${config.apiBaseUrl}/plannings/generate`, requestData,{
          headers: {
            'Authorization': `Bearer ${user.token}`,            
          }
        })
        .then((response) => {
          setExams(response.data.data);
        })
        .catch((error) => {
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

  const handleSaveExam = (exam) => {
    const data = {
      _id : exam._id,
      name : exam.name,
      date : exam.date,
      time : exam.time,
      profs : exam.profs.map(prof => prof._id ),
      salle : exam.salle._id
    };
    axios
    .post(`${config.apiBaseUrl}/exams`, data ,{
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    }).then(() => {
      enqueueSnackbar('Examen ajouté avec succès', { variant: 'success' });
    })
    .catch((error) => {
      enqueueSnackbar('Error', { variant: 'error' });
      console.log(error);
    });
  }
  const handleSavePlanning = () => {
    exams.forEach(exam => {
      handleSaveExam(exam);
    });
    
    const data = {
      exams : exams.map(exam => exam._id),
      faculte : faculte.value,
      departement : departement.value,
      filiere : filiere.value,
      annee : annee.value,
      semestre : semestre.value,
      type : type.value
    };
    axios
    .post(`${config.apiBaseUrl}/plannings`, data ,{
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    }).then(() => {
      enqueueSnackbar('Planning ajouté avec succès', { variant: 'success' });
      navigate('/');
    })
    .catch((error) => {
      enqueueSnackbar('Error', { variant: 'error' });
      console.log(error);
    });
  };

  return (
    <div className={`flex min-h-screen flex-col body-font ${theme === 'dark' ? 'text-gray-200 bg-gray-900' : 'bg-gray-200 text-gray-800'}`}>
      <Navbar />
      <Sidebar />
      <div className='flex items-center justify-around px-8 py-4'>
        <h1 className='sm:text-2xl text-2xl font-bold font-body'>
          Ajouter un Planning d'examen
        </h1>
      </div>

      <div className={`rounded-xl mb-8 border shadow  mx-auto  lg:col-span-8 xl:p-6 p-4 md:w-1/2 md:mt-4 justify-center ${theme === 'dark' ? 'border-gray-200 ' : 'border-gray-600 '}`}>
        <div className='my-4'>
            <label className={`font-medium font-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Faculté :</label>
            <Select
                options={faculteOptions}
                value={faculte}
                onChange={handleChangeFac}
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
<label className={`font-medium font-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Département :</label>
            <Select
                options={specialiteOptions}
                value={departement}
                onChange={handleChangeDep}
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
<label className={`font-medium font-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Filiére :</label>
            <Select
                options={filiereOptions}
                value={filiere}
                onChange={handleChangeFil}
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
<label className={`font-medium font-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Année :</label>
            <Select
                options={anneeOptions}
                value={annee}
                onChange={handleChangeAn}
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
<label className={`font-medium font-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Semestre :</label>
            <Select
                options={[{ value: "1", label: "1" }, { value: "2", label: "2" }]}
                value={semestre}
                onChange={handleChangeSem}
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
<label className={`font-medium font-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Session :</label>
            <Select
                options={[{ value: "Normal", label: "Normal" }, { value: "Rattrapage", label: "Rattrapage" },{ value: "Remplacement", label: "Remplacement" }]}
                value={type}
                onChange={handleChangeTy}
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
          <div className='flex'>
            <div className="mr-4 w-3/4">
            <label className="block mb-1 text font-medium font-body ">Saisir les noms des modules a passer </label>
              <input type="text"
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                className={`w-full bg-opacity-20 focus:ring-indigo-900 rounded py-1 px-3 border text-base outline-none leading-8 transition-colors duration-200 ease-in-out font-body ${theme === 'dark' ? 'bg-gray-600 border-gray-600 focus:border-indigo-500 text-white' : 'bg-gray-400 border-gray-600 focus:border-indigo-500 text-black'}`}/>
            </div>
            <div className="w-1/4 ">
              <button onClick={addName} className='w-full py-2 lg:mt-10 mt-6  text-white font-body font-semibold bg-green-800 border-0 px-4 focus:outline-none hover:bg-green-900 rounded text-sm'>Ajouter nom</button>
            </div>
          </div>
            <ul className={`rounded-xl border  shadow w-full mt-2 p-2 mx-auto  justify-center ${theme === 'dark' ? 'border-gray-200 ' : 'border-gray-700 bg-gray-300'}`}>
              {names.map((name, index) => (
                <li key={name} className={`flex py-2 px-4 mb-1 font-semibold items-center justify-between  font-body rounded-xl  border border-gray-200 shadow ${theme === 'dark' ? 'bg-gray-800 text-white' : ' text-gray-900'}`}>
                  {name}
                  <button onClick={() => removeName(index)} 
                    className='py-2 text-white font-body font-semibold bg-red-800 border-0 px-4 focus:outline-none hover:bg-red-900 rounded text-xs'>Supprimer</button>
                </li>
              ))}
            </ul>
          <button className='w-full mt-3 text-white font-body font-semibold bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onClick={getPlanning}>Générer</button>
            {error && <div className='error-message text-red-700 font-body text-center mt-2'>{error}</div>}
          {exams.length > 0 ? (
              <div className="overflow-x-auto mt-3 font-body">
                <table className="min-w-full rounded-lg overflow-hidden shadow-lg">
                  <thead>
                    <tr>
                      <th className={`px-6 py-4  text-left text-xs leading-4 font-medium  uppercase tracking-wider ${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-gray-400 text-gray-800 font-bold'}`}>Module</th>
                      <th className={`px-6 py-3  text-left text-xs leading-4 font-medium  uppercase tracking-wider ${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-gray-400 text-gray-800'}`} >Horraire</th>
                      <th className={`px-6 py-3  text-left text-xs leading-4 font-medium  uppercase tracking-wider ${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-gray-400 text-gray-800'}`} >Date</th>
                      <th className={`px-6 py-3  text-left text-xs leading-4 font-medium  uppercase tracking-wider ${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-gray-400 text-gray-800'}`} >Enseignants</th>
                      <th className={`px-6 py-3  text-left text-xs leading-4 font-medium  uppercase tracking-wider ${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-gray-400 text-gray-800'}`} >Lieu</th>
                    </tr> 
                  </thead>
                  <tbody className={` divide-y  ${theme === 'dark' ? 'bg-gray-600 divide-gray-200 text-gray-200' : 'bg-gray-300 text-gray-700'}`}>
                    {exams.map((exam) => (
                      <tr key={exam._id}>
                        <td className="px-4 py-4 whitespace-no-wrap">{exam.name}</td>
                        <td className="px-2 py-4 whitespace-no-wrap">{exam.time}</td>
                        <td className="px-2 py-4 whitespace-no-wrap">{exam.date}</td>
                        <td className="px-2 py-4 whitespace-no-wrap">
                          {exam.profs.map((prof, index) => (
                            <span key={index} className="block">{prof.name}</span>
                          ))}
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap">{exam.salle.batiment} {exam.salle.type} {exam.salle.num}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              <button className='w-full mt-3 text-white font-body font-semibold bg-indigo-800 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onClick={handleSavePlanning}>Ajouter ce planning</button>
            </div>
          ) : (
            null
          )}
      </div>
    </div>
  )
}

export default Planning