var jwt = require("jsonwebtoken");
const Token = require("../models/Token");
var verifyRefreshToken = async function(refreshToken){
    try{
        var payloadRefreshToken = await jwt.verify(refreshToken, process.env.SECRET);
        if(!payloadRefreshToken){
            throw new Error("Invalid Token!");
        }

        var dbRefreshToken = await Token.collection.findOne({token: refreshToken});

        if(!dbRefreshToken){
            throw new Error("Invalid Token!");
        }

        return payloadRefreshToken;
    }
    catch(err){
        throw new Error(err);
    }

}

module.exports = verifyRefreshToken;