import React, { useState,useContext } from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import {useLogout} from "../hooks/useLogout";
import { ThemeContext } from '../context/ThemeContext';

const Sidebar = () => {
  const [nav, setNav] = useState(false);
  const { user } = useAuthContext();
  const {logout} = useLogout();
  const handleClick = () => {
      logout();
  }
  const { theme } = useContext(ThemeContext);

  return (
    <div className={` top-0 fixed h-screen w-0 md:w-max flex justify-center items-center font-body ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-800'}`}>
    <div onClick={() => setNav(!nav)} className={`cursor-pointer md:hidden  h-12 w-16 ml-10 mt-4 flex self-start  ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-800'}`}>
        <AiOutlineMenu size={30} color="#fff"/>
      </div>
    {/* Left side */}
    <div className="flex self-start py-4">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col">
        <h2 className="text-2xl p-5 mt-2 font-bold text-white">
            Admindash
        </h2>
        <nav className="flex flex-col text-center p-4 text-gray-800">
            <Link to="/" className={`text-gray-200 py-4 border-b border-gray-300  rounded-t-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}>Dashboard</Link>
            <Link to="/listeplannings" className={`text-gray-200 py-4 border-b border-gray-300  rounded-t-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}>Liste Plannings</Link>
            <Link to='/listeutilisateurs' className={`text-gray-200 py-4 border-b border-gray-300  rounded-t-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}>Liste Enseignants</Link>
            <Link to='/listesalles' className={`text-gray-200 py-4 border-b border-gray-300  rounded-t-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}>Liste Salles</Link>
            <button onClick={handleClick}  className={`text-gray-200 py-4 fixed bottom-6 w-36 rounded-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}>Déconnexion</button>
        </nav>
      </div>
    </div>
    {/* Mobile Menu */}
    {/* Overlay */}
    {nav && (
      <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
    )}
    {/* Side drawer menu */}
    <div
      className={
        nav
          ? `fixed top-0 left-0  h-screen  z-10 duration-300 md:hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-800'}`
          : `fixed top-0 left-[-100%] h-screen z-10 duration-300 md:hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-800'}`
      }
    >
      <AiOutlineClose
        onClick={() => setNav(!nav)}
        size={30}
        color="#fff"
        className="absolute right-4 top-7 cursor-pointer"
      />
        <h2 className="text-2xl p-5 mt-2 font-bold mr-7 text-white">
            Admindash
        </h2>
        <nav className="flex flex-col text-center p-4 text-gray-800">
            <Link to="/" className={`text-gray-200 py-4 border-b border-gray-300  rounded-t-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}>Dashboard</Link>
            <Link to="/listeplannings" className={`text-gray-200 py-4 border-b border-gray-300  rounded-t-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}>Liste Plannings</Link>
            <Link to='/listeutilisateurs' className={`text-gray-200 py-4 border-b border-gray-300  rounded-t-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}>Liste Enseignants</Link>
            <Link to='/listesalles' className={`text-gray-200 py-4 border-b border-gray-300  rounded-t-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}>Liste Salles</Link>
            <button onClick={handleClick}  className={`text-gray-200 py-4 fixed bottom-6 w-36 rounded-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}>Déconnexion</button>
        </nav>
    </div>
  </div>
  );
};

export default Sidebar;