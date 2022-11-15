var validateEmail = require("./validateEmail");
var validatePassword = require("./validatePassword");
var validateLogin = require("./validateLogin");

var validateRegisterData = function(formData){
    var result = {
        error: false
    };

    var value = true;

    var email_result = validateEmail(formData.email);
    var password_result = validatePassword(formData.password);
    var login_result = validateLogin(formData.login);

    if(email_result.error){
        result.errors.email = email_result;
        result.error = true;
    }

    if(password_result.error){
        result.errors.password = password_result;
        result.error = true;
    }

    if(login_result.error){
        result.errors.login = login_result;
        result.error = true;
    }

    return result;
}

module.exports = validateRegisterData;