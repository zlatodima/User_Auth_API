var validatePassword = function(password){
    var result = {
        error: false
    }

    if(password.length < 8 || password.length > 30){
        result = {
            error: true,
            message: "Login must contain from 8 to 30 characters!" 
        }
    }
    return result;
}

module.exports = validatePassword;