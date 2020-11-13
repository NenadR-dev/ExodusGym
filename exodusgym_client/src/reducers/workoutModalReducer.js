import{
    TOGGLE_WORKOUT_MODAL
} from '../actions/clientActionTypes'

const WorkoutModalReducer =(state = false, action) =>{
    switch(action.type){
        case TOGGLE_WORKOUT_MODAL:{
            state = !state
            return state
        }
        default:{
            return state
        }
    }
}

export default WorkoutModalReducer