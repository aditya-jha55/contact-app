const express = require("express");
const errorHandeler = require("./middleware/errorHandeler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/contacts/", require("./routes/contactRoutes"));
app.use("/api/users/", require("./routes/userRoutes"));
app.use(errorHandeler)
app.listen(port, ()=> {
    console.log("Express is running on port", port)
})