var jwt = require("jsonwebtoken");
const User = require("../models/User");
var verifyRefreshToken = async function(refreshToken){
    try{
        var payloadRefreshToken = await jwt.verify(refreshToken, process.env.SECRET);
        if(!payloadRefreshToken){
            throw new Error("Invalid Token!");
        }

        var dbRefreshToken = await User.collection.findOne({userId: payload._id});

        if(!dbRefreshToken){
            throw new Error("Invalid Token!");
        }

        return payload;
    }
    catch(err){
        throw new Error("Invalid Token!");
    }

}

module.exports = verifyRefreshToken;