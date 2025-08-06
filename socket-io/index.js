const http = require("http")
const express = require('express')
const path = require('path');
const { Server } = require("socket.io")
const app = express() // we cant use app.listen directly here 

// we first connect with http

const server = http.createServer(app);

// socket io
const io = new Server(server) // this handle sockets 


io.on('connection' , (socket) =>  {
    // console.log("A new user has connected" , socket.id)

    socket.on("user-message",(message)=>{
        // console.log("A new user message:- " , message)

        io.emit("message",message)
    });
});

// jab hum connection krenge ek client ayega ( client is a (socket))

app.use(express.static(path.resolve("./public")))

app.get("/" , (req,res) => {
    return res.sendFile('./public/index.html')
})

server.listen(8000, () => console.log(`server started at PORT : 8000`))