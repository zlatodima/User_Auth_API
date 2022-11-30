var express = require("express");
var router = express.Router();
var validateRegisterData = require("../utils/validateRegisterData");
var validateLoginData = require("../utils/validateLoginData");
var validateProfileData = require("../utils/validateProfileData");
var User = require("../models/User");
var bcrypt = require("bcrypt");
var createTokens = require("../utils/createTokens");
var createAccessToken = require("../utils/createAccessToken");
var verifyAccessToken = require("../middlewares/verifyAccessToken");
var verifyRefreshToken = require("../utils/verifyRefreshToken");
var verifyBearerTokenHeader = require("../middlewares/verifyBearerTokenHeader");
const { ObjectId } = require('mongodb');

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

        var hashPassword = await bcrypt.hash(formData.password, Number(process.env.SALT));

        var user = await new User({
            userName: formData.login,
            login: formData.login,
            email: formData.email,
            password: hashPassword
        });

        await user.save();
        
        var {accessToken, refreshToken} = await createTokens(newUser);
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

        var {accessToken, refreshToken} = await createTokens(user);

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

router.post("/refreshToken", async function(req, res){
    var refreshToken = req.body.refreshToken;
    try{
        var refreshTokenPayload = await verifyRefreshToken(refreshToken);
        var accessTokenPayload = {
            _id: refreshTokenPayload._id,
            role: refreshTokenPayload.role
        }
        var accessToken = createAccessToken(accessTokenPayload);

        return res.status(200).json({
            error: false,
            accessToken
        });
    }
    catch(err){
        return res.status(400).json(err);
    }
    
});

router.get("/user", verifyBearerTokenHeader, verifyAccessToken, async function(req, res){
    var user_id = ObjectId(req.userPayload._id);

    try{
        var user = await User.collection.findOne({_id: user_id});

        if(!user){
            return res.status(400).json({error: true, text: "Not found any matching user with specified id!"});
        }

        return res.status(200).json({error: false, profileData: {
            username: user.userName,
            age: user.age,
            description: user.description
        },
        text: "Profile data is recieved successfully!"});
    }
    catch(err){
        console.log(err);
    }
});

router.post("/user", verifyBearerTokenHeader, verifyAccessToken, async function(req, res){
    var user_id = ObjectId(req.userPayload._id);
    var profileUserData = req.body.profileUserData;
    var result = validateProfileData(profileUserData);

    if(result.error){
        return res.status(400).json(result);
    }

    try{
        var updatedDocument = await User.collection.findOneAndUpdate({_id: user_id}, {
            $set: { 
                userName: profileUserData.username, 
                age: profileUserData.age,
                description: profileUserData.description
            }
        });

        if(!updatedDocument){
            return res.status(400).json({error: true, text: "Not found any matching user with specified id!"});
        }

        return res.status(200).json({error: false, text: "Profile data updated successfully!"});
    }
    catch(err){
        console.log(err);
    }
});



module.exports = router;