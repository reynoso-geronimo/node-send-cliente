/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";
import React, { useState, useEffect,useContext } from "react";
import authContext from "../../context/auth/authContext";
import appContext from "../../context/app/appContext";
import Alerta from "../../components/Alerta";


export async function getServerSideProps({ params }) {
  const { enlace } = params;
  const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);

  console.log(resultado);
  return {
    props: {
      enlace: resultado.data,
    },
  };
}

export async function getServerSidePaths() {
  const enlaces = await clienteAxios.get("/api/enlaces");
  return {
    paths: enlaces.data.enlaces.map((enlace) => ({
      params: { enlace: enlace.url },
    })),
    fallback: false,
  };
}

export default ({ enlace }) => {

    const AuthContext = useContext(authContext)
    const {usuarioAutenticado}= AuthContext

  const [tienePassword, setTienePassword] = useState(enlace.password);
  const [password, setPassword] = useState('');
  console.log(tienePassword);

  //console.log(enlace);
  
  const verificarPassword=async e=>{
      const data= {
          password
      }
      try {
        e.preventDefault()
        const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`,data)
        enlace.archivo = resultado.data.archivo
        setTienePassword(resultado.data.password)
        console.log(resultado)
      } catch (error) {
      
          mostrarAlerta(error.response.data.msg)
      }
      
  }

  useEffect(() => {
    const token= localStorage.getItem('token')
    if(token){
      usuarioAutenticado();
    }
    
  }, []);

  const AppContext = useContext(appContext);
  const { mostrarAlerta , mensaje_archivo} = AppContext;

  return (
      
    <Layout>
      {tienePassword ? (
        <>
          <p className='text-center'>
            Este enlace esta protegido por un password, colocalo a continuacion
          </p>
          {mensaje_archivo && <Alerta />}
          <div className='flex justify-center mt-5'>
          <div className="w-full max-w-lg">
            <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={e=>verificarPassword(e)}
            >
              <div className="mb-4 ">
                <label
                  className="block text-black text-sm text-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                  id="password"
                  placeholder="Password del Enlace"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                value="Validar Password"
              />
            </form>
          </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo:
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              download
              href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
              className="py-3 px-10 border rounded uppercase font-bold bg-red-500 text-white text-center cursor-pointer"
            >
              Aqui
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};
