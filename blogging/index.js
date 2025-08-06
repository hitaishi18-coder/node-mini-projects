const express = require("express");


const app = express();
const PORT = 8000
const path = require('path')
const userRoute = require('./routes/user')
const blogRoute = require("./routes/blog");
const blog = require("./models/blog")

const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const { checkForAuth } = require("./middleware/authen");





mongoose.connect('mongodb://127.0.0.1:27017/blogify')
.then((e) => console.log("mongo connected !"));


app.set('view engine', 'ejs')
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended : false}))
app.use(cookieParser())
app.use(checkForAuth("token"))
app.use(express.static(path.resolve("./public")));



app.get('/', async(req,res) => {
    const allblog = await blog.find({})
    res.render('home',{
        user: req.user,
        blogs: allblog
    })
})

app.use('/user' , userRoute)
app.use('/blog',blogRoute)

app.listen(PORT,() => console.log(`server started at PORT : ${PORT}`));