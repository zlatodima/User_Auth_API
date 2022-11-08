var validateEmail = function(email){
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    var result = {
        error: false
    }

    if(!email.toLowerCase().match(regex)){
        result = {
            error: true,
            message: "Email is not correct!" 
        }
    }
    return result;
}

module.exports = validateEmail;