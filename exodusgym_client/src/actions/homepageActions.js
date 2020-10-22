import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_ERROR,
    POST_LOGOUT_REQUEST,
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_ERROR,
    GET_USER_ROLE
} from './homepageTypes'

export const postLogoutRequest = () => {
    return {
        type: POST_LOGOUT_REQUEST,
        payload: ''
    }
}
export const postLoginRequest = (data) => {
    return{
        type: POST_LOGIN_REQUEST,
        payload: data
    }
}

export const postLoginSuccess = (msg) => {
    return{
        type: POST_LOGIN_SUCCESS,
        payload: msg
    }
}

export const postLoginError = (msg) => {
    return{
        type: POST_LOGIN_ERROR,
        payload: msg
    }
}

export const postRegisterRequest = (data) => {
    return{
        type: POST_REGISTER_REQUEST,
        payload: data
    }
}

export const postRegisterSuccess = (msg) => {
    return{
        type: POST_REGISTER_SUCCESS,
        payload: msg
    }
}

export const postRegisterError = (msg) => {
    return{
        type: POST_REGISTER_ERROR,
        payload: msg
    }
}

export const getUserRole = () => {
    return {
        type: GET_USER_ROLE,
        payload: ''
    }
}