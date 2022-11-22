var verifyBearerTokenHeader = function(req, res, next){
    var headerValue = req.headers["Authorization"];

    if(!headerValue){
        res.status(400).json({error: true, text: "Invalid token!"});
    }

    var [bearerWord, bearerToken] = headerValue.split(" ");

    if(!bearerWord){
        res.status(400).json({error: true, text: "Invalid token!"});
    }

    req.accessToken = bearerToken;
    next();

}