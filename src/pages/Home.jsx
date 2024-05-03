import React from 'react'
import { Link } from 'react-router-dom'

import Ajouter from '/assets/plan.png'
import AjouterS from '/assets/salle.png'
import AjouterP from '/assets/prof.png'
import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
function Home() {
  return (
    <div className='h-screen bg-gray-900 font-body'>
      <Navbar />
      <Sidebar />
      <div className='h-3/4 w-full flex flex items-center justify-center bg-gray-900'>
        <Link to='/planning' className='bg-gray-800 p-6 mr-6 rounded-md text-center text-white hover:bg-gray-700' ><img src={Ajouter} className='w-40 h-40     rounded-md mb-2' alt="" />Ajouter Planning</Link>
        <Link to='/salle' className='bg-gray-800 p-6 mr-6 rounded-md text-center text-white hover:bg-gray-700'><img src={AjouterS} className='w-40 h-40  rounded-md mb-2' alt="" />Ajouter Salle</Link>
        <Link to='/utilisateur' className='bg-gray-800 p-6  rounded-md text-center text-white hover:bg-gray-700'><img src={AjouterP} className='w-40 h-40      rounded-md mb-2' alt="" />Ajouter Professeur</Link>
      </div>
    </div>
  )
}

export default Home