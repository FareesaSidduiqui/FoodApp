require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../model/User')
const wrapAsync = require('../utils/wrapAsync')
const {body,validationResult} = require('express-validator')
const expressError = require('../utils/customError')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyJWT = require('../middleware/authMiddleware')


// Helper: create tokens
const createTokens = (user) => {
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_SECRET,
      { expiresIn: '1m' }
    );
  
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_SECRET,
      { expiresIn: '7d' }
    );
  
    return { accessToken, refreshToken };
  };

router.post('/createuser',
    body('email','Incorrect Email').isEmail(),
    body('name','Incorrect Name').isLength({min : 5}),
    body('password','Incorrect Password').isLength({min:5}),

    wrapAsync(async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const { name, email, password, location } = req.body;

    const exists = await User.findOne({email})
    if(exists) return res.status(400).json({msg:'User Already exist with this email. Try Login'})

    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(password,salt)

    const user = await User.create({ name, email, password : securePass, location });
    // const user = {}
    const {accessToken , refreshToken} = createTokens(user)

    res
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'None', //strict in development
      secure: true, // false in development
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .status(200).json({ accessToken, email , message : " User exist successfully", success: true});}));

router.post('/loginuser',
    body('email','Incorrect Email').isEmail(),
    body('password','Incorrect Password').isLength({min:5}),

    wrapAsync(async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const {email, password } = req.body;

     let user = await User.findOne({ email });
     if(!user){
        throw new expressError(404,'User does not exist or incorrect credentials')
     }
    //  if(req.body.password !== user.password){
    //     throw new expressError(404, 'User does not exist or incorrect credentials')
    //  }
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new expressError(401,'Invalid credentials')
    
    const {accessToken , refreshToken} = createTokens(user)

    res
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true, // true in production
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .status(200).json({ accessToken, email , message : " User exist successfully", success: true});

}));

// Refresh
router.get('/refresh', async(req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ msg: 'Unauthorized' });
  
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
      const user = await User.findById(decoded.id)
      const accessToken = jwt.sign(
        { id: user._id , email : user.email},
        process.env.ACCESS_SECRET,
        { expiresIn: '15m' }
      );
      res.json({ accessToken });
    } catch (err) {
      res.status(403).json({ msg: 'Invalid refresh token' });
    }
  });


  router.post('/logout',(req,res)=>{
    res.clearCookie('refreshToken')
    res.status(200).json({
        message : 'Logout SuccessFully'
    })
  })
  

  // for home to get valid token and not expire one 
  router.get("/ping", verifyJWT, (req, res) => {
    res.status(200).json({
      message: "Access token is valid",
      user: req.user
    })
  })
  

module.exports = router