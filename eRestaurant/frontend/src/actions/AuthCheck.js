
function isAuth(){
    console.log('test');
    var token = sessionStorage.getItem('auth_token');
    if(token === undefined || token === NaN ){
        return false;
    }
    return true;
}

export default isAuth;