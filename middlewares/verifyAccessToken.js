var jwt = require("jsonwebtoken");
var verifyAccessToken = async function(req, res){
    var accessToken = req.bearerToken;

    var payloadAccessToken = await jwt.verify(accessToken, process.env.SECRET);
    if(!payloadAccessToken){
        res.status(400).json({error: true, text: "Invalid token!"});
    }
    req.userPayload = payloadAccessToken;
    next();
}

module.exports = verifyAccessToken;