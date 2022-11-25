var verifyBearerTokenHeader = function(req, res, next){

    if(!("Authorization" in req.headers)){
        return res.status(400).json({error: true, text: "Invalid token!"});
    }

    var headerValue = req.headers["Authorization"];
    var [bearerWord, bearerToken] = headerValue.split(" ");

    if(!bearerWord){
        res.status(400).json({error: true, text: "Invalid token!"});
    }

    req.accessToken = bearerToken;
    next();
}

module.exports = verifyBearerTokenHeader;