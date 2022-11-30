var validateUserName = function(username){
    var result = {
        error: false
    }

    if(username.length < 6 || username.length > 30){
        result.message = "Username must contain from 6 to 30 characters!";
        result.error = true;
    }

    return result;
}

module.exports = validateUserName;