const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: [String],
        enum: ["user", "admin"],
        default: ["user"],
    },
});

var User = mongoose.model("User", UserSchema);

module.exports = User;