const mongoose = require("mongoose")



const menuSchema = new mongoose.Schema({
    dish: { type: String, required: true },
    timeOfDay: { type: String, required: true },
    prepTime: Number,
    prepcomplete: Boolean,
    date: {type: Date, required: true}
})

const Menu = mongoose.model("Menu", menuSchema)

module.exports = Menu

//Code cemetary

// const ingredientSchema = new mongoose.Schema({
//     base: String,
//     binder: String,
//     spices: [String],
//     oil: String,
//     protein: String,
// })

// ingredients: ingredientSchema

// const Ingredients = mongoose.model("Ingredients", ingredientSchema)

// module.exports = {Menu: Menu, Ingredients: Ingredients}
