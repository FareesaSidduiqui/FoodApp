const router = require('express').Router()
const wrapAsync = require('../utils/wrapAsync')
const Order = require('../model/Order')
const verifyAuth = require('../middleware/authMiddleware')

router.post('/orderData',verifyAuth,wrapAsync(async(req,res)=>{
    const { email, order_data, order_date } = req.body;

    if (!email || !order_data || !order_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const orderEntry = {
      order_date,
      items: order_data
    };
  
    const existingOrder = await Order.findOne({ email });
  
    if (existingOrder) {
      existingOrder.order_data.push(orderEntry);
      await existingOrder.save();
      return res.status(200).json({ message: 'Order updated successfully' });
    }
  
    await Order.create({
      email,
      order_data: [orderEntry]
    });
  
    res.status(200).json({ message: 'New order created successfully' });
    
}))

router.post('/myorderData',verifyAuth,wrapAsync(async(req,res)=>{
  
    let myData = await Order.findOne({'email':req.body.email})
   res.json({myData})
}))

module.exports = router