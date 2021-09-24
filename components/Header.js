import React,{useContext,useEffect} from "react";
import Link from "next/link";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import { useRouter } from "next/router"
const Header = () => {

  //routing
  const router=useRouter();


  const AuthContext= useContext(authContext)
  const {usuario, cerrarSesion}=AuthContext

  const Appcontext= useContext(appContext)
  const {limpiarState}=Appcontext

  const redireccionar=()=>{
    router.push('/')
    limpiarState()
  }

  return (
    <header className="py-8 flex flex-col md:flex-row item-center justify-between">
     
        <img onClick={()=>redireccionar()} className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" alt="logo" />
  
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
