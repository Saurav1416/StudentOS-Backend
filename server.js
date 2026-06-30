const express = require('express');

const cors = require ('cors');

const budgetrouter = require('./routes/budget');
const authrouter = require("./routes/auth");
const homerouter = require("./routes/home");
const connectDB = require("./config/db")
const GEHM = require("./middleware/GlobalErrorHandlerMiddleware")


const Port = process.env.PORT || 3000;


const app = express()
 connectDB();

app.use(express.json());
app.use(express.urlencoded({extended :false}));
app.use(cors());


app.use("/budget", budgetrouter);
app.use("/", authrouter);
app.use ("/", homerouter);

app.use(GEHM);







app.listen(Port , ()=> {

    console.log( `server listening on port ${Port}`);
});