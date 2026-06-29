const express = require('express');

const cors = require ('cors');

const budgetrouter = require('./routes/budget');
const authrouter = require("./routes/auth");
const homerouter = require("./routes/home");
const connectDB = require("./config/db")


const Port = process.env.PORT || 3000;


const app = express()
 connectDB();

app.use(express.json());
app.use(express.urlencoded({extended :false}));
app.use(cors());


app.use("/budget", budgetrouter);
app.use("/", authrouter);0
app.use ("/", homerouter);







app.listen(Port , ()=> {

    console.log( `server listening on port ${Port}`);
});