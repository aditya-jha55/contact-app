const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, resp, next) => {
    console.log("current", req.header) 
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    console.log("authHeader", authHeader)
    if(authHeader && authHeader.startsWith("Bearer")){
        token = await authHeader.split(" ")[1];
        console.log("----token----", token)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                resp.status(401);
                throw new Error ("User is not authorized");
            }
            req.user = decoded.user;
            next();
        });

        if(!token){
            resp.status(401);
            throw new Error("User is not authorized or invalid token")
        }
    }
    else{
        resp.status(401);
            throw new Error("User is not authorized or invalid token")
    }
});

module.exports = validateToken;