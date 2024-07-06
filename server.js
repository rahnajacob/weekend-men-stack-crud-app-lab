//IMPORTS

const dotenv = require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const methodOverride = require("method-override")

//CONSTANTS
const app = express()
const Menu = require("./models/menu.js")
const Ingredients = require("./models/menu.js")

//MIDDLEWARE
app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended:true}))

//SERVER CONNECTIONS
const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected")
        app.listen((process.env.PORT), () => {
            console.log(`Port running`)
        })
    } catch (err) {
        console.log(err.message)
    }
}

connect()