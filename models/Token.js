const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TokenScheme = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: { 
        type: Date,
        default: Date.now,
        expires: 15 * 86400 
    }

});

var Token = mongoose.model("Token", TokenScheme);

module.exports = Token;