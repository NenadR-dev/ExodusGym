import {
    GET_MEALS,
    ADD_MEAL,
    UPDATE_MEAL,
    DELETE_MEAL
} from '../actions/clientActionTypes'
import {url, config} from '../route'
import axios from 'axios'

const initialState = [
    {
        mealType: "Dinner",
        calories: 50,
        description: "Egg fried rice",
        date: new Date("11-5-2020").toLocaleDateString()
      },
      {
        mealType: "Lunch",
        calories: 150,
        description: "Omlette du fromage",
        date: new Date("11-12-2020").toLocaleDateString()
      },
      {
        mealType: "Breakfast",
        calories: 240,
        description: "Bananas",
        date: new Date("11-17-2020").toLocaleDateString()
      }
]

const initState = {
    meals: [],
    loaded: false
}

const MealsReducer = (state=initState, action) => {
    switch(action.type){
        case GET_MEALS:{
             return {
                 ...state,
                 meals: action.payload,
                 loaded: true
             }
        }
        case ADD_MEAL:{
            return{
                ...state,
                meals: [...state.meals, action.payload],
                loaded: true
            }
        }
        case UPDATE_MEAL:{
            //make axios request to backend api
        }
        case DELETE_MEAL:{
            let index = 0
            for(let i =0; i < state.meals.length; i++){
                if(state.meals[i].description === action.payload.description
                     && state.meals[i].date === action.payload.date
                     && state.meals[i].mealType === action.payload.mealType){
                    index = i
                    break
                }
            }
            state.meals.splice(index,1)
            return {
                ...state,
                loaded: true
            }
        }
        default:
            return state
    }
}
export default MealsReducer