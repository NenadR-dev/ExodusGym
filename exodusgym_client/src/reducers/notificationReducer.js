import{
    NEW_NOTIFICATION,
    HIDE_HOTIFICATION
} from '../actions/clientActionTypes'

const initialState = {
    show: false,
    message: ""
}
const NotificationReducer =(state = initialState, action) =>{
    switch(action.type){
        case NEW_NOTIFICATION:{
            return{
                ...state,
                show: true,
                message: action.payload
            }
        }
        case HIDE_HOTIFICATION:{
            return{
                ...state,
                show: false,
                message: ""
            }
        }
        default:{
            return state
        }
    }
}

export default NotificationReducer