// const http = require("http");

// const myServer = http.createServer((req,res) => {
//     // console.log("now req record");
//     console.log(req.headers)
//     res.end("hello from server ")
// })

// myServer.listen(8000 , () => console.log("server started!"))


// const http = require("http")
// const fs = require("fs")

// const myServer = http.createServer((req,res) => {
//     const log = `${Date.now()} : New request recieved\n `;

//     fs.appendFile("log.txt" , log ,(err , data ) => {
//         res.end("hello from server again ");
//     });
// });

// myServer.listen(8000 , () => console.log("server started "))/

const http = require("http")
const fs = require("fs")

const myServer = http.createServer((req, res) => 
{
    const loge = `${Date.now()} : ${req.url}  new request come\n`
    fs.appendFile("loge.txt" , loge , (err , data) => {
        switch(req.url) {
            case '/' : res.end("homepage")
            break;
            case '/about' : res.end("i am hitaishi")
            break;
            default: res.end("404 not found ")
      }
    });
});

myServer.listen(8000,() => console.log("server started ................... "))