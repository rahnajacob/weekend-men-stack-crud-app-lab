const mongoose = require("mongoose")

const ingredientSchema = new mongoose.Schema({
    base: String,
    binder: String,
    spices: [String],
    oil: String,
    protein: String,
})

const menuSchema = new mongoose.Schema({
    dish: { type: String, required: true },
    timeOfDay: { type: String, required: true },
    prepTime: Number,
    ingredients: ingredientSchema
})

const Menu = mongoose.model("Menu", menuSchema)
const Ingredients = mongoose.model("Ingredients", ingredientSchema)

module.exports = {Menu: Menu, Ingredients: Ingredients}