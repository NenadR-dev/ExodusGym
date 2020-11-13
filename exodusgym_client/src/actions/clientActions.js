import {
    GET_MEALS, 
    ADD_MEAL, 
    UPDATE_MEAL, 
    DELETE_MEAL, 
    SET_DAY,
    GET_WORKOUTS,
    PURCHASE_WORKOUT,
    UPDATE_WORKOUT,
    DELETE_WORKOUT,
    ADD_USER_WORKOUT,
    CREATE_USER_WORKOUT,
    NEW_NOTIFICATION,
    HIDE_HOTIFICATION,
    TOGGLE_WORKOUT_MODAL
} from './clientActionTypes'

import axios from 'axios'
import {url, config} from '../route'

export const getMeals = () => async dispatch =>{
    let result = await axios.get(url+"Client/GetMeals",config)
    dispatch({
        type: GET_MEALS,
        payload: result.data
    })
}

export const addMeal = meal => async dispatch =>{
    let payload = {
        mealType: meal.mealType,
        description: meal.description,
        calories: Number(meal.calories),
        date: meal.date
    }
    let result = await axios.post(url+"Client/AddMeal",payload,config)
    dispatch({
        type: ADD_MEAL,
        payload: result.data
    })
    dispatch({
        type: NEW_NOTIFICATION,
        payload: "Meal Added"
    })
}
export const updateMeal = meals =>{
    return{
        type: UPDATE_MEAL,
        payload: meals
    }
}

export const deleteMeal = data => async dispatch => {
    let result = await axios.post(url+"Client/DeleteMeal",data,config);
    dispatch({
        type: DELETE_MEAL,
        payload: result.data
    })
    dispatch({
        type: NEW_NOTIFICATION,
        payload: "Meal deleted"
    })
        
}

export const setDay = day => {
    return{
        type: SET_DAY,
        payload:day
    }
}

export const purchaseWorkout = workout => async dispatch =>{
    let result = await axios.post(url+"Client/PurchaseWorkout",workout,config)
    dispatch({
        type: PURCHASE_WORKOUT,
        payload: result.data
    })
    dispatch({
        type: NEW_NOTIFICATION,
        payload: "Workout Added"
    })
}

export const createUserWorkout = data => async dispatch =>{
    let result = await axios.post(url+"Client/CreateUserWorkout",data,config)
    dispatch({
        type: CREATE_USER_WORKOUT,
        payload: result.data
    })
    dispatch({
        type: NEW_NOTIFICATION,
        payload: "Workout Created"
    })
}
export const toggleWorkoutModal = () =>{
    return({
        type: TOGGLE_WORKOUT_MODAL
    })
}

export const addUserWorkout = data => async dispatch =>{
    let result = await axios.post(url+"Client/AddUserWorkout",data,config)
    dispatch({
        type: ADD_USER_WORKOUT,
        payload: result.data
    })
    dispatch({
        type: NEW_NOTIFICATION,
        payload: "Workout Added"
    })
}

export const getWorkouts = () => async dispatch =>{
    let result = await axios.get(url+"Client/GetWorkouts",config)
    dispatch({
        type: GET_WORKOUTS,
        payload: result.data
    })
}

export const deleteWorkout = workout => async dispatch =>{
    let result = await axios.post(url+"Client/DeleteWorkout",workout,config)
    dispatch({
        type: DELETE_WORKOUT,
        payload: result.data
    })
    dispatch({
        type: NEW_NOTIFICATION,
        payload: "Workout deleted"
    })
}

export const updateWorkout = workout =>{
    return{
        type: UPDATE_WORKOUT,
        payload: workout
    }
}

export const showNewNotification = message => {
    return{
        type: NEW_NOTIFICATION,
        payload: message
    }
}

export const hideNotification = () => {
    return{
        type: HIDE_HOTIFICATION
    }
}