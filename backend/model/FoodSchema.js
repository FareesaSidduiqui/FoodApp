const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FoodSchema = new Schema({
    CategoryName: String,
    name: String,
    img: String,
    options: [{
      type: Map,
      of: String
    }],
    description: String
})

const MenuItem = mongoose.model('menuitem', FoodSchema);

module.exports = MenuItem

