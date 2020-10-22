export const LOGIN = "LOGIN"
export const REGISTER = "REGISTER"

export function loginAction(payload){
    return{type: LOGIN, payload}
}

export function registerAction(payload){
    return{type: REGISTER, payload}
}