const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://hrafid001:Rafid.001@cluster0.i1uwuih.mongodb.net/new-todo");

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}