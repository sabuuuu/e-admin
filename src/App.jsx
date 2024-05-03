import React from 'react'
import { Routes , Route , Navigate} from 'react-router-dom'
import  useAuthContext  from './hooks/useAuthContext'

import Home from './pages/Home'
import Planning from './pages/Planning'
import Utilisateur from './pages/Utilisateur'
import AjouterSalle from './pages/AjouterSalle'
import ListePlanning from './pages/ListePlanning'
import ListeSalles from './pages/ListeSalles'
import ListeUtil from './pages/ListeUtil'
import AjouterExam from './pages/AjouterExam'

import Login from './pages/Login'
import Signup from './pages/Signup'


function App() {
  const {user} = useAuthContext();

  return (
    <Routes>
      <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
      <Route path='/planning' element={user ? <Planning /> : <Navigate to='/login' />} />
      <Route path='/utilisateur' element={user ? <Utilisateur /> : <Navigate to='/login' />} />
      <Route path='/salle' element={user ? <AjouterSalle /> : <Navigate to='/login' />} />
      <Route path='/listeplannings' element={user ? <ListePlanning /> : <Navigate to='/login' />} />
      <Route path='/listesalles' element={user ? <ListeSalles /> : <Navigate to='/login' />} />
      <Route path='/listeutilisateurs' element={user ? <ListeUtil /> : <Navigate to='/login' />} />
      <Route path='/about' element={user ? <AjouterExam /> : <Navigate to='/login' />} />

      <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
      <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
    </Routes>
  )
}

export default App
