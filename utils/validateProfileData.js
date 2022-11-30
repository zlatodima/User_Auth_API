var validateUserName = require("./validateUserName");
var validateAge = require("./validateAge");

var validateProfileData = function(userData){
    var result = {
        error: false,
        errors: {}
    }

    var username_result = validateUserName(userData.username);
    var age_result = validateAge(userData.age);

    if(username_result.error){
        result.errors.username = username_result;
        result.error = true;
    }

    if(age_result.error){
        result.errors.age = age_result;
        result.error = true;
    }

    return result;
}

module.exports = validateProfileData;