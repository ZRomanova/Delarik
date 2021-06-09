import { Http } from './http'
import { formatDate } from './format'
import { keys } from './keys'

export const addBox = async (title, user) => {
    try {
        const data  = await Http.post(
            `${keys.DB_URI}box.json`,
            {title, user}
        )
        return {
            id: data.name,
            title,
            user
        }
    } catch (e) {
        console.log(e)
    }
}

export const addTodo = async (title, box) => {
    try {
        const data = await Http.post(
            `${keys.DB_URI}todo.json`,
            {title, box}
        )
        return {
            id: data.id,
            title,
            box
        }
    } catch (e) {
        console.log(e)
    }
}

export const fetchBoxes = async () => {
    try {
        const data = await Http.get(
            `${keys.DB_URI}box.json`
        )
        let boxes = []
        if (data) {
            boxes = Object.keys(data).map(key => ({ ...data[key], id: key })).sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
        } 
        return(boxes)
    } catch (e) {
        console.log(e)
    }
}

export const fetchTodos = async () => {
    try {
        const data = await Http.get(
            `${keys.DB_URI}todo.json`
        )
        let todos = []
        if (data) {
            todos = Object.keys(data).map(key => ({ ...data[key], id: key })).sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
        } 
        return(todos)
    } catch (e) {
        console.log(e)
    }
}

export const checkTodo = async (user, todos) => {
    try {
        const date = formatDate(new Date())
        const data = await Http.get(
            `${keys.DB_URI}check.json`
        )
        let checks = {}
        if (data) {
            checks = await Object.keys(data).map(key => ({ ...data[key], id: key })).find(check => check.date ===  date && check.user === user)
        }

        if (checks) {
            await Http.patch(
                `${keys.DB_URI}check/${checks.id}.json`,
                {todos}
            )
        }
        else {
            await Http.post(
                `${keys.DB_URI}check.json`,
                {user, todos, date}
            )
        }
        
    } catch (e) {
        console.log(e)
    }
}

export const getToday = async user => {
    try {
        const date = formatDate(new Date())
        const data = await Http.get(
            `${keys.DB_URI}check.json`
        )
        let checks
        if (data) {
            checks = await Object.keys(data)
            .map(key => ({ ...data[key], id: key }))
            .find(check => check.date ===  date && check.user === user)
        }
        return(checks)
    } catch (e) {
        console.log(e)
    }
}

export const getForStat = async () => {
    try {
        const data = await Http.get(
            `${keys.DB_URI}check.json`
        )
        let checks = []
        if (data) {
            checks = await Object.keys(data).map(key => ({ ...data[key], id: key }))
        }
        return(checks)
    } catch (e) {
        console.log(e)
    }
}

export const addShare = async (who, with_whom) => {
    try {
        const data  = await Http.post(
            `${keys.DB_URI}share.json`,
            {who, with_whom}
        )
        return {
            id: data.name,
            who,
            with_whom
        }
    } catch (e) {
        console.log(e)
    }
}

export const fetchShares = async () => {
    try {
        const data = await Http.get(
            `${keys.DB_URI}share.json`
        )
        let shares = []
        if (data) {
            shares = Object.keys(data).map(key => ({ ...data[key], id: key }))
        } 
        return(shares)
    } catch (e) {
        console.log(e)
    }
}

export const removeShare = async id => { 
    await Http.delete(
        `${keys.DB_URI}share/${id}.json`
    )  
    return id 
}