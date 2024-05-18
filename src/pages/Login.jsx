import React ,{ useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom';

import Logo from '/assets/logo.png'
import E from '/assets/e.png'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    }

  return (
    <section className="h-full md:h-full flex flex-col lg:flex-row lg:h-screen text-gray-400 lg:bg-[url('/assets/bg.jpg')] bg-[url('/assets/6.jpg')] bg-cover body-font">
      {/* First div */}
      <div className="flex justify-center items-center lg:w-1/2 m-8">
        <div className="text-center">
          <img src={Logo} alt="" className="w-64 mx-auto" />
          <h1 className="mt-6 mb-4 text-4xl text-grey-400 font-body font-bold">
            Bienvenue sur votre site de planning d’examens
          </h1>
          <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <button class="text-gray-400">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </button>
            <button class="ml-3 text-gray-400">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </button>
            <a href="">
            </a>
            <button class="ml-3 text-white">
              <img src={E} alt="" className="w-6 h-6" />
            </button>
          </span>
        </div>
      </div>
      {/* Second div */}
      <div className="p-10  mt-10 mb-10 xl:p-12 lg:w-2/6 md:p-8 justify-center bg-black border border-black rounded-lg bg-opacity-30 border-opacity-90">
            <a href="/" title="Home Page" class="flex items-center justify-center text-white text-2xl font-bold font-body">
              LOG IN
            </a>
            <h1 class="mt-6  text-xl text-center text-grey-400 font-body title-font mb-5 opacity-96">Connectez-vous a votre compte</h1>

            <form className='pb-1 space-y-4 justify-center items-center mt-6 ' onSubmit={handleSubmit}>
              <div className='block'>
                <label className='block mb-1 text-sm font-body text-gray-400'>Email : </label>
                <input className='w-full font-body bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' type='email' value={email} onChange={e => setEmail(e.target.value)} />
              </div>

              <div className='block'>
                <label className='block mb-1 text-sm font-body text-gray-400'>Mot de passe : </label>
                <input  className='w-full font-body bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' type='password' value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div class="flex items-center">
                <button className='w-full  mt-3 text-white font-body font-semibold bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' type='submit' disabled={isLoading}>Connexion</button>
              </div>
              

              {error && <div className='text-sm mt-3 text-red-700  text-center font-body'>{error}</div>}
            </form>
            <div class="my-6 space-y-2">
              <Link to='/signup' >
                <p class="text-xs font-body text-gray-400 text-center">J'ai pas de compte ?
                  <a  class="text-indigo-300 font-body hover:text-indigo-600">Je m'inscris</a>
                </p>
              </Link>
              <a  class="block font-body text-xs text-center text-indigo-300 hover:text-indigo-600">Mot de passe oublié?</a>
            </div>
      </div>
    </section>
  )
}

export default Login