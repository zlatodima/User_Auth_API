var express = require("express");
var app = express();
var dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

const DBConnect = require("./DBConnect");
DBConnect();

var authRoutes = require("./routes/auth_routes");
app.use("/api", authRoutes);
 
const port = process.env.PORT;
app.listen(port);