import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Link } from "react-router-dom";

import Logo from '/assets/logo.png'
import E from '/assets/e.png'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surame, setSurame] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(name, surame, email, password)
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
      <div className="p-10  mt-10 mb-10 xl:p-12  lg:w-2/6 md:p-8 justify-center bg-black border border-black rounded-lg bg-opacity-30 border-opacity-90">
        <h1 className="mb-1 text-gray-300 text-xl font-medium text-center  md:text-3xl ">Créez votre compte</h1>
        <Link to='/login' >
          <p className="my-2 text-sm font-normal font-body  text-center text-gray-400 md:text-base">
            Vous avez déjà un compte ?
            <a  class=" text-xs font-body text-indigo-300 hover:text-indigo-600">Connectez-vous</a>
          </p>
        </Link>
        <form className="mt-12 space-y-4 w" onSubmit={handleSubmit}>  
            <div className="flex">

              <div className="mr-4 w-full">
                <label className="block mb-1 text-sm font-medium font-body text-gray-400">Nom : </label>
                <input
                  className="w-full bg-gray-600 font-body bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="w-full">
                <label className="block mb-1 text-sm font-medium font-body text-gray-400">Prénom : </label>
                <input
                  className="w-full bg-gray-600 font-body bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  type="text"
                  value={surame}
                  onChange={(e) => setSurame(e.target.value)}
                />
              </div>
            </div>
            <div className='block'>
                <label className='block mb-1 text-sm font-medium font-body text-gray-400'>Email : </label>
                <input className='w-full bg-gray-600 font-body bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' type='email' value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className='block'>
                <label className='block font-body mb-1 text-sm font-medium text-gray-400'>Mot de passe : </label>
                <input  className='w-full font-body bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' type='password' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div class="flex items-center">
              <button className='w-full font-body font-semibold  mt-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' disabled={isLoading}>Inscription</button>
            </div>
            {error && <div className="text-sm mt-3 text-red-700  text-center font-body">{error}</div>}
        </form> 
        <p class="my-5 text-xs font-body font-medium text-center text-gray-400">
          En cliquant sur Inscription, vous acceptez nos
          <a href="#" class="text-xs font-body text-indigo-300 hover:text-indigo-600"> Terms of Service </a>
          et
          <a href="#" class="text-xs font-body text-indigo-300 hover:text-indigo-600"> Privacy Policy</a>.
        </p>
      </div>
    </section>
  )
}

export default Signup