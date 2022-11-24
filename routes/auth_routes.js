var express = require("express");
var router = express.Router();
var validateRegisterData = require("../utils/validateRegisterData");
var validateLoginData = require("../utils/validateLoginData");
var User = require("../models/User");
var bcrypt = require("bcrypt");
var createTokens = require("../utils/createTokens");
var verifyAccessToken = require("../middlewares/verifyAccessToken");

router.post("/register", async function(req, res){
    var formData = req.body.formData;
    var result = validateRegisterData(formData);

    if(result.error){
        return res.status(400).json(result);
    }

    try{
        var user = await User.collection.findOne({email: formData.email});
        if(user){
            res.status(400).json({error: true, text: "User with this email or login exist!"});
        }

        user = await User.collection.findOne({login: formData.login});
        if(user){
            res.status(400).json({error: true, text: "User with this email or login exist!"});
        }

        var hashPassword = await bcrypt.genSalt(process.env.SALT);

        var user = await new User({
            userName: formData.login,
            login: formData.login,
            email: formData.email,
            password: formData.password
        });

        user.save();
        
        var {accessToken, refreshToken} = createTokens(user);
        return res.status(200).json({
            error: false,
            accessToken,
            refreshToken,
            message: "You signed up succesfully!"
        });
    }
    catch(err){
        console.log(err);
    }

});

router.post("/login", async function(req, res){
    var formData = req.body.formData;
    var result = validateLoginData(formData);

    if(result.error){
        return res.status(400).json(result);
    }

    try{
        var user = await User.collection.findOne({login: formData.login});
        if(!user){
            res.status(400).json({error: true, text: "login or password is incorrect!"});
        }

        var verifiedPassword = await bcrypt.compare(formData.password, user.password);
        if(!verifiedPassword){
            res.status(400).json({error: true, text: "login or password is incorrect!"});
        }

        var {accessToken, refreshToken} = createTokens(user);

        return res.status(200).json({
            error: false,
            accessToken,
            refreshToken,
            message: "You logged in succesfully!"
        });
    }
    catch(err){
        console.log(err);
    }

});

router.get("/user", verifyAccessToken, async function(req, res){
 
});

module.exports = router;