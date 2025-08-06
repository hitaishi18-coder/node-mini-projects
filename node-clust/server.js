// clusturization '


const express = require('express')
const cluster = require("cluster")

const os = require('os')

const totalcpu = os.cpus().length;

if (cluster.isPrimary) {
    // make worker
    for(let i=0; i< totalcpu; i++){
        cluster.fork()
    }
} else {
    const app = express()
    const PORT = 8000;
    app.get("/",(req,res)=>{
    return res.json({message:`hello from express server ${process.pid}`})
})

app.listen(PORT , () => console.log("server started"))
}