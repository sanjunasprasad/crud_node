require('dotenv').config()
const express = require("express")
    const mongoose = require("mongoose")
const session = require("express-session")
var morgan = require('morgan')
const nocache = require("nocache")
const path = require("path")



const app = express()
//const PORT = process.env.PORT || 66

//database connection

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("connected to database!"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('tiny'))
app.use(nocache());


app.use("/IMG", express.static(path.join(__dirname, "assets/IMG")))
app.use("/CSS", express.static(path.join(__dirname, "assets/CSS")))

app.use(session({
    secret: 'mysecretkey',
    saveUninitialized: false,
    resave: false,
}))

//session message storing

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message
    next()
})

app.set("view engine", "ejs")

//route prefix
app.use("", require("./routes/routes"))




app.listen(9000, (req, res) => {
    console.log(`the server is running `);
})