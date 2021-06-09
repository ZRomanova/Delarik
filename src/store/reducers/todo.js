import { 
    LOAD_TODOS, 
    LOAD_BOXES, 
    GET_USER, 
    ADD_BOX, 
    ADD_TODO, 
    LOAD_CHECKS, 
    LOAD_TODAY,
    ADD_USER,
    DELETE_USER,
    LOAD_SHARES,
    SHARE_STAT,
    REMOVE_SHARE
} from '../types'

const initialState = {
    boxes: [],
    todos: [],
    user: null,
    today: {},
    days: [],
    shares: []
}

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOXES:
            return {
            ...state,
            boxes: action.payload
            }
        case LOAD_TODOS:
            return {
                ...state,
                todos: action.payload
            }
        case LOAD_CHECKS: 
            return {
                ...state,
                days: action.payload
            }
        case LOAD_TODAY: 
            return {
                ...state,
                today: action.payload
            }
        case LOAD_SHARES: 
            return {
                ...state,
                shares: action.payload
            }
        case GET_USER: 
            return {
                ...state,
                user: action.payload
            }
        case ADD_USER: 
            return {
                ...state
            }
        case DELETE_USER: 
            return {
                boxes: [],
                todos: [],
                user: '',
                today: {},
                days: [],
                shares: []
            }
        case ADD_BOX: 
            return {
                ...state,
                boxes: [...state.boxes, {...action.payload}].sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
            }
        case ADD_TODO: 
            return {
                ...state,
                todos: [...state.todos, {...action.payload}].sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
            }
        case SHARE_STAT: 
            return {
                ...state,
                todos: [...state.shares, {...action.shares}]
            }
        case REMOVE_SHARE: 
            return {
                ...state,
                shares: state.shares.filter(s => s.id !== action.payload)
            }
        default:
            return state
    }
  }