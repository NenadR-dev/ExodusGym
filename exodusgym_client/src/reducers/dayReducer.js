import {
    SET_DAY
} from '../actions/clientActionTypes'

const DayReducer = (state=null, action) =>{
    switch(action.type){
        case SET_DAY:{
            state = new Date(action.payload).toLocaleDateString()
            return state
        }
        default:
            return state
    }
}
export default DayReducer