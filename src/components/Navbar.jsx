import { useContext} from 'react'
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import Logo1 from '/assets/logo.png';
export const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className={`w-full pl-12 py-3 md:pl-48 lg:pl-48 font-body max-w-8xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-xl flex font-bold">
                <img src={Logo1} alt="Logo" className="h-22 w-44" />
              </Link>
            </div>
          </div>
        </div>
        <div className="">
              <div className="ml-10 flex justify-center items-center space-x-4">
                <div className={`flex justify-center items-center h-12 w-12 border-none  rounded ${theme === 'dark' ? 'bg-gray-800 ' : 'bg-blue-800'}`}>
                  <button onClick={toggleTheme}
                    className={`h-12 w-12 rounded p-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}>
                    <svg className={`fill-violet-950 ${theme === 'dark' ? 'hidden' : 'block'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                    <svg className={`fill-yellow-500  ${theme === 'dark' ? 'block' : 'hidden'}`}fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
                <Link to="/about" className={`text-white px-10 py-3 rounded-md text-sm font-medium ${theme === 'dark' ? 'bg-gray-900  hover:bg-gray-700' : 'bg-blue-900 hover:bg-blue-700'}`}>
                  A propos
                </Link>
              </div>
            </div>
      </div>
    </nav>
  );
};


