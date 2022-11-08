var validatePassword = function(password){
    var result = {
        error: false
    }

    if(password < 8 || password > 30){
        result = {
            error: true,
            message: "Login must contain from 8 to 30 characters!" 
        }
    }
    return result;
}

module.exports = validatePassword;