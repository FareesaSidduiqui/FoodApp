const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    email : {
       type : String,
       required : true,
       unique : true
    },
    order_data : {
       type : Array,
       required : true 
    },
})

const Order = mongoose.model('Order',OrderSchema)
module.exports = Order