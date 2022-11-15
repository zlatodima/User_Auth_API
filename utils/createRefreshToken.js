var jwt = require("jsonwebtoken");

var createRefreshToken = function(payload){
    var refreshToken = jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: "20d" }
    );

    return refreshToken;
}

module.exports = createRefreshToken;