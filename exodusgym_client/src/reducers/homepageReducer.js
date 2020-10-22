import axios from "axios";
import { propTypes } from "react-bootstrap/esm/Image";
import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_ERROR,
    POST_LOGOUT_REQUEST,
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_ERROR,
    GET_USER_ROLE
} from '../actions/homepageTypes'

const url = "https://localhost:5001/api/"
const config ={
    'Content-Type' : 'application-json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'withCredentials' : "true"
}

const homepageReducer = (state, action) => {
    switch(action.type){
        case POST_LOGIN_REQUEST:{
            axios.post(url+"Account/Login",action.payload, config)
                .then(response =>{
                    console.log(POST_LOGIN_SUCCESS+": " + response.data)
                })
                .catch(error=>{
                    console.log(POST_LOGIN_ERROR+": "+ error)
                })
            return null
        }
        case POST_LOGIN_SUCCESS:{
            console.log(action.payload)
            return null
        }
        case POST_REGISTER_REQUEST:{
            axios.post(url+"Account/Register",action.payload)
            .then(response =>{
                console.log(POST_REGISTER_SUCCESS+": " + response)
            })
            .catch(error=>{
                console.log(POST_REGISTER_ERROR+": "+ error)
            })
            return null
        }
        case GET_USER_ROLE:{
            axios.get(url+"Account/GetUserRole",config)
            .then(response => {
                console.log("response: " + response.data)
                return {
                    type: GET_USER_ROLE,
                    payload: response.data
                }
            })
            .catch(error => {
                console.log(error)
                return 'Anonymous'
            })
            return null
        }
        case POST_LOGOUT_REQUEST:{
            axios.get(url+"Account/Logout",config)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }
        default:{
            return null
        }
    }
}

export default homepageReducer;