import React, {useCallback,useContext } from "react";
import { useDropzone } from "react-dropzone";
import appContext from "../context/app/appContext";
import clienteAxios from "../config/axios";

const Dropzone = () => {
  
  const Appcontext= useContext(appContext)
  const { mostrarAlerta,subirArchivo,crearEnlace, cargando , url }= Appcontext

  const onDropRejected=()=>{
    mostrarAlerta(`No se pudo subir, Limite de archivo 1MB obten una cuenta para subir archivos mas grandes`)
    }


  const onDropAccepted=useCallback(async(acceptedFiles)=>{
     // console.log(acceptedFiles)
     const formData = new FormData()
     formData.append('archivo', acceptedFiles[0])
     
     subirArchivo(formData, acceptedFiles[0].path)
      //crear un form data

  }, [])

  
  //extraer contenido de dropzone

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDropAccepted,onDropRejected, maxSize:1000000});

  const archivos = acceptedFiles.map(archivo=>( 
      <li key={archivo.lastModified} className='bg-white flex-1 mb-4 shadow-lg rounded'>
          <p className='font-bold text-xl'>{archivo.path}</p>
          <p className='text-sm text-gray-300'>{(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
      </li>
  ))



  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dasehd border-gray-400 border-2 bg-gray-100 px-4">
        {acceptedFiles.length>0?(
            <div className='mt-10 w-full'>
                <h4 className='text-2xl font-bold text-center mb-4'>Archivos</h4>
                <ul>
                 {archivos}
                </ul>
                {cargando?(<p className='text-center my-10 text-gray-600'>Subiendo archivo....</p>):(
                  <button
                  type='button'
                  className='bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800'
                  onClick={()=>{ crearEnlace()}}
              >Crear Enalce</button>
                )}
                
        </div>
        ):(
            <div {...getRootProps({ className: "dropzone w-full py-32" })}>
            <input className="h-100" {...getInputProps()} />
    
            {isDragActive ? (
              <p className='text-2xl text-center text-gray-600'>Suelta el Archivo</p>
            ) : (
              <div className="text-center">
                <p className="text-2xl text-center text-gray-600">
                  Seleccion un archivo y arrastralo aqui
                </p>
                <button
                  className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                  type="button"
                >
                  Selecciona archivos para subir
                </button>
              </div>
            )}
          </div>
        )}
        
   
    </div>
  );
};

export default Dropzone;
