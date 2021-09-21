import React,{useContext,useEffect} from "react";
import Link from "next/link";
import authContext from "../context/auth/authContext";

const Header = () => {

  const AuthContext= useContext(authContext)
  const {usuario, cerrarSesion}=AuthContext

  

  return (
    <header className="py-8 flex flex-col md:flex-row item-center justify-between">
      <Link href="/" passHref>
        <img className="w-64 mb-8 md:mb-0" src="/logo.svg" alt="logo" />
      </Link>
      <div>{
          usuario?(<div className='flex items-center'>
          
            <p className='mr-2'>Hola {usuario.nombre}</p>
            <button
              type='button'
              className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2"
              onClick={cerrarSesion}
              >
              
            Cerrar Sesion

              </button>
              </div>
          ):<>
          <Link href="/login">
          <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">
            Iniciar Sesion
          </a>
        </Link>
        <Link href="/crearcuenta">
          <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">
            Crear Cuenta
          </a>
        </Link>
        </>
        }
        
      </div>
    </header>
  );
};

export default Header;
