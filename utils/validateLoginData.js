var validatePassword = require("./validatePassword");
var validateLogin = require("./validateLogin");

var validateLoginData = function(formData){
    var result = {
        error: false,
        errors: {}
    };

    var value = true;

    var password_result = validatePassword(formData.password);
    var login_result = validateLogin(formData.login);

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

module.exports = validateLoginData;