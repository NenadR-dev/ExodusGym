import {
  PURCHASE_WORKOUT,
  UPDATE_WORKOUT,
  CREATE_USER_WORKOUT,
  GET_WORKOUTS,
  DELETE_WORKOUT,
  ADD_USER_WORKOUT,
} from "../actions/clientActionTypes";

const initialState = {
    workouts: [],
    loaded: false
}

const WorkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_WORKOUT: {
      return{
        ...state,
        workouts: [...state.workouts, action.payload],
        loaded: true
      }
    }
    case ADD_USER_WORKOUT:{
      state.workouts.forEach(workout =>{
        if(workout.name === action.payload.name)
          workout.dates.push(...action.payload.dates)
      })
      return {
        ...state,
        loaded: true
      }
    }
    case CREATE_USER_WORKOUT:{
      return{
        ...state,
        workouts: [...state.workouts, action.payload],
        loaded: true
      }
    }
    case GET_WORKOUTS:{
        return{
          ...state,
          workouts: action.payload,
          loaded: true
        }
    }
    case DELETE_WORKOUT:{
      for(let i =0; state.workouts.length; i++){
        if(state.workouts[i].name === action.payload.name){
          state.workouts[i].dates = action.payload.dates
          break
        }
      }
      return {
        ...state,
        loaded: true
      }
    }
    default: {
        return state
    }
  }
}

export default WorkoutReducer;
