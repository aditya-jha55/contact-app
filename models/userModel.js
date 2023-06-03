const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userNname: {
        type: String,
        required: [true, "Please add contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add email address"],
        unique: [true, "Email already taken."]
    },
    password: {
        type: String,
        required: [true, "Please add phone number"]
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema)