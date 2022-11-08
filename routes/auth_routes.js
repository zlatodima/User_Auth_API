var express = require("express");
var router = express.Router();
var validateRegisterData = require("../utils/validateRegisterData");

router.post("/register", function(req, res){
    var formData = req.body.formData;
    var result = validateRegisterData(formData);

    if(result.error){
        return res.status(400).json(result)
    }

    
});

router.post("/login", function(req, res){
    
});

module.exports = router;