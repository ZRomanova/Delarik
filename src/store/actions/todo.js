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
import { DB } from '../../localdb'
import { 
    fetchBoxes, 
    addBox, 
    addTodo, 
    getToday, 
    getForStat, 
    fetchTodos,
    fetchShares,
    addShare,
    removeShare
} from '../../data'

export const loadUser = () => {
    return async dispatch => {
        const user = await DB.getUser()
        let payload = ''
        if (user) payload = user.email.toLocaleLowerCase()
        dispatch({
            type: GET_USER,
            payload
        })
    }
}

export const deleteUser = () => {
    return async dispatch => {
        await DB.deleteUser()
        dispatch({
            type: DELETE_USER
        })
    }
}

export const addUser = value => {
    return async dispatch => {
        await DB.addUser(value)
        dispatch({
            type: ADD_USER
        })
    }
}

export const loadBoxes = () => {
    return async dispatch => {
        const boxes = await fetchBoxes()
        
        dispatch({
            type: LOAD_BOXES,
            payload: boxes
        })
    }
}

export const loadTodos = () => {
    return async dispatch => {
        const todos = await fetchTodos()
        
        dispatch({
            type: LOAD_TODOS,
            payload: todos
        })
    }
}

export const addBoxAction = (title, user) => {
    return async dispatch => {
        const box = await addBox(title, user)
        dispatch({
            type: ADD_BOX,
            payload: box
        })
    }
}

export const addTodoAction = (title, box) => {
    return async dispatch => {
        const todo = await addTodo(title, box)

        dispatch({
            type: ADD_TODO,
            payload: todo
        })
    }
}

export const addShareAction = (who, with_whom) => {
    return async dispatch => {
        const share = await addShare(who, with_whom)

        dispatch({
            type: SHARE_STAT,
            payload: share
        })
    }
}

export const loadToday = user => {
    return async dispatch => {
        const today = await getToday(user)
        
        dispatch({
            type: LOAD_TODAY,
            payload: today
        })
    }
}

export const loadChecks = () => {
    return async dispatch => {
        const checks = await getForStat()
        
        dispatch({
            type: LOAD_CHECKS,
            payload: checks
        })
    }
}

export const loadShares = () => {
    return async dispatch => {
        const shares = await fetchShares()
        
        dispatch({
            type: LOAD_SHARES,
            payload: shares
        })
    }
}

export const deleteShare = id => {
    return async dispatch => {
        await removeShare(id)
        
        dispatch({
            type: REMOVE_SHARE,
            payload: id
        })
    }
}