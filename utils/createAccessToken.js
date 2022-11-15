var jwt = require("jsonwebtoken");

var createAccessToken = function(payload){
    var accessToken = jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: "5m" }
    );

    return accessToken;
}

module.exports = createAccessToken;