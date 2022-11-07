var express = require("express");
var app = express();
var dotenv = require("dotenv");
dotenv.config();

const DBConnect = require("./DBConnect");
DBConnect();

const port = process.env.PORT;
app.listen(port);