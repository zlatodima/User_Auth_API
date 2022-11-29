var jwt = require("jsonwebtoken");
var verifyAccessToken = async function(req, res){
    var accessToken = req.accessToken;

    try{
        var payloadAccessToken = await jwt.verify(accessToken, process.env.SECRET);
        if(!payloadAccessToken){
            res.status(400).json({error: true, text: "Invalid token!"});
        }
        req.userPayload = payloadAccessToken;
        next();
    }
    catch(err){
        res.status(400).json({error: true, text: err});
    }
}

module.exports = verifyAccessToken;