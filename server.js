//IMPORTS

const dotenv = require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const methodOverride = require("method-override")

//CONSTANTS
const app = express()
const Menu = require("./models/menu.js")
// const Ingredients = require("./models/menu.js")

//MIDDLEWARE
app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))

//ROUTES

//local host landing page
app.get("/", (req, res) => {
    res.render("index.ejs")
})

//new item form
app.get("/menu/new", async (req, res) => {
    res.render("menu/new.ejs")
})

//get form and add to database
app.post("/menu", async (req, res) => {
    req.body.prepcomplete = Boolean(req.body.prepcomplete)
    await Menu.create(req.body)
    res.redirect("/menu")
})

//get menu index page
app.get("/menu", async (req, res) => {
    const fullMenu = await Menu.find({})
    res.render("menu/index.ejs", { menu: fullMenu })
})

//show menu object details page
app.get("/menu/:menuId", async (req, res) => {
    const dishItem = await Menu.findById(req.params.menuId)
    res.render("menu/show.ejs", { item: dishItem })
})

//delete an object
app.delete("/menu/:menuId", async (req, res) => {
    await Menu.findByIdAndDelete(req.params.menuId)
    res.redirect("/menu")
})

//make a prepopulated edit form
app.get("/menu/:menuId/edit", async (req, res) => {
    const editItem = await Menu.findById(req.params.menuId)
    res.render("menu/edit.ejs", { item: editItem })
})

//capture PUT request to edit the database
app.put("/menu/:menuId", async (req, res) => {
    req.body.prepcomplete = Boolean(req.body.prepcomplete)
    await Menu.findByIdAndUpdate(req.params.menuId, req.body)
    res.redirect(`/menu/${req.params.menuId}`)
})

//SERVER CONNECTIONS
const connect = async () => {
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