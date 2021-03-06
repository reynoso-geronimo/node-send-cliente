import { USUARIO_AUTENTICADO,REGISTRO_EXITOSO,REGISTRO_ERROR, LIMPIAR_ALERTA, LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION} from "../../types"


// eslint-disable-next-line import/no-anonymous-default-export
export default (state,action)=>{
    switch(action.type){

        case REGISTRO_EXITOSO:
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            return{
                ...state,
                mensaje:action.payload
            }
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload)
            return{
                ...state,
                token:action.payload,
                autenticado:true
            }
        case LIMPIAR_ALERTA:
            return{
                ...state,
                mensaje:''
            }
        
        case USUARIO_AUTENTICADO:
            return{
                ...state,
                autenticado:true,
                usuario:action.payload
            }
        case CERRAR_SESION:
            localStorage.removeItem('token')
            return{
                ...state,
                token:'',
                usuario:null,
                autenticado:null
            }
        default:
            return state
    }
}