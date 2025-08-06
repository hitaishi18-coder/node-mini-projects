const express = require("express");

const { connectMongoDB } = require("./connection");

const userRouter = require("./routes/user")

const { logRequest } = require("./middleware/index"); 

const app = express()

const PORT = 8000;


// connection 

connectMongoDB("mongodb://127.0.0.1:27017/my-database-1");



// middleware 

app.use(logRequest("log.txt"));

app.use(express.urlencoded({extended : false }))
app.use(express.json());





// routes 
app.use("/api/users" , userRouter)


app.listen(PORT , () => console.log(`server started at port : ${PORT}`))



