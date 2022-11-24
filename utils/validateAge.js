var validateAge = function(age){
    var result = {
        error: false
    }

    var number = Number(age);
    if(!number){
        result.message = "Age must be a number!";
        result.error = true;
        return result;
    } 

    if(!Number.isInteger(number)){
        result.message = "Age must be a integer!";
        result.error = true;
        return result;
    } 

    if(number < 10 || number > 120){
        result.message = "Age must be from 10 to 120 years!";
        result.error = true;
        return result;
    }

    return number;
}

module.exports = validateAge;