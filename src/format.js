export const formatDate = (date) => {
    if (Date.parse(date)) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return month + '/' + day + '/' + year
    }
    return null
}

export const transformDate = (date) => {
    let arrdate = date.split('/')
    return new Date(arrdate[2], arrdate[0] - 1, arrdate[1])
}