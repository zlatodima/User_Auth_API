var validateEmail = require("./validateEmail");
var validatePassword = require("./validatePassword");
var validateLogin = require("./validateLogin");

var validateRegisterData = function(formData){
    var errors = {
        error: true
    };

    var success = {
        error: false
    };

    var value = true;

    var email_result = validateEmail(formData.email);
    var password_result = validatePassword(formData.password);
    var login_result = validateLogin(formData.login);

    if(email_result.error){
        errors.email = email_result;
        var value = false;
    }

    if(password_result.error){
        errors.password = password_result;
        var value = false;
    }

    if(login_result.error){
        errors.login = login_result;
        var value = false;
    }

    if(!value){
        return errors;
    }

    return success;
}

module.exports = validateRegisterData;