const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { isValidObjectId } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@descp Register a user
//@route POST api/users/register
//@access public

const registerUser = asyncHandler(async(req, resp) => {
    const {userNname, email, password} = req.body;
    if(!userNname || !email || !password){
        resp.status(400);
        throw new Error("All fields are mandetory")
    }
const availableUser = await User.findOne({email});
if(availableUser){
    resp.status(400);
        throw new Error("User already available")
}
const hashedPassward = await bcrypt.hash(password, 10);
console.log("hashed password", hashedPassward);

const user = await User.create({
    userNname,
    email,
    password: hashedPassward
});
console.log("User created", user);
if(user){
    resp.status(201).json({_id: user._id, email: user.email})
}
else{
    resp.status(400);
    throw new Error("user data is not valid")
}
    resp.json({message: "new user registered"})
});


//@descp Login a user
//@route POST api/users/login
//@access public
const loginUser = asyncHandler(async (req, resp) => {
    const {email, password} = req.body;
    if(!email || !password){
        resp.status(400);
        throw new Error ("All fields all mandetory!");
    }

    const user = await User.findOne({email});
    console.log("user", user);
    //compare password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                userNname: user.userNname,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"});
        resp.status(200).json({accessToken})
    }else{
        resp.status(401);
        throw new Error("Email or password is not correct")
    }
});


//@descp Get current user
//@route GET api/users/register
//@access private
const currentUser = asyncHandler(async (req, resp) => {
    resp.json({message: "User verified", data: req.user})
})

module.exports = {registerUser, loginUser, currentUser}