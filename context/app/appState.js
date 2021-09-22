import appContext from './appContext';
import appReducer from './appReducer'
import React,{useReducer} from 'react';
import{
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR
} from '../../types';




const AppState = ({children}) => {

const inistialState= {
    mensaje_archivo:'',
}

const [state,dispatch]= useReducer(appReducer,inistialState)

const mostrarAlerta= msg =>{
    console.log(msg);
    dispatch({
        type:MOSTRAR_ALERTA,
        payload:msg
    })
    setTimeout(() => {
        dispatch({
            type:LIMPIAR_ALERTA
        })
    }, 3000);
}





    return ( 
        <appContext.Provider
        value={{

            mensaje_archivo:state.mensaje_archivo,
            mostrarAlerta
        }}>
            {children}
        </appContext.Provider> );
}
 
export default AppState ;