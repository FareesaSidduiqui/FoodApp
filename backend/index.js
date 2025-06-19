require('dotenv').config();

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const MenuItem = require('./model/FoodSchema')
const Category =  require('./model/Category')
const expressError = require('./utils/customError')

const Uri = process.env.MONGO_URI

async function APP(){
    await mongoose.connect(Uri)
}

APP().then(()=>{
    console.log('congrats! , connected to mongodb');
})
.catch(()=>{
    console.log('Sorry, got some error here in mongodb connection');
    
})

// app.get('/',(req,res)=>{
//     res.send('hello')
// })


app.get('/',async(req,res)=>{
    const items = await MenuItem.find({}).lean()
    
    // console.log(items[0].options);
//   res.send(items[11].options[0].entries()) 
     res.send(items[11].options[0].regular);
//  res.send(regularValue); // Should log the value associated with 'regular'

  
//   res.send(items) 
})

// instead of body-parser can use express.json
app.use(express.json())
app.set("trust proxy", 1); // trust first proxy (Render uses a reverse proxy)
app.use(cors({
    origin : 'https://foodapp-ua89.onrender.com',
    credentials:true,
}))
app.use(cookieParser())

app.use('/api',require('./Routes/createUser'))
app.use('/api',require('./Routes/displayData'))
app.use('/api',require('./Routes/orderData'))
 

// app.all("*",(req,res,next)=>{
//     next(new expressError(404,"Page not Found!"))
// })


app.use((err,req,res,next)=>{
    let { statusCode=500 , message="invalid data"} = err
    // res.status(statusCode).send(message)
    // res.status(statusCode).render('error',{err})
    // res.send('Something went wrowng',{message})
    res.status(statusCode).json({
        success: false,
        message: message
    });
    
})


app.listen(3000,()=>{
    console.log('app is listening ');
})