const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    CategoryName : String
})

const Category = new mongoose.model('catrgory',CategorySchema)

module.exports = Category