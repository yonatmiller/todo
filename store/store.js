import { userService } from "../services/user.service.js"

const { createStore } = Redux

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'


// Todo
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_IS_LOADING = 'SET_IS_LOADING'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const REMOVE_TODO_UNDO = 'REMOVE_TODO_UNDO'

// User
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'


// Shopping todot
export const TOGGLE_TODOT_IS_SHOWN = 'TOGGLE_TODOT_IS_SHOWN'
export const ADD_TODO_TO_TODOT = 'ADD_TODO_TO_TODOT'
export const REMOVE_TODO_FROM_TODOT = 'REMOVE_TODO_FROM_TODOT'
export const CLEAR_TODOT = 'CLEAR_TODOT'

const initialState = {
    count: 100,
    todos: [],
    isLoading: false,
    loggedinUser: userService.getLoggedinUser(),
    isTodotShown: false,
}

function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1
            }
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1
            }
        case CHANGE_BY:
            return {
                ...state,
                count: state.count + cmd.diff
            }
        case SET_TODOS:
            return {
                ...state,
                todos: [...cmd.todos]
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== cmd.todoId)
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [cmd.todo, ...state.todos]
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => (todo._id === cmd.todo._id) ? cmd.todo : todo)
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        case SET_USER:
            return {
                ...state,
                loggedinUser: cmd.loggedinUser
            }
        case SET_USER_SCORE:
            return {
                ...state,
                loggedinUser: { ...cmd.loggedinUser, score: cmd.score }
            }
        case TOGGLE_TODOT_IS_SHOWN:
            return {
                ...state,
                isTodotShown: !state.isTodotShown
            }
        case ADD_TODO_TO_TODOT:
            return {
                ...state,
                shoppingTodot: [...state.shoppingTodot, cmd.todo]
            }
        case REMOVE_TODO_FROM_TODOT:
            return {
                ...state,
                shoppingTodot: state.shoppingTodot.filter(todo => todo._id !== cmd.todoId)
            }
        case CLEAR_TODOT:
            return {
                ...state,
                shoppingTodot: []
            }

        default: return state
    }
}


export const store = createStore(appReducer)
console.log('store:', store)

window.gStore = store

// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })



