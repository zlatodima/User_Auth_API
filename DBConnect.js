const mongoose = require("mongoose");

const DBConnect = () => {
    const connectionParams = { useNewUrlParser: true };
    console.log(process.env.DB_URI);
    mongoose.connect(process.env.DB_URI, connectionParams);

    mongoose.connection.on("connected", () => {
        console.log("Connected to database sucessfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("Error while connecting to database :" + err);
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Mongodb connection disconnected");
    });
}

module.exports = DBConnect;

