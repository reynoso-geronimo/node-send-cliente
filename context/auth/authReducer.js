import { USUARIO_AUTENTICADO,REGISTRO_EXITOSO,REGISTRO_ERROR, LIMPIAR_ALERTA } from "../../types"

// eslint-disable-next-line import/no-anonymous-default-export
export default (state,action)=>{
    switch(action.type){

        case REGISTRO_EXITOSO:
        case REGISTRO_ERROR:
            return{
                ...state,
                mensaje:action.payload
            }
        case LIMPIAR_ALERTA:
            return{
                ...state,
                mensaje:''
            }
            
        default:
            return state
    }
}