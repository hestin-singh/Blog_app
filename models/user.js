var mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose')

mongoose.connect("mongodb://localhost/Blog_user");

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    password:String
})
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema);
