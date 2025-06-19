// middleware/verifyJWT.js
// require('dotenv').config()
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // No token

  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) {
      console.log('❌ Token error:', err.message);
      return res.status(401).json({ message: "Access token expired" });
    }else{
      console.log('Token no error');
      
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyJWT;
