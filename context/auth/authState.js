import React,{useReducer} from 'react';
import authContext from "./authContext";
import authReducer from "./authReducer";
import { REGISTRO_EXITOSO,REGISTRO_ERROR,LIMPIAR_ALERTA, LOGIN_EXITOSO,LOGIN_ERROR, USUARIO_AUTENTICADO,CERRAR_SESION } from '../../types';
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/tokenAuth';


const AuthState = ({children}) => {
    //state inicial
    const inistialState = {
        token: typeof window !=='undefined' ?localStorage.getItem('token'):'',
        autenticado:null,
        usuario:null,
        mensaje:null,
    }
    //definir el recuder
    const [state, dispatch]= useReducer(authReducer, inistialState);

    //autenticar usuarios
    const iniciarSesion = async datos=>{
        try {
            const respuesta = await clienteAxios.post('/api/auth',datos)
            
            dispatch({
                type:LOGIN_EXITOSO,
                payload:respuesta.data.token
            })
        } catch (error) {
            dispatch({
                type:LOGIN_ERROR,
                payload:error.response.data.msg
            })
        }
        setTimeout(() => {
            dispatch({
                type:LIMPIAR_ALERTA
            })
        }, 3000);
    }


    //registrar nuevos usuarios
    const registrarUsuario= async datos=>{
        try {
            const respuesta= await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta)
            dispatch({
                type:REGISTRO_EXITOSO,
                payload:respuesta.data.msg
            });

            

        } catch (error) {
            console.log(error.response.data.msg)
            dispatch({
                type:REGISTRO_ERROR,
                payload:error.response.data.msg
            })
            
        }
        setTimeout(() => {
            dispatch({
                type:LIMPIAR_ALERTA
            })
        }, 3000);
    }

    //retornar el usuario autenticado en base al JWT


    //usuario autenticado

    const usuarioAutenticado=async ()=>{
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token)
        }
        try {
            const respuesta = await clienteAxios.get('/api/auth')
            dispatch({
                type:USUARIO_AUTENTICADO,
                payload:respuesta.data.usuario

            })
        } catch (error) {
            dispatch({
                type:LOGIN_ERROR,
                payload:error.response.data.msg
            })
        }
    }
    //cerrar sesion

    const cerrarSesion =  async ()=>{
        dispatch({
            type:CERRAR_SESION
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
               registrarUsuario,
               iniciarSesion,
               cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}
 
export default AuthState;