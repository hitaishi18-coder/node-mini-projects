const express = require('express')
const fs = require("fs")
const status = require("express-status-monitor")
const zlib = require('zlib');
const app = express();
const PORT = 8000;


app.use(status())      //    8000/status 


// streamRead -> 400mb(zip) -> 400mb write ----------->>>>    "wrong"

// more memory will consume bcoz zip will create in memory

// so we use (zlib)

fs.createReadStream('./sample.txt')
fs.createReadStream('./sample.txt')                // read the file
  .pipe(zlib.createGzip())                         // compress it
  .pipe(fs.createWriteStream('./sample.zip'));  // write compressed file

 // stream read(sample.txt)  --> zipper ---> fs write stream 



app.get("/" , (req , res)=> {
    // fs.readFile("./sample.txt" , (err , data)=> {
    //     res.end(data)
    const stream = fs.createReadStream('./sample.txt', "utf-8")
    stream.on("data",(chunk)=> res.write(chunk))
    stream.on("end", () => res.end())
    })

app.listen(PORT,()=> console.log(`server started at http://localhost:${PORT}`))