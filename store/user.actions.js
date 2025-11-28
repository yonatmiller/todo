import { userService } from "../services/user.service.js"
import { CLEAR_TODOT, SET_USER, SET_USER_SCORE, store, TOGGLE_TODOT_IS_SHOWN } from "./store.js"


export function login(credentials) {

    return userService.login(credentials)
        .then(loggedinUser => {
            store.dispatch({ type: SET_USER, loggedinUser })
        })
        .catch(err => {
            throw err
        })
}

export function signup(credentials) {

    return userService.signup(credentials)
        .then(loggedinUser => {
            store.dispatch({ type: SET_USER, loggedinUser })
        })
        .catch(err => {
            throw err
        })
}

export function logout() {

    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, loggedinUser: null })
        })
        .catch(err => {
            throw err
        })
}

export function checkout(diff) {

    return userService.updateScore(diff)
        .then(newScore => {
            store.dispatch({ type: SET_USER_SCORE, score: newScore })
            store.dispatch({ type: CLEAR_TODOT })
            store.dispatch({ type: TOGGLE_TODOT_IS_SHOWN })
        })
        .catch(err => {
            throw err
        })
}