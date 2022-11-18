var verifyRole = async function(req, res, next){
    var tokenPayload = req.userPayload;

    if(tokenPayload.role !== "admin"){
        res.status(400).json({error: true, text: "You have not permission to do this action!"});
    }

    next();
}

module.exports = verifyRole;