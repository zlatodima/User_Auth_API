var createAccessToken = require("./createAccessToken");
var createRefreshToken = require("./createRefreshToken");
var Token = require("../models/Token");

var createTokens = async function(user){
    try {
        var payload = {
            _id: user._id,
            role: user.role
        };

        var accessToken = createAccessToken(payload);
        var refreshToken = createRefreshToken(payload);

        var oldToken = await Token.collection.findOne({userId: user._id});
        if(oldToken){
            oldToken.remove();
        }

        var token = await new Token({
            userId: user._id,
            token: refreshToken,
        });

        token.save();

        return Promise.resolve({accessToken, refreshToken});
    }
    catch(err){
        return Promise.reject(err);
    }

}