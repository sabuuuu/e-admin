import React ,{useContext} from 'react'
import { Link } from 'react-router-dom'

import Ajouter from '/assets/plan.png'
import AjouterS from '/assets/salle.png'
import AjouterP from '/assets/prof.png'
import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'

import { ThemeContext } from '../context/ThemeContext'
function Home() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`h-screen  font-body ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <Navbar />
      <Sidebar />
      <div className={`h-3/4 w-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`}>
        <Link to='/planning' className={` p-6 mr-6 rounded-md text-center text-white  ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-blue-800 hover:bg-blue-600'}`} ><img src={Ajouter} className='w-40 h-40     rounded-md mb-2' alt="" />Ajouter Planning</Link>
        <Link to='/salle' className={` p-6 mr-6 rounded-md text-center text-white  ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-blue-800 hover:bg-blue-600'}`} ><img src={AjouterS} className='w-40 h-40  rounded-md mb-2' alt="" />Ajouter Salle</Link>
        <Link to='/utilisateur' className={` p-6 mr-6 rounded-md text-center text-white  ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-blue-800 hover:bg-blue-600'}`} ><img src={AjouterP} className='w-40 h-40      rounded-md mb-2' alt="" />Ajouter Enseignant</Link>
      </div>
    </div>
  )
}

export default Home