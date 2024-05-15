import React ,{ useState ,useEffect} from 'react'
import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import  useAuthContext  from '../hooks/useAuthContext';
import Select from 'react-select';

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
  const [exams,setExams] = useState([]);
  const [faculte,setFaculte] = useState({value: "Sciences exactes", label: "Sciences exactes"});
  const [departement,setDepartement] = useState({value: "Informatique", label: "Informatique" });
  const [filiere,setFiliere] = useState({ value: "Ingéniorat", label: "Ingéniorat" });
  const [annee,setAnnee] = useState(  { value: "L1", label: "L1" },);
  const [semestre,setSemestre] = useState({ value: "1", label: "1" });
  const [type,setType] = useState({ value: "Normal", label: "Normal" });
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
        .get('http://localhost:5555/profs/all', {
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
        get('http://localhost:5555/salles/all', { 
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
      const profs = liste;
      const salles = listeS;
      const examNames = names;
      const requestData = {
        examNames: examNames,
        profs: profs,
        salles: salles
    };
      axios
        .post('http://localhost:5555/plannings/generate', requestData,{
          headers: {
            'Authorization': `Bearer ${user.token}`,            
          }
        })
        .then((response) => {
          console.log(response.data.data);
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

  const handleSaveExam = (exam) => {
    const data = {
      name : exam.name,
      date : exam.date,
      time : exam.time,
      profs : exam.profs.map(prof => prof._id ),
      salle : exam.salle._id
    };
    axios
    .post('http://localhost:5555/exams', data ,{
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
    .post('http://localhost:5555/plannings', data ,{
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
    <div className='flex min-h-screen flex-col text-gray-400 bg-gray-900 body-font'>
      <Navbar />
      <Sidebar />
      <div className='flex items-center justify-around px-8 py-4'>
        <h1 className='sm:text-2xl text-2xl font-bold font-body text-white'>
          Ajouter un Planning d'examen
        </h1>
      </div>

      <div className='rounded-xl mb-8 border border-gray-200 shadow  mx-auto  lg:col-span-8 xl:p-6 p-4 md:w-1/2 md:mt-4 justify-center '>
        <div className='my-4'>
            <label className='font-medium font-body text-gray-300'>Faculté :</label>
            <Select
                options={faculteOptions}
                value={faculte}
                onChange={handleChangeFac}
                className="basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out"
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
          <label className='font-medium font-body text-gray-300'>Département :</label>
            <Select
                options={specialiteOptions}
                value={departement}
                onChange={handleChangeDep}
                className="basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out"
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
          <label className='font-medium font-body text-gray-300'>Filiére :</label>
            <Select
                options={filiereOptions}
                value={filiere}
                onChange={handleChangeFil}
                className="basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out"
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
          <label className='font-medium font-body text-gray-300'>Année :</label>
            <Select
                options={anneeOptions}
                value={annee}
                onChange={handleChangeAn}
                className="basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out"
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
          <label className='font-medium font-body text-gray-300'>Semestre :</label>
            <Select
                options={[{ value: "1", label: "1" }, { value: "2", label: "2" }]}
                value={semestre}
                onChange={handleChangeSem}
                className="basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out"
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
          <label className='font-medium font-body text-gray-300'>Session :</label>
            <Select
                options={[{ value: "Normal", label: "Normal" }, { value: "Rattrapage", label: "Rattrapage" },{ value: "Remplacement", label: "Remplacement" }]}
                value={type}
                onChange={handleChangeTy}
                className="basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out"
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
          <div className='flex'>
            <div className="mr-4 w-3/4">
            <label className="block mb-1 text font-medium font-body text-gray-300">Saisir les noms des modules a passer </label>
              <input type="text"
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                className='w-full font-body bg-gray-600 bg-opacity-20 mt-3 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'/>
            </div>
            <div className="w-1/4 ">
              <button onClick={addName} className='w-full py-2 lg:mt-10 mt-6  text-white font-body font-semibold bg-green-800 border-0 px-4 focus:outline-none hover:bg-green-900 rounded text-sm'>Ajouter nom</button>
            </div>
          </div>
            <ul className='rounded-xl bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 w-full mt-2 p-4 mx-auto  justify-center'>
              {names.map((name, index) => (
                <li key={name} className='flex py-2 px-4 mb-1 font-semibold items-center justify-between text-gray-200 font-body rounded-xl bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700'>
                  {name}
                  <button onClick={() => removeName(index)} 
                    className='py-2 text-white font-body font-semibold bg-red-800 border-0 px-4 focus:outline-none hover:bg-red-900 rounded text-xs'>Supprimer</button>
                </li>
              ))}
            </ul>
          <button className='w-full mt-3 text-white font-body font-semibold bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onClick={getPlanning}>Générer</button>
          {exams.length > 0 ? (
              <div className="overflow-x-auto mt-3 font-body">
                <table className="min-w-full rounded-lg overflow-hidden shadow-lg">
                  <thead>
                    <tr>
                      <th className="px-6 py-5 bg-gray-400 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider">Module</th>
                      <th className="px-6 py-3 bg-gray-400 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider">Horraire</th>
                      <th className="px-6 py-3 bg-gray-400 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 bg-gray-400 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider">Enseignants</th>
                      <th className="px-6 py-3 bg-gray-400 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider">Lieu</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-200 divide-y divide-gray-200 text-gray-700">
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
                        <td className="px-2 py-4 whitespace-no-wrap">{exam.salle.num}</td>
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