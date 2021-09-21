import React,{useReducer} from 'react';
import authContext from "./authContext";
import authReducer from "./authReducer";
import { USUARIO_AUTENTICADO } from '../../types';

const AuthState = ({children}) => {
    //state inicial
    const inistialState = {
        token:'',
        autenticado:null,
        usuario:null,
        mensaje:null,
    }
    //definir el recuder
    const [state, dispatch]= useReducer(authReducer, inistialState);

    //registrar nuevos usuarios
    const registrarUsuario=datos=>{
        console.log(datos)
    }

    //usuario autenticado

    const usuarioAutenticado=nombre=>{
        dispatch({
            type:USUARIO_AUTENTICADO,
            payload:nombre
        })
    }
    
    return(
        <authContext.Provider
            value={{
               token:state.token,
               autenticado:state.autenticado,
               usuario:state.usuario,
               mensaje:state.mensaje,
               usuarioAutenticado,
               registrarUsuario
            }}
        >
            {children}
        </authContext.Provider>
    )
}
 
export default AuthState;