var validateLogin = function(login){
    var result = {
        error: false
    }

    if(login.length < 6 || login.length > 30){
        result = {
            error: true,
            message: "Login must contain from 6 to 30 characters!" 
        }
    }
    return result;
}

module.exports = validateLogin;