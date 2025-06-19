const router = require('express').Router()
const wrapAsync = require('../utils/wrapAsync')
const menuItem = require('../model/FoodSchema')
const Category = require('../model/Category')

router.post('/foodData',wrapAsync(async(req,res)=>{
    let items = await menuItem.find()
    let foodCategory = await Category.find()
    // console.log(items);
    res.send([items, foodCategory])
}))

module.exports = router
