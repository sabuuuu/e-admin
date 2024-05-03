import { Link } from 'react-router-dom';
import Logo from '/assets/logo2.png';
import Logo1 from '/assets/logo.png';
export const Navbar = () => {
  return (
    <nav className="w-full bg-gray-800 pl-12 py-3 md:pl-48 lg:pl-48 font-body max-w-8xl ">
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
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/about" className="text-gray-300 hover:bg-gray-700 bg-gray-900 hover:text-white px-12 py-3 rounded-md text-sm font-medium">
                  A propos
                </Link>
              </div>
            </div>
      </div>
    </nav>
  );
};


