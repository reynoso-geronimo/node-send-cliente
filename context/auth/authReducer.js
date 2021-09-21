import { USUARIO_AUTENTICADO,REGISTRO_EXITOSO } from "../../types"

// eslint-disable-next-line import/no-anonymous-default-export
export default (state,action)=>{
    switch(action.type){

        case REGISTRO_EXITOSO:
            return{
                ...state,
                mensaje:action.payload
            }
        default:
            return state
    }
}