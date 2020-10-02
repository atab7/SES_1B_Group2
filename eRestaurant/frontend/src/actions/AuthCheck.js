
const isAuth = () => {
    return localStorage.getItem('auth_token') !== null;
}

const isManager = () => {
    try{
    return localStorage.getItem('user_type') === 'manager';
    }
    catch {
        return false;
    }
}

export { isAuth, isManager};