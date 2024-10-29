export const setLocalStorage = (parameter: any, value: any) => {
    localStorage.setItem(parameter, value);
}

export const getLocalStorage = (parameter: any) => {
    return localStorage.getItem(parameter);
}

export const removeLocalStorage = (parameter: any) => {
    localStorage.removeItem(parameter);
}