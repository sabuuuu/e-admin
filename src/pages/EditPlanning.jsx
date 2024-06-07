import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import  useAuthContext  from '../hooks/useAuthContext';
import Select from 'react-select';
import { ThemeContext } from '../context/ThemeContext'

import EditableTable from './EditTable';
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
function EditPlanning() {
  const { theme } = useContext(ThemeContext);
    const [exams,setExams] = useState([]);
    const [faculte,setFaculte] = useState({value: "Sciences exactes", label: "Sciences exactes"});
    const [departement,setDepartement] = useState({value: "Informatique", label: "Informatique" });
    const [filiere,setFiliere] = useState({ value: "Ingéniorat", label: "Ingéniorat" });
    const [annee,setAnnee] = useState(  { value: "L1", label: "L1" },);
    const [semestre,setSemestre] = useState({ value: "1", label: "1" });
    const [type,setType] = useState({ value: "Normal", label: "Normal" });
    const [error,setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuthContext();
    const {id} = useParams();

    const [profs, setProfs] = useState([]);
    const [salles, setSalles] = useState([]);

    useEffect(() => {
      const getProfs = async () => {
        try {
          const response = await axios.get(`${config.apiBaseUrl}/profs/all`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          setProfs(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      const getSalles = async () => {
        try {
          const response = await axios.get(`${config.apiBaseUrl}/salles/all`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          setSalles(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      const getPlanning = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${config.apiBaseUrl}/plannings/${id}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          const planning = response.data;
          setExams(planning.exams);
          setFaculte({ value: planning.faculte, label: planning.faculte });
          setDepartement({ value: planning.departement, label: planning.departement });
          setFiliere({ value: planning.filiere, label: planning.filiere });
          setAnnee({ value: planning.annee, label: planning.annee });
          setSemestre({ value: planning.semestre, label: planning.semestre });
          setType({ value: planning.type, label: planning.type });
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
  
      getProfs();
      getSalles();
      getPlanning();
    },[] );


    const handleUpdateExam = (exam) => {
      if (exam.profs && Array.isArray(exam.profs)) {
        const data = {
          _id: exam._id,
          name: exam.name,
          date: exam.date,
          time: exam.time,
          profs: exam.profs.map(prof => typeof prof === 'object' ? prof._id : prof),
          salle: exam.salle._id
        };
        try {
          axios.put(`${config.apiBaseUrl}/exams/${exam._id}`, data, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
            .then((response) => {
              enqueueSnackbar('Examen modifié avec succès', { variant: 'success' });
            })
            .catch((error) => {
              enqueueSnackbar('Error', { variant: 'error' });
              console.log(error);
            });
        } catch (error) {
          enqueueSnackbar('Error', { variant: 'error' });
          console.log(error);
        }
    }
  }
    const handleEditPlanning = () => {
        exams.forEach(exam => {
          handleUpdateExam(exam);
        });
      
        const data = {
          exams : exams.map(exam => exam._id),
          faculte : faculte.value,
          departement : departement.value,
          filiere : filiere.value,
          annee : annee.value,
          semestre : semestre.value,
          type : type.value
        }
        axios
        .put(`${config.apiBaseUrl}/plannings/${id}`, data , {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        .then((response) => {
          enqueueSnackbar('Planning modifié avec succès', { variant: 'success' });
          navigate('/listeplannings');
        })
        .catch((error) => {
          enqueueSnackbar('Error', { variant: 'error' });
          console.log(error);
        });
    }
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
  return (
    <div className={`flex min-h-screen flex-col body-font ${theme === 'dark' ? 'text-gray-200 bg-gray-900' : 'bg-gray-200 text-gray-800'}`}>
      <Navbar />
      <Sidebar />
      <div className='flex items-center justify-around px-8 py-4'>
        <h1 className='sm:text-2xl text-2xl font-bold font-body'>
          Modifier un Planning d'examen
        </h1>
      </div>

      <div className={`rounded-xl mb-8 border shadow  mx-auto  lg:col-span-8 xl:p-6 p-4 md:w-1/2 md:mt-4 justify-center ${theme === 'dark' ? 'border-gray-200 ' : 'border-gray-600 '}`}>
        <div className="w-full overflow-x-auto rounded-lg">    
          <div className='my-4 mx-8'>
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
          <div className='my-4 mx-8 '>
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
          <div className='my-4 mx-8'>
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
          <div className='my-4 mx-8'>
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
          <div className='my-4 mx-8'>
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
          <div className='my-4 mx-8'>
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
          <div className='my-4 border-t border-opacity-30'>
            <h1 className='font-bold text-lg font-body text-gray-300'>Modifier les exams</h1>
            <EditableTable exams={exams} setExams={setExams} profs={profs} salles={salles} />
            <div className='mx-28'>
              <button className='w-full  self-center  mt-3 text-white font-body font-semibold bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onClick={handleEditPlanning}>
                      Sauvegarder les modifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPlanning